import { LazyLoadImage } from "react-lazy-load-image-component";

interface ImageCardProps {
	src: string;
}

const ImageCard = ({ src }: ImageCardProps) => {
	return (
		<div className="rounded-lg">
			<LazyLoadImage
				src={src}
				alt={`Image Alt`}
				className="img-lazy mx-auto h-[130px] w-full rounded-lg object-cover"
				height="130px"
				// onError={() => handleImageError(i)}
				effect="blur"
			/>
			{/* <img
				src={src}
				alt="img"
				className="mx-auto h-[130px] rounded-lg object-cover"
			/> */}
		</div>
	);
};

export default ImageCard;
