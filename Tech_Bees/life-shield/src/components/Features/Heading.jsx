import React, { useEffect, useRef } from "react";
import "./Heading.css";

export default function Heading() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="text-center fade-in" ref={sectionRef}>
      <span className="subheading">Simple Process</span>
      <h2 className="title">How It Works</h2>
      <p className="description">
        Your Gateway to Healthcare Staffing - Follow these simple steps to get started with MediShifts
      </p>
    </div>
  );
}
