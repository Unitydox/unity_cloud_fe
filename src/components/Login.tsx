import React, { useState, FormEvent, useEffect } from "react";
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
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "hooks/useAuth";
import { selectMenu } from "../features/sideMenu/sideMenuSlice";
import LoginPoster from "./LoginPoster";
import Logo from "../public/full_logo.svg";
import axios from "axios";
import {
	EnvelopeIcon,
	LockClosedIcon,
	EyeIcon,
	EyeSlashIcon,
} from "@heroicons/react/24/outline";

interface oAuthResp {
	access_token: string;
	authuser: string | boolean;
	expires_in: number;
	prompt: string;
	scope: string;
	token_type: string;
}

const Login: React.FC = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { login, thirdPartyLogin } = useAuth();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [formData, setFormData] = useState<{ email: string; password: string }>(
		{ email: "", password: "" },
	);

	const [oAuthResp, setOAuthResp] = useState<oAuthResp>();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleLoginFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const login_result = await login(formData);

		if (login_result?.status) {
			if(login_result.data.email_verified){
				navigate("/app/photos");
				dispatch(selectMenu("0"));
			}else{
				localStorage.setItem("waiting_for_verfication", "true");
				handleRoute('register');
			}
			
		} else {
			console.log({ login_result });
		}
		// Uncomment the following lines when you are ready to use Firebase
		// firebase.auth().signInWithEmailAndPassword(formData.email, formData.password);
	};

	const handleGoogleLogin = useGoogleLogin({
		onSuccess: (codeResponse) => setOAuthResp(codeResponse),
		onError: (error) => console.log("Login Failed:", error),
		// flow: 'auth-code',
	});

	useEffect(() => {
		if (oAuthResp) {
			console.log(oAuthResp);
			
			axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${oAuthResp.access_token}`,
				{
					headers: {
						Authorization: `Bearer ${oAuthResp.access_token}`,
						Accept: "application/json",
					},
				},
			)
			.then(async (res) => {
				const login_result = await thirdPartyLogin({
					first_name: res.data.given_name,
					last_name: res.data.family_name,
					email: res.data.email,
					user_login_type: "google",
					profile_img_url: res.data?.picture,
					isTermsAccepted: true,
					third_party_ref_id: res.data.id,
					verified_email: res.data.verified_email,
				});

				if (login_result?.status) {
					navigate("/app/photos");
					dispatch(selectMenu("0"));
				} else {
					console.log({ login_result });
				}
			})
			.catch((err) => console.log(err));
		}
	}, [oAuthResp]);

	const handleAppleLogin = () => {
		// Uncomment the following lines when you are ready to use Firebase
		// const appleProvider = new firebase.auth.OAuthProvider('apple.com');
		// firebase.auth().signInWithPopup(appleProvider);
	};

	const handleRoute = (route: string) => {
		navigate("/user/" + route);
	};

	const responseMessage = (response) => {
		console.log(response);
	};
	const errorMessage = (error) => {
		console.log(error);
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
					className="mt-0 flex justify-end overflow-visible border-none bg-gray-100 text-right"
				>
					<img src={Logo} alt="logo-picture" className="w-[50%]" />
				</CardHeader>
				<CardBody className="flex h-full items-center justify-center px-5 py-0">
					{/* Right side - Login form */}
					<div className="flex w-full flex-col items-center">
						<div className="mt-8 w-[85%]">
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
												showPassword ? (
													<EyeIcon
														className="h-4 w-4 cursor-pointer"
														onClick={() => setShowPassword((prev) => !prev)}
													/>
												) : (
													<EyeSlashIcon
														className="h-4 w-4 cursor-pointer"
														onClick={() => setShowPassword((prev) => !prev)}
													/>
												)
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
												className="scale-75 p-0"
												containerProps={{'className': 'p-0'}}
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
									{/* <IconButton variant="text" className="rounded-full">
										<FontAwesomeIcon size="2x" icon={faApple} />
									</IconButton> */}
									<IconButton
										variant="text"
										className="rounded-full"
										onClick={handleGoogleLogin}
									>
										{/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
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
