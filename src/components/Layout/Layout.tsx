import { Navbar } from "../Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-primaryBackground min-h-screen">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
