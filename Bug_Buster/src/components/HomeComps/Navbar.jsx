/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navData = [
    { dataName: "Home", dataLink: "/" },
    { dataName: "Remote", dataLink: "/Remote" },
    { dataName: "About us", dataLink: "/aboutus" },
    { dataName: "insignts", dataLink: "/insignts" },
    { dataName: "Contact us", dataLink: "/contact" }
  ];

  return (
    <div className="fixed bg-white/5 backdrop-blur-sm z-[999] w-full h-auto px-20 py-5 font-neuemontreal flex justify-between items-center">
      <div className="logo font-foundersgrotesk text-4xl leading-none flex items-center relative top-1">
        <a href="/" className="text-black">Bug Busters</a>
      </div>
      <div className="links flex gap-10">
        {navData.map((item, index) =>
          <Link
            to={item.dataLink}
            className={`text-xl tracking-wide font-semibold text-[#000000] capitalize ${index ===
              4 && "ml-32"}`}
            key={index}
          >
            {item.dataName}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
