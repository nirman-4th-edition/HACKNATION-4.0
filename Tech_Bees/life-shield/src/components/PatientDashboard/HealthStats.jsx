import React from "react";
import "./styles.css";

const HealthStats = () => {
  return (
    <div className="health-stats">
      <div className="stat-box">
        <h3>BMI</h3>
        <p>22.5 (Normal)</p>
      </div>
      <div className="stat-box">
        <h3>Blood Pressure</h3>
        <p>120/80 mmHg</p>
      </div>
      <div className="stat-box">
        <h3>Health Condition</h3>
        <p>Good</p>
      </div>
    </div>
  );
};

export default HealthStats;
