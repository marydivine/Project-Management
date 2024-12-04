import React from "react";
import {
  FaBoxes,
  FaChartBar,
  FaComments,
} from "react-icons/fa";
import { MdExitToApp, MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isMobileOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Navbar */}
      <Navbar handleLogout={handleLogout} />

      {/* Sidebar */}
      <div
        className={`bg-white h-screen w-64 p-4 fixed top-16 z-50 ${
          isMobileOpen ? "block" : "hidden"
        } lg:flex flex-col`}
      >
        {/* Close button for mobile */}
        <button className="lg:hidden self-end mb-6" onClick={toggleSidebar}>
          <MdClose className="text-2xl text-gray-800" />
        </button>

        <MenuItems />
      </div>
    </div>
  );
};

// Navbar component
const Navbar = ({ handleLogout }) => (
  <div className="bg-gray-800 text-white w-full flex items-center justify-between px-4 py-3 fixed top-0 z-50">
    {/* Logo/Title */}
    <div className="text-3xl ml-7 font-bold">Maxhelp</div>

    {/* Logout button */}
    <button
      onClick={handleLogout}
      className="flex items-center text-sm text-red-400 hover:text-red-600"
    >
      <MdExitToApp className="mr-1 text-2xl" /> Logout
    </button>
  </div>
);

const MenuItems = () => (
  <ul className="space-y-4">
    {/* Inventory */}
    <li>
      <Link
        to="/inventory"
        className="flex items-center mb-10 text-gray-800 cursor-pointer"
      >
        <FaBoxes className="mr-3" /> Inventory
      </Link>
    </li>
    {/* Sales */}
    <li>
      <Link
        to="/sales"
        className="flex items-center mb-10 text-gray-800 cursor-pointer"
      >
        <FaChartBar className="mr-3" /> Sales
      </Link>
    </li>
    {/* Feedback */}
    <li>
      <Link
        to="/feedback"
        className="flex items-center mb-10 text-gray-800 cursor-pointer"
      >
        <FaComments className="mr-3" /> Feedback
      </Link>
    </li>
  </ul>
);

export default Sidebar;
