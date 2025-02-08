/* eslint-disable no-unused-vars */
import React from "react";

const Footer = () => {
  return <div data-scroll data-scroll-section data-scroll-speed=".5" className="h-screen flex w-fyll bg-[#d66b23] p-20">
      <div className="w-1/2 h-full flex flex-col justify-between font-foundersgrotesk py-6">
        <div className="heading">
          <h1 className="uppercase text-[8vw] leading-none -mb-10">Eye-</h1>
          <h1 className="uppercase text-[8vw] leading-none -mb-10">
            Opening
          </h1>
        </div>
        <div className="logo font-foundersgrotesk text-4xl leading-none flex items-center relative top-1">
          <h1>Bug Busters</h1>
        </div>
      </div>
      <div className="w-1/2 font-foundersgrotesk px-6 py-10 relative">
        <h1 className="uppercase text-[8vw] leading-none -mb-10">
          Innovation
        </h1>
        <div className="links1 pb-5">
          <h1 className="font-neuemontreal py-20 pb-5 text-2xl">S:</h1>
          <li className="flex flex-col font-neuemontreal text-xl">
            <a href="/">Instagram</a>
            <a href="/">Facebook</a>
            <a href="/">Behance</a>
            <a href="/">Linkedin</a>
          </li>
        </div>
        <div className="links2 relative flex items-center justify-between  bottom-16">
          <ul className="flex flex-col">
            <h1 className="font-neuemontreal py-20 pb-5 text-2xl">L:</h1>
            <li className="flex flex-col font-neuemontreal text-xl pb-5">
              <a href="/">Trident Academy of Technology</a>
              <a href="/">Bhubaneswar, Odisha</a>
            </li>
            <li className="flex flex-col font-neuemontreal text-xl pb-5">
              <a href="/">Trident Academy of Creative Technology</a>
              <a href="/">Bhubaneswar, Odisha</a>
            </li>
          </ul>
          <ul className="flex flex-col gap-5">
            <h1 className="font-neuemontreal text-2xl absolute -top-1">M:</h1>
            <li className="flex flex-col font-neuemontreal text-xl">
              <a href="/">Home</a>
              <a href="/">Services</a>
              <a href="/remote">Remote</a>
              <a href="/">About us</a>
              <a href="/">Insights</a>
              <a href="/">Contact us</a>
            </li>
          </ul>
        </div>

        <div className="links3 relative bottom-20">
          <h1 className="font-neuemontreal py-20 pb-5 text-2xl ">E:</h1>
          <a href="mailto:soumyaranjanpraharaj04@gmail.com" className="font-neuemontreal text-2xl">
            hello@BugBusters.design
          </a>
        </div>

        <a href="mailto:soumyaranjanpraharaj04@gmail.com" className="font-neuemontreal text-2xl absolute top-full py-5 flex items-center text-[#000]">
          &copy; Bug Busters design 2024. <a href="/">Legal Terms</a>
        </a>
      </div>
    </div>;
};

export default Footer;
