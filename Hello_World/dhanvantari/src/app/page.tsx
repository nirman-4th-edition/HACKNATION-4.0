import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
// import Image from "next/image";

export default function Home() {
  return (
    <AuroraBackground>
      <div className=" min-h-svh w-full flex items-center justify-start px-12 pt-8 bg-gradient-to-l from-gray-900 via-green-900 to-emerald-900">
        <Navbar />

        <div className=" absolute top-24 right-0 w-[35vw] h-[75vh] bg-white/20 backdrop-blur-sm rounded-l-md">
          <div className=" h-[85%] w-[40%] bg-white rounded-2xl absolute top-12 -left-16 shadow-black/40 shadow-inner">

          </div>

          <div className=" h-[85%] w-[70%] bg-white rounded-l-2xl absolute top-12 right-0 shadow-inner shadow-black/40 ">

          </div>
        </div>

        <div className=" w-[55%] flex flex-col gap-8">
          <h1 className=" text-6xl font-semibold text-white/90 leading-[5rem]">
            <span className=" text-green-400 underline decoration-wavy font-normal decoration-4 underline-offset-8">AI-</span>Powered Healthcare <br /> Just for you! <span className=" text-green-400 underline decoration-wavy font-normal decoration-4 underline-offset-8">24/7</span>
          </h1>

          <div className=" flex gap-6">
            <button className=" btn-gradient2">
              Demo
            </button>
            <button className=" btn-gradient2">
              Demo
            </button>
          </div>
        </div>

      </div>
    </AuroraBackground>
  );
}
