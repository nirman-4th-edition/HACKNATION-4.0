import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FourthPage = () => {
  const containerRef = useRef(null);
  const divRefs = useRef([]);

  useEffect(() => {
    gsap.set(divRefs.current, { y: '100vh', scale: 1.2, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: true,
        pin: true,
      },
    });

    divRefs.current.forEach((ref, index) => {
      if (ref) {
        tl.to(ref, {
          y: '0vh',
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
        })
        .to(ref, {
          scale: 0.8,
          opacity: 0.5,
          duration: 1.5,
          ease: 'power2.in',
        }, "+=0.5");
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="w-screen h-screen flex items-center justify-center bg-gray-900 overflow-hidden relative">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          ref={el => (divRefs.current[index] = el)}
          className="absolute w-[90vw] h-[90vh] bg-blue-500 flex items-center justify-center text-white text-4xl font-bold"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          Div {index + 1}
        </div>
      ))}
    </div>
  );
};

export default FourthPage;