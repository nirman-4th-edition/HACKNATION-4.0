import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrowserRouter as Router, useNavigate } from "react-router-dom"; // ✅ Wrap in Router if missing
gsap.registerPlugin(ScrollTrigger);
import video from "../assets/bgvideo2.mp4";

const FifthPageContent = () => {  // ✅ Separate Component Inside Router
  const containerRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();  // ✅ Now useNavigate() works!

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([topTextRef.current, bottomTextRef.current], { opacity: 0, y: 100 });

      const textAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 100%",
          end: "center 50%",
          scrub: 1,
        },
      });

      textAnimation.to(topTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      });

      textAnimation.to(bottomTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 100%",
        onEnter: () => videoRef.current?.play(),
        onLeaveBack: () => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-screen h-screen relative overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video}
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <div className="overflow-hidden">
          <h1 ref={topTextRef} className="text-[8vw] font-bold">
            Your Heading Text
          </h1>
        </div>
        <div className="overflow-hidden mt-2">
          <h3 ref={bottomTextRef} className="text-[1.7vw] tracking-tight">
            Your Subheading Text
          </h3>
        </div>
        <div className="overflow-hidden mt-[10vw]">
          <button
            onClick={() => navigate("/questionnaire")} // ✅ Works inside Router
            className="text-[1vw] h-[3vw] w-[8vw] bg-white text-black rounded-[2vw] cursor-pointer"
          >
            Try now
          </button>
        </div>
      </div>
    </section>
  );
};

// ✅ Wrap Only If Router is Missing
const FifthPage = () => {
  return (
    <Router>
      <FifthPageContent />
    </Router>
  );
};

export default FifthPage;