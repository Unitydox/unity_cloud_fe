import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faFilledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

interface HeartIconProps {
	defaultFilled?: boolean;
	onClick: (output: boolean) => void;
}

const HeartIcon: React.FC<HeartIconProps> = ({
	defaultFilled = false,
	onClick,
}) => {
	const [filled, setFilled] = useState(defaultFilled);

	const handleClick = () => {
		const newFilled = !filled;
		setFilled(newFilled);
		onClick(newFilled);
	};

    useEffect(() => {
        setFilled(defaultFilled);
    }, [defaultFilled])

	return (
        <>
            {
                filled ? 
                <FontAwesomeIcon
                    icon={faFilledHeart}
                    className="cursor-pointer text-xl text-red-800 transition-colors"
                    onClick={handleClick}
                />
                :
                <FontAwesomeIcon
                    icon={faHeart}
                    className="cursor-pointer text-xl text-gray-600"
                    onClick={handleClick}
                />
            }
        </>
	);
};

export default HeartIcon;
