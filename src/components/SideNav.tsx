import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux' 
import { selectMenu } from '../features/sideMenu/sideMenuSlice'
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
	Tooltip,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import {
	AlbumIcon,
	ArchiveIcon,
	PhotosIcon,
	SearchIcon,
	SharingIcon,
	StarIcon,
	TrashIcon,
	UtilitiesIcon,
} from "components/icons";

interface IconProps {
	size?: number;
	color?: string;
	className?: string;
}
interface MenuItem {
	name: string;
	icon?: React.ComponentType<IconProps>;
	route?: string;
	state?: any;
	children?: MenuItem[];
}

const menuItems: MenuItem[] = [
	{ name: "Photos", icon: PhotosIcon, route: "/app/photos", state: { type: '' } },
	// { name: "Explore", icon: SearchIcon, route: "/app/explore" },
	// { name: "Sharing", icon: SharingIcon, route: "/app/sharing" },
	{ name: "Favourites", icon: StarIcon, route: "/app/photos?type=favourites", state: { type: 'favourites' } },
	{ name: "Albums", icon: AlbumIcon, route: "/app/albums" },
	// { name: "Utilities", icon: UtilitiesIcon, route: "/app/utilities" },
	{ name: "Archive", icon: ArchiveIcon, route: "/app/photos?type=archive", state: { type: 'archive' } },
	{ name: "Bin", icon: TrashIcon, route: "/app/photos?type=delete", state: { type: 'delete' } },
];

function SideNav() {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const selected_menu = useSelector(state => state.sideMenu.selected);

	// const [open, setOpen] = useState<string>("");

	useEffect(() => console.log(selected_menu), [selected_menu]);

	const handleOpen = (value: number, parent_index: number, menu: MenuItem) => {
		const open_index =
			parent_index > -1 ? `${value}-${parent_index}` : `${value}`;

		// setOpen(open_index);
		dispatch(selectMenu(open_index));

		menu.route && navigate(menu.route, { state: menu.state });
	};

	const isOpen = (value: number, parent_index: number) => {
		const open_index =
			parent_index > -1 ? `${value}-${parent_index}` : `${value}`;

		return selected_menu === open_index;
	};

	const renderMenuItems = (items: MenuItem[], parent_index: number = -1) => {
		return items.map((item, index) => (
			<Accordion
				key={index}
				open={isOpen(index, parent_index)}
				icon={
					item.children && (
						<Tooltip content={item.name}>
							<FontAwesomeIcon
								icon={
									isOpen(index, parent_index) ? faChevronDown : faChevronRight
								}
								className={`mx-auto h-4 w-4 transition-transform ${
									isOpen(index, parent_index) ? "rotate-180" : ""
								}`}
							/>
						</Tooltip>
					)
				}
			>
				<ListItem
					className={`rounded-r-full p-0 hover:bg-blue-200 hover:text-blue-200 focus:bg-blue-200 focus:text-blue-200 active:bg-blue-200 active:text-blue-200 ${
						isOpen(index, parent_index) ? "bg-blue-200 text-blue-200" : ""
					}`}
					selected={isOpen(index, parent_index)}
				>
					<AccordionHeader
						onClick={() => handleOpen(index, parent_index, item)}
						className="border-b-0 p-3"
					>
						{item?.icon && (
							<ListItemPrefix>
								<item.icon
									className={
										isOpen(index, parent_index)
											? "fill-blue-300"
											: "fill-blue-500"
									}
								/>
							</ListItemPrefix>
						)}
						<Typography
							color="blue-gray"
							className={`mr-auto hidden font-normal md:block ${
								isOpen(index, parent_index) ? "text-blue-300" : ""
							}`}
						>
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
		<Card
			className="w-full max-w-[4rem] overflow-y-auto rounded-none rounded-r-xl bg-gray-100/50 px-0 pe-0 md:max-w-[18rem]"
			shadow={false}
		>
			<List className="w-full min-w-full px-0">{renderMenuItems(menuItems)}</List>
		</Card>
	);
}

export default SideNav;
