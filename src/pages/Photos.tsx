import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ImageCard from "components/ImageCard";
import {
	Checkbox,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useLoading } from "contexts/LoadingContext";
import { useFileUploadContext } from "contexts/FileUploadContext";
import {
	fetchImages,
	getDistinctDates,
	bulkToggleImageToAlbum,
	bulkUpdateStatus,
} from "services/photoService";
import { ImageData } from "types/imageTypes";
import {
	PlusIcon,
	EllipsisVerticalIcon,
	TrashIcon,
	ArchiveBoxArrowDownIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionDialog from "components/ActionDialog";
import NothingToSee from "components/NothingToSee";
import moment from "moment";

interface all_dates {
	date: string;
	formatted_date: string;
	isAllSelected: boolean;
	selectedCount: number;
	images?: Map<string, ImageData>; // Use a map for images
}

const PhotosGallery = () => {
	const location = useLocation();

	const { loading, setLoading } = useLoading();
	const { uploadedFile } = useFileUploadContext();

	const search_text = useSelector((state) => state.imageSearch.search_text);

	const [imageDataMap, setImageDataMap] = useState<Map<string, all_dates>>(
		new Map(),
	);
	const [days, setDays] = useState<all_dates[]>([]);
	const [type, setType] = useState(location.state?.type || "");
	const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
	const [modalActionType, setModalActionType] = useState<string>("");
	const [modalActionDate, setModalActionDate] = useState<string>("");

	useEffect(() => {
		setType(location.state?.type || "");
		fetchDistinctDates();
	}, [location.state?.type, search_text]);

	const fetchDistinctDates = () => {
		setLoading(true);

		setImageDataMap(new Map());
		setDays([]);

		getDistinctDates({
			type: location.state?.type,
			status: location.state?.type,
			searchText: search_text,
		})
			.then(async (res) => {
				const daysData = res.data.map(
					(d: { img_created_date: string; formatted_date: string }) => ({
						date: d.img_created_date,
						formatted_date: d.formatted_date,
						isAllSelected: false,
						selectedCount: 0,
					}),
				);

				setDays(daysData);

				for (const day of daysData) {
					await fetchAndPushImages(day);
				}
			})
			.finally(() => setLoading(false));
	};

	// useEffect(() => {
	// 	if (days.length > 0) {
	// 		for (const day of days) {
	// 			fetchAndPushImages(day);
	// 		}
	// 	} else {
	// 		setLoading(false);
	// 	}
	// }, [days]);

	const fetchAndPushImages = async (day: all_dates) => {
		const result = await fetchImages({
			type: location.state?.type,
			status: location.state?.type,
			date: day.formatted_date,
			searchText: search_text,
		});

		if (result.status && result.data.length > 0) {
			const imagesMap = new Map<string, ImageData>();
			for (const img of result.data) {
				img.isImageSelected = false;
				imagesMap.set(img.uuid, img);
			}

			setImageDataMap((prevMap) => {
				const newMap = new Map(prevMap);
				newMap.set(day.formatted_date, {
					...day,
					images: imagesMap,
				});
				return newMap;
			});
		}

		setLoading(false);
	};

	useEffect(() => {
		console.log({ uploadedFile });
		if (uploadedFile) {
			fetchDistinctDates();
		}
	}, [uploadedFile]);

	const onStatusChange = async (formattedDate: string, uuid: string) => {
		setLoading(true);

		setImageDataMap((prevMap) => {
			const newMap = new Map(prevMap);
			const dateData = newMap.get(formattedDate);
			if (dateData) {
				const imagesMap = dateData.images || new Map();
				imagesMap.delete(uuid);
				newMap.set(formattedDate, {
					...dateData,
					images: imagesMap,
				});
			}
			return newMap;
		});

		setLoading(false);
	};

	const onLikesChange = () => {
		if (type === "favourites") {
			fetchDistinctDates();
		}
	};

	const onImgSelectionChange = (image: ImageData, formattedDate: string) => {
		setImageDataMap((prevMap) => {
			const newMap = new Map(prevMap);
			const dateData = newMap.get(formattedDate);
			if (dateData) {
				const imagesMap = dateData.images || new Map();

				const cur_img = imagesMap.get(image.uuid);

				cur_img.isImageSelected = !cur_img.isImageSelected;

				const selectedCount = Array.from(imagesMap.values()).filter(
					(image) => image.isImageSelected,
				).length;

				dateData.selectedCount = selectedCount;

				dateData.isAllSelected = selectedCount === imagesMap.size;

				imageDataMap.set(image.uuid, cur_img);

				newMap.set(formattedDate, {
					...dateData,
					images: imagesMap,
				});
			}

			return newMap;
		});
	};

	const toggleSelectAll = (formattedDate: string) => {
		setImageDataMap((prevMap) => {
			const newMap = new Map(prevMap);

			const dateData = newMap.get(formattedDate);

			if (dateData) {
				const imagesMap = dateData.images || new Map();

				// Toggle isAllSelected
				dateData.isAllSelected = !dateData.isAllSelected;

				dateData.selectedCount = dateData.isAllSelected ? imagesMap.size : 0;

				// Set isImageSelected for each image
				imagesMap.forEach((image) => {
					image.isImageSelected = dateData.isAllSelected;
				});

				newMap.set(formattedDate, {
					...dateData,
					images: imagesMap,
				});
			}

			return newMap;
		});
	};

	const handleBulkActionWarn = (type: string, formatted_date: string) => {
		setIsWarningModalOpen(true);
		setModalActionType(type);
		setModalActionDate(formatted_date);
	};

	const getSelectedItems = (formattedDate: string) => {
		const dateData = imageDataMap.get(formattedDate);

		if (dateData?.images?.size) {
			const selectedImages = Array.from(dateData.images.values())
				.filter((image) => image.isImageSelected)
				.map((image) => image.uuid);

			return selectedImages;
		}

		return [];
	};

	const handleBulkAction = (type: string) => {
		let toastMsg = "";

		switch (type) {
			case "delete":
				toastMsg = "Deleting Images...";
				break;

			case "archive":
				toastMsg = "Archiving Images...";
				break;

			case "restore":
				toastMsg = "Restoring Images...";
				break;

			default:
				break;
		}

		const toastID = toast.loading(toastMsg);

		bulkUpdateStatus({
			uuid: getSelectedItems(modalActionDate),
			type: type === "restore" ? "active" : type,
		})
			.then((res) => {
				setIsWarningModalOpen(false);
				setModalActionDate("");
				setModalActionType("");
				if (res.status) {
					fetchDistinctDates();
					toast.success(res.message, { id: toastID, duration: 3000 });
				} else {
					toast.error(res.message, { id: toastID, duration: 3000 });
				}
			})
			.finally(() => {
				setTimeout(() => {
					toast.dismiss(toastID);
				}, 800);
			});
	};

	// const bulkToggleFromAlbum = (formattedDate: string) => {
	// 	const toastID = toast.loading("Removing from album...");

	// 	console.log(getSelectedItems(formattedDate));
	// };

	return (
		<section className="h-full">
			{!loading && Array.from(imageDataMap.entries()).length == 0 && (
				<NothingToSee />
			)}
			{Array.from(imageDataMap.entries())
				.map(
					([formattedDate, day]) =>
						day.images &&
						day.images.size > 0 && (
							<div key={formattedDate}>
								<div className="flex flex-row items-center justify-between">
									<Typography variant="h4" color="blue">
										{day.date}
									</Typography>

									<div className="me-1 flex flex-row items-center justify-between gap-2">
										<Checkbox
											checked={day.isAllSelected}
											onChange={() => toggleSelectAll(formattedDate)}
											className="h-5 w-5 rounded-full border-primary transition-all hover:scale-110 hover:before:opacity-0"
											containerProps={{ className: "p-0" }}
										/>
										{day.selectedCount > 0 && (
											<Menu>
												<MenuHandler>
													<EllipsisVerticalIcon className="h-5 w-5 cursor-pointer" />
												</MenuHandler>
												<MenuList>
													{!type && (
														<>
															{/* <MenuItem
															className="flex flex-row items-center gap-2"
															onClick={() => bulkToggleFromAlbum(formattedDate)}
														>
															<PlusIcon className="h-5 w-5 cursor-pointer" />
															Add to album
														</MenuItem> */}
															<MenuItem
																className="flex flex-row items-center gap-2"
																onClick={() =>
																	handleBulkActionWarn("archive", formattedDate)
																}
															>
																<ArchiveBoxArrowDownIcon className="h-5 w-5 cursor-pointer" />
																Archive selection
															</MenuItem>
															<MenuItem
																className="flex flex-row items-center gap-2"
																onClick={() =>
																	handleBulkActionWarn("delete", formattedDate)
																}
															>
																<TrashIcon className="h-5 w-5 cursor-pointer" />
																Delete selection
															</MenuItem>
														</>
													)}
													{(type === "delete" || type === "archive") && (
														<>
															<MenuItem
																className="flex flex-row items-center gap-2"
																onClick={() =>
																	handleBulkActionWarn("restore", formattedDate)
																}
															>
																<FontAwesomeIcon
																	icon={faTrashArrowUp}
																	size="lg"
																	className="cursor-pointer text-green-500"
																/>
																Restore selection
															</MenuItem>
														</>
													)}
												</MenuList>
											</Menu>
										)}
									</div>
								</div>
								<div className="flex flex-wrap">
									{Array.from(day.images?.values() || []).map((img) => (
										<div
											className="relative w-1/2 overflow-hidden rounded p-2 text-center md:w-1/3 xl:w-1/5 2xl:w-1/6"
											key={img.uuid}
										>
											<ImageCard
												src={img.thumbnail_url}
												full_url={img.file_temp_url}
												photo_id={img.uuid}
												photo_primary_id={img.id}
												isFavourite={img.favourite === 1}
												isImageSelected={!!img.isImageSelected}
												onImageSelected={() =>
													onImgSelectionChange(img, formattedDate)
												}
												viewType={type}
												onLikeChange={onLikesChange}
												onStatusChange={() =>
													onStatusChange(formattedDate, img.uuid)
												}
											/>
										</div>
									))}
								</div>
							</div>
						),
				)}
			{type === "delete" && (
				<Typography
					variant="small"
					className="sticky bottom-[-1rem] flex flex-row items-center justify-center rounded-t-2xl text-gray-500 backdrop-blur-sm"
				>
					<InformationCircleIcon className="mr-2 h-4 w-4 text-red-500" />
					Photos will be permanently deleted after 30 days.
				</Typography>
			)}

			<ActionDialog
				isOpen={isWarningModalOpen}
				headerContent={modalActionType}
				bodyContent={`Are you sure you want to ${modalActionType} these photos from ${modalActionDate}?`}
				confirmBtn={modalActionType}
				onConfirm={() => handleBulkAction(modalActionType)}
				cancelBtn={"Cancel"}
				onCancel={() => setIsWarningModalOpen(false)}
			></ActionDialog>
		</section>
	);
};

export default PhotosGallery;
