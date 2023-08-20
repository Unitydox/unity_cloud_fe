interface IconProps {
	className?: string;
}

const ArchiveIcon = ({ className = "fill-blue-500" }: IconProps) => {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="cursor-pointer"
		>
			<g clipPath="url(#clip0_38_804)">
				<path
					d="M20.7033 5.73L19.3133 4.05C19.0433 3.71 18.6333 3.5 18.1633 3.5H6.16333C5.69333 3.5 5.28333 3.71 5.00333 4.05L3.62333 5.73C3.33333 6.07 3.16333 6.52 3.16333 7V19.5C3.16333 20.6 4.06333 21.5 5.16333 21.5H19.1633C20.2633 21.5 21.1633 20.6 21.1633 19.5V7C21.1633 6.52 20.9933 6.07 20.7033 5.73ZM6.40333 5.5H17.9233L18.7533 6.5H5.58333L6.40333 5.5ZM5.16333 19.5V8.5H19.1633V19.5H5.16333ZM13.1633 14.15V10H11.1633V14.15L9.37333 12.36L7.95333 13.77L12.1633 17.98L16.3733 13.77L14.9533 12.36L13.1633 14.15Z"
					className={className}
				/>
			</g>
			<defs>
				<clipPath id="clip0_38_804">
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

export default ArchiveIcon;
