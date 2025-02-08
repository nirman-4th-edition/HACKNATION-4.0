import { useState } from "react";
import "./BC_ASK.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

const BC_ASK = () => {
  const [formData, setFormData] = useState({
    meanRadius: "",
    meanTexture: "",
    meanPerimeter: "",
    meanArea: "",
    meanSmoothness: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { user } = useSelector((state) => state.user);

  const handlePredict = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      const response = await axios.post(
        `http://127.0.0.1:5001/predict_cancer/${user._id}`,
        { features: Object.values(formData).map(Number) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.data.prediction_int === 1)
        toast.success(response.data.prediction);
      else toast.warning(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bc-container">
      <div className="bc-details-section">
        <h2>Enter Your Parameters</h2>
        <h4 style={{ marginBottom: "20px" }}>
          Provide the details manually to check the prediction.
        </h4>
        <form className="bc-details-form">
          <label>
            Mean Radius:
            <input
              type="number"
              name="meanRadius"
              value={formData.meanRadius}
              onChange={handleChange}
              placeholder="Enter Mean Radius(in mm)"
            />
          </label>
          <label>
            Mean Texture:
            <input
              type="number"
              name="meanTexture"
              value={formData.meanTexture}
              onChange={handleChange}
              placeholder="Enter Mean Texture(in mm)"
            />
          </label>
          <label>
            Mean Perimeter:
            <input
              type="number"
              name="meanPerimeter"
              value={formData.meanPerimeter}
              onChange={handleChange}
              placeholder="Enter Mean Perimeter(in mm)"
            />
          </label>
          <label>
            Mean Area:
            <input
              type="number"
              name="meanArea"
              value={formData.meanArea}
              onChange={handleChange}
              placeholder="Enter Mean Area(in mm²)"
            />
          </label>
          <label>
            Mean Smoothness:
            <input
              type="number"
              name="meanSmoothness"
              step="0.01"
              value={formData.meanSmoothness}
              onChange={handleChange}
              placeholder="Enter Mean Smoothness(in mm)"
            />
          </label>
          <button
            type="button"
            className="bc-predict-btn"
            onClick={handlePredict}
          >
            Check Prediction
          </button>
        </form>
      </div>
    </div>
  );
};

export default BC_ASK;
