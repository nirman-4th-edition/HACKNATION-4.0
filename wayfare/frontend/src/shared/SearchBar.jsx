import React, { useState } from 'react';
import './SearchBar.css';
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from '../utils/config.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [locations, setLocations] = useState([]); // Store the added locations
  const [newLocation, setNewLocation] = useState(""); // Store the current location input

  const navigate = useNavigate();

  // Add a new location input to the list of locations
  const handleAddLocation = () => {
    if (newLocation.trim() === "") {
      return alert("Location cannot be empty!");
    }

    setLocations((prevLocations) => {
      const updatedLocations = [...prevLocations, newLocation];
      console.log("Location Added:", updatedLocations); // Log locations after adding
      return updatedLocations;
    });
    setNewLocation(""); // Clear the input after adding
  };

  // Handle search and send data to the backend
  const handleSearch = async () => {
    if (locations.length === 0) {
      return alert("Please add at least one location!");
    }

    // Log locations before sending to the backend
    console.log("Locations to save:", locations);

    try {
      // Send the locations to the backend
      const response = await fetch(`http://127.0.0.1:8000/find_hotels/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locations }),
      });

      if (!response.ok) {
        alert("Something went wrong while saving locations!");
      } else {
        const data=await response.json()
        console.log(data)
        alert("Locations saved successfully!");
        setLocations([]); // Clear the locations after savin
        navigate("/hotels/Showhotels", {state:data.hotels})
       
      }
    } catch (error) {
      console.error("Error saving locations:", error);
      alert("An error occurred!");
    }
  };

  // Handle removing a location from the list
  const handleRemoveLocation = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
    console.log("Location Removed:", updatedLocations); // Log locations after removing
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Enter a location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
            </div>
          </FormGroup>
          <span className="search__icon" onClick={handleAddLocation}>
            <i className="ri-add-line"></i> {/* Add icon */}
          </span>
        </Form>

        {/* List added locations */}
        <div>
          <h6>Locations:</h6>
          <ul>
            {locations.map((location, index) => (
              <li key={index}>
                {location} 
                <button onClick={() => handleRemoveLocation(index)} style={{ marginLeft: '10px' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button onClick={handleSearch}>Search</button>
      </div>
    </Col>
  );
};

export default SearchBar;
