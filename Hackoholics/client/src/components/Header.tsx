import React from "react";
import { Bell, Menu } from "lucide-react";
import { useUIContext } from "../contexts/ui.context";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string; 
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { toggleSidebar } = useUIContext();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm fixed top-0 left-0 w-full h-16 z-50">
      {/* Left: Hamburger Menu and Optional Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        {title && <h1 className="text-xl font-bold">{title}</h1>}
      </div>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center space-x-4">
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={24} />
        </button>
        <button
          aria-label="View Profile"
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-full"
          onClick={() => navigate("/profile")}
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwa"
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
