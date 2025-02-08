import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import video from "../assets/large.mp4";

const SecondPage = () => {
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Staggered animation for main heading words
    const words = textRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Dynamic scroll-based staggered opacity change for paragraph words
    const paragraphWords = gsap.utils.toArray(".p-word");

    gsap.fromTo(
      paragraphWords,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1, // Smooth transition based on scroll
        },
      }
    );
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="h-screen flex items-center justify-between bg-black text-white px-20">
      {/* LEFT CONTENT (Main Animated Text) */}
      <div className="max-w-6xl relative">
        <h1 ref={textRef} className="text-[8rem] font-light leading-[8rem] relative">
          {/* First Line */}
          <div className="flex space-x-8">
            {["It's", "time"].map((word, index) => (
              <span key={index} className="inline-block h-[12rem] overflow-hidden">
                <span className="word inline-block">{word}</span>
              </span>
            ))}
          </div>

          {/* Second Line */}
          <div className="relative flex items-center space-x-8 mt-6">
            {/* Words before the video */}
            {["put", "it"].map((word, index) => (
              <span key={index} className="inline-block h-[12rem] overflow-hidden">
                <span className="word inline-block">{word}</span>
              </span>
            ))}

            {/* Video Positioned Behind "in" and Above "action" */}
            <div className="absolute left-[40%] top-[10%] w-56 h-36 overflow-hidden rounded-lg rotate-6 z-3">
              <img
                src="/thumbnail.jpg"
                alt="Video Placeholder"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <video
                ref={videoRef}
                src={video}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>

            {/* "in" Positioned Above the Video */}
            <span className="inline-block h-[12rem] overflow-hidden z-10">
              <span className="word inline-block">in</span>
            </span>

            {/* Last Word "action" Under the Video */}
            <span className="inline-block h-[12rem] overflow-hidden z-0">
              <span className="word inline-block ml-[6.3vw]">action</span>
            </span>
          </div>
        </h1>
      </div>

      {/* RIGHT CONTENT (Larger Animated Paragraph) */}
      <div className="relative w-[40vw] h-[20vw] left-[3%] top-[10%] transform -translate-y-1/2 ">
        <div className="absolute">
          <p ref={paragraphRef} className="text-[3vw] leading-[3.5rem] text-white font-light">
            {`Unleash your potential with motion. Every movement tells a story, and every action shapes the future. Experience the power of transformation like never before.`.split(
              " "
            ).map((word, index) => (
              <span key={index} className="p-word inline-block opacity-50 mr-2">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecondPage;