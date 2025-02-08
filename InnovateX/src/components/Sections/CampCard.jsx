import React from "react";
import "./CampCard.css";

const CampCard = ({ camp }) => {
  return (
    <div className="camp-card">
      {/* Camp Image */}
      <div className="camp-image">
        <img src={camp.image} alt={camp.name} />
        <span className="favorite"> {camp.rating}</span>
      </div>

      {/* Camp Details */}
      <div className="camp-details">
        <h2>{camp.name}</h2>
        <p className="location">{camp.location}</p>

        <h4>Accommodation Details</h4>
        <ul className="accommodation">
          {camp.accommodation.map((type, index) => (
            <li key={index}>• {type}</li>
          ))}
        </ul>

        <p className="price">
          <strong>₹ {camp.price.toLocaleString()}</strong> per room / night
        </p>

        <div className="buttons">
          <button className="view-details">View Details</button>
          <button className="book-now">Book Now</button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <a href={camp.website} target="_blank" rel="noopener noreferrer">
              View Website
            </a>
          </li>
          <li>
            <a href={camp.tariff} target="_blank">
              Tariff
            </a>
          </li>
          <li>
            <a href={camp.booking} target="_blank">
              Book Now
            </a>
          </li>
          <li>
            <a href={camp.moreInfo} target="_blank">
              Know More
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CampCard;
