import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	userLogin,
	userLogout,
	registerUser,
	registerOrLogin,
} from "../services/userService";
import { toast } from "react-hot-toast";
import { googleLogout } from "@react-oauth/google";
import { IRegisterUser, IThirdPartyRegisterUser, ILogin, IUserDetails, ITokens, IPlanDetails } from "models/user";
import { setPlan, setUserData, setToken } from "features/user/userDetails";

export const useAuth = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const [user, setUser] = useState<IUserDetails | null>(null);
	const tokenData = useSelector((state) => state.userDetails.token);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const setUserDetails = (data: IUserDetails | null, tokens: ITokens, plan: IPlanDetails) => {
		setUser(data);
		localStorage.setItem("user", JSON.stringify(data));
		localStorage.setItem("tokens", JSON.stringify(tokens))
		dispatch(setUserData(data));
		dispatch(setPlan(plan));
		dispatch(setToken(tokens));
	};

	const login = async ({ email, password }: ILogin) => {
		// API call
		const user = { email, password };
		try {
			const userData = await userLogin(user);
			if (userData.status) {
				setUserDetails(userData.data, userData.tokens, userData.data.plan_details);
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
				setUserDetails(userData.data, userData.tokens, userData.data.plan_details);
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
				setUserDetails(userData.data, userData.tokens, userData.data.plan_details);
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
			await userLogout({
				refresh_token: tokenData?.refresh.token,
				access_token: tokenData?.access.token,
			});
			setUser(null);
			localStorage.removeItem("user");
			localStorage.removeItem("tokens");
			dispatch(setUserData(null));
			dispatch(setPlan(null));
			dispatch(setToken(null));
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
