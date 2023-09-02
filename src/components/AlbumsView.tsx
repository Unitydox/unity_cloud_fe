import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useLoading } from "contexts/LoadingContext";
import { fetchAlbumImages } from "services/photoService";
import ImageCard from "./ImageCard";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";

interface AlbumsViewProps {}

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

const AlbumsView: React.FC<AlbumsViewProps> = () => {
	const location = useLocation();
	const { setLoading } = useLoading();

	const [albumId, setAlbumId] = useState<string>("");
	const [albumPrimId, setAlbumPrimId] = useState<number>();
	const [albumImages, setAlbumImages] = useState<Map<string, image_data>>(
		new Map(),
	);

	const fetchAllAlbumImages = () => {
		setLoading(true);

		fetchAlbumImages({ album_id: location.state.album_id })
			.then((res) => {
				if (res.status) {
					setAlbumImages(res.data);
					if (res.data.length) {
						const imagesMap = new Map<string, image_data>();
						for (const img of res.data) {
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

    const addToAlbum = () => {

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
				{/* <Button
					className="flex items-center gap-2 p-2"
					variant="outlined"
					onClick={addToAlbum}
				>
                    <PlusIcon className="h-5 w-5" />
                    Add to Album
				</Button> */}
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
                            additional_params={{
                                album_id: albumId, 
                                album_primary_key: albumPrimId
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
