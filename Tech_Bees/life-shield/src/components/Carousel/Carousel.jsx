import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LandingTry.css";

function LandingTry() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const toggleNav = () => {
    document.getElementById("nav-list").classList.toggle("show-nav");
  };

  return (
    <div className="main-box">
      <header className="section-wrapper header-wrapper">
        <div className="header-img" data-aos="fade-up">
          <img src="./doctor4_enhanced.png" alt="hospital-header" />
        </div>
        <div className="header-text" data-aos="fade-left">
          <h2>Empowering Your Health with Advanced Treatment and Compassion</h2>
          <h1>Your Health is Our Priority</h1>
          <p>
            At LifeShield, we provide comprehensive healthcare services to
            ensure you and your family stay healthy. Discover our range of
            medical services, state-of-the-art facilities, and dedicated
            healthcare professionals.
          </p>
        </div>
      </header>
    </div>
  );
}

export default LandingTry;
