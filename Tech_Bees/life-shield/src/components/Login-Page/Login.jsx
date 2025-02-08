import { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { specialization } from "../../constant/data";

export default function Login() {
  const [activeForm, setActiveForm] = useState("Login");
  const [activeRole, setActiveRole] = useState("Patient");
  const [patientForm, setPatientForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    contact_number: "",
    dob: "",
    blood_group: "",
    height: "",
    weight: "",
  });

  const [doctorForm, setDoctorForm] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    specialization: "",
    gender: "",
    license_number: "",
  });

  const [hospitalForm, setHospitalForm] = useState({
    name: "",
    registration_number: "",
    email: "",
    password: "",
    phone_number: "",
    address: "",
    specialist_in: "",
  });

  const handleChangePatinet = (e) => {
    setPatientForm({ ...patientForm, [e.target.name]: e.target.value });
  };

  const handleChangeDoctor = (e) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const handleChangeHospital = (e) => {
    setHospitalForm({ ...hospitalForm, [e.target.name]: e.target.value });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    setActiveForm("SignUp");
  }, []);

  const openForm = (formName) => {
    setActiveForm(formName);
  };

  const openRole = (roleName) => {
    setActiveRole(roleName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeForm === "LogIn") {
      dispatch(loginUser(email, password, activeRole.toLowerCase()));
    } else {
      if (activeRole === "Doctor") {
        dispatch(registerUser(doctorForm, activeRole.toLowerCase()));
      }
      if (activeRole === "Patient")
        dispatch(registerUser(patientForm, activeRole.toLowerCase()));
      if (activeRole === "Hospitals") {
        dispatch(registerUser(hospitalForm, "hospital"));
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div
      className="container"
      style={{
        height: activeForm === "SignUp" ? "100%" : "100vh",
      }}
    >
      <div className="left">
        <video autoPlay loop muted className="background-video">
          <source src="./back2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className="heading">Lifeshield</h1>
      </div>

      <div className="right">
        <div className="switchs">
          <button
            className={`switchlink ${activeForm === "SignUp" ? "active" : ""}`}
            onClick={() => openForm("SignUp")}
          >
            Sign Up
          </button>
          <button
            className={`switchlink ${activeForm === "LogIn" ? "active" : ""}`}
            onClick={() => openForm("LogIn")}
          >
            Log In
          </button>
        </div>

        <div className="roles">
          <button
            className={`rolelink ${activeRole === "Patient" ? "active" : ""}`}
            onClick={() => openRole("Patient")}
          >
            Patient
          </button>
          <button
            className={`rolelink ${activeRole === "Doctor" ? "active" : ""}`}
            onClick={() => openRole("Doctor")}
          >
            Doctor
          </button>
          <button
            className={`rolelink ${activeRole === "Hospitals" ? "active" : ""}`}
            onClick={() => openRole("Hospitals")}
          >
            Hospitals
          </button>
        </div>

        <div className="switch-container">
          {activeForm === "SignUp" && activeRole === "Patient" && (
            <div
              id="SignUp"
              className="switchcontent"
              style={{ display: "block" }}
            >
              <h1 className="title">Sign Up for Free</h1>
              <form onSubmit={handleSubmit}>
                <div className="field-wrap">
                  <input
                    name="name"
                    type="text"
                    id="name"
                    required
                    autoComplete="off"
                    onChange={handleChangePatinet}
                    value={patientForm.name}
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    required
                    autoComplete="off"
                    value={patientForm.email}
                    onChange={handleChangePatinet}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="dob"
                    type="date"
                    id="dob"
                    required
                    autoComplete="off"
                    value={patientForm.dob}
                    onChange={handleChangePatinet}
                  />
                  {/* <label htmlFor="dob">Date of Birth</label> */}
                </div>
                <div className="field-wrap">
                  <input
                    name="contact_number"
                    type="text"
                    id="contact_number"
                    required
                    autoComplete="off"
                    value={patientForm.contact_number}
                    onChange={handleChangePatinet}
                  />
                  <label htmlFor="contact_number">Contact Number</label>
                </div>
                <div className="field-wrap">
                  <select
                    name="gender"
                    value={patientForm.gender}
                    onChange={handleChangePatinet}
                  >
                    <option value="">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="field-wrap">
                  <select
                    name="blood_group"
                    value={patientForm.blood_group}
                    onChange={handleChangePatinet}
                  >
                    <option value="">Select your blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="field-wrap">
                  <input
                    name="height"
                    type="text"
                    id="height"
                    required
                    autoComplete="off"
                    value={patientForm.height}
                    onChange={handleChangePatinet}
                    placeholder="in cm"
                  />
                  <label htmlFor="height">Height</label>
                </div>

                <div className="field-wrap">
                  <input
                    name="weight"
                    type="text"
                    id="weight"
                    required
                    autoComplete="off"
                    value={patientForm.weight}
                    onChange={handleChangePatinet}
                    placeholder="in kg"
                  />
                  <label htmlFor="weight">Weight</label>
                </div>

                <div className="field-wrap">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    required
                    autoComplete="off"
                    value={patientForm.password}
                    onChange={handleChangePatinet}
                  />
                  <label htmlFor="password">Set A Password</label>
                </div>
                <button type="submit" className="actionbtn">
                  {loading ? "Loading..." : "Get Started"}
                </button>
              </form>
            </div>
          )}

          {activeForm === "SignUp" && activeRole === "Doctor" && (
            <div
              id="SignUp"
              className="switchcontent"
              style={{ display: "block" }}
            >
              <h1 className="title">Sign Up for Free</h1>
              <form onSubmit={handleSubmit}>
                <div className="field-wrap">
                  <input
                    name="name"
                    type="text"
                    id="name"
                    required
                    autoComplete="off"
                    value={doctorForm.name}
                    onChange={handleChangeDoctor}
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    required
                    autoComplete="off"
                    value={doctorForm.email}
                    onChange={handleChangeDoctor}
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
                <div className="field-wrap">
                  <select
                    name="specialization"
                    value={doctorForm.specialization}
                    onChange={handleChangeDoctor}
                  >
                    <option value="">Choose a specialization</option>
                    {specialization.map((specialization) => (
                      <option key={specialization} value={specialization}>
                        {specialization}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field-wrap">
                  <input
                    name="phone_number"
                    type="text"
                    id="phone_number"
                    required
                    autoComplete="off"
                    value={doctorForm.phone_number}
                    onChange={handleChangeDoctor}
                  />
                  <label htmlFor="phone_number">Contact Number</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="license_number"
                    type="text"
                    id="license_number"
                    required
                    autoComplete="off"
                    value={doctorForm.license_number}
                    onChange={handleChangeDoctor}
                  />
                  <label htmlFor="license_number">License Number</label>
                </div>
                <div className="field-wrap">
                  <select
                    value={doctorForm.gender}
                    onChange={handleChangeDoctor}
                    name="gender"
                  >
                    <option value="">select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="field-wrap">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    required
                    autoComplete="off"
                    value={doctorForm.password}
                    onChange={handleChangeDoctor}
                  />
                  <label htmlFor="password">Set A Password</label>
                </div>
                <button type="submit" className="actionbtn">
                  {loading ? "Loading..." : "Get Started"}
                </button>
              </form>
            </div>
          )}

          {activeForm === "SignUp" && activeRole === "Hospitals" && (
            <div
              id="SignUp"
              className="switchcontent"
              style={{ display: "block" }}
            >
              <h1 className="title">Sign Up for Free</h1>
              <form onSubmit={handleSubmit}>
                <div className="field-wrap">
                  <input
                    name="name"
                    type="text"
                    id="name"
                    value={hospitalForm.name}
                    onChange={handleChangeHospital}
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="name">Hospital Name</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    value={hospitalForm.email}
                    onChange={handleChangeHospital}
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="specialist_in"
                    value={hospitalForm.specialist_in}
                    onChange={handleChangeHospital}
                    type="text"
                    id="specialist"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="specialist">Specialist In</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="phone_number"
                    value={hospitalForm.phone_number}
                    onChange={handleChangeHospital}
                    type="text"
                    id="phone_number"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="phone_number">Contact Number</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="registration_number"
                    value={hospitalForm.registration_number}
                    onChange={handleChangeHospital}
                    type="text"
                    id="registration_number"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="registration_number">
                    Registration Number
                  </label>
                </div>
                <div className="field-wrap">
                  <input
                    name="address"
                    value={hospitalForm.address}
                    onChange={handleChangeHospital}
                    type="text"
                    id="address"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="address">Address</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="password"
                    value={hospitalForm.password}
                    onChange={handleChangeHospital}
                    type="password"
                    id="password"
                    required
                    autoComplete="off"
                  />
                  <label htmlFor="password">Set A Password</label>
                </div>
                <button type="submit" className="actionbtn">
                  {loading ? "Loading..." : "Get Started"}
                </button>
              </form>
            </div>
          )}

          {activeForm === "LogIn" && (
            <div
              id="LogIn"
              className="switchcontent"
              style={{ display: "block" }}
            >
              <h1 className="title">Welcome Back!</h1>
              <form onSubmit={handleSubmit}>
                <div className="field-wrap">
                  <input
                    name="email"
                    type="email"
                    id="signInEmail"
                    required
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <label htmlFor="signInEmail">Email Address</label>
                </div>
                <div className="field-wrap">
                  <input
                    name="password"
                    type="password"
                    id="signInPswd"
                    required
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="signInPswd">Password</label>
                </div>
                <button type="submit" className="actionbtn">
                  {loading ? "Loading..." : "Log In"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
