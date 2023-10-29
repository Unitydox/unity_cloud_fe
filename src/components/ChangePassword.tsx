import {
	Dialog,
	DialogHeader,
	DialogBody,
	Input,
    Typography,
    Button,
    Spinner,
} from "@material-tailwind/react";
import { useLoading } from "contexts/LoadingContext";
import { Formik } from "formik";
import { IChangePassword } from "models/user";
import toast from "react-hot-toast";
import { changePassword } from "services/userService";
import * as Yup from "yup";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface ChangePasswordProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const passwordValidationSchema = Yup.object({
	current_password: Yup.string()
		.required("Required")
		.min(10, "Password is too short - should be 10 chars minimum.")
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"Include at least one Uppercase, Lowercase, Number and a special character",
		),
	new_password: Yup.string()
		.required("Required")
		.min(10, "Password is too short - should be 10 chars minimum.")
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"Include at least one Uppercase, Lowercase, Number and a special character",
		),
	new_password_conf: Yup.string()
		.required("Required")
		.oneOf([Yup.ref("new_password"), null], "Passwords must match")
		.min(10, "Password is too short - should be 10 chars minimum.")
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"Include at least one Uppercase, Lowercase, Number and a special character",
		),
});

const ChangePassword: React.FC<ChangePasswordProps> = ({
	isOpen,
	setIsOpen,
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

	const _handleFormSubmit = (values: IChangePassword) => {
		setIsLoading(true);

		changePassword(values)
			.then((res) => {
                console.log({res});
                
				if (res.status) {
					toast.success(res.message);
                    
                    setTimeout(() => setIsOpen(false), 200);
				} else {
					toast.error(res.response.data.message);
				}
			})
			.finally(() => {
                setIsLoading(false);
            });
	};

	return (
		<Dialog open={isOpen} handler={() => setIsOpen(false)}>
			<DialogHeader className="flex items-center justify-between">
                <Typography>
                    Change Password
                </Typography>
                <XMarkIcon className="h-4 w-5 cursor-pointer" onClick={() => setIsOpen(false)} />
            </DialogHeader>
			<DialogBody>
				<Formik
					initialValues={{
						current_password: "",
						new_password: "",
						new_password_conf: "",
					}}
					validationSchema={passwordValidationSchema}
					onSubmit={(values) => _handleFormSubmit(values)}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
					}) => (
						<form onSubmit={handleSubmit}>
                            <div className="py-2">
                                <Input 
                                    type="password"
                                    name="current_password"
                                    label="Current Password"
                                    value={values.current_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!(touched.current_password && errors.current_password)}
                                />
                                <Typography variant="small" color="red">
                                    {errors.current_password &&
                                        touched.current_password &&
                                        errors.current_password}
                                </Typography>
                            </div>

                            <div className="py-2">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your New Password"
                                    label="Password"
                                    name="new_password"
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
                                    value={values.new_password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        !!(errors.new_password &&
                                        touched.new_password)
                                    }
                                    success={!errors.new_password && touched.new_password}
                                />
                                <PasswordStrengthMeter password={values.new_password} />
                            </div>
                            <div className="py-2">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="new_password_conf"
                                    icon={
                                        showConfirmPassword ? (
                                            <EyeIcon
                                                className="h-4 w-4 cursor-pointer"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            />
                                        ) : (
                                            <EyeSlashIcon
                                                className="h-4 w-4 cursor-pointer"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            />
                                        )
                                    }
                                    value={values.new_password_conf}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        !!(errors.new_password_conf &&
                                        touched.new_password_conf)
                                    }
                                    success={
                                        !errors.new_password_conf &&
                                        touched.new_password_conf
                                    }
                                />
                                <Typography variant="small" color="red">
                                    {errors.new_password_conf &&
                                        touched.new_password_conf &&
                                        errors.new_password_conf}
                                </Typography>
                            </div>
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex items-center justify-center gap-3 rounded-3xl py-2"
                                    disabled={isLoading}
                                >
                                    {isLoading && <Spinner />}
                                    Change Password
                                </Button>
                            </div>
						</form>
					)}
				</Formik>
			</DialogBody>
		</Dialog>
	);
};

export default ChangePassword;
