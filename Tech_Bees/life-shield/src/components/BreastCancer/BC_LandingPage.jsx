import React from "react";
import { NavLink } from "react-router-dom";
import "./BC_LandingPage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import BC_About from "./BC_About";
import BC_check from "./BC_check";

export default function BC_LandingPage() {
  React.useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <div className="landing-page">
        <div className="intro-section " data-aos="fade-up">
          <h1>
            Empowering Lives Through Awareness: Understanding Breast Cancer
          </h1>
          <p>
            Breast cancer is a disease in which cells in the breast grow
            uncontrollably. These cells form a tumor that can be felt as a lump
            or seen on an X-ray. If left untreated, breast cancer cells can
            spread to other parts of the body.
          </p>
        </div>
        <div className="image-section" data-aos="fade-up">
          <img src="\breast-back.png" alt="Breast Cancer Awareness" />
        </div>
      </div>
      <BC_About />
      <BC_check />
    </>
  );
}
