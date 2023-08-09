import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import PageNotFound from "components/PageNotFound";
import FullScreenLoader from "components/FullScreenLoader";
import { Home, Photos } from "./routes";

function App() {
	return (
		<>
			<FullScreenLoader />
			<Router>
				<Suspense fallback={<FullScreenLoader />}>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} />

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
