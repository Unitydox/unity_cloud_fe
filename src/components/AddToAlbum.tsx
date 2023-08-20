import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	IconButton,
	Typography,
	Spinner,
	Input,
} from "@material-tailwind/react";
import { PlusIcon, XMarkIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { createAlbum, fetchAlbums, toggleImageToAlbum } from "services/photoService";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

interface AddToAlbumProps {
	open: boolean;
	onClose: React.EventHandler<any>;
	photo_id: string;
	photo_primary_id: number;
}

interface AlbumItems {
	id: number;
	uuid: string;
	name: string;
	created_at: string;
	no_of_images: number;
	thumbnail_image: string;
}

interface NewFormData {
	name: string;
}

const AddToAlbum: React.FC<AddToAlbumProps> = ({ open, onClose, photo_id, photo_primary_id }) => {
	const [albumList, setAlbumList] = useState<AlbumItems[]>();
	const [loader, setLoader] = useState<boolean>(false);
	const [showAddForm, setShowAddForm] = useState<boolean>(false);

	const _createNewAlbum = (form_data: NewFormData) => {
		console.log(form_data);

		createAlbum(form_data).then((res) => {
			console.log(res);
			
			selectAlbum(res.data.id);
		})
	};

	const selectAlbum = (album_id: number) => {
		toggleImageToAlbum({
			image_id: photo_primary_id,
			album_id: album_id,
			status: 'active'
		})
		.then(() => {})
		.finally(() => {
			onClose(album_id);
		});
	};

	const fetchAllAlbums = () => {
		setLoader(true);

		fetchAlbums()
			.then((res) => {
				if (res.status) {
					setAlbumList(res.data);
				}
			})
			.finally(() => setLoader(false));
	};

	useEffect(() => {
		fetchAllAlbums();
	}, []);

	return (
		<>
			<Dialog
				size="md"
				className="h-3/4"
				open={open}
				handler={onClose}
				dismiss={{
					enabled: true,
					escapeKey: false,
					referencePress: false,
					bubbles: { escapeKey: false },
				}}
			>
				<DialogHeader className="justify-between">
					<Typography>Add to album</Typography>
					<XMarkIcon className="h-5 w-5 cursor-pointer" onClick={onClose} />
				</DialogHeader>
				<DialogBody
					divider={true}
					className="flex flex-col items-center justify-center border-b-0 border-none p-4"
				>
					<div className="flex w-full justify-start">
						<Button
							className="mb-4 flex items-center gap-2 px-3"
							variant="outlined"
							onClick={() => setShowAddForm(prev => !prev)}
						>	
							{
								!showAddForm ? 
								<>
									<PlusIcon className="h-5 w-5" />
									New Album
								</>
								:
								<>
									<ArrowLeftIcon className="h-5 w-5" />
									Add to existing album
								</>
							}
						</Button>
					</div>

					{loader && (
						<div className="flex h-full w-full items-center">
							<Spinner />
						</div>
					)}

					{!loader &&
						!showAddForm &&
						albumList &&
						albumList.map((album) => (
							<div
								className="flex w-full cursor-pointer flex-row p-2 hover:rounded-lg hover:bg-blue-200"
								key={album.id}
								onClick={() => selectAlbum(album.id)}
							>
								<div className="w-1/4">
									<img src={album.thumbnail_image} alt={album.name} />
								</div>
								<div className="flex w-3/4 flex-col">
									<Typography color="black">
										{album.name}
									</Typography>
									<Typography variant="small">
										{moment(album.created_at).format('MMM DD, YYYY')} | {`${album.no_of_images} item(s)`}
									</Typography>
								</div>
							</div>
						))}

					{showAddForm && (
						<Formik
							initialValues={{ name: "" }}
							validationSchema={Yup.object({
								name: Yup.string().required("Required"),
							})}
							onSubmit={(values) => _createNewAlbum(values)}
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
								<form className="mt-8 w-full" onSubmit={handleSubmit}>
									<div className="flex flex-col space-y-4 overflow-y-auto">
										<div className="py-2">
											<Input
												type="text"
												placeholder=""
												label="Album Name"
												variant="static"
												name="name"
												value={values.name}
												onChange={handleChange}
												onBlur={handleBlur}
												error={errors.name && touched.name && errors.name}
												success={!errors.name && touched.name}
											/>
											<Typography variant="small" color="red">
												{errors.name && touched.name && errors.name}
											</Typography>
										</div>
									</div>
									<div className="mt-4 flex justify-center space-y-4">
										<Button
											type="submit"
											size="lg"
											className="py-2"
											onSubmit={handleSubmit}
											disabled={isSubmitting}
										>
											Create & Add to New Album
										</Button>
									</div>
								</form>
							)}
						</Formik>
					)}
				</DialogBody>
			</Dialog>
		</>
	);
};

export default AddToAlbum;
