import { Navbar } from "../Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
