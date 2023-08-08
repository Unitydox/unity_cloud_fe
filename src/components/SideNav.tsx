import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronDown,
} from "@fortawesome/free-solid-svg-icons";


import photo from '../public/photos.svg';
import albums from '../public/albums.svg';
import archive from '../public/archive.svg';
import sharing from '../public/sharing.svg';
import trash from '../public/trash.svg';
import utilities from '../public/utilities.svg';
import star from '../public/star.svg';
import search from '../public/search.svg';

interface MenuItem {
	name: string;
	icon?: string;
	route?: string;
	children?: MenuItem[];
}

const menuItems: MenuItem[] = [
	{ name: "Photos", icon: photo, route: "/app/photos" },
	{ name: "Explore", icon: search, route: "/app/explore" },
	{ name: "Sharing", icon: sharing, route: "/app/sharing" },
	{ name: "Favourites", icon: star, route: "/app/favourites" },
	{ name: "Albums", icon: albums, route: "/app/albums" },
	{ name: "Utilities", icon: utilities, route: "/app/utilities" },
	{ name: "Archive", icon: archive, route: "/app/archive" },
	{ name: "Bin", icon: trash, route: "/app/Bin" },
];

function SideNav() {
	const navigate = useNavigate();

	const [open, setOpen] = useState<string>('');

	useEffect(() => console.log(open), [open])

	const handleOpen = (value: number, parent_index: number, route: string) => {
		const open_index = (parent_index > -1) ? `${value}-${parent_index}` : `${value}`;

		setOpen(open_index);

		navigate(route);
	};

	const isOpen = (value: number, parent_index: number) => {
		const open_index = (parent_index > -1) ? `${value}-${parent_index}` : `${value}`;

		return open === open_index;
	}

	const renderMenuItems = (items: MenuItem[], parent_index: number = -1) => {
		return items.map((item, index) => (
			<Accordion
				key={index}
				open={isOpen(index, parent_index)}
				icon={
					item.children &&
					<FontAwesomeIcon
						icon={isOpen(index, parent_index) ? faChevronDown : faChevronRight}
						className={`mx-auto h-4 w-4 transition-transform ${
							isOpen(index, parent_index) ? "rotate-180" : ""
						}`}
					/>
				}
			>
				<ListItem 
					className={`rounded-r-full p-0 hover:bg-blue-200 hover:text-blue-200 focus:bg-blue-200 focus:text-blue-200 active:bg-blue-200 active:text-blue-200 ${(isOpen(index, parent_index) ? 'bg-blue-200 text-blue-200' : '')}`}
					selected={isOpen(index, parent_index)}
				>
					<AccordionHeader
						onClick={() => handleOpen(index, parent_index, item.route)}
						className="border-b-0 p-3"
					>	
						{
							item?.icon &&  
							<ListItemPrefix>
								<img src={item.icon} alt="logo" className="h-5 w-5" />
							</ListItemPrefix>
						}
						<Typography color="blue-gray" className="mr-auto font-normal">
							{item.name}
						</Typography>
					</AccordionHeader>
				</ListItem>
				{item.children && (
					<AccordionBody className="rounded-r-full py-1">
						<List className="p-0">{renderMenuItems(item.children, index)}</List>
					</AccordionBody>
				)}
			</Accordion>
		));
	};

	return (
		<Card className="h-full w-full max-w-[20rem] rounded-none" shadow={false}>
			<List>{renderMenuItems(menuItems)}</List>
		</Card>
	);
}

export default SideNav;