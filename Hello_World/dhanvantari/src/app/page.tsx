"use client"

import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { getSlideLeftVariants, getSlideRightVariants } from "@/lib/framerVariants";
// import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion"
import { MoveRight } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const height = useTransform(scrollYProgress, [0, 1], ["63vh", "100vh"]);
  const width = useTransform(scrollYProgress, [0, 1], ["26vw", "100vw"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0", "-9rem"]);
  const x = useTransform(scrollYProgress, [0, 1], ["0", "-1rem"]);

  return (
    <div className=" w-full h-[200vh] relative">
      <div className=" sticky top-0 h-fit w-full">
        <AuroraBackground>
          <div className="h-full w-full flex items-center justify-start px-12 pt-8 bg-gradient-to-l from-gray-900 via-green-900 to-emerald-900">
            <Navbar />

            <motion.div
              className=" absolute z-50 top-24 right-0 w-[35vw] h-[75vh] bg-white/20 backdrop-blur-sm rounded-l-md"
              initial="initial"
              animate="animate"
              variants={getSlideLeftVariants(0.3)}
            >
              <motion.div
                className=" h-[63vh] w-[14vw] bg-white rounded-2xl absolute top-12 -left-16 shadow-black/40 shadow-inner"
                initial="initial"
                animate="animate"
                variants={getSlideLeftVariants(0.6)}
              >

              </motion.div>

              <motion.div
                className=" bg-white rounded-2xl absolute z-[1000] top-12 -right-4 shadow-inner shadow-black/40 "
                initial="initial"
                animate="animate"
                variants={getSlideLeftVariants(0.9)}
                style={{ width, height, y, x }}
              >

              </motion.div>
            </motion.div>

            <div className=" w-[55%] flex flex-col gap-8 relative">
              <motion.h1
                className=" text-6xl font-semibold text-white/90 leading-[5rem]"
                initial="initial"
                animate="animate"
                variants={getSlideRightVariants(0.3)}
              >
                <span className=" text-green-400 underline decoration-wavy font-normal decoration-4 underline-offset-8">AI-</span>Powered Healthcare <br /> Just for you! <span className=" text-green-400 underline decoration-wavy font-normal decoration-4 underline-offset-8">24/7</span>
              </motion.h1>

              <motion.div
                className=" flex gap-6"
                initial="initial"
                animate="animate"
                variants={getSlideRightVariants(0.6)}
              >
                <button className=" btn-gradient2 relative w-36 flex items-center justify-center group " onClick={() => console.log("Demo")} >
                  <h2 className=" group-hover:-translate-x-4 transition-all duration-300">Get Started</h2>
                  <span className=" absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <MoveRight />
                  </span>
                </button>
              </motion.div>
            </div>

          </div>
        </AuroraBackground>
      </div>
    </div>
  );
}
