import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import VerifyUser from "components/VerifyUser";
import LoginPage from "./pages/LoginPage";
import Login from "components/Login";
import Register from "components/Register";
import Layout from "./pages/Layout";
import PageNotFound from "components/PageNotFound";
import FullScreenLoader from "components/FullScreenLoader";
import { Home, Photos } from "./routes";

function App() {
	return (
		<>
			<Toaster 
				position="bottom-right"
				toastOptions={{
					duration: 3000,
					className: 'font-sans'
				}}
			/>
			<FullScreenLoader />
			<Router>
				<Suspense fallback={<FullScreenLoader />}>
					<Routes>
						<Route path="/" element={<VerifyUser />} />
						<Route path="/user" element={<LoginPage />} >
							<Route path="/user/login" element={<Login />} />
							<Route path="/user/register" element={<Register />} />
							<Route path="/user" element={<Login />} />
						</Route>

						<Route path="/app" element={<Layout />}>
							<Route path="/app/home" element={<Home />} />
							<Route path="/app/photos" element={<Photos />} />
							<Route path="*" element={<PageNotFound />} />
						</Route>
					</Routes>
				</Suspense>
			</Router>
		</>
	);
}

export default App;
