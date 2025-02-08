import React, { useState, useEffect } from "react";
import "./Resorts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faWifi,
  faSwimmer,
  faUtensils,
  faCar,
  faTv,
  faSpa,
  faPlane,
  faBus,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "fa-bed": faBed,
  "fa-wifi": faWifi,
  "fa-swimming-pool": faSwimmer,
  "fa-utensils": faUtensils,
  "fa-car": faCar,
  "fa-tv": faTv,
  "fa-spa": faSpa,
};
const Resorts = () => {
  const [resorts, setResorts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedResorts, setSortedResorts] = useState([]);
  const [shownResorts, setShownResorts] = useState(10);

  useEffect(() => {
    fetch("/resorts.json")
      .then((res) => res.json())
      .then((data) => {
        setResorts(data);
        setSortedResorts(data);
      });
  }, []);

  const handleSortByRating = () => {
    const sortedByRating = [...resorts].sort((a, b) => b.rating - a.rating);
    setSortedResorts(sortedByRating);
  };

  // Handle sorting alphabetically by hotel name
  const handleSortAlphabetically = () => {
    const sortedByName = [...resorts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedResorts(sortedByName);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredResorts = resorts.filter((resort) =>
      resort.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSortedResorts(filteredResorts);
  };
  const handleLoadMore = () => {
    setShownResorts(shownResorts + 10); // Load 10 more hotels
  };

  return (
    <div className="resorts-container">
      <h1>Resorts & Hotels</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by hotel name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="sorting-options">
          <button onClick={handleSortByRating}>Sort by Rating</button>
          <button onClick={handleSortAlphabetically}>
            Sort Alphabetically
          </button>
        </div>
      </div>
      <div className="resorts-grid">
        {sortedResorts.slice(0, shownResorts).map((resort) => (
          <div key={resort.id} className="resort-card">
            <img
              src={resort.image}
              alt={resort.name}
              className="resort-image"
            />
            <div className="resort-info">
              <h2>{resort.name}</h2>
              <p className="resort-address">{resort.address}</p>
              <p className="resort-contact">
                <a href={`tel:${resort.contact[0]}`}>{resort.contact[0]}</a>,{" "}
                <a href={`tel:${resort.contact[1]}`}>{resort.contact[1]}</a>
              </p>
              <a
                href={resort.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resort.website}
              </a>
              <p className="location">{resort.location}</p>
              <h4>Amenities</h4>
              <div className="hotel-amenities">
                {resort.amenities.map((icon, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={iconMap[icon]}
                    className="amenity-icon"
                  />
                ))}
              </div>
              <div className="hotel-rating">
                <h4>Rating</h4>
                <p>{resort.rating} / 5</p>
              </div>
            </div>
            <div className="proximity">
              <h4>Proximity</h4>
              <p>
                <FontAwesomeIcon icon={faPlane} /> {resort.proximity.airport}
              </p>
              <p>
                <FontAwesomeIcon icon={faTrain} /> {resort.proximity.railway}
              </p>
              <p>
                <FontAwesomeIcon icon={faBus} /> {resort.proximity.bus}
              </p>
              <a
                href={resort.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="view-map"
              >
                View On Map
              </a>
            </div>
          </div>
        ))}
      </div>
      {shownResorts < sortedResorts.length && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Resorts;
