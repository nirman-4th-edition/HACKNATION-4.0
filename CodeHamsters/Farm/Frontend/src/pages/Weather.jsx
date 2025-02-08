import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const Weather = () => {
  const [city, setCity] = useState("Bhubaneswar");
  const [weather, setWeather] = useState(null);
  const [background, setBackground] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // API keys and base URLs
  const weatherApiKey = "2b855af02101d3c28de0241330eeae47";
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
  const imageApiKey = "2BsfBnNAfcAGF3oX4F_fRIlYnOXYBGYyJpeHfo8AWp4";
  const imageURL = "https://api.unsplash.com/search/photos?page=1&query=";

  // Fetch weather data from OpenWeatherMap
  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `${weatherURL}${city}&appid=${weatherApiKey}`
      );
      const data = await response.json();
      if (response.status === 404) {
        setError(true);
        setWeather(null);
      } else {
        setWeather(data);
        setError(false);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Fetch background image from Unsplash
  const fetchBackground = async (city) => {
    try {
      const response = await fetch(
        `${imageURL}${city}&client_id=${imageApiKey}`
      );
      const data = await response.json();
      setBackground(data.results[0]?.urls?.full || "");
    } catch (error) {
      console.error("Error fetching background image:", error);
    }
  };

  // Handle search and refresh both data sets concurrently
  const handleSearch = async () => {
    if (city.trim()) {
      setLoading(true);
      await Promise.all([fetchWeather(city), fetchBackground(city)]);
      setLoading(false);
    }
  };

  // Load initial data for the default city on mount
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await Promise.all([fetchWeather(city), fetchBackground(city)]);
      setLoading(false);
    };
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative flex items-center justify-center h-screen text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Weather Card */}
      <div className="relative z-10 bg-black bg-opacity-60 backdrop-blur-md p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold">Weather</h1>
          <p className="text-sm text-gray-300">
            Get the latest weather updates in your city
          </p>
        </div>
        <div className="flex mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 p-3 rounded-l-full text-black focus:outline-none"
            placeholder="Enter city name"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 rounded-r-full hover:from-blue-600 hover:to-blue-800 transition"
          >
            Search
          </button>
        </div>

        {loading ? (
          // Loading Spinner
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">Invalid City Name</p>
        ) : (
          weather && (
            <div className="transition-all duration-500">
              <h2 className="text-3xl font-bold">{weather.name}</h2>
              <p className="text-2xl mt-2">{Math.round(weather.main.temp)}°C</p>
              <p className="mt-1">{weather.weather[0].main}</p>
              <div className="flex justify-between mt-4 text-sm">
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind: {weather.wind.speed} Km/h</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Weather;
