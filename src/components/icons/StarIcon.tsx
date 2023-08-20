interface IconProps {
	className?: string;
}

const StarIcon = ({ className = "fill-blue-500" }: IconProps) => {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
		>
			<g clipPath="url(#clip0_38_782)">
				<path
					d="M22.1633 9.74L14.9733 9.12L12.1633 2.5L9.35333 9.13L2.16333 9.74L7.62333 14.47L5.98333 21.5L12.1633 17.77L18.3433 21.5L16.7133 14.47L22.1633 9.74ZM12.1633 15.9L8.40333 18.17L9.40333 13.89L6.08333 11.01L10.4633 10.63L12.1633 6.6L13.8733 10.64L18.2533 11.02L14.9333 13.9L15.9333 18.18L12.1633 15.9Z"
					className={className}
				/>
			</g>
			<defs>
				<clipPath id="clip0_38_782">
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

export default StarIcon;
