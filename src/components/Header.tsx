import {
	Navbar,
	Typography,
	IconButton,
	Button,
	Input,
} from "@material-tailwind/react";
import {
	faCog,
	faQuestionCircle,
	faUpload,
	faSearch
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../public/full_logo.svg";
import Avatar from "./Avatar";

function Header() {
	return (
		<Navbar className="relative z-10 !max-w-full px-4 py-3">
			<div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
				<img src={Logo} alt="logo-picture" />
				<div className="relative flex w-2/5 gap-2">
					<div className="flex w-full flex-row items-center rounded-lg border-b-2 border-gray-400 bg-gray-200 shadow-lg">
						<FontAwesomeIcon className="px-4" icon={faSearch} />
						<Input
							variant="static"
							type="search"
							// label="Type here..."
							placeholder="Search your photos"
							className="rounded-none !border-none bg-transparent !p-0 shadow-none"
							containerProps={{
								className: "min-w-full",
							}}
						/>
					</div>
				</div>
				<div className="flex gap-1 md:mr-4">
					<IconButton variant="text" className="rounded-full">
						<FontAwesomeIcon size="2x" icon={faUpload} />
					</IconButton>
					<IconButton variant="text" className="rounded-full">
						<FontAwesomeIcon size="2x" icon={faQuestionCircle} />
					</IconButton>
					<IconButton variant="text" className="rounded-full">
						<FontAwesomeIcon size="2x" icon={faCog} />
					</IconButton>
					<Avatar />
				</div>
			</div>
		</Navbar>
	);
}

export default Header;
