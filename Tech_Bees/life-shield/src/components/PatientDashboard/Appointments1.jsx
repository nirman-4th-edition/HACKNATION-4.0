import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { NODE_BACKEND_URL } from "../../redux/store.js";
import { Link } from "react-router-dom";

const Appointments1 = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${NODE_BACKEND_URL}/patient/appointments`,
        {
          withCredentials: true,
        }
      );

      const modifiedData = data.appointments.map((apt) => ({
        specialist: apt.specialization,
        doctor: apt.doctor.name,
        date: new Date(apt.date).toDateString(),
        time: new Date(apt.date).toLocaleTimeString(),
        roomId: apt.roomId.roomLink,
      }));

      setAppointments(modifiedData);
    } catch (error) {
      console.error(error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  if (loading) return null;

  return (
    <div className="appointments">
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.length === 0 ? (
          <li style={{ textAlign: "center" }}>No appointments</li>
        ) : (
          appointments.map((apt, index) => (
            <li key={index}>
              <strong>{apt.specialist}</strong> , {apt.doctor} <br />
              <span>
                {apt.date} at {apt.time}
              </span>
              <span>
                <Link to={`/video-call/${apt.roomId}`}>Join Room</Link>
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Appointments1;
