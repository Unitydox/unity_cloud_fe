import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useLoading } from "contexts/LoadingContext";
import { fetchAlbums } from "services/photoService";
import moment from "moment";

interface AlbumsProps {}

interface AlbumItems {
	id: number;
	uuid: string;
	name: string;
	created_at: string;
	no_of_images: number;
	thumbnail_url: string;
}

const Albums: React.FC<AlbumsProps> = () => {
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

    const openAlbum = (album_id: number) => {

    }

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
                            onClick={() => openAlbum(album.id)}
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

				{albumList && albumList.length === 0 && (
					<div className="flex h-full flex-row items-center justify-center">
						<Typography className="items-center justify-center">
							Create an album to get started.
						</Typography>
					</div>
				)}
			</div>
		</>
	);
};

export default Albums;
