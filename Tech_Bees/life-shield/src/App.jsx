import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action.js";
import toast from "react-hot-toast";

import BC_LandingPage from "./Components/BreastCancer/BC_LandingPage.jsx";
import PD_LandingPage from "./Components/Parkinson/PD_LandingPage.jsx";
import MainDashBoard from "./Components/Doctor-Page/Dashboard/MainDashBoard.jsx";
import DoctorProfile from "./Components/DoctorDashboard/Profile2.jsx";
import DoctorDashboard from "./Components/DoctorDashboard/Dashboard2";
import LandingPage from "./Components/LandingPage/LandingPage";
import Login from "./Components/Login-Page/Login.jsx";
import VideoCall from "./Components/VideoCall/VideoCall";
import Loader from "./Components/Loader/Loader";
import PatientProfile from "./Components/PatientDashboard/Profile1.jsx";
import PatientDashboard from "./Components/PatientDashboard/Dashboard1.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import BookAppointment from "./Components/PatientDashboard/BookAppointment.jsx";
import CheckAppointment from "./Components/DoctorDashboard/CheckAppointments/CheckAppointments";
import PD_ASK from "./Components/Parkinson/PD_ASK.jsx";
import BC_ASK from "./Components/BreastCancer/BC_ASK.jsx";
import HospitalDashboard from "./Components/HospitalDashboard/Dashboard3.jsx";
import HospitalProfile from "./Components/HospitalDashboard/Profile3.jsx";

function App() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  const { error, message, loading, user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [location.pathname]);

  if ((user && loading) || isAuthenticated === null) return <Loader />;

  // eslint-disable-next-line react/prop-types
  const PrivateRoute = ({ children, role }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    // eslint-disable-next-line react/prop-types
    if (role && !role.includes(user?.role)) return <Navigate to="/" />;
    return children;
  };

  return (
    <>
      {!isLogin && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LandingPage />
            ) : user?.role === "patient" ? (
              <PatientDashboard />
            ) : user?.role === "doctor" ? (
              <DoctorDashboard />
            ) : user?.role === "hospital" ? (
              <HospitalDashboard />
            ) : null
          }
        />
        {!user && <Route path="/login" element={<Login />} />}
        <Route
          path="/patient-dashboard"
          element={
            <PrivateRoute role={["patient"]}>
              <PatientDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/bc-landing"
          element={
            <PrivateRoute role={["patient"]}>
              <BC_LandingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor-profile"
          element={
            <PrivateRoute role={["doctor"]}>
              <DoctorProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/hospital-profile"
          element={
            <PrivateRoute role={["hospital"]}>
              <HospitalProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient-profile"
          element={
            <PrivateRoute role={["patient"]}>
              <PatientProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/main-dashboard"
          element={
            <PrivateRoute role={["doctor"]}>
              <MainDashBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/video-call/:roomId"
          element={
            <PrivateRoute role={["doctor", "patient"]}>
              <VideoCall />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointment"
          element={
            <PrivateRoute role={["patient"]}>
              <BookAppointment />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <PrivateRoute role={["doctor"]}>
              <CheckAppointment />
            </PrivateRoute>
          }
        />
        <Route
          path="/pankrison"
          element={
            <PrivateRoute role={["patient"]}>
              <PD_LandingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/pd-check"
          element={
            <PrivateRoute role={["patient"]}>
              <PD_ASK />
            </PrivateRoute>
          }
        />
        <Route
          path="/bc-check"
          element={
            <PrivateRoute role={["patient"]}>
              <BC_ASK />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
