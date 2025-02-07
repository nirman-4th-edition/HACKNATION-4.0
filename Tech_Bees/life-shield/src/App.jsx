import "./App.css";
import { Route, Routes } from "react-router-dom";

import DoctorProfile from "./Components/DoctorDashboard/Profile2.jsx";
import PatientProfile from "./Components/PatientDashboard/Profile1.jsx";
import PatientDashboard from "./Components/PatientDashboard/Dashboard1.jsx";
import BookAppointment from "./Components/PatientDashboard/BookAppointment.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/appointment" element={<BookAppointment />} />
      </Routes>
    </>
  );
}

export default App;
