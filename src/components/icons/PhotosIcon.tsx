interface IconProps {
	className?: string;
}

const PhotosIcon = ({ className = "fill-blue-500" }: IconProps) => {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
		>
			<g clipPath="url(#clip0_38_761)">
				<path
					d="M19.1633 3.5H5.16333C4.06333 3.5 3.16333 4.4 3.16333 5.5V19.5C3.16333 20.6 4.06333 21.5 5.16333 21.5H19.1633C20.2633 21.5 21.1633 20.6 21.1633 19.5V5.5C21.1633 4.4 20.2633 3.5 19.1633 3.5ZM19.1633 19.5H5.16333V5.5H19.1633V19.5ZM14.1633 12.5L11.1633 16.22L9.16333 13.5L6.16333 17.5H18.1633L14.1633 12.5Z"
					className={className}
				/>
			</g>
			<defs>
				<clipPath id="clip0_38_761">
					<rect
						width="24"
						height="24"
						fill="white"
						transform="translate(0.16333 0.5)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default PhotosIcon;
