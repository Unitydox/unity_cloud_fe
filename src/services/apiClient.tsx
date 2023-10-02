import axios, { AxiosRequestConfig, AxiosError } from "axios";
import config from "../config";

const apiClient = axios.create({
	baseURL: config.api_url,
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	_retry?: boolean;
}

const clearAndLogout = () => {
	localStorage.clear();
	window.location.href = "/user";
	throw new Error("No user data found");
}

// Function to refresh the access token
const refreshAccessToken = async () => {
	const userData = localStorage.getItem("user");
	const tokens = localStorage.getItem("tokens");

	if (!userData || !tokens) clearAndLogout();
	else{
		const parsedData = JSON.parse(tokens);
		const refreshToken = parsedData.refresh.token;
	
		const response = await axios.post(
			`${config.api_url}/users/refresh-token`,
			{
				refresh_token: refreshToken,
			},
		);
	
		if(!response?.status) clearAndLogout();
	
		const newAccessToken = response.data;
		return newAccessToken;
	}
};

// Add request interceptor
apiClient.interceptors.request.use(async (config) => {
	// Do something before request is sent
	const tokens = localStorage.getItem("tokens");
	if (tokens) {
		const parsedData = JSON.parse(tokens);

		config.headers.Authorization = `Bearer ${parsedData.access.token}`;
	}
	return config;
});

// Add response interceptor
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

apiClient.interceptors.response.use(
	(response) => {
		// Any status code that lie within the range of 2xx
		// Do something with response data
		return response;
	},
	async (error: AxiosError) => {
		// Handle error responses
		const originalRequest = error.config as CustomAxiosRequestConfig;

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				// If token is already being refreshed, wait for new token
				return new Promise(function (resolve) {
					refreshSubscribers.push((token) => {
						if(originalRequest?.headers?.Authorization) originalRequest.headers.Authorization = `Bearer ${token}`;
						resolve(axios(originalRequest));
					});
				});
			}

			isRefreshing = true;
			originalRequest._retry = true;

			try {
				const newAccessToken = await refreshAccessToken();

				isRefreshing = false;

				localStorage.removeItem("tokens");

				localStorage.setItem("tokens", JSON.stringify(newAccessToken));

				// Update the token in the original request
				if(originalRequest?.headers?.Authorization)
					originalRequest.headers.Authorization = `Bearer ${newAccessToken.access.token}`;

				// Retry the original request and resolve all waiting requests
				refreshSubscribers.forEach((callback) => callback(newAccessToken.access.token));
				refreshSubscribers = [];

				return axios(originalRequest);
			} catch (refreshError) {
				// Handle token refresh error
				console.error("Error refreshing token:", refreshError);
				// Redirect to login or handle logout
			}
		}

		// Handle other errors
		return Promise.reject(error);
	},
);

export default apiClient;
