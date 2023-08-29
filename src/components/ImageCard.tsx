import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeartIcon from "./icons/HeartIcon";
import { updateFavourite, changeImageStatus } from "services/photoService";
import ActionDialog from "./ActionDialog";
import ImageDialog from "./ImageDialog";
import { ArchiveIcon, TrashIcon } from "./icons";
import { faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSignedUrl } from "services/photoService";

interface ImageCardProps {
	src: string;
	full_url: string;
	photo_primary_id: number;
	photo_id: string;
	isFavourite: boolean;
	viewType: string;
	onLikeChange: any;
	onStatusChange: any;
}

// interface statusUpdateProps {
// 	formattedDate: string, 
// 	uuid: string
// }

const ImagePlaceholder = () => {
	return (
		<div className="h-[130px] w-full animate-pulse rounded-lg bg-gray-400/50">
			{/* You can adjust the dimensions and other styling as needed */}
		</div>
	);
};

const ImageCard: React.FC<ImageCardProps> = ({ src, full_url, photo_id, photo_primary_id, isFavourite, viewType, onLikeChange, onStatusChange }) => {

	const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
	const [isImagePreviewOpen, setIsImagePreviewOpen] = useState<boolean>(false);
	const [isLiked, setIsLiked] = useState<boolean>(isFavourite);
	const [imageSrc, setImageSrc] = useState<string>(src);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
	const [statusUpdateType, setStatusUpdateType] = useState<string>("");
	const [headerText, setHeaderText] = useState<string>(`
		%PH% Image
	`);
	const [bodyText, setBodyText] = useState<string>(`
		Are you sure you want to %PH% the image?
	`);

	useEffect(() => {
		// setIsImageLoaded(false);
		setImageSrc(src);
	}, [src])

	const handleLikeClick = (output: boolean) => {
		console.log(`Heart icon clicked. Output: ${output}, ${photo_id}`);
		
		updateFavourite({
			uuid: photo_id,
			isLiked: output
		}).then((res) => {
			setIsLiked(output);
			console.log("Favourite updated");
			onLikeChange();
		}).finally(() => {})
	};

	const handleStatusChange = (type: string) => {
		console.log("clicked", type);

		if(viewType == 'archive' && type == 'archive') type = 'active'; 
		
		changeImageStatus({
			uuid: photo_id,
			type: type
		}).then((res) => {
			console.log("Image Updated");
			onStatusChange(type);
		}).finally(() => {})
	};

	const showWarningDialog = (type: string) => {
		setStatusUpdateType(type);

		setConfirmDialogOpen(true);
	}

	const handleImageClick = () => {
		setIsImagePreviewOpen(true);
	}

	const onDialogClose = () => {
		setIsImagePreviewOpen((cur) => !cur);
	}

	const handleImageError = () => {
		getSignedUrl({
			img_id: photo_primary_id,
			type: 'thumb'
		}).then((res) => {
			if(res?.data){
				setImageSrc(res.data);
			}
		})
	}
	
	const capitalizeFirstLetter = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<div className="relative mx-auto max-h-[150px] max-w-[200px] rounded-lg">
			{
				isImageLoaded &&
				<div className="absolute bottom-[5%] right-0 z-10 flex scale-[80%] flex-row items-center gap-1 rounded-lg bg-gray-500/5 p-1 backdrop-blur-sm">
					{
						(viewType != 'delete') ?
						<>
							<HeartIcon defaultFilled={isLiked} onClick={handleLikeClick} />
							<span onClick={() => showWarningDialog('archive')}>
								<ArchiveIcon className="fill-gray-500" />
							</span>
							<span onClick={() => showWarningDialog('delete')}>
								<TrashIcon className="fill-gray-500" />
							</span>
						</>
						:
						<>
							<span onClick={() => showWarningDialog('active')}>
								<FontAwesomeIcon icon={faTrashArrowUp} size="lg" className="cursor-pointer text-green-500" />
							</span>
						</>
					}
				</div>
			}
			{
				!isImageLoaded && <ImagePlaceholder />
			}
			{/* <ImagePlaceholder /> */}
			<LazyLoadImage
				src={imageSrc}
				alt={`Image Alt`}
				className={`img-lazy mx-auto h-[130px] w-[200px] cursor-pointer rounded-lg object-cover ${!isImageLoaded ? 'hidden' : ''}`}
				height="130px"
				threshold={500}
				onLoad={() => setIsImageLoaded(true)}
				onClick={handleImageClick}
				onError={handleImageError}
				effect="blur"
				// delayTime={20000}
				placeholder={<ImagePlaceholder />}
			/>
			<ImageDialog 
				open={isImagePreviewOpen} 
				onClose={onDialogClose} 
				imgUrl={full_url} 
				photo_primary_id={photo_primary_id}
				photo_id={photo_id}
				isLiked={isLiked} 
				onImageLiked={handleLikeClick} 
			/>

			{
				confirmDialogOpen && 

				<ActionDialog 
					headerContent={
						headerText.replace("%PH%", capitalizeFirstLetter(statusUpdateType))
					}
					bodyContent={
						bodyText.replace("%PH%", capitalizeFirstLetter(statusUpdateType))
					}
					confirmBtn={statusUpdateType}
					onConfirm={() => handleStatusChange(statusUpdateType)}
					cancelBtn="Cancel"
					onCancel={() => setConfirmDialogOpen(false)}
					isOpen={confirmDialogOpen}
				/>
			}
		</div>

	);
};

export default ImageCard;
