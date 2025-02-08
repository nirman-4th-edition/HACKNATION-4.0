import { useEffect, useState } from "react";
import "./CheckAppointments.css";
import axios from "axios";
import { NODE_BACKEND_URL } from "../../../redux/store";
import toast from "react-hot-toast";

export default function CheckAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState({ concern: "", date: "", time: "" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    return appointments.filter(
      (appointment) =>
        (filters.concern === "" || appointment.concern === filters.concern) &&
        (filters.date === "" || appointment.date === filters.date) &&
        (filters.time === "" || appointment.time === filters.time)
    );
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${NODE_BACKEND_URL}/doctor/all-appointments`,
        {
          withCredentials: true,
        }
      );
      let currYear = new Date().getFullYear();
      let modifiedData = data.appointments.map((appointment) => {
        return {
          id: appointment._id,
          name: appointment.patient.name,
          age: currYear - new Date(appointment.patient.dob).getFullYear(),
          concern: appointment.concern,
          date: new Date(appointment.date).toDateString(),
          time: appointment.time,
        };
      });
      console.log(modifiedData);
      setAppointments(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  const handleAppointment = async (id, type) => {
    try {
      const { data } = await axios.post(
        `${NODE_BACKEND_URL}/doctor/${type}-appointment/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setAppointments(
          appointments.filter((appointment) => appointment.id !== id)
        );
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="appointments-container">
      <h2 className="heading-doctor">Appointments</h2>

      <div className="filter-section">
        <select name="concern" onChange={handleFilterChange}>
          <option value="">All Concerns</option>
          <option value="Fever">Fever</option>
          <option value="Headache">Headache</option>
          <option value="Back Pain">Back Pain</option>
        </select>
        <input
          type="date"
          name="date"
          onChange={handleFilterChange}
          className="black"
        />
        <input
          type="time"
          name="time"
          onChange={handleFilterChange}
          className="black"
        />
        <button
          onClick={() => setAppointments(applyFilters())}
          className="filter-btn"
        >
          Filter
        </button>
      </div>

      <div className="appointments-list">
        {appointments.length === 0 ? (
          <p style={{ textAlign: "center" }}>No appointments</p>
        ) : (
          appointments.map(({ id, name, age, concern, date, time }) => (
            <div className="appointment-card" key={id}>
              <h3>{name}</h3>
              <p>Age: {age}</p>
              <p className="imp-concern">Concern: {concern}</p>
              <p>Date: {date}</p>
              <p>Time: {time}</p>
              <div className="actions">
                <button
                  className="accept"
                  onClick={() => handleAppointment(id, "approve")}
                >
                  Accept
                </button>
                <button
                  className="reject"
                  onClick={() => handleAppointment(id, "reject")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
