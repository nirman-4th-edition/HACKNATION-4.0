import React from "react";
import axios from "axios";
import { useState } from "react";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "5caea6bf50ba4876909195411250502";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: location.trim(),
          units: 'metric',
          appid: API_KEY
        }
      });

      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 py-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl text-white text-center mb-8 font-bold">
          Weather App
        </h1>

        <form onSubmit={fetchWeather} className="mb-8 flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 p-4 rounded-lg text-red-700 mb-4">
            {error.includes("404") ? "City not found" : error}
          </div>
        )}

        {weather && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {weather.name}, {weather.sys?.country}
                </h2>
                <p className="text-gray-600 capitalize">
                  {weather.weather[0]?.description}
                </p>
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
                alt="weather icon"
                className="w-20 h-20"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                <span className="text-gray-600">Temperature</span>
                <span className="text-2xl font-bold text-gray-800">
                  {weather.main?.temp}°C
                </span>
              </div>

              <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                <span className="text-gray-600">Humidity</span>
                <span className="text-2xl font-bold text-gray-800">
                  {weather.main?.humidity}%
                </span>
              </div>

              <div className="flex justify-between items-center bg-white p-4 rounded-lg">
                <span className="text-gray-600">Wind Speed</span>
                <span className="text-2xl font-bold text-gray-800">
                  {weather.wind?.speed} m/s
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;