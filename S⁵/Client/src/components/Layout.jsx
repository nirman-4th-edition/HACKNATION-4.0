// Layout.js
import React, { useState } from "react";
import Sidebar from "./Sidebar"; 
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex min-h-[100vh] bg-gray-900 text-white">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className="w-full md:w-4/5 p-6">
        <button
          className="md:hidden text-white mb-4"
          onClick={toggleSidebar}
        >
          <FiMenu size={24} />
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;