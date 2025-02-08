import React, { useState, useEffect } from "react";
import "./RentalPage.css"; // Import CSS

const RentalPage = () => {
  const [agencies, setAgencies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/rentalAgencies.json") // Load JSON from public folder
      .then((res) => res.json())
      .then((data) => setAgencies(data));
  }, []);

  const filteredAgencies = agencies.filter((agency) =>
    agency.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rental-container">
      <h1>Bike & Car Rentals</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Agency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Rental List */}
      <div className="rental-list">
        {filteredAgencies.map((agency) => (
          <div key={agency.id} className="rental-card">
            <img src={agency.image} alt={agency.name} className="agency-img" />
            <div className="rental-details">
              <h2>{agency.name}</h2>
              <p>{agency.location}</p>
              <h3>Available Vehicles:</h3>
              <ul>
                {agency.vehicles.map((vehicle, index) => (
                  <li key={index}>
                    {vehicle.name} - ₹{vehicle.pricePerDay}/day
                  </li>
                ))}
              </ul>
              <div className="rental-links">
                <a
                  href={agency.contact}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📞 Contact
                </a>
                <a
                  href={agency.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🏍 Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalPage;
