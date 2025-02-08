/* eslint-disable no-unused-vars */
import React from "react";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "../HomeComps/Navbar";
import Landing from "../HomeComps/Landing";
import Marquee from "../HomeComps/Marquee";
import About from "../HomeComps/About";
import Featured from "../HomeComps/Featured";
import Eyes from "../HomeComps/Eyes";
import Reviews from "../HomeComps/Reviews";
import Footer from "../HomeComps/Footer";
import PresentProject from "../HomeComps/PresentProject";

const HomePage = () => {
  const locomotiveScroll = new LocomotiveScroll();

  return (
    <div className="w-full min-h-screen bg-[#d66b23]">
      <Navbar />
      <Landing />
      <Marquee />
      <About />
      <Eyes />
      <Featured />
      <Reviews />
      <PresentProject />
      <Footer />
    </div>
  );
};

export default HomePage;
