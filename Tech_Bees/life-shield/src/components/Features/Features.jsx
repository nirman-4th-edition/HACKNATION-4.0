import React, { useEffect } from "react";
import "./Features.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Heading from "./Heading";
import Separator from "./Separator";

function Features() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const featuresData = [
    {
      id: 1,
      title: "Predict Parkinson's Disease Risk",
      description:
        "Enter your basic details and lifestyle habits to receive AI-powered predictions on your risk of developing Parkinson's disease.",
      icon: "activity",
      colorClass: "blue",
    },
    {
      id: 2,
      title: "Predict Breast Cancer Risk",
      description:
        "Provide essential health and lifestyle information to obtain AI-driven predictions on your likelihood of developing breast cancer.",
      icon: "activity",
      colorClass: "blue",
    },
    {
      id: 3,
      title: "1-to-1 Medical Consultation",
      description:
        "Connect with leading healthcare professionals for personalized medical advice, treatment plans, and expert guidance.",
      icon: "user-md",
      colorClass: "green",
    },
    {
      id: 4,
      title: "Find the Best Hospitals",
      description:
        "Get recommendations for the best hospitals based on your health needs.",
      icon: "hospital",
      colorClass: "yellow",
    },
    {
      id: 5,
      title: "Medicine & Treatment Advice",
      description:
        "Get expert guidance on suitable medicines and treatment options by our reputed consultants.",
      icon: "pill",
      colorClass: "emerald",
    },
    {
      id: 6,
      title: "Health Records Management",
      description:
        "Securely store and access your medical records anytime, anywhere.",
      icon: "file-medical",
      colorClass: "orange",
    },
  ];

  return (
    <>
      <Heading />
      <Separator title={"Key Features"} />
      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <div
            key={feature.id}
            className="feature-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className={`feature-bg ${feature.colorClass}`}></div>
            <div className="feature-content">
              <div className="feature-number">{feature.id}</div>
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`icon ${feature.icon}`}
                >
                  {feature.icon === "activity" && (
                    <path d="M3 12h4l3 8 4-16 3 8h4" />
                  )}
                  {feature.icon === "user-md" && (
                    <path d="M9 11V8a3 3 0 0 1 6 0v3M12 14v4" />
                  )}
                  {feature.icon === "heart" && (
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
                  )}
                  {feature.icon === "hospital" && (
                    <path d="M19 21V3H5v18M3 21h18" />
                  )}
                  {feature.icon === "pill" && <path d="M16.5 7.5 7.5 16.5" />}
                  {feature.icon === "file-medical" && (
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                  )}
                </svg>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Features;
