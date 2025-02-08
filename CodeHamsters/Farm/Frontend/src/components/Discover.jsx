import React from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const Discover = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1094544/pexels-photo-1094544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", // Replace with your image URL
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Integration of AI in Agriculture Matters to <br /> the Future of Development
        </motion.h1>

        <motion.button
          className="mt-8 bg-green-600 text-white px-6 py-3 text-lg font-medium rounded-lg shadow-md hover:bg-yellow-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          DISCOVER MORE
        </motion.button>

        <div className="absolute bottom-10 flex items-center space-x-2">
          <FaPlay className="text-yellow-400" size={24} />
          <motion.p
            className="text-yellow-400 text-lg font-medium cursor-pointer hover:underline"
            whileHover={{ scale: 1.1 }}
          >
            Watch the video
          </motion.p>
        </div>

        <div
          className="absolute bottom-5 right-5 bg-yellow-400 p-3 rounded-full cursor-pointer hover:bg-yellow-500 shadow-lg"
        >
          <span className="text-black font-bold">↑</span>
        </div>
      </div>
    </div>
  );
};

export default Discover;
