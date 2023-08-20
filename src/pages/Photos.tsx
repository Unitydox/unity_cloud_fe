import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ImageCard from "components/ImageCard";
import { Typography } from "@material-tailwind/react";
// import axios from "axios";
import { useLoading } from "contexts/LoadingContext";
import { useFileUploadContext } from "contexts/FileUploadContext";
import {
	fetchImages,
	getDistinctDates,
} from "services/photoService"; // Adjust this import

interface all_dates {
	date: string;
	formatted_date: string;
	images?: Map<string, image_data>; // Use a map for images
}

interface image_data {
	id: number;
	uuid: string;
	original_file_name: string;
	file_temp_url: string;
	thumbnail_url: string;
	status: string;
	favourite: number;
	metadata: any;
	temp_url_expiry: Date;
}

const PhotosGallery = () => {
	const location = useLocation();

	const { setLoading } = useLoading();
	const { uploadedFile } = useFileUploadContext();

	const [imageDataMap, setImageDataMap] = useState<Map<string, all_dates>>(
		new Map(),
	);
	const [days, setDays] = useState<all_dates[]>([]);
	const [type, setType] = useState(location.state?.type || "");

	useEffect(() => {
		setType(location.state?.type || "");
		fetchDistinctDates();
	}, [location.state?.type]);

	const fetchDistinctDates = () => {
		setLoading(true);

		setImageDataMap(new Map());
		setDays([]);

		getDistinctDates({
			type: location.state?.type,
			status: location.state?.type,
		})
			.then((res) => {
				setDays(
					res.data.map((d: { created_at: string; formatted_date: string }) => ({
						date: d.created_at,
						formatted_date: d.formatted_date,
					})),
				);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (days.length > 0) {
			for (const day of days) {
				fetchAndPushImages(day);
			}
		} else {
			setLoading(false);
		}
	}, [days]);

	const fetchAndPushImages = (day: all_dates) => {
		fetchImages({
			type: location.state?.type,
			status: location.state?.type,
			date: day.formatted_date,
		})
			.then((res) => {
				setLoading(false);

				if (res.data.length) {
					const imagesMap = new Map<string, image_data>();
					for (const img of res.data) {
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
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
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

	return (
		<section>
			{Array.from(imageDataMap.entries()).map(([formattedDate, day]) => (
				(day.images && day.images.size > 0) &&
				<div key={formattedDate}>
					<Typography variant="h4" color="blue">
						{day.date}
					</Typography>
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
									viewType={type}
									onLikeChange={onLikesChange}
									onStatusChange={() => onStatusChange(formattedDate, img.uuid)}
								/>
							</div>
						))}
					</div>
				</div>
			))}
		</section>
	);
};

export default PhotosGallery;
