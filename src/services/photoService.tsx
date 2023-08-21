import apiClient from "./apiClient";

const base_path = "/photos";

const getUrlQueryFromObj = (obj: any) => {

	let query = '';
	
	for(const key in obj){
		if(obj[key]){
			if(query != '') query += '&';
			query += `${key}=${obj[key]}`;
		}
	}
	
	return (query.length) ? '?'+query : '';
}

const uploadImage = async (formData: FormData) => {
	try {
		const response = await apiClient.post(
			`${base_path}/upload/uploadImage`,
			formData,
		);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

const fetchImages = async (input_data: {type: string, status: string, date: string}) => {
	try {
		const response = await apiClient.get(`${base_path}/upload/fetchAllImages${getUrlQueryFromObj(input_data)}`);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

const getDistinctDates = async (input_data: {type: string, status: string}) => {
	try {
		const response = await apiClient.get(`${base_path}/upload/getDistinctDates${getUrlQueryFromObj(input_data)}`);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

const updateFavourite = async (input_data: { uuid: string, isLiked: boolean }) => {
	try {
		const response = await apiClient.put(`${base_path}/upload/updateFavourite`, input_data);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

const changeImageStatus = async (input_data: { uuid: string, type: string }) => {
	try {
		const response = await apiClient.put(`${base_path}/upload/updateStatus`, input_data);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

const getSignedUrl = async (input_data: { img_id: number, type: string }) => {
	try {
		const response = await apiClient.post(`${base_path}/upload/getSignedUrl`, input_data);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

const createAlbum = async (input_data: { name: string }) => {
	try {
		const response = await apiClient.post(`${base_path}/album/createAlbum`, input_data);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

const toggleImageToAlbum = async (input_data: { image_id: number, album_id: number, status: string }) => {
	try {
		const response = await apiClient.put(`${base_path}/album/toggleImageToAlbum`, input_data);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

const fetchAlbums = async () => {
	try {
		const response = await apiClient.get(`${base_path}/album/fetchAlbums`);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

const deleteAlbum = async (input_data: { uuid: string, type: string }) => {
	try {
		const response = await apiClient.put(`${base_path}/album/deleteAlbum`, input_data);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

export { 
	uploadImage, fetchImages, getDistinctDates, updateFavourite, changeImageStatus, getSignedUrl, 
	createAlbum, toggleImageToAlbum, fetchAlbums, deleteAlbum
};
