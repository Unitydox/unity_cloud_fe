import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	userLogin,
	userLogout,
	registerUser,
	registerOrLogin,
} from "../services/userService";
import { toast } from "react-hot-toast";
import { googleLogout } from "@react-oauth/google";
import { IRegisterUser, IThirdPartyRegisterUser, ILogin, IUserDetails } from "models/user";
import { userData } from "features/user/userDetails";

export const useAuth = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const [user, setUser] = useState<IUserDetails | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const setUserData = (data: IUserDetails | null) => {
		setUser(data);
		localStorage.setItem("user", JSON.stringify(data));
		dispatch(userData(data));
	};

	const login = async ({ email, password }: ILogin) => {
		// API call
		const user = { email, password };
		try {
			const userData = await userLogin(user);
			if (userData.status) {
				userData.data.tokens = userData.tokens;
				setUserData(userData.data);
			} else {
				toast.error(userData.response.data.message);
			}
			return userData;
		} catch (error) {
			console.log(error);
		}
	};

	const register = async (formData: IRegisterUser) => {
		// API call

		try {
			const userData = await registerUser(formData);
			if (userData.status) {
				userData.data.tokens = userData.tokens;
				setUserData(userData.data);
			} else {
				toast.error(userData.response.data.message);
			}
			return userData;
		} catch (error) {
			console.log(error);
		}
	};

	const thirdPartyLogin = async (formData: IThirdPartyRegisterUser) => {
		// API call

		try {
			const userData = await registerOrLogin(formData);
			if (userData.status) {
				userData.data.tokens = userData.tokens;
				setUserData(userData.data);
			} else {
				toast.error(userData.response.data.message);
			}
			return userData;
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			const user_data = JSON.parse(localStorage.getItem("user") || "");

			await userLogout({
				refresh_token: user_data.tokens.refresh.token,
				access_token: user_data.tokens.access.token,
			});
			setUser(null);
			localStorage.removeItem("user");
			googleLogout();
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return {
		user,
		login,
		thirdPartyLogin,
		register,
		logout,
	};
};
