import React from "react";
import { Link } from "react-router-dom";
// import "./styles2.css";

const Navbar2 = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/Doctor">Dashboard</Link>
        </li>
        <li>
          <Link to="/Doctorprofile">Profile</Link>
        </li>
        <li>
          <Link to="/Doctorappointment">Check Appointment</Link>
        </li>
        <li>
          <Link to="/Joinappointment">Join Appointment</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar2;
