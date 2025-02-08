import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  TrendingUp,
  BookOpen,
  Award,
  ShoppingBag,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: TrendingUp, label: "Expense Tracker", path: "/expenses" },
  { icon: BookOpen, label: "Learn", path: "/learn" },
  { icon: Award, label: "Rewards", path: "/rewards" },
  { icon: ShoppingBag, label: "Shop", path: "/shop" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out z-40",
          isOpen ? "w-64" : "w-0 lg:w-64"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary">PennyPilot</h2>
          </div>

          <nav className="flex-1 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "hover:bg-secondary/20"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          
        </div>
      </div>
    </>
  );
};