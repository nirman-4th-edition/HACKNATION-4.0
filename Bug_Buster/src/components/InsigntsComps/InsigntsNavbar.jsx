/* eslint-disable no-unused-vars */
import React from "react";

const InsigntsNavbar = () => {
  const navData = [
    { dataName: "Home", dataLink: "/" },
    { dataName: "Explore", dataLink: "/explore" },
    { dataName: "Subscriptions", dataLink: "/subscriptions" },
    { dataName: "Library", dataLink: "/library" }
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-transparent h-16 flex justify-between items-center px-6 z-[999]">
      <div className="logo text-2xl font-bold">
        <h1>Bug Busters</h1>
      </div>
      <div className="links flex gap-8">
        {navData.map((item, index) =>
          <a
            href={item.dataLink}
            className="text-white text-sm tracking-wide capitalize"
            key={index}
          >
            {item.dataName}
          </a>
        )}
      </div>
    </div>
  );
};

export default InsigntsNavbar;
