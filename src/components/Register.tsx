import React, { useState, FormEvent } from "react";
import {
	Input,
	Button,
	Typography,
	Checkbox,
	Card,
	CardBody,
	CardHeader,
} from "@material-tailwind/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "hooks/useAuth";
import { selectMenu } from "../features/sideMenu/sideMenuSlice";
import Logo from "../public/full_logo.svg";

interface register_user {
	first_name: string;
	last_name: string;
	email: string;
	dob: Date;
	password: string;
	confirm_password: string;
	isTermsAccepted: boolean;
}

const Register: React.FC = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { register } = useAuth();

	const [formData, setFormData] = useState<register_user>({
		first_name: "",
		last_name: "",
		email: "",
		dob: new Date(),
		password: "",
		confirm_password: "",
		isTermsAccepted: false,
	});

	const _handleLoginFormSubmit = async (values: register_user) => {
		const register_result = await register(values);

		if (register_result?.status) {
			navigate("/app/photos");
			dispatch(selectMenu("0"));
		} else {
			console.log({ register_result });
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
					<div className="flex flex-col items-center">
						<div className="">
							<Typography variant="h4">Sign Up</Typography>

							<Typography variant="small" className="mt-4">
								If you have an account You can{" "}
								<Typography
									variant="small"
									className="cursor-pointer text-blue-500"
									onClick={() => handleRoute("login")}
								>
									Login here !
								</Typography>
							</Typography>

							<Formik
								initialValues={{ ...formData }}
								validationSchema={Yup.object({
									first_name: Yup.string().required("Required"),
									last_name: Yup.string(),
									email: Yup.string()
										.email("Invalid email address")
										.required("Required"),
									dob: Yup.date().required("Required"),
									isTermsAccepted: Yup.boolean().required("Required"),
									password: Yup.string()
										.required("Required")
										.min(
											10,
											"Password is too short - should be 10 chars minimum.",
										)
										.matches(
											/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
											"Include at least one Uppercase, Lowercase, Number and a special character",
										),
									confirm_password: Yup.string()
										.required("Required")
										.oneOf([Yup.ref("password"), null], "Passwords must match")
										.min(
											10,
											"Password is too short - should be 10 chars minimum.",
										)
										.matches(
											/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
											"Include at least one Uppercase, Lowercase, Number and a special character",
										),
								})}
								onSubmit={(values) => _handleLoginFormSubmit(values)}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									setFieldValue,
									handleBlur,
									handleSubmit,
									isSubmitting,
								}) => (
									<form className="mt-8" onSubmit={handleSubmit}>
										<div className="flex max-h-[240px] flex-col space-y-4 overflow-y-auto">
											<div className="flex flex-col gap-3 sm:flex-row">
												<div className="py-2">
													<Input
														type="text"
														placeholder="Enter your First Name"
														label="First Name"
														variant="static"
														name="first_name"
														value={values.first_name}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															errors.first_name &&
															touched.first_name &&
															errors.first_name
														}
														success={!errors.first_name && touched.first_name}
													/>
													<Typography variant="small" color="red">
														{errors.first_name &&
															touched.first_name &&
															errors.first_name}
													</Typography>
												</div>
												<div className="py-2">
													<Input
														type="text"
														placeholder="Enter your Last Name"
														label="Last Name"
														variant="static"
														name="last_name"
														value={values.last_name}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															errors.last_name &&
															touched.last_name &&
															errors.last_name
														}
														success={!errors.last_name && touched.last_name}
													/>
													<Typography variant="small" color="red">
														{errors.last_name &&
															touched.last_name &&
															errors.last_name}
													</Typography>
												</div>
											</div>
											<div className="flex flex-col gap-3 sm:flex-row">
												<div className="py-2">
													<Input
														type="text"
														placeholder="Enter your email address"
														label="Email"
														variant="static"
														name="email"
														value={values.email}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															errors.email && touched.email && errors.email
														}
														success={!errors.email && touched.email}
													/>
													<Typography variant="small" color="red">
														{errors.email && touched.email && errors.email}
													</Typography>
												</div>
												<div className="py-2">
													<Input
														type="date"
														placeholder="Select your DOB"
														label="DOB"
														variant="static"
														name="dob"
														value={values.dob}
														onChange={handleChange}
														onBlur={handleBlur}
														error={errors.dob && touched.dob && errors.dob}
														success={!errors.dob && touched.dob}
													/>
													<Typography variant="small" color="red">
														{errors.dob && touched.dob && errors.dob}
													</Typography>
												</div>
											</div>
											<div className="flex flex-col gap-3 sm:flex-row">
												<div className="py-2">
													<Input
														type="password"
														placeholder="Enter your Password"
														label="Password"
														variant="static"
														name="password"
														value={values.password}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															errors.password &&
															touched.password &&
															errors.password
														}
														success={!errors.password && touched.password}
													/>
													<Typography variant="small" color="red">
														{errors.password &&
															touched.password &&
															errors.password}
													</Typography>
												</div>
												<div className="py-2">
													<Input
														type="password"
														placeholder="Confirm Password"
														label="Confirm Password"
														variant="static"
														name="confirm_password"
														value={values.confirm_password}
														onChange={handleChange}
														onBlur={handleBlur}
														error={
															errors.confirm_password &&
															touched.confirm_password &&
															errors.confirm_password
														}
														success={
															!errors.confirm_password &&
															touched.confirm_password
														}
													/>
													<Typography variant="small" color="red">
														{errors.confirm_password &&
															touched.confirm_password &&
															errors.confirm_password}
													</Typography>
												</div>
											</div>
										</div>
										<div className="flex flex-col space-y-4">
											{/* <Typography
												variant="small"
												color="gray"
												className="mt-2 flex items-center gap-1 font-normal"
											>
												Use at least 8 characters, one uppercase, one lowercase
												and one number.
											</Typography> */}
											<Checkbox
												label={
													<Typography
														variant="small"
														color="gray"
														className="flex items-center font-normal"
													>
														I agree to the
														<a
															href="#"
															className="font-medium transition-colors hover:text-gray-900"
														>
															&nbsp;Terms and Conditions
														</a>
													</Typography>
												}
												checked={values.isTermsAccepted}
												onChange={() =>
													setFieldValue(
														"isTermsAccepted",
														!values.isTermsAccepted,
													)
												}
												containerProps={{ className: "-ml-2.5" }}
											/>
											<Button
												type="submit"
												size="lg"
												className="rounded-3xl py-2"
												onSubmit={handleSubmit}
												disabled={isSubmitting || !values.isTermsAccepted}
											>
												Signup
											</Button>
										</div>
									</form>
								)}
							</Formik>

							{/* Social login options */}
							{/* <div className="mt-6 flex flex-col items-center">
                        <p className="text-xs text-gray-500">or continue with</p>
                        <div className="mt-4 flex space-x-4">
                            <IconButton variant="text" className="rounded-full">
                                <FontAwesomeIcon size="2x" icon={faApple} />
                            </IconButton>
                            <IconButton variant="text" className="rounded-full">
                                <FontAwesomeIcon size="2x" icon={faGoogle} />
                            </IconButton>
                        </div>
                    </div> */}
						</div>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default Register;
