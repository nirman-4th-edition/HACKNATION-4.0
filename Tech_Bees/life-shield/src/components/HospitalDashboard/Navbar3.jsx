import React from "react";
import { Link } from "react-router-dom";
import "./styles3.css";

const Navbar3 = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/HospitalDashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/Hospitalprofile">Profile</Link>
        </li>
        <li>
          <Link to="/Hospitalappointment">Appointment</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar3;
