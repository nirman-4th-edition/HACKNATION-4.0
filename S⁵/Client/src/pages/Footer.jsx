import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-6 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-lg">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-6">
          <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-gray-400 transition">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;