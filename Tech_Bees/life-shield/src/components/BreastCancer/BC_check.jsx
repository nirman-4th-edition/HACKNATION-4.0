import { useNavigate } from "react-router-dom";
import "./BC_check.css";

export default function BC_check() {
  const navigate = useNavigate();
  return (
    <div className="check-prediction">
      <h2>Check Your Breast Cancer Prediction</h2>
      <p>
        Use our prediction tool to assess your risk of breast cancer. Early
        detection can save lives.
      </p>
      <button className="prediction-btn" onClick={() => navigate("/bc-check")}>
        Check Now
      </button>
    </div>
  );
}
