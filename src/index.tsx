import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import "react-multi-carousel/lib/styles.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App";
import { store } from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-tailwind/react";
import { LoadingProvider } from "contexts/LoadingContext";
import {SocketContext, socket} from 'contexts/Socket';

// const theme = {
//   colors: {
//     primary: "var(--primary)", // Use the primary color defined in your Tailwind CSS configuration
//   },
// };

const container = document.getElementById("root") as HTMLDivElement;
// container.classList.add("h-screen")
// container.classList.add("min-h-[400px]")
const root = createRoot(container);

root.render(
	<SocketContext.Provider value={socket}>
		<GoogleOAuthProvider clientId="849104723721-95upc18ch0oqea7qm819u1nrujt6nedk.apps.googleusercontent.com">
			<Provider store={store}>
				<ThemeProvider>
					<LoadingProvider>
						<App />
					</LoadingProvider>
				</ThemeProvider>
			</Provider>
		</GoogleOAuthProvider>
	</SocketContext.Provider>
);
