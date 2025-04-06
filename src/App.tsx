import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import Discover from "./pages/Discover";
import MovieDetails from "./pages/MovieDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/movie" element={<MovieDetails />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
