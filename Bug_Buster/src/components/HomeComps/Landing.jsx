/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import React from "react";
import { MdArrowOutward } from "react-icons/md";

const Landing = () => {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed=".2"
      className="w-full bg-[url('/src/assets/bgImage.png')] bg-no-repeat bg-cover bg-center pt-1 pb-0"
    >
      <div className="text-struct mt-52 px-20">
        {[
          "The best fire is",
          "the one that",
          "never starts"
        ].map((item, index) =>
          <div key={index} className="masker ">
            <div className="w-fit flex items-end overflow-hidden">
              {index === 1 &&
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "9vw" }}
                  transition={{ ease: [0.76, 0, 0.24, 1], duration: 1 }}
                  className="w-[9vw] rounded-md mr-[1vw]  h-[5.7vw] -top-[.8vw] bg-[url('/src/assets/tenor.gif')] bg-cover bg-center relative "
                />}
              <h1 className="uppercase pt-[3vw] font-foundersgrotesk text-[8.5vw] text-[#1c1c1c] leading-[.5] font-bold">
                {item}
              </h1>
            </div>
          </div>
        )}
      </div>
      <div className="border-t-[1px] border-transparent !text-white mt-32 flex justify-between items-center">
        {[
          "For Big to Small companies",
          "The power of AI and IoT"
        ].map((item, index) =>
          <p
            className="text-[#fff] py-8 relative top-10 px-20 text-xl font-sans"
            key={index}
          >
            {item}
          </p>
        )}
        <div className="start flex px-16 gap-2 relative top-10 items-center">
          <div className="px-5 py-3  font-medium border-[1px] cursor-pointer border-[#fff] text-sm capitalize rounded-full">
            START THE PROJECT
          </div>
          <div className="h-12 w-12 rounded-full border-[1px] cursor-pointer border-[#fff] flex items-center justify-center">
            <MdArrowOutward className="h-6 w-8" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-16">
        <span className="text-[1.25rem] font-neuemontreal font-light text-[#fff]">
          Scroll down
        </span>
      </div>
    </div>
  );
};

export default Landing;
