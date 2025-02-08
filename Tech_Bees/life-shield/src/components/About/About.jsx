import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./About.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div
          className="about-text"
          data-aos="fade-up "
          data-aos-anchor-placement="top-center"
        >
          <h2 className="aos -init aos-animate" data-aos="fade-up ">
            About Us
          </h2>
          <p
            className="aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            At Life-Shield, we’re revolutionizing healthcare staffing by
            connecting hospitals with skilled and verified healthcare
            professionals for short-term, high-impact roles. Whether you’re a
            doctor or nurse looking to earn extra income during your free time
            or a hospital needing temporary staffing solutions, Medishifts is
            your trusted partner.
          </p>
          <p
            className="aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Our platform bridges the gap between opportunity and availability,
            offering:
            <ul>
              <li>
                <strong>Verified Professionals:</strong> Only qualified and
                vetted healthcare workers are listed.
              </li>
              <li>
                <strong>Flexibility:</strong> Short-term, high-paying jobs
                tailored to your schedule.
              </li>
              <li>
                <strong>Quick Solutions:</strong> Hospitals can hire
                professionals without the hassle of traditional recruitment
                processes.
              </li>
            </ul>
          </p>
          <p
            data-aos="fade-up"
            className="aos-init aos-animate"
            data-aos-delay="300"
          >
            We’re on a mission to empower healthcare professionals while
            supporting hospitals in providing seamless patient care. Join us in
            transforming the future of healthcare staffing in India.
          </p>
          <blockquote
            className=" aos-init aos-animate"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Lifeshield – Flexible Solutions, Trusted Professionals
          </blockquote>
        </div>
        <div
          className="about-image aos-init aos-animate"
          data-aos="fade-up"
          data-aos-anchor-placement="center-center"
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg"
            alt="Doctor"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
