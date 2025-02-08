import { useState } from "react";
import "./Profile3.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/action";

const doctorSpecializations = [
  {
    specialization: "Cardiologist",
  },
  {
    specialization: "Neurologist",
  },
  {
    specialization: "Dermatologist",
  },
  {
    specialization: "Oncologist",
  },
  {
    specialization: "General Surgeon",
  },
  {
    specialization: "Cancer",
  },
];

const Profile3 = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone_number: user?.phone_number || "",
    address: user?.address || "",
    email: user?.email || "",
    registration_number: user?.registration_number || "",
    specialist_in: user?.specialist_in || "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData, "hospital"));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">🩺 Hospital Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Hospital Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Hospital Email"
          onChange={handleChange}
          className="haddress"
          disabled
        />
        <input
          type="text"
          name="address"
          placeholder="Hospital Address"
          onChange={handleChange}
          value={formData.address}
          className="haddress"
          required
        />
        <input
          type="text"
          name="registration_number"
          placeholder="Registration Number"
          value={formData.registration_number}
          onChange={handleChange}
          required
        />
        <select
          name="specialist_in"
          onChange={handleChange}
          required
          value={formData.specialist_in}
        >
          <option value="">Specialist In</option>
          {doctorSpecializations.map((doctor) => (
            <option key={doctor.specialization} value={doctor.specialization}>
              {doctor.specialization}
            </option>
          ))}
        </select>
        <button type="submit" className="update-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile3;
