import { createContext } from "react";
import { io } from "socket.io-client";
import config from "../config";

// "undefined" means the URL will be computed from the `window.location` object
const URL = config.env === "production" ? undefined : `${config.api_url}`;

const user_data = localStorage.getItem("user");

const parsed_data = JSON.parse(user_data);

export const socket = io(URL, {
	extraHeaders: {
		Authorization: `Bearer ${parsed_data?.tokens?.access?.token}`,
	},
    withCredentials: true
});

export const SocketContext = createContext(null);