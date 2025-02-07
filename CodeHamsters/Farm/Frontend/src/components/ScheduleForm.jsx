import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ScheduleForm = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const { date, time, address } = formData;

      if (
        !date ||
        !time ||
        !address.street ||
        !address.city ||
        !address.state ||
        !address.zip
      ) {
        throw new Error("All fields are required");
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/schedule",
        {
          date: date.toISOString(),
          time,
          address: [address],
        }
      );

      setSuccessMessage("Schedule created successfully!");
      setFormData({
        date: new Date(),
        time: "",
        address: {
          street: "",
          city: "",
          state: "",
          zip: "",
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        Schedule Soil Testing
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData((prev) => ({ ...prev, date }))}
            minDate={new Date()}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Time
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Farm Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="number"
                name="zip"
                value={formData.address.zip}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? "Scheduling..." : "Schedule Test"}
        </button>
      </form>
    </div>
  );
};

export default ScheduleForm;
