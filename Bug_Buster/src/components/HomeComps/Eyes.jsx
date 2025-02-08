/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const Eyes = () => {
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
  return (
    <div className="h-screen w-full bg-whites overflow-hidden">
      <div
        data-scroll
        data-scroll-section
        data-scroll-speed="-.8"
        className=" relative h-full w-full bg-[url(https://Ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-1440x921.jpg)] bg-cover bg-center"
      >
        <div className="eyesBox absolute top-1/3 left-1/2 -translate-x-[50%] -translate-y-[50%] flex items-center gap-10 ">
          <div className="w-[13vw] rounded-full h-[13vw] bg-zinc-100 flex items-center justify-center">
            <div className="w-2/3 h-2/3 overflow-hidden rounded-full bg-zinc-900 relative">
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`
                }}
                className="line w-full h-10 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100" />
              </div>
            </div>
          </div>
          <div className="w-[13vw] rounded-full h-[13vw] bg-zinc-100 flex items-center justify-center">
            <div className="w-2/3 h-2/3 overflow-hidden rounded-full bg-zinc-900 relative">
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`
                }}
                className="line w-full h-10 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100" />
              </div>
              {/* <h1 className="uppercase font-neuemontreal absolute h-full w-full text-white top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">PLAY</h1> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eyes;
