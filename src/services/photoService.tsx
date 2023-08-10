import apiClient from "./apiClient";

const base_path = "/photos";

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

const fetchImages = async () => {
	try {
		const response = await apiClient.get(`${base_path}/upload/fetchAllImages`);
		return response.data;
	} catch (error) {
		// throw error;
		return error;
	}
};

export { uploadImage, fetchImages };
