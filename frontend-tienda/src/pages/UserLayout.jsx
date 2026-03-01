import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
    </>
  );
}

export default UserLayout;