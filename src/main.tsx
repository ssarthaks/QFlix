import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MoviesProvider } from "./context/MoviesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <MoviesProvider>
    <App />
  </MoviesProvider>
);
