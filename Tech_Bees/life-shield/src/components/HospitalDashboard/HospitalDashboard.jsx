import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./HospitalDashboard.css";
// import Appointments1 from "./Appointments1";
import Profile3 from "./Profile3";
// import Dashboard1 from "./Dashboard3";
import Navbar3 from "./Navbar3";
import Dashboard3 from "./Dashboard3";
// import BookAppointment from "./BookAppointment";

const HospitalDashboard = () => {
  return (
    <Router>
      <div className="dashboard-container">
        <Navbar3 />
        <div className="main-content">
          <Routes>
            <Route path="/HospitalDashboard" element={<Dashboard3 />} />
            <Route path="/Hospitalprofile" element={<Profile3 />} />
            {/* <Route path="/appointment" element={<BookAppointment />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default HospitalDashboard;
