import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import FileSaver from 'file-saver';

interface DownloadFileProps {
	fileUrl: string;
	fileName?: string;
    className?: string;
}

const DownloadFile: React.FC<DownloadFileProps> = ({
	fileUrl,
	fileName,
    className = 'h-5 w-5 cursor-pointer text-white'
}) => {
	const handleDownload = () => {
		// const anchor = document.createElement("a");
		// anchor.href = fileUrl;
		// anchor.download = "fileName.jpg"; // Specify the desired file name
		// anchor.click();
        FileSaver.saveAs(fileUrl, "image.jpg");

	};

	return (
		<ArrowDownTrayIcon
			className={className}
			onClick={handleDownload}
		/>
	);
};

export default DownloadFile;
