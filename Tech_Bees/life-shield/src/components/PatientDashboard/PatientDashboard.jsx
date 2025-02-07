import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./PatientDashboard.css";
// import Appointments1 from "./Appointments1";
import Profile1 from "./Profile1";
import Dashboard1 from "./Dashboard1";
import Navbar1 from "./Navbar1";
import BookAppointment from "./BookAppointment";

const PatientDashboard = () => {
  return (
    <Router>
      <div className="dashboard-container">
        <Navbar1 />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard1 />} />
            <Route path="/profile" element={<Profile1 />} />
            <Route path="/appointment" element={<BookAppointment />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default PatientDashboard;
