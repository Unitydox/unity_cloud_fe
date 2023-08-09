import { useState, useEffect, useContext } from "react";
import { AuthContext, User } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { userLogin, userLogout } from "../services/userService";

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
			setUser(userData);
			localStorage.setItem("user", JSON.stringify(userData));
			return userData;
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			const user_data = JSON.parse(localStorage.getItem("user"));

			const logout = await userLogout({
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
		logout,
	};
};
