/* eslint-disable no-unused-vars */
import React from 'react'
import image1 from "/src/assets/logo001.svg";
import image2 from "/src/assets/logo002.svg";
import image3 from "/src/assets/logo003.png";
// data-scroll data-scroll-section data-scroll-speed="-.1"
const Cards = () => {
  return <div  className="w-full h-screen bg-whites flex items-center gap-5 pb-20 px-16">
      <div className="cardcontainer w-1/2">
        <div className="card relative w-full h-[50vh] bg-[#004C42] rounded-xl ">
          <img src={image1} alt="logo" className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]" />
          <button className="absolute bottom-5 left-5 font-bold text-xl text-[rgb(205,235,105)] border-[1px] px-6 py-3 rounded-full border-[rgb(205,235,105)]">
            &copy;2019–2022
          </button>
        </div>
      </div>
      <div className="cardcontainer flex w-1/2 gap-5">
        <div className="card relative w-1/2 h-[50vh] bg-[#202120] rounded-xl">
          <img src={image2} alt="logo" className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]" />
          <button className="absolute bottom-5 left-5 font-bold text-xl text-white uppercase border-[1px] px-6 py-3 rounded-full border-[rgb(255,255,255)]">
            Rating 5.0 on Clutch
          </button>
        </div>
        <div className="card relative w-1/2 h-[50vh] bg-[#202120] rounded-xl">
          <img width="102" height="104" src={image3} alt="logo" className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]" />
          <button className="absolute bottom-5 left-5 font-bold text-xl text-white uppercase border-[1px] px-6 py-3 rounded-full border-[rgb(255,255,255)]">
            Rating 5.0 on Clutch
          </button>
        </div>
      </div>
    </div>;
}

export default Cards