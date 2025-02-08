import React, { useState, useEffect } from "react";
import CampCard from "./CampCard";
import "./Camp.css";

const Camps = () => {
  const [camps, setCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [visibleCamps, setVisibleCamps] = useState(8); // Show 8 initially

  useEffect(() => {
    fetch("/camps.json") // Load data from public folder
      .then((response) => response.json())
      .then((data) => setCamps(data));
  }, []);

  // Search function
  const filteredCamps = camps.filter((camp) =>
    camp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting function
  const sortedCamps = [...filteredCamps].sort((a, b) => {
    if (sortOption === "alphabetical") return a.name.localeCompare(b.name);
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "price") return a.price - b.price;
    return 0;
  });

  // Load more camps (increase visible count by 7)
  const loadMoreCamps = () => {
    setVisibleCamps((prev) => prev + 7);
  };

  return (
    <div className="camps-container">
      {/* Search and Sort */}
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="rating">Ratings</option>
          <option value="price">Price</option>
        </select>
      </div>

      {/* Display Camp Cards */}
      <div className="camp-list">
        {sortedCamps.slice(0, visibleCamps).map((camp) => (
          <CampCard key={camp.id} camp={camp} />
        ))}
      </div>

      {/* Load More Button (Hidden when all camps are displayed) */}
      {visibleCamps < sortedCamps.length && (
        <button className="load-more" onClick={loadMoreCamps}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Camps;
