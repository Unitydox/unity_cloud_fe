import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import "./index.css"
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";

// const theme = {
//   colors: {
//     primary: "var(--primary)", // Use the primary color defined in your Tailwind CSS configuration
//   },
// };

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
