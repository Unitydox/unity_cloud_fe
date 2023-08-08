import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardHeader,
	CardBody,
	Input,
	Button,
	Typography,
	Checkbox,
	IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faApple,
	faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Logo from "../public/full_logo.svg";
import LoginDesk from "../public/login-desk-dummy.png";

// Uncomment the following lines when you are ready to use Firebase
// import firebase from 'firebase/app';
// import 'firebase/auth';

// const firebaseConfig = {
//   // Your Firebase config goes here
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const LoginPage: React.FC = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState<{ email: string; password: string }>(
		{ email: "", password: "" },
	);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleLoginFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate("/app");
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

	const handleFacebookLogin = () => {
		// Uncomment the following lines when you are ready to use Firebase
		// const facebookProvider = new firebase.auth.FacebookAuthProvider();
		// firebase.auth().signInWithPopup(facebookProvider);
	};

	return (
		<div className="min-h-screen bg-[url('/src/public/loginBg.svg')] p-4 sm:p-2">
			<div className="mx-auto flex h-[calc(100vh-2rem)] flex-row justify-center rounded-xl bg-gray-100 p-4 sm:w-4/5">
				<Card className="hidden flex-1 bg-primary sm:block">
					<CardHeader
						floated={false}
						shadow={false}
						className="flex justify-end border-none bg-primary text-white"
					>
						<FontAwesomeIcon icon={faPhone} size="xs" className="pr-2" />
						<p className="text-xs">+94 0116 789 754</p>
					</CardHeader>
					<CardBody className="h-[95%]">
						{/* Left side - Image */}
						<div className="flex h-full flex-col">
							<div className="inline-flex h-4/5 flex-col justify-center">
								<img
									src={LoginDesk} // Replace with your image URL
									alt="LoginDesk"
									className="mx-auto w-4/5"
								/>
							</div>
							<div className="inline-flex flex-col justify-center">
								<Typography variant="h2" color="white" className="mt-10">
									Sign in to Unitydox
								</Typography>
								<Typography variant="small" color="white">
									Save your document securely
								</Typography>
							</div>
						</div>
					</CardBody>
				</Card>

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
									If you don&apos;t have an account You can Register here
									!
								</Typography>

								<form className="mt-8" onSubmit={handleLoginFormSubmit}>
									<div className="flex flex-col space-y-4">
										<div className="py-2">
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
											<Input
												type="password"
												placeholder="Enter your Password"
												label="Password"
												variant="static"
												name="password"
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
		</div>
	);
};

export default LoginPage;
