import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMenu } from "features/sideMenu/sideMenuSlice";
import { updateSearchText } from "features/globalSearch/imageSearchSlice";
import {
	Navbar,
	Typography,
	Button,
	Input,
	Menu,
	MenuHandler,
	MenuItem,
	MenuList,
	Spinner,
} from "@material-tailwind/react";
import {
	CloudArrowUpIcon,
	QuestionMarkCircleIcon,
	MagnifyingGlassIcon,
	UserCircleIcon,
	XMarkIcon
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useFileUploadContext } from "contexts/FileUploadContext";
import FullLogo from "../public/full_logo.svg";
import Logo from "../public/logo.svg";
import Avatar from "./Avatar";
import { useAuth } from "hooks/useAuth";
import { getSignedUrl, uploadImage } from "services/photoService";

function Header() {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const inputFileRef = useRef(null);

	const { setUploadedFile } = useFileUploadContext();

	const userData = useSelector((state) => state.userDetails.data);

	// const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const { logout } = useAuth();
	const [searchText, setSearchText] = useState<string>("");
	const [profileUrl, setProfileUrl] = useState<string | undefined>();
	const [isUploading, setIsUploading] = useState<boolean>(false);

	const redirectToHome = () => {
		navigate("/app/photos");
		dispatch(selectMenu("0"));
	};

	const visitProfile = () => {
		navigate("/app/profile");
	};

	const handleInputChange = (event) => {
		setSearchText(event.target.value);
	};

	useEffect(() => {
		const debounceTime = 300; // Adjust debounce time as needed (in milliseconds)

		const timeoutId = setTimeout(() => {
			dispatch(updateSearchText(searchText));
		}, debounceTime);

		return () => {
			// Cleanup function to clear the timeout when the component unmounts or searchText changes
			clearTimeout(timeoutId);
		};
	}, [searchText]);

	const _imageUpload = async (event: any) => {
		const file = event.target.files[0];

		console.log({ file });

		if (!file.type.startsWith("image/")) {
			toast.error("Only Images can be uploaded!");
			return;
		}

		const formData = new FormData();

		formData.append("file", file);

		const fileUploadToast = toast.loading("Uploading...");

		const response = await uploadImage(formData);

		if (response.status) {
			// setUploadedFile(file);

			toast.success("File uploaded", { id: fileUploadToast, duration: 3000 });
		} else {
			toast.error("Error in file upload", {
				id: fileUploadToast,
				duration: 3000,
			});
		}

		setTimeout(() => {
			toast.dismiss(fileUploadToast);
		}, 800);

		setUploadedFile(null);

		inputFileRef.current.value = null;
	};

	const imageUpload = async (event: any) => {
		const files = event.target.files;

		if (files.length > 10) {
			toast(
				"You can upload a maximum of 10 files at once. Onle the first 10 files will be processed.",
				{ icon: <QuestionMarkCircleIcon /> },
			);
		}

		for (const file of files) {
			if (!file.type.startsWith("image/")) {
				toast.error("Only Images can be uploaded!");
				return;
			}

			const formData = new FormData();

			formData.append("file", file);

			const preview = URL.createObjectURL(file);

			const fileUploadToast = toast.custom((t) => (
				<div
					className={`pointer-events-auto flex rounded-lg border-gray-500 bg-white px-2 shadow-2xl drop-shadow-2xl`}
				>
					<div className="flex flex-col items-center">
						<div className="flex w-full cursor-pointer flex-row items-center justify-end py-1">
							<XMarkIcon className="h-5 w-5 text-red-500" onClick={() => toast.dismiss(t.id)} />
						</div>
						<img className="h-[130px] w-[130px] object-cover" src={preview} alt="" />
						<div className="flex flex-row items-center justify-between gap-x-3 border-gray-200 p-2">
							<span>Uploading...</span>
							<Spinner className="h-4 w-4" />
						</div>
					</div>
				</div>
			), {
				duration: 3000,
			});

			const response = await uploadImage(formData);

			if (response.status) {
				setUploadedFile(file);

				toast.success("File uploaded", { id: fileUploadToast, duration: 3000 });
			} else {
				toast.error("Error in file upload", {
					id: fileUploadToast,
					duration: 3000,
				});
			}

			setTimeout(() => {
				toast.dismiss(fileUploadToast);
			}, 800);

		}
		setUploadedFile(null);

		inputFileRef.current.value = null;

		updateStorageDetails();
	};

	const updateStorageDetails = () => {
		
	}

	useEffect(() => {
		if (userData?.profile_thumb_url) {
			getSignedUrl({
				file_path: userData.profile_thumb_url,
				expiryInSeconds: 6000,
			}).then((res) => {
				if (res?.data) {
					setProfileUrl(res.data);
				}
			});
		}
	}, [userData?.profile_thumb_url]);

	return (
		<Navbar className="relative z-10 h-auto !max-w-full px-4 py-3">
			<div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
				<img
					src={Logo}
					alt="logo-picture"
					className="block cursor-pointer sm:hidden"
					onClick={redirectToHome}
				/>
				<img
					src={FullLogo}
					alt="logo-picture"
					className="hidden cursor-pointer sm:block"
					onClick={redirectToHome}
				/>
				<div className="relative flex hidden w-2/5 gap-2 md:block">
					<div className="flex w-full flex-row items-center rounded-lg border-b-2 border-gray-400 bg-gray-200 shadow-lg">
						<span className="px-2">
							<MagnifyingGlassIcon className="h-5 w-5 text-blue-500" />
						</span>
						<Input
							variant="static"
							type="search"
							// label="Type here..."
							placeholder="Search your photos"
							className="rounded-none !border-none bg-transparent !p-0 shadow-none"
							containerProps={{
								className: "min-w-full",
							}}
							value={searchText}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="flex gap-1 md:mr-4">
					<input
						name="upload"
						accept="image/png, image/jpeg"
						type="file"
						className="hidden"
						multiple
						onChange={imageUpload}
						ref={inputFileRef}
					/>
					<Button
						variant="text"
						className="flex items-center gap-3 !px-2"
						onClick={(e) => inputFileRef.current.click()}
						disabled={isUploading}
					>
						<CloudArrowUpIcon className="h-8 w-8 text-blue-500" />
						Upload
					</Button>
					<Button variant="text" className="flex items-center gap-3 !px-2">
						<QuestionMarkCircleIcon className="h-8 w-8 text-blue-500" />
						{/* <FontAwesomeIcon size="2x" icon={faQuestionCircle} /> */}
					</Button>
					{/* <Button variant="text" className="flex items-center gap-3 !px-2">
						<FontAwesomeIcon size="2x" icon={faCog} />
					</Button> */}
					<Menu>
						<MenuHandler>
							<Button
								variant="text"
								className="!hover:bg-transparent !active:bg-none !px-2 !py-0"
								ripple={false}
							>
								<Avatar src={profileUrl} alt="profile pic" />
							</Button>
						</MenuHandler>
						<MenuList>
							{/* {
								userData.first_name && 
								<>
									<MenuItem className="flex items-center gap-2" onClick={visitProfile}>
										
										<Typography variant="small" className="font-normal">
											{userData.first_name + userData.last_name}
										</Typography>
									</MenuItem>
									<hr className="my-2 border-blue-gray-50" />
								</>
							} */}
							<MenuItem
								className="flex items-center gap-2"
								onClick={visitProfile}
							>
								<UserCircleIcon className="h-5 w-5" />
								<Typography variant="small" className="font-normal">
									My Profile
								</Typography>
							</MenuItem>
							<hr className="my-2 border-blue-gray-50" />
							<MenuItem className="flex items-center gap-2 " onClick={logout}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									className="h-4 w-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
									/>
								</svg>
								<Typography variant="small" className="font-normal">
									Sign Out
								</Typography>
							</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</div>
		</Navbar>
	);
}

export default Header;
