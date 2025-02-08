/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import React from 'react'


const Marquee = () => {
  return <div data-scroll data-scroll-section data-scroll-speed=".1" className="h-auto w-full -mt-32 py-10 rounded-tl-3xl rounded-tr-3xl bg-[#501E0B]">
      <div className="texts border-t-2 border-b-2 border-transparent justify-center flex items-center overflow-hidden whitespace-nowrap">
        {["Bug busters", "Bug busters", "Bug busters"].map((items, index) =>
          <motion.h1
            key={index}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", repeat: Infinity, duration: 10 }}
            className="text-[28vw] leading-none font-foundersgrotesk uppercase -mb-36 pt-12 text-[#EDC202] pr-20"
          >
            {items}
          </motion.h1>
        )}
      </div>
    </div>;
}

export default Marquee