import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import moment from "moment";
import { Input, Button, Typography, Textarea } from "@material-tailwind/react";
import { useLoading } from "contexts/LoadingContext";
import { IProfileForm } from "models/user";
import { getUserDetails, updateUserDetails } from "services/userService";
import { getSignedUrl, uploadProfilePhoto } from "services/photoService";
import Avatar from "components/Avatar";
import { CameraIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object({
	first_name: Yup.string().required("Required").max(64, "Maximum length is 64"),
	last_name: Yup.string().max(64, "Maximum length is 64").nullable(),
	email: Yup.string().email("Invalid email").required("Required"),
	dob: Yup.date()
		.max(moment().subtract(16, "years"), "You must be at least 16 years old")
		.nullable(),
	address: Yup.string().optional().max(255, "Maximum length is 255").nullable(),
	phone_number: Yup.string()
		.phone("IN", "Invalid Phone number")
		.optional()
		.max(15, "Invalid Phone number")
		.min(6, "Invalid Phone number")
		.nullable(),
});

const Profile: React.FC = () => {
	const dispatch = useDispatch();

	const [uploadedImg, setUploadedImg] = useState(null);
	const [imgPreview, setImgPreview] = useState(null);
	const [userInitialValues, setUserInitialValues] = useState<IProfileForm>({
		uuid: "",
		first_name: "",
		last_name: "",
		email: "",
		address: "",
		phone_number: "",
		profile_img_url: "",
	});
	const inputFileRef = useRef(null);

	// const {setValues} = useFormikContext();

	const { setLoading } = useLoading();

	const userData = useSelector((state) => state.userDetails.data);

	useEffect(() => {
		setLoading(true);

		getUserDetails(userData.uuid)
			.then((res) => {
				if (res.status) {
					if(res.data?.profile_thumb_url){
						getSignedUrl({
							file_path: res.data.profile_thumb_url,
							expiryInSeconds: 6000 
						}).then((imgRes) => {
							if (imgRes?.status) {
								res.data.profile_img_url = imgRes.data;
							}
							setUserInitialValues(res.data);
						});
					}else{
						setUserInitialValues(res.data);
					}
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const _handleFormSubmit = (values: IProfileForm) => {
		// submit form
		setLoading(true);

		const formData = new FormData();

		formData.append("file", uploadedImg);

		uploadProfilePhoto(formData)
			.then((res) => {
				if (res.status) {
					values = {
						...values,
						...res.data
					}
				}
				updateUserDetails(values)
					.then((res) => {
						if (res.status) {
							setLoading(true);
							dispatch(userData(res.data));
						} else {
							toast.error(res.message);
						}
					})
					.finally(() => setLoading(false));
			})
			.finally(() => setLoading(false));
	};

	return (
		<Formik
			initialValues={userInitialValues}
			enableReinitialize={true}
			validationSchema={validationSchema}
			onSubmit={(values) => _handleFormSubmit(values)}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				setFieldValue,
				handleSubmit,
				isSubmitting,
			}) => (
				<form
					onSubmit={handleSubmit}
					className="mx-auto flex w-[85%] flex-col items-center justify-center gap-y-5"
				>
					<Typography variant="h5">Profile</Typography>

					<div className="relative">
						<Avatar size="large" src={imgPreview || values.profile_img_url} />
						<input
							name="profile_profile_pic"
							type="file"
							accept="image/png, image/jpeg"
							className="hidden"
							ref={inputFileRef}
							onChange={(e) => {
								setFieldValue("profileImg", e.target.files[0]);
								setUploadedImg(e.target.files[0]);
								setImgPreview(URL.createObjectURL(e.target.files[0]));
							}}
						/>
						<CameraIcon
							className="absolute bottom-0 right-0 h-6 w-6 cursor-pointer text-blue-500"
							onClick={() => inputFileRef.current.click()}
						/>
					</div>

					<div className="w-full">
						<Input
							name="first_name"
							label="First Name"
							value={values.first_name}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.first_name && errors.first_name}
						/>

						<Typography variant="small" color="red">
							{errors.first_name && touched.first_name && errors.first_name}
						</Typography>
					</div>

					<div className="w-full">
						<Input
							name="last_name"
							label="Last Name"
							value={values.last_name}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.last_name && errors.last_name}
						/>

						<Typography variant="small" color="red">
							{errors.last_name && touched.last_name && errors.last_name}
						</Typography>
					</div>

					<div className="w-full">
						<Input
							name="email"
							label="Email"
							value={values.email}
							disabled={true}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.email && errors.email}
						/>

						<Typography variant="small" color="red">
							{errors.email && touched.email && errors.email}
						</Typography>
					</div>

					<div className="w-full">
						<Input
							name="dob"
							label="DOB"
							type="date"
							value={values.dob}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.dob && errors.dob}
						/>

						<Typography variant="small" color="red">
							{errors.dob && touched.dob && errors.dob}
						</Typography>
					</div>

					<div className="w-full">
						<Input
							name="phone_number"
							label="Phone Number"
							value={values.phone_number}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.phone_number && errors.phone_number}
						/>

						<Typography variant="small" color="red">
							{errors.phone_number &&
								touched.phone_number &&
								errors.phone_number}
						</Typography>
					</div>

					<div className="w-full">
						<Textarea
							name="address"
							label="Address"
							value={values.address}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.address && errors.address}
						/>

						<Typography variant="small" color="red">
							{errors.address && touched.address && errors.address}
						</Typography>
					</div>

					<Button
						type="submit"
						disabled={Object.keys(errors).length > 0 || isSubmitting}
					>
						Save Profile
					</Button>
				</form>
			)}
		</Formik>
	);
};

export default Profile;
