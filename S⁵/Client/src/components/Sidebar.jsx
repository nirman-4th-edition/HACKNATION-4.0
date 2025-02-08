// Sidebar.js
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Expenses", path: "/expenses" },
    { name: "Insights", path: "/insights" },
    { name: "Budget", path: "/budget" },
    { name: "Tax", path: "/tax" },
    { name: "Settings", path: "/settings" },
  ];
  console.log("comming...")
  const handleNavigation = (path) => {
    console.log(path);

    navigate(path)
  }

  return (
    <aside
      className={`bg-gray-800 p-5 min-h-[100vh] fixed md:relative top-0 left-0 w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform md:translate-x-0 md:w-1/5`}
    >
      {/* <button className="md:hidden text-white mb-4" onClick={toggleSidebar}>
        ✖
      </button> */}
      <h1 className="text-xl font-bold mb-5">AI-rath</h1>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.path} className="mb-4">
              <p onClick={()=>handleNavigation(link.path)}>{link.name}</p>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;