import React from "react";
import "../styles/hospital.css";
import path_to_hospital1 from "../pages/logos/cityhospital.webp";
import path_to_hospital2 from "../pages/logos/medanta.webp";
import path_to_hospital3 from "../pages/logos/apollo.jpg";
import path_to_hospital4 from "../pages/logos/aiims delhi.jpg";

const hospitals = [
  { id: 1, name: "City Hospital", img: path_to_hospital1 },
  { id: 2, name: "St. Mary's Hospital", img: path_to_hospital2 },
  { id: 3, name: "Apollo Hospital", img: path_to_hospital3 },
  { id: 4, name: "Sunrise Medical Center", img: path_to_hospital4 },
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