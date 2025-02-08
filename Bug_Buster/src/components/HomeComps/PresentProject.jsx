/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

const PresentProject = () => {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    window.addEventListener("mousemove", e => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      let deltaX = mouseX - window.innerWidth / 2;
      let deltaY = mouseY - window.innerHeight / 2;

      var redians = Math.atan2(deltaY, deltaX);
      var angle = redians * (180 / Math.PI);
      setRotate(angle - 180);
    });
  });
  return <div data-scroll data-scroll-section data-scroll-speed="-.4"  className="h-screen relative w-full bg-[#CDEA68] ">
      <div className="texts w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13vw] tracking-wide text-center">
        <h1 className="font-foundersgrotesk font-bold uppercase  leading-none -mb-10">
          Ready
        </h1>
        <h1 className="font-foundersgrotesk font-bold uppercase  leading-none -mb-10">
          To Connect
        </h1>
        <h1 className="font-foundersgrotesk font-bold uppercase  leading-none -mb-10">
          With Project?
        </h1>
      </div>
      <div className="eyesBox absolute top-1/3 left-1/2 -translate-x-[50%] -translate-y-[50%] flex items-center gap-10 ">
        <div className="w-[13vw] rounded-full h-[13vw] bg-zinc-100 flex items-center justify-center">
          <div className="w-2/3 h-2/3 overflow-hidden rounded-full bg-zinc-900 relative">
            <div style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg)` }} className="line w-full h-10 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
              <div className="w-10 h-10 rounded-full bg-zinc-100" />
            </div>
          </div>
        </div>
        <div className="w-[13vw] rounded-full h-[13vw] bg-zinc-100 flex items-center justify-center">
          <div className="w-2/3 h-2/3 overflow-hidden rounded-full bg-zinc-900 relative">
            <div style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg)` }} className="line w-full h-10 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
              <div className="w-10 h-10 rounded-full bg-zinc-100" />
            </div>
            {/* <h1 className="uppercase font-neuemontreal absolute h-full w-full text-white top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">PLAY</h1> */}
          </div>
        </div>
      </div>
    </div>;}

export default PresentProject