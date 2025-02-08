import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ThirdPage = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  useEffect(() => {
    const text = textRef.current;
    text.style.opacity = "0.2"; //initial opacity

    text.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = text.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      text.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.3) 50%, transparent 90%)`;
      text.style.webkitBackgroundClip = "text";
      text.style.color = "transparent";
      text.style.opacity = "1";
    });

    text.addEventListener("mouseleave", () => {
      gsap.to(text, {
        opacity: 0.2,
        duration: 0.7,
        ease: "power2.out",
        background: "none",
        color: "white",
      });
    });
  }, []);

  return (
    <section className="h-[100vh] flex items-center justify-center flex-col gap-[1vw] bg-black text-white relative overflow-hidden">
      {/* Glowing Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-[1vw] h-[1vw] bg-white opacity-40 blur-lg rounded-full pointer-events-none cursor-pointer z-50"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>
      {/* Heading Text */}
      {/* <div className="w-[8vw] h-[8vw] bg-red-800">
        <img src="" alt="" />
      </div> */}
      <div className="w-screen h-[2.5vw] flex items-center justify-center">
        <h3 className="text-[1.6vw]">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h3>
      </div>
      {/* Centered Text Container */}
      <div className="w-[75vw] h-[30vw] cursor-pointer text-center flex items-center justify-center">
        <h1
          ref={textRef}
          className="text-[4vw] relative leading-tight"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi explicabo suscipit, beatae rerum error saepe repellendus? Veniam possimus corrupti ullam, quasi officia praesentium, odio esse fuga exercitationem voluptates beatae quisquam?
        </h1>
      </div>
    </section>
  );
};

export default ThirdPage;