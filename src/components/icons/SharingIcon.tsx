interface IconProps {
	className?: string;
}

const SharingIcon = ({ className = "fill-blue-500" }: IconProps) => {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
		>
			<g clipPath="url(#clip0_38_773)">
				<path
					d="M15.1633 8.25C15.1633 6.83 14.6633 5.52 13.8333 4.49C14.2533 4.35 14.6933 4.25 15.1633 4.25C17.3733 4.25 19.1633 6.04 19.1633 8.25C19.1633 10.46 17.3733 12.25 15.1633 12.25C14.7333 12.25 14.3233 12.16 13.9333 12.04C13.9033 12.03 13.8733 12.02 13.8333 12.01C14.6939 10.9458 15.1633 9.6186 15.1633 8.25ZM16.8233 13.38C18.1933 14.31 19.1633 15.57 19.1633 17.25V20.25H23.1633V17.25C23.1633 15.07 19.5833 13.78 16.8233 13.38ZM9.16333 6.25C8.06333 6.25 7.16333 7.15 7.16333 8.25C7.16333 9.35 8.06333 10.25 9.16333 10.25C10.2633 10.25 11.1633 9.35 11.1633 8.25C11.1633 7.15 10.2633 6.25 9.16333 6.25ZM9.16333 15.25C6.46333 15.25 3.36333 16.54 3.16333 17.26V18.25H15.1633V17.25C14.9633 16.54 11.8633 15.25 9.16333 15.25ZM9.16333 4.25C11.3733 4.25 13.1633 6.04 13.1633 8.25C13.1633 10.46 11.3733 12.25 9.16333 12.25C6.95333 12.25 5.16333 10.46 5.16333 8.25C5.16333 6.04 6.95333 4.25 9.16333 4.25ZM9.16333 13.25C11.8333 13.25 17.1633 14.59 17.1633 17.25V20.25H1.16333V17.25C1.16333 14.59 6.49333 13.25 9.16333 13.25Z"
					className={className}
				/>
			</g>
			<defs>
				<clipPath id="clip0_38_773">
					<rect
						width="24"
						height="24"
						fill="white"
						transform="translate(0.16333 0.25)"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default SharingIcon;
