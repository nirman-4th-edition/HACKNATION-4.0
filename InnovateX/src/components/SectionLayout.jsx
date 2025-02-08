import React from 'react';
import './SectionLayout.css'; // Optional: Add styles for this component

const SectionLayout = ({ title, imageSrc, description }) => {
  return (
    <div className="section-layout">
      <div className="section-content">
        <h1>{title}</h1>
        <img src={imageSrc} alt={title} className="section-image" />
        <p className="section-description">{description}</p>
      </div>
    </div>
  );
};

export default SectionLayout;