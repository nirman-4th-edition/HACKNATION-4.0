import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaTractor, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "./Login";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [navbarBg, setNavbarBg] = useState("bg-white/90 backdrop-blur-md");
  const [isRecOpen, setIsRecOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const linkHover = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavbarBg(
        window.scrollY > 0
          ? "bg-white/70 backdrop-blur-sm"
          : "bg-white/90 backdrop-blur-md"
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const recommendationsItems = [
    { name: "Soil", path: "/recommendations/soil" },
    { name: "Crop", path: "/recommandation/crop" },
    { name: "Fertilizer", path: "/recommandation/fertilizer" },
  ];

  return (
    <nav
      className={`shadow-lg fixed top-0 left-0 right-0 z-50 transition duration-300 ${navbarBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center h-16 flex-wrap">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-green-700 hover:text-green-500 transition duration-300 flex items-center"
            >
              <FaTractor className="mr-2 text-green-600" />
              Krushi Bandhu
            </Link>
          </div>

          {/* Desktop Menu */}
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8 ml-auto">
            {["Testing", "Sell", "Products", "Schemes", "Weather"].map(
              (item) => (
                <motion.div key={item} whileHover={linkHover}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-800 font-semibold lg:text-lg hover:text-green-500 border-b-2 border-transparent hover:border-green-500 transition duration-300 py-2"
                  >
                    {item}
                  </Link>
                </motion.div>
              )
            )}

            {/* Recommendations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsRecOpen(true)}
              onMouseLeave={() => setIsRecOpen(false)}
            >
              <motion.div whileHover={linkHover} className="flex items-center">
                <button className="text-gray-800 font-semibold lg:text-lg hover:text-green-500 border-b-2 border-transparent hover:border-green-500 transition duration-300 py-2 flex items-center">
                  Recommendations <FaCaretDown className="ml-1 text-sm" />
                </button>
              </motion.div>

              <AnimatePresence>
                {isRecOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    {recommendationsItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition duration-300"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden md:flex md:items-center">
            <motion.div whileHover={linkHover}>
              <Link
                to="/login"
                className="text-gray-800 font-semibold lg:text-lg hover:text-green-500 border-b-2 border-transparent hover:border-green-500 transition duration-300 py-2"
              >
                Login
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 focus:outline-none transition duration-300"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 shadow-lg rounded-b-lg mx-auto mb-4"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {[
                "Testing",
                "Recommendations",
                "Sell",
                "Products",
                "Schemes",
                "Weather",
              ].map((item) =>
                item === "Recommendations" ? (
                  <div key={item} className="w-full">
                    <motion.div whileHover={linkHover}>
                      <button
                        onClick={() => setIsRecOpen(!isRecOpen)}
                        className="w-full text-left flex items-center justify-between text-gray-800 hover:text-green-500 transition duration-300 py-2"
                      >
                        {item}{" "}
                        <FaCaretDown
                          className={`transform transition ${
                            isRecOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </motion.div>

                    <AnimatePresence>
                      {isRecOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4"
                        >
                          {recommendationsItems.map((subItem) => (
                            <motion.div
                              key={subItem.name}
                              whileHover={linkHover}
                            >
                              <Link
                                to={subItem.path}
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsRecOpen(false);
                                }}
                                className="block text-gray-600 hover:text-green-500 transition duration-300 py-2"
                              >
                                {subItem.name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div key={item} whileHover={linkHover}>
                    <Link
                      to={`/${item.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="block text-gray-800 hover:text-green-500 transition duration-300 py-2"
                    >
                      {item}
                    </Link>
                  </motion.div>
                )
              )}
              <motion.div whileHover={linkHover}>
                <button
                  onClick={toggleLoginModal}
                  className="block w-full text-left text-gray-800 hover:text-green-500 transition duration-300 py-2"
                >
                  Login
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && <LoginModal onClose={toggleLoginModal} />}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
