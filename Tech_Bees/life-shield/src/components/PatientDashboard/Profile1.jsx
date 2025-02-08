import { useState } from "react";
import "./Profile1.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/action";
import toast from "react-hot-toast";

const Profile1 = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    contact_number: user?.contact_number || "",
    dob: user?.dob || "",
    email: user?.email || "",
    blood_group: user?.blood_group || "",
    gender: user?.gender || "",
    height: user?.height || "",
    weight: user?.weight || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      contact_number,
      dob,
      email,
      blood_group,
      gender,
      height,
      weight,
    } = formData;
    if (
      !name ||
      !contact_number ||
      !dob ||
      !email ||
      !blood_group ||
      !gender ||
      !height ||
      !weight
    )
      toast.error("All fields are required");

    dispatch(updateProfile(formData, user?.role));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">🩺 {user?.name}&apos;s Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="contact_number"
          value={formData.contact_number}
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          value={new Date(formData.dob).toISOString().split("T")[0]}
          placeholder="D.O.B"
          onChange={handleChange}
          className="dob-input"
          required
          disabled
        />
        <input type="email" name="email" value={formData.email} disabled />
        <select
          name="blood_group"
          onChange={handleChange}
          value={formData.blood_group}
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <input type="text" name="gender" value={formData.gender} disabled />
        <input
          type="number"
          name="height"
          value={formData.height}
          placeholder="Height (cm)"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="weight"
          value={formData.weight}
          placeholder="Weight (kg)"
          onChange={handleChange}
          required
        />
        <button type="submit" className="update-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile1;
