import React, { useState, FormEvent } from "react";
import {
	Input,
	Button,
	Typography,
	Checkbox,
	IconButton,
	Card,
	CardBody,
	CardHeader,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth";
import { selectMenu } from "../features/sideMenu/sideMenuSlice";
import LoginPoster from "./LoginPoster";
import Logo from "../public/full_logo.svg";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Login: React.FC = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { login } = useAuth();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [formData, setFormData] = useState<{ email: string; password: string }>(
		{ email: "", password: "" },
	);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleLoginFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const login_result = await login(formData);

		if (login_result?.status) {
			navigate("/app/photos");
			dispatch(selectMenu("0"));
		} else {
			console.log({ login_result });
		}
		// Uncomment the following lines when you are ready to use Firebase
		// firebase.auth().signInWithEmailAndPassword(formData.email, formData.password);
	};

	const handleGoogleLogin = () => {
		// Uncomment the following lines when you are ready to use Firebase
		// const googleProvider = new firebase.auth.GoogleAuthProvider();
		// firebase.auth().signInWithPopup(googleProvider);
	};

	const handleAppleLogin = () => {
		// Uncomment the following lines when you are ready to use Firebase
		// const appleProvider = new firebase.auth.OAuthProvider('apple.com');
		// firebase.auth().signInWithPopup(appleProvider);
	};

	const handleRoute = (route: string) => {
		navigate("/user/" + route);
	};

	return (
		<div className="mx-auto flex h-[calc(100vh-2rem)] flex-row justify-center rounded-xl bg-gray-100 p-4 sm:w-4/5">
			<LoginPoster />
			<Card
				className="flex-1 rounded-none border-none bg-gray-100"
				shadow={false}
			>
				<CardHeader
					floated={false}
					shadow={false}
					className="flex justify-end border-none bg-gray-100 text-right"
				>
					<img src={Logo} alt="logo-picture" />
				</CardHeader>
				<CardBody className="mx-auto flex h-full items-center pt-0">
					{/* Right side - Login form */}
					<div className="flex flex-col items-center">
						<div className="mt-8 ">
							<Typography variant="h4">Sign in</Typography>

							<Typography variant="small" className="mt-4">
								If you don&apos;t have an account You can{" "}
								<Typography
									variant="small"
									className="cursor-pointer text-blue-500"
									onClick={() => handleRoute("register")}
								>
									Register here !
								</Typography>
							</Typography>

							<form className="mt-8" onSubmit={handleLoginFormSubmit}>
								<div className="flex flex-col space-y-4">
									<div className="py-2">
										{/* <EnvelopeIcon className="h-4 w-4" /> */}
										<Input
											type="text"
											placeholder="Enter your email address"
											label="Email"
											variant="static"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
										/>
									</div>
									<div className="py-2">
										{/* <LockClosedIcon className="h-4 w-4" /> */}
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Enter your Password"
											label="Password"
											variant="static"
											name="password"
											icon={
												showPassword ?
												<EyeIcon className="h-4 w-4 cursor-pointer" onClick={() => setShowPassword(prev => !prev)} />
												:
												<EyeSlashIcon className="h-4 w-4 cursor-pointer" onClick={() => setShowPassword(prev => !prev)} /> 
											}
											value={formData.password}
											onChange={handleInputChange}
										/>
									</div>
									<div className="flex flex-col items-center justify-between md:flex-row">
										<div className="w-full flex-1 justify-end md:justify-start">
											<Checkbox
												label={
													<Typography variant="small">Remember Me</Typography>
												}
												className="scale-75"
											/>
										</div>
										<div className="w-full flex-1 text-right">
											<Typography variant="small">Forgot Password?</Typography>
										</div>
									</div>
									<Button type="submit" size="lg" className="rounded-3xl py-2">
										Login
									</Button>
								</div>
							</form>

							{/* Social login options */}
							<div className="mt-6 flex flex-col items-center">
								<p className="text-xs text-gray-500">or continue with</p>
								<div className="mt-4 flex space-x-4">
									<IconButton variant="text" className="rounded-full">
										<FontAwesomeIcon size="2x" icon={faApple} />
									</IconButton>
									<IconButton variant="text" className="rounded-full">
										<FontAwesomeIcon size="2x" icon={faGoogle} />
									</IconButton>
								</div>
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default Login;
