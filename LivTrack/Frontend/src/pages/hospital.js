import React from "react";
import "../styles/hospital.css";

const hospitals = [
  { id: 1, name: "City Hospital", img: "path_to_hospital1.png" },
  { id: 2, name: "St. Mary's Hospital", img: "path_to_hospital2.png" },
  { id: 3, name: "Green Valley Hospital", img: "path_to_hospital3.png" },
  { id: 4, name: "Sunrise Medical Center", img: "path_to_hospital4.png" },
];

const Hospital = () => {
  return (
    <div className="hospital-page">
      <h1>Hospitals</h1>
      <div className="hospital-list">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="hospital-card">
            <img
              src={hospital.img}
              alt={hospital.name}
              className="hospital-img"
            />
            <h2>{hospital.name}</h2>
            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hospital;
