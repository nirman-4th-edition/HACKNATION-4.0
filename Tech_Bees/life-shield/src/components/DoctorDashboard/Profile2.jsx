import { useState } from "react";
import "./Profile2.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/action";
import { specialization } from "../../constant/data";

const Profile2 = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone_number: user?.phone_number || "",
    email: user?.email || "",
    specialization: user?.specialization || "",
    gender: user?.gender || "",
    licence_number: user?.license_number || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData, user?.role));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">
        🩺
        {user?.name}&apos;s Profile
      </h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          value={formData.name}
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          value={formData.phone_number}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          disabled
        />
        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
        >
          {specialization.map((specialization) => (
            <option key={specialization} value={specialization}>
              {specialization}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="gender"
          className="dob-input"
          value={formData.gender}
          disabled
        />
        <input
          type="text"
          name="licence_number"
          placeholder="Licence Number"
          onChange={handleChange}
          value={formData.licence_number}
          disabled
        />
        <button type="submit" className="update-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile2;
