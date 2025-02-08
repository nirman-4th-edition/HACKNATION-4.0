import React from "react";
// import { NavLink } from "react-router-dom";
import "./PD_LandingPage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import PD_About from "./PD_About";
import PD_check from "./PD_check";

export default function PD_LandingPage() {
  React.useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <div className="landing-page">
        <div className="intro-section " data-aos="fade-up">
          <h1>
            Empowering Lives Through Awareness: Understanding Parkinson’s
            Disease
          </h1>
          <p>
            Parkinson’s disease is a progressive neurological disorder that
            affects movement and coordination. It occurs due to the gradual loss
            of dopamine-producing neurons in the brain. Symptoms such as
            tremors, stiffness, and slow movement develop over time. If left
            untreated, Parkinson’s can lead to severe mobility issues and affect
            overall quality of life.
          </p>

          {/* <NavLink to="/about" className="read-more-btn">READ MORE</NavLink> */}
        </div>
        <div className="image-section" data-aos="fade-up">
          <img src="\pd-1.png" alt="Breast Cancer Awareness" />
        </div>
      </div>
      <PD_About />
      <PD_check />
    </>
  );
}
