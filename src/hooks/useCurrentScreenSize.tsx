import { useState, useEffect } from "react";

interface Breakpoints {
	sm: number;
	md: number;
	lg: number;
	xl: number;
	"2xl": number;
}

const breakpoints: Breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
};

function useCurrentScreenSize() {
	const [screenSize, setScreenSize] = useState<keyof Breakpoints>("sm");

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width >= breakpoints["2xl"]) {
				setScreenSize("2xl");
			} else if (width >= breakpoints.xl) {
				setScreenSize("xl");
			} else if (width >= breakpoints.lg) {
				setScreenSize("lg");
			} else if (width >= breakpoints.md) {
				setScreenSize("md");
			} else {
				setScreenSize("sm");
			}
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return screenSize;
}

export default useCurrentScreenSize;