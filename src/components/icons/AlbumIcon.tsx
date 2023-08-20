interface IconProps {
    className?: string
}

const AlbumIcon = ({className = 'fill-blue-500'}: IconProps) => {
	return (
		<svg
			width="25"
			height="25"
			viewBox="0 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
		>
			<g clipPath="url(#clip0_38_788)">
				<path
					d="M18.1633 2.5H6.16333C5.06333 2.5 4.16333 3.4 4.16333 4.5V20.5C4.16333 21.6 5.06333 22.5 6.16333 22.5H18.1633C19.2633 22.5 20.1633 21.6 20.1633 20.5V4.5C20.1633 3.4 19.2633 2.5 18.1633 2.5ZM18.1633 20.5H6.16333V4.5H12.1633V11.5L14.6633 9.62L17.1633 11.5V4.5H18.1633V20.5ZM13.8333 14.5L17.1633 18.5H7.16333L9.66333 15.3L11.3333 17.48L13.8333 14.5Z"
					className={className}
				/>
			</g>
			<defs>
				<clipPath id="clip0_38_788">
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

export default AlbumIcon;
