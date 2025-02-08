import React, { useState, useEffect } from "react";
import "./TravelAgencies.css"; // Import CSS

const TravelAgencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [visibleCount, setVisibleCount] = useState(8); // Show 8 initially

  useEffect(() => {
    // Fetch data from JSON file
    fetch("/travelAgencies.json")
      .then((response) => response.json())
      .then((data) => setAgencies(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  // Search & Sort Logic
  const filteredAgencies = agencies
    .filter((agency) =>
      agency.name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
      if (sortBy === "mostLiked") return b.likes - a.likes;
      return 0;
    });

  // Load More function
  const loadMore = () => {
    if (visibleCount < filteredAgencies.length) {
      setVisibleCount((prev) => prev + 7); // Load 7 more at a time
    }
  };

  return (
    <div className="agency-container">
      <h2>Find a Travel Agency/Tour Operator</h2>

      {/* Search and Sorting Options */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="all">Sort By</option>
          <option value="mostLiked">Most Liked</option>
          <option value="alphabetical">Alphabetically</option>
        </select>
      </div>

      {/* Travel Agency List */}
      <div className="agency-list">
        {filteredAgencies.slice(0, visibleCount).map((agency) => (
          <div className="agency-card" key={agency.id}>
            <div className="agency-info">
              <img src={agency.logo} alt={agency.name} className="agency-logo" />
              <div className="agency-details">
                <h3>{agency.name}</h3>
                <p>{agency.address}</p>
                <p>❤️ {agency.likes} Likes</p>
              </div>
            </div>
            <div className="agency-links">
              <a href={agency.contact} target="_blank" rel="noopener noreferrer">
                📞 Contact
              </a>
              <a href={agency.trails} target="_blank" rel="noopener noreferrer">
                🗺 View Trails
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredAgencies.length && (
        <button className="load-more" onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default TravelAgencies;
