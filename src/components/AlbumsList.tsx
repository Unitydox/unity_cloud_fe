import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useLoading } from "contexts/LoadingContext";
import { fetchAlbums } from "services/photoService";
import moment from "moment";
import NothingToSee from "./NothingToSee";

interface AlbumsListProps {}

interface AlbumItems {
	id: number;
	uuid: string;
	name: string;
	created_at: string;
	no_of_images: number;
	thumbnail_url: string;
}

const AlbumsList: React.FC<AlbumsListProps> = () => {
	const navigate = useNavigate();
	const { setLoading } = useLoading();

	const [albumList, setAlbumList] = useState<AlbumItems[]>();

	const fetchAllAlbums = () => {
		setLoading(true);

		fetchAlbums()
			.then((res) => {
				if (res.status) {
					setAlbumList(res.data);
				}
			})
			.finally(() => setLoading(false));
	};

	const openAlbum = (album_id: string, album_primary_key: number) => {
		navigate("/app/albums/view", {
			state: { album_id: album_id, album_primary_key: album_primary_key },
		});
	};

	useEffect(() => {
		fetchAllAlbums();
	}, []);

	return (
		<>
			<div className="flex w-full flex-row flex-wrap overflow-y-auto">
				{albumList &&
					albumList.map((album) => (
						<div
							className="flex w-1/2 cursor-pointer flex-col items-center gap-2 p-2 hover:rounded-xl hover:bg-blue-200 hover:shadow-xl md:w-1/3 xl:w-1/5 2xl:w-1/6"
							key={album.id}
							onClick={() => openAlbum(album.uuid, album.id)}
						>
							<div className="">
								<img
									className="rounded shadow"
									src={album.thumbnail_url}
									alt={album.name}
								/>
							</div>
							<div className="flex flex-col items-center">
								<Typography color="black">{album.name}</Typography>
								<Typography variant="small" color="gray">
									{moment(album.created_at).format("MMM DD, YYYY")} |{" "}
									{`${album.no_of_images} item(s)`}
								</Typography>
							</div>
						</div>
					))}
			</div>

			<div className="h-full">{albumList && albumList.length === 0 && <NothingToSee />}</div>
		</>
	);
};

export default AlbumsList;
