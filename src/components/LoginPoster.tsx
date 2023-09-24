import { Card, CardBody, Typography } from "@material-tailwind/react";
import LoginDesk from "../public/login-desk-dummy.png";

const LoginPoster: React.FC = () => {

	return (
		<Card className="hidden flex-1 bg-primary sm:block">
			{/* <CardHeader
						floated={false}
						shadow={false}
						className="flex justify-end border-none bg-primary text-white"
					>
						<FontAwesomeIcon icon={faPhone} size="xs" className="pr-2" />
						<p className="text-xs">+94 0116 789 754</p>
					</CardHeader> */}
			<CardBody className="h-full">
				{/* Left side - Image */}
				<div className="flex h-full flex-col">
					<div className="inline-flex h-4/5 flex-col justify-center">
						<img
							src={LoginDesk} // Replace with your image URL
							alt="LoginDesk"
							className="mx-auto w-4/5"
						/>
					</div>
					<div className="inline-flex flex-col justify-center">
						<Typography variant="h2" color="white" className="mt-10">
							Sign in to Unitydox
						</Typography>
						<Typography variant="small" color="white">
							Save your photos securely!
						</Typography>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export default LoginPoster;
