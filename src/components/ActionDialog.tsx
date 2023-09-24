import {
	Dialog,
	DialogHeader,
	Typography,
	DialogBody,
	DialogFooter,
	Button,
} from "@material-tailwind/react";
import React from "react";

interface ActionDialogProps {
	children?: React.ReactNode;
	headerContent: React.ReactNode | string;
	bodyContent: React.ReactNode | string;
	confirmBtn: React.ReactNode | string;
	onConfirm: React.MouseEventHandler;
	cancelBtn: React.ReactNode | string;
	onCancel: React.MouseEventHandler;
	isOpen: boolean;
}

interface onCloseProps {
	ev: React.MouseEvent;
	type: string;
}

const ActionDialog: React.FC<ActionDialogProps> = ({
	headerContent,
	bodyContent,
	confirmBtn,
	onConfirm,
	cancelBtn,
	onCancel,
	isOpen,
}) => {
	const onClose = ({ ev, type }: onCloseProps) => {
		type == "save" ? onConfirm(ev) : onCancel(ev);
	};

	return (
		<Dialog open={isOpen} handler={(ev) => onClose({ ev, type: "close" })}>
			<DialogHeader>
				{typeof headerContent === "string" ? (
					<Typography className="capitalize">{headerContent}</Typography>
				) : (
					<>{headerContent}</>
				)}
			</DialogHeader>
			<DialogBody divider className="grid place-items-start gap-4">
				{typeof bodyContent === "string" ? (
					<Typography>{bodyContent}</Typography>
				) : (
					<>{bodyContent}</>
				)}
			</DialogBody>
			<DialogFooter className="space-x-2">
				{typeof confirmBtn === "string" ? (
					<Button
						variant="filled"
						color="orange"
						onClick={(ev) => onClose({ ev, type: "save" })}
					>
						{confirmBtn}
					</Button>
				) : (
					<>{confirmBtn}</>
				)}
				{typeof cancelBtn === "string" ? (
					<Button
						variant="outlined"
						color="blue-gray"
						onClick={(ev) => onClose({ ev, type: "close" })}
					>
						{cancelBtn}
					</Button>
				) : (
					<>{cancelBtn}</>
				)}
			</DialogFooter>
		</Dialog>
	);
};

export default ActionDialog;
