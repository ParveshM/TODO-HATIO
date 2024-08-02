import Navbar from "@/components/header/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="mt-14 md:mt-0  mx-2">{<Outlet />}</main>
    </>
  );
};

export default Layout;
