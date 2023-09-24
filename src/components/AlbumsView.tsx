import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Checkbox } from "@material-tailwind/react";
import { useLoading } from "contexts/LoadingContext";
import { fetchAlbumImages, bulkToggleImageToAlbum } from "services/photoService";
import ImageCard from "./ImageCard";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ImageData } from "types/imageTypes";
import { toast } from "react-hot-toast";

interface AlbumsViewProps {}

const AlbumsView: React.FC<AlbumsViewProps> = () => {
	const location = useLocation();
	const { setLoading } = useLoading();

	const [albumId, setAlbumId] = useState<string>("");
	const [albumPrimId, setAlbumPrimId] = useState<number>();
	const [albumImages, setAlbumImages] = useState<Map<string, ImageData>>(
		new Map(),
	);
	const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
	const [selectedCount, setSelectedCount] = useState<number>(0);

	const fetchAllAlbumImages = () => {
		setLoading(true);

		fetchAlbumImages({ album_id: location.state.album_id })
			.then((res) => {
				if (res.status) {
					setAlbumImages(res.data);
					if (res.data.length) {
						const imagesMap = new Map<string, ImageData>();
						for (const img of res.data) {
							img.isImageSelected = false;
							imagesMap.set(img.uuid, img);
						}

						setAlbumImages(imagesMap);
					}
				}
			})
			.finally(() => setLoading(false));
	};

	const onStatusChange = async (formattedDate: string, uuid: string) => {
		setLoading(true);

		setAlbumImages((prevMap) => {
			const imagesMap = new Map(prevMap);
			imagesMap.delete(uuid);
			return imagesMap;
		});

		setLoading(false);
	};

	const addToAlbum = () => {};

	const toggleSelectAll = () => {
		setAlbumImages((prevMap) => {
			const imagesMap = new Map(prevMap);

			imagesMap.forEach((image) => {
				image.isImageSelected = !isAllSelected;
			});

			return imagesMap;
		});

		setSelectedCount((isAllSelected) ? 0 : albumImages.size);

		setIsAllSelected((isAllSelected) => !isAllSelected);
	};

	const onImgSelectionChange = (image: ImageData) => {
		setAlbumImages((prevMap) => {
			const newMap = new Map(prevMap);

			const cur_img = newMap.get(image.uuid);

			if(cur_img){
				cur_img.isImageSelected = !cur_img.isImageSelected;

				const imgSelectedCount = Array.from(newMap.values()).filter(
					(image) => image.isImageSelected,
				).length;

				setSelectedCount(imgSelectedCount);

				setIsAllSelected(imgSelectedCount === newMap.size);

				newMap.set(image.uuid, cur_img);
			}

			return newMap;
		})
	}

	const bulkRemoveFromAlbum = () => {
		const toastID = toast.loading('Removing from album...');

		const selectedImages = Array.from(albumImages.values()).map(image => image.id);

		bulkToggleImageToAlbum({
			images_id: selectedImages,
			album_id: albumPrimId,
			status: 'delete'
		}).then((res) => {
			if (res.status) {
				fetchAllAlbumImages();
				toast.success('Images removed', { id: toastID, duration: 3000 })
			}else{
				toast.error('Error in removing images', { id: toastID, duration: 3000 })
			}
			
			setTimeout(() => {
				toast.dismiss(toastID);
			}, 800)
		})
	}

	useEffect(() => {
		setAlbumId(location.state?.album_id || "");
		setAlbumPrimId(location.state?.album_primary_key || "");
		fetchAllAlbumImages();
	}, [location.state?.album_id, location.state?.album_primary_key]);

	return (
		<section>
			<div className="flex flex-row items-center justify-between">
				<Link to={"/app/albums"} className="inline-flex">
					<ArrowLeftCircleIcon className="h-8 w-8 cursor-pointer text-primary" />
				</Link>
				<div className="flex flex-row items-center justify-between gap-2">
					{/* <Button
						className="flex items-center gap-2 p-2"
						variant="outlined"
						onClick={addToAlbum}
					>
						<PlusIcon className="h-5 w-5" />
						Add to Album
					</Button> */}
					{ (selectedCount > 0) && <TrashIcon className="h-5 w-5 cursor-pointer" onClick={bulkRemoveFromAlbum} /> }
					<Checkbox
						checked={isAllSelected}
						onChange={() => toggleSelectAll()}
						className="m-2 h-5 w-5 rounded-full border-primary transition-all hover:scale-110 hover:before:opacity-0"
						containerProps={{ className: "p-0" }}
					/>
				</div>
			</div>

			<div className="flex flex-wrap">
				{Array.from(albumImages?.values() || []).map((img) => (
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
							onImageSelected={() => onImgSelectionChange(img)}
							additional_params={{
								album_id: albumId,
								album_primary_key: albumPrimId,
							}}
							viewType={"album"}
							onLikeChange={() => {}}
							onStatusChange={() => onStatusChange("", img.uuid)}
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default AlbumsView;
