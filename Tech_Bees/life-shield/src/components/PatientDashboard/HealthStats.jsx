import { useSelector } from "react-redux";
import "./styles.css";
import { calculateBMI } from "../../utils/helper";

const HealthStats = () => {
  const { user } = useSelector((state) => state.user);

  const { bmi, message, icon } = calculateBMI(user?.weight, user?.height);

  return (
    <div className="health-stats">
      <div className="stat-box">
        <h3>BMI</h3>
        <p>{bmi}</p>
      </div>
      <div className="stat-box">
        <h3>Health Condition</h3>
        <p>{message}</p>
      </div>
      <div className="stat-box">
        <h3>Face</h3>
        <p>{icon}</p>
      </div>
    </div>
  );
};

export default HealthStats;
