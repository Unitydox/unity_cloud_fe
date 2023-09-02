import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
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
	// const { setLoading } = useLoading();

	// const [albumList, setAlbumList] = useState<AlbumItems[]>();

	// const fetchAllAlbums = () => {
	// 	setLoading(true);

	// 	fetchAlbums()
	// 		.then((res) => {
	// 			if (res.status) {
	// 				setAlbumList(res.data);
	// 			}
	// 		})
	// 		.finally(() => setLoading(false));
	// };

    // const openAlbum = (album_id: number) => {

    // }

	// useEffect(() => {
	// 	fetchAllAlbums();
	// }, []);

	return (
		<Outlet />
	);
};

export default Albums;
