import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./DoctorDashboard.css";
import Navbar2 from "./Navbar2";
import Dashboard2 from "./Dashboard2";
import Profile2 from "./Profile2";
import CheckAppointments from "./CheckAppointments/CheckAppointments";

const DoctorDashboard = () => {
  return (
    <Router>
      <div className="dashboard-container">
        <Navbar2 />
        <div className="main-content">
          <Routes>
            <Route path="/Doctor" element={<Dashboard2 />} />
            <Route path="/Doctorprofile" element={<Profile2 />} />
            <Route path="/Doctorappointment" element={<CheckAppointments />} />
            {/* <Route path="/Joinappointment" element={<BookAppointment />} /> */}

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default DoctorDashboard;
