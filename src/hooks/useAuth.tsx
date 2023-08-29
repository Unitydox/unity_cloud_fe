import { useState, useEffect, useContext } from "react";
import { AuthContext, User } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { userLogin, userLogout, registerUser } from "../services/userService";
import { toast } from "react-hot-toast";

interface register_user {
	first_name: string;
	last_name: string;
	email: string;
	dob: Date;
	password: string;
	confirm_password: string;
	isTermsAccepted: boolean;
}

export const useAuth = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState<User | null>(null);

	const auth = useContext(AuthContext);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		// API call
		const user = { email, password };
		try {
			const userData = await userLogin(user);
			if(userData.status){
				userData.data.tokens = userData.tokens;
				setUser(userData.data);
				localStorage.setItem("user", JSON.stringify(userData.data));
			}else{
				toast.error(userData.response.data.message)
			}
			return userData;
		} catch (error) {
			console.log(error);
		}
	};
	
	const register = async (formData: register_user) => {
		// API call
		
		try {
			const userData = await registerUser(formData);
			if(userData.status){
				userData.data.tokens = userData.tokens;
				setUser(userData.data);
				localStorage.setItem("user", JSON.stringify(userData.data));
			}else{
				toast.error(userData.response.data.message)
			}
			return userData;
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			const user_data = JSON.parse(localStorage.getItem("user") || '');

			await userLogout({
				refresh_token: user_data.tokens.refresh.token,
				access_token: user_data.tokens.access.token,
			});
			setUser(null);
			localStorage.removeItem("user");
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return {
		user,
		login,
		register,
		logout,
	};
};
