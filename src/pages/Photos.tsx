import { useEffect, useState, useRef } from "react";
import ImageCard from "components/ImageCard";
import { Typography } from "@material-tailwind/react";
// import axios from "axios";
import { useLoading } from "contexts/LoadingContext";
import Carousel from "react-multi-carousel";
import { fetchImages } from "services/photoService";

interface image_data {
	date: string;
	images: string[];
}

const PhotosGallery = () => {
	const { setLoading } = useLoading();

	const [imageData, setImageData] = useState<image_data[]>();

	// const containers = useRef([]);

	useEffect(() => {
		setLoading(true);

		fetchImages()
			.then((res) => {
				console.log({ res });
				setImageData([
					{
						date: "Today",
						images: res.data.map((i) => i.file_temp_url),
					},
				]);
			})
			.finally(() => setLoading(false));

		// axios
		// 	.get("https://picsum.photos/v2/list?page=1&limit=10")
		// 	.then((res) => {
		// 		setImageData([
		// 			{
		// 				date: "Today",
		// 				images: res.data.map((i) => i.download_url),
		// 			},
		// 		]);
		// 	})
		// 	.finally(() => setLoading(false));
	}, []);

	return (
		<section>
			{imageData &&
				imageData.map((item, index) => (
					<div key={index}>
						<Typography variant="h4" color="blue">
							{item.date}
						</Typography>
						<div className="flex overflow-hidden">
							{/* <div
								className="flex gap-4 overflow-x-hidden p-4"
							>
								{item.images &&
									item.images.map((img, img_index) => (
										<ImageCard src={img} key={index + "-" + img_index} />
									))}
							</div> */}
							<Carousel
								additionalTransfrom={0}
								arrows
								autoPlaySpeed={3000}
								centerMode={false}
								className=""
								containerClass="container"
								dotListClass=""
								draggable
								focusOnSelect={false}
								infinite={false}
								itemClass=""
								keyBoardControl
								minimumTouchDrag={80}
								pauseOnHover
								renderArrowsWhenDisabled={false}
								renderButtonGroupOutside={false}
								renderDotsOutside={false}
								responsive={{
									desktop: {
										breakpoint: {
											max: 3000,
											min: 1024,
										},
										items: 5,
										partialVisibilityGutter: 40,
									},
									mobile: {
										breakpoint: {
											max: 464,
											min: 0,
										},
										items: 1,
										partialVisibilityGutter: 30,
									},
									tablet: {
										breakpoint: {
											max: 1024,
											min: 464,
										},
										items: 2,
										partialVisibilityGutter: 30,
									},
								}}
								rewind={false}
								rewindWithAnimation={false}
								rtl={false}
								shouldResetAutoplay
								showDots={false}
								sliderClass=""
								slidesToSlide={2}
								swipeable
							>
								{item.images &&
									item.images.map((img, img_index) => (
										<ImageCard src={img} key={index + "-" + img_index} />
									))}
							</Carousel>
						</div>
					</div>
				))}
		</section>
	);
};

export default PhotosGallery;
