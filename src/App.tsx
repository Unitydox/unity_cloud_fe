import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { Home, Photos } from "./routes";

function App() {
	return (
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />

					<Route path="/app" element={<Layout />}>
						<Route path="/app/home" element={<Home />} />
						<Route path="/app/photos" element={<Photos />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
}

export default App;
