export interface ImageCardProps {
	src: string;
	full_url: string;
	photo_primary_id: number;
	photo_id: string;
	isFavourite: boolean;
	isImageSelected: boolean;
    onImageSelected?: any;
	additional_params?: any;
	viewType: string;
	onLikeChange: any;
	onStatusChange: any;
}

export interface ImageData {
	id: number;
	uuid: string;
	original_file_name: string;
	file_temp_url: string;
	thumbnail_url: string;
    isImageSelected?: boolean;
	status: string;
	favourite: number;
	metadata: any;
	temp_url_expiry: Date;
}