import React from "react";
import { FaHeartbeat, FaThermometerHalf, FaTint, FaWind } from "react-icons/fa";

export default function Metrics() {
  return (
    <div className="metrics">
      {/* <div className="metric-item">
        <FaWind className="metric-icon" />
        <span className="metric-label">Bio-Impedance Levels:</span>
        <span className="metric-value">17 Ohms of Resistance</span>
      </div> */}
      <div className="metric-item">
        <FaTint className="metric-icon" />
        <span className="metric-label">Blood SpO2 Levels:</span>
        <span className="metric-value">98% Oxygen Adsorption</span>
      </div>
      <div className="metric-item">
        <FaHeartbeat className="metric-icon" />
        <span className="metric-label">Pulse Rate:</span>
        <span className="metric-value">78 beats/minute</span>
      </div>
      <div className="metric-item">
        <FaThermometerHalf className="metric-icon" />
        <span className="metric-label">Body Temperature:</span>
        <span className="metric-value">98°F</span>
      </div>
    </div>
  );
}
