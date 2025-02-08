import React, { useEffect, useState } from "react";
import "./Hotel.css"; // Import the CSS file
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
  faTrain
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  "fa-bed": faBed,
  "fa-wifi": faWifi,
  "fa-swimming-pool": faSwimmer,
  "fa-utensils": faUtensils,
  "fa-car": faCar,
  "fa-tv": faTv,
  "fa-spa": faSpa
};

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [sortedHotels, setSortedHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [shownHotels, setShownHotels] = useState(10); // Initial number of hotels to show

  // Fetch hotels from local JSON
  useEffect(() => {
    fetch("/hotel.json") // Adjust path if needed
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setSortedHotels(data);
      })
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  // Handle sorting by rating (highest rated first)
  const handleSortByRating = () => {
    const sortedByRating = [...hotels].sort((a, b) => b.rating - a.rating);
    setSortedHotels(sortedByRating);
  };

  // Handle sorting alphabetically by hotel name
  const handleSortAlphabetically = () => {
    const sortedByName = [...hotels].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedHotels(sortedByName);
  };

  // Handle search by hotel name
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredHotels = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSortedHotels(filteredHotels);
  };

  // Load more hotels
  const handleLoadMore = () => {
    setShownHotels(shownHotels + 10); // Load 10 more hotels
  };

  return (
    <div className="hotel-container">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by hotel name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Sorting buttons */}
      <div className="sorting-options">
        <button onClick={handleSortByRating}>Sort by Rating</button>
        <button onClick={handleSortAlphabetically}>Sort Alphabetically</button>
      </div>

      {/* Hotel Cards */}
      {sortedHotels.slice(0, shownHotels).map((hotel) => (
        <div key={hotel.id} className="hotel-card">
          <div className="hotel-image-container">
            <img src={hotel.image} alt={hotel.name} className="hotel-image" />
          </div>

          <div className="hotel-details">
            <h3>{hotel.name}</h3>
            <p className="hotel-address">{hotel.address}</p>
            <p className="hotel-contact">
              <a href={`tel:${hotel.contact[0]}`}>{hotel.contact[0]}</a>,{" "}
              <a href={`tel:${hotel.contact[1]}`}>{hotel.contact[1]}</a>
            </p>
            <a href={hotel.website} target="_blank" rel="noopener noreferrer">
              {hotel.website}
            </a>

            <h4>Amenities</h4>
            <div className="hotel-amenities">
              {hotel.amenities.map((icon, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={iconMap[icon]}
                  className="amenity-icon"
                />
              ))}
            </div>

            {/* Rating Section */}
            <div className="hotel-rating">
              <h4>Rating</h4>
              <p>{hotel.rating} / 5</p>
            </div>
          </div>

          <div className="hotel-proximity">
            <h4>Proximity</h4>
            <p>
              <FontAwesomeIcon icon={faPlane} /> {hotel.proximity.airport}
            </p>
            <p>
              <FontAwesomeIcon icon={faTrain} /> {hotel.proximity.railway}
            </p>
            <p>
              <FontAwesomeIcon icon={faBus} /> {hotel.proximity.bus}
            </p>
            <a
              href={hotel.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="view-map"
            >
              View On Map
            </a>
          </div>
        </div>
      ))}

      {/* Load More Button */}
      {shownHotels < sortedHotels.length && (
        <button className="load-more-button" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Hotel;
