import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar1 = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/patient-profile">Profile</Link>
        </li>
        <li>
          <Link to="/appointment">Book Appointment</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar1;
