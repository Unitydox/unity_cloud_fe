interface IconProps {
	className?: string;
}

const TrashIcon = ({ className = "fill-blue-500" }: IconProps) => {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
		>
			<g clipPath="url(#clip0_38_810)">
				<path
					d="M15.1633 4.5V3.5H9.16333V4.5H4.16333V6.5H5.16333V19.5C5.16333 20.6 6.06333 21.5 7.16333 21.5H17.1633C18.2633 21.5 19.1633 20.6 19.1633 19.5V6.5H20.1633V4.5H15.1633ZM17.1633 19.5H7.16333V6.5H17.1633V19.5ZM9.16333 8.5H11.1633V17.5H9.16333V8.5ZM13.1633 8.5H15.1633V17.5H13.1633V8.5Z"
					className={className}
				/>
			</g>
			<defs>
				<clipPath id="clip0_38_810">
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

export default TrashIcon;
