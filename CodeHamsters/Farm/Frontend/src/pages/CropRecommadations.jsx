import React, { useState, useEffect } from "react";
import "./../styles/FertilizerRecommender.css";
import { RiseLoader } from 'react-spinners';

const CropRecommandations = () => {
  const [formData, setFormData] = useState({
    location: "",
    soilType: "",
    weather: "",
    phLevel: "",
  });
  const [fullRecommendation, setFullRecommendation] = useState("");
  const [displayedRecommendation, setDisplayedRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFullRecommendation("");
    setDisplayedRecommendation("");
    setLoading(true);

    const params = {
      location: encodeURIComponent(formData.location.trim()),
      soilType: encodeURIComponent(formData.soilType),
      weather: encodeURIComponent(formData.weather),
      phLevel: encodeURIComponent(formData.phLevel.toString()),
    };

    const query = new URLSearchParams(params);
    const apiUrl = `${import.meta.env.VITE_API_URL}/fertilizer/recommendation?${query}`;

    try {
      const eventSource = new EventSource(apiUrl, {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        console.log("SSE connection established");
        setLoading(false);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.chunk) {
            setFullRecommendation((prev) => {
              const newText = prev + data.chunk;
              return newText.slice(0, 5000);
            });
          }
        } catch (err) {
          console.error("SSE Parse Error:", err);
        }
      };

      eventSource.addEventListener("error", (event) => {
        const error = event.data ? JSON.parse(event.data) : null;
        setError(error?.message || "Connection lost - retrying...");
        setTimeout(() => eventSource.close(), 2000);
      });

      eventSource.addEventListener("complete", () => {
        eventSource.close();
        setLoading(false);
      });

      return () => {
        eventSource.close();
        setLoading(false);
      };
    } catch (err) {
      setError("Failed to initialize connection");
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (fullRecommendation.length > displayedRecommendation.length && !loading) {
      timer = setTimeout(() => {
        setDisplayedRecommendation(fullRecommendation.substring(0, displayedRecommendation.length + 1));
      }, 20);
    }

    return () => clearTimeout(timer);
  }, [fullRecommendation, displayedRecommendation, loading]);

  return (
    <div className="min-h-screen bg-green-50 p-8 flex gap-8">
      <div className="w-1/3 bg-white rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-8 border-b-2 border-green-100 pb-4">
          Crop Recommendation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Enter location"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Soil Type
              </label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNyAxMGw1IDUgNS01eiIvPjwvc3ZnPg==')] bg-no-repeat bg-[right:1rem_center] bg-[length:1.5em]"
                required
              >
                <option value="">Select Soil Type</option>
                <option value="Sandy">Sandy</option>
                <option value="Clay">Clay</option>
                <option value="Loamy">Loamy</option>
                <option value="Silt">Silt</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Weather Conditions
              </label>
              <select
                name="weather"
                value={formData.weather}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-select-arrow"
                required
              >
                <option value="">Select Weather</option>
                <option value="Dry">Dry</option>
                <option value="Humid">Humid</option>
                <option value="Rainy">Rainy</option>
                <option value="Temperate">Temperate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Soil pH Level
              </label>
              <input
                type="number"
                step="0.1"
                name="phLevel"
                value={formData.phLevel}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-green-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Enter pH level"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3.5 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RiseLoader color="#FFFFFF" size={16} />
                Generating...
              </>
            ) : (
              'Get Recommendation'
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              ⚠️ {error}
            </div>
          )}
        </form>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-2xl p-8 h-[calc(100vh-4rem)] flex flex-col">
        <h2 className="text-2xl font-bold text-green-600 mb-6 border-b-2 border-green-100 pb-4">
          📑 Recommendation
        </h2>
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto scrollbar-custom">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <RiseLoader color="#36D7B7" />
              </div>
            ) : (
              <div className="prose max-w-none text-gray-700">
                {displayedRecommendation ? (
                  <div className="space-y-4">
                    {displayedRecommendation.split('\n').map((line, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center space-y-2">
                      <div className="text-6xl">🌾</div>
                      <p className="font-medium">
                        Your Crop recommendations will appear here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg mt-4">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommandations;