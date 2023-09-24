import React from "react";
import { Outlet } from "react-router-dom";

const LoginPage: React.FC = () => {
	return (
		<div className="flex min-h-screen flex-row items-center bg-[url('/src/public/loginBg.svg')] p-4 sm:p-2">
			<Outlet />
		</div>
	);
};

export default LoginPage;
