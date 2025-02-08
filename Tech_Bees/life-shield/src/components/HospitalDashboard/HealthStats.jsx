import React from "react";
import "./HospitalStats.css";

const HospitalStats = () => {
  return (
    <div className="hospital-stats">
      <div className="stat-box">
        <h3>Total Patients</h3>
        <p>250</p>
      </div>
      <div className="stat-box">
        <h3>Doctors Available</h3>
        <p>45</p>
      </div>
      <div className="stat-box">
        <h3>Appointments Today</h3>
        <p>120</p>
      </div>
      <div className="stat-box">
        <h3>ICU Occupancy</h3>
        <p>75%</p>
      </div>
    </div>
  );
};

export default HospitalStats;
