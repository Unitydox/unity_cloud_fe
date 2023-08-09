import { useNavigate } from "react-router-dom";

const PageNotFound = () => {

    const navigate = useNavigate();

    const goHome = () => navigate("/app/photos");

	return (
		<div className="bg-gradient-to-r from-purple-300 to-blue-200">
			<div className="m-auto flex min-h-screen w-9/12 items-center justify-center py-16">
				<div className="overflow-hidden bg-white pb-8 shadow sm:rounded-lg">
					<div className="border-t border-gray-200 pt-8 text-center">
						<h1 className="text-9xl font-bold text-purple-400">404</h1>
						<h1 className="py-8 text-6xl font-medium">oops! Page not found</h1>
						<p className="px-12 pb-8 text-2xl font-medium">
							Oops! The page you are looking for does not exist. It might have
							been moved or deleted.
						</p>
						<button className="mr-6 rounded-md bg-gradient-to-r from-purple-400 to-blue-500 px-6 py-3 font-semibold text-white hover:from-pink-500 hover:to-orange-500" onClick={goHome}>
							HOME
						</button>
						<button className="rounded-md bg-gradient-to-r from-red-400 to-red-500 px-6 py-3 font-semibold text-white hover:from-red-500 hover:to-red-500">
							Contact Us
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
