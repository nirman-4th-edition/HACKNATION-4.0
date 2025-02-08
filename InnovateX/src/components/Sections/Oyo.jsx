import React, { useEffect, useState } from "react";
import "./Oyo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faTv, faUtensils, faCar, faSwimmingPool } from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "fa-wifi": faWifi,
  "fa-tv": faTv,
  "fa-utensils": faUtensils,
  "fa-car": faCar,
  "fa-swimming-pool": faSwimmingPool,
};

const Oyo = () => {
  const [oyos, setOyos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedOyos, setSortedOyos] = useState([]);
   const [shownOyos, setShownOyos] = useState(7);
  
  useEffect(() => {
    fetch("/oyos.json") // Update path as needed
      .then((res) => res.json())
      .then((data) => {
        setOyos(data);
        setSortedOyos(data);
      })
      .catch((error) => console.error("Error fetching OYOs:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredOyos = oyos.filter((oyo) =>
      oyo.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSortedOyos(filteredOyos);
  };

  const sortAlphabetically = () => {
    const sorted = [...sortedOyos].sort((a, b) => a.name.localeCompare(b.name));
    setSortedOyos(sorted);
  };

  const sortByRating = () => {
    const sorted = [...sortedOyos].sort((a, b) => b.rating - a.rating);
    setSortedOyos(sorted);
  };
  const handleLoadMore = () => {
    setShownOyos(shownOyos + 8); // Load 10 more hotels
  };

  return (
    <div className="oyo-container">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="filters">
        <button onClick={sortAlphabetically}>Sort Alphabetically</button>
        <button onClick={sortByRating}>Most Rated</button>
      </div>
      {sortedOyos.slice(0, shownOyos).map((oyo) => (
        <div key={oyo.id} className="oyo-card">
          <img src={oyo.image} alt={oyo.name} className="oyo-image" />
          <div className="oyo-details">
            <h3>{oyo.name}</h3>
            <p className="oyo-address">{oyo.address}</p>
            <p className="oyo-price">{oyo.price_per_night} <span className="discount">{oyo.discount}% off</span></p>
            <div className="oyo-amenities">
              {oyo.amenities.map((icon, index) => (
                <FontAwesomeIcon key={index} icon={iconMap[icon]} className="amenity-icon" />
              ))}
            </div>
            <div className="oyo-buttons">
              <a href={oyo.website} target="_blank" rel="noopener noreferrer" className="view-details">View Details</a>
              <button className="book-now">Book Now</button>
            </div>
          </div>
          <span className="oyo-rating">⭐ {oyo.rating}</span>
        </div>
      ))}
      {shownOyos < sortedOyos.length && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Oyo;
