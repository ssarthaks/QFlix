import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MovieProvider } from "./context/MoviesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <MovieProvider>
    <App />
  </MovieProvider>
);
