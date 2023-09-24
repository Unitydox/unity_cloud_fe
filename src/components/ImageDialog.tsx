import React, { useState, useEffect } from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	IconButton,
	Typography,
	Spinner,
	Drawer,
} from "@material-tailwind/react";
import AddToAlbum from "./AddToAlbum";
import HeartIcon from "./icons/HeartIcon";
import {
	ShareIcon,
	ArrowDownTrayIcon,
	XMarkIcon,
	InformationCircleIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getSignedUrl } from "services/photoService";
import DownloadFile from "./DownloadFile";

interface ImageDialogProps {
	open: boolean;
	onClose: React.EventHandler<any>;
	imgUrl: string;
	photo_primary_id: number;
	photo_id: string;
	isLiked: boolean;
	onImageLiked: React.EventHandler<any>;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
	open,
	onClose,
	imgUrl,
	photo_id,
	photo_primary_id,
	isLiked,
	onImageLiked,
}) => {
	const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState<boolean>(false);
	const [imageSrc, setImageSrc] = useState<string>(imgUrl);
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

	useEffect(() => {
		setImageSrc(imgUrl);
	}, [imgUrl]);
	
	useEffect(() => {
		console.log(isDrawerOpen);
	}, [isDrawerOpen]);

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	const onFavChanged = () => {
		isLiked = !isLiked;
		onImageLiked(isLiked);
	};

	// const showImgDetails = () => {};

	// const shareImage = () => {};

	const addToAlbum = () => {
		setIsAlbumDialogOpen(true);
	};

	const handleImageError = () => {
		getSignedUrl({
			img_id: photo_primary_id,
			type: "main",
		}).then((res) => {
			if (res?.data) {
				setImageSrc(res.data);
			}
		});
	};

	return (
		<>
			<Dialog
				size="xxl"
				className="bg-black"
				open={open}
				handler={() => onClose(isLiked)}
			>
				<DialogHeader className="absolute z-10 w-full justify-between bg-transparent">
					<div className="flex items-center gap-3"></div>
					<div className="flex items-center gap-5">
						<HeartIcon defaultFilled={isLiked} onClick={onFavChanged} />
						<PlusIcon
							className="h-5 w-5 cursor-pointer text-white"
							onClick={addToAlbum}
						/>
						<DownloadFile fileUrl={imgUrl} />
						<InformationCircleIcon
							className="h-5 w-5 cursor-pointer text-white"
							onClick={openDrawer}
						/>
						{/* <ShareIcon
							className="h-5 w-5 cursor-pointer text-white"
							onClick={shareImage}
						/> */}
						<XMarkIcon
							className="h-5 w-5 cursor-pointer text-white"
							onClick={() => onClose(isLiked)}
						/>
					</div>
				</DialogHeader>
				<DialogBody
					divider={true}
					className="flex h-full flex-row items-center justify-center border-b-0 border-none p-0"
				>
					<LazyLoadImage
						src={imageSrc}
						alt={`Image Alt`}
						className={`h-[calc(100vh-5rem)] object-cover object-center`}
						height="calc(100vh-5rem)"
						threshold={500}
						onError={handleImageError}
						effect="blur"
						// delayTime={20000}
						placeholder={<Spinner />}
					/>
					{/* <img
						alt="nature"
						className="h-[calc(100vh-5rem)] object-cover object-center"
						src={imgUrl}
					/> */}

					<AddToAlbum
						open={isAlbumDialogOpen}
						onClose={() => setIsAlbumDialogOpen(false)}
						photo_id={photo_id}
						photo_primary_id={photo_primary_id}
					/>
				</DialogBody>
			</Dialog>

			{/* <Drawer open={isDrawerOpen} onClose={closeDrawer} className="p-4">
				<div className="flex flex-col">
					<Typography variant="h5" color="blue-gray">
						Material Tailwind
					</Typography>
				</div>
			</Drawer> */}
		</>
	);
};

export default ImageDialog;
