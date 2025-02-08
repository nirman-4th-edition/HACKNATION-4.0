
import { Home, Store, Users, Settings,Search, ShoppingCart, User } from "lucide-react";
import logo1 from "../assets/logo.jpg";


const navItems = [
  { name: "Home", icon: Home, link: "/home" },
  { name: "Shop", icon: Store, link: "#" },
  { name: "Customers", icon: Users, link: "#" },
  { name: "Settings", icon: Settings, link: "#" },
];
export default function Navbar() {
  return (
    <nav className="bg-forest text-white p-4 shadow-md flex justify-between items-center">
      {/* Logo and Title Group with Reduced Spacing */}
      <div className="flex items-center gap-x-2">
        <img src={logo1} alt="Logo" className="w-12 h-12" />
        <h1 className="text-2xl font-bold">Farm2You</h1>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <a href="/home" className="hover:text-gray-200">Home</a>
        <a href="/about" className="hover:text-gray-200">About</a>
        <a href="#" className="hover:text-gray-200">Products</a>
        <a href="/contact" className="hover:text-gray-200">Contact</a>
      </div>

      {/* Icons */}
      {/* Icons */}
<div className="flex space-x-4">
  <a href="/search" className="cursor-pointer">
    <Search />
  </a>
  <a href="/cart" className="cursor-pointer">
    <ShoppingCart />
  </a>
  <a href="/bprofile" className="cursor-pointer">
    <User />
  </a>
</div>
    </nav>
  );
}
