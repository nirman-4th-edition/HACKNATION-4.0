import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { RiseLoader } from "react-spinners";

const API_KEY = "AIzaSyCIRiV-IA1DtmVQ-6xKVsw6Q-UIgv1McZo"; // Replace with your actual API key

const FertilizerRecommender = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  // Typewriter effect state
  const [typedText, setTypedText] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (results) {
      setTypedText(""); // Clear previous text
      setTyping(true);
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < results.length) {
          setTypedText((prevText) => prevText + results.charAt(i));
          i++;
        } else {
          setTyping(false);
          clearInterval(intervalId);
        }
      }, 20); // Adjust typing speed here (milliseconds)
      return () => clearInterval(intervalId); // Cleanup on unmount or results change
    } else {
      setTyping(false);
      setTypedText("");
    }
  }, [results]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null); // Clear previous results
    setTypedText(""); //clear the text

    const formData = new FormData(e.target);
    const soilData = {
      nitrogen: formData.get("n_soil"),
      phosphorus: formData.get("p_soil"),
      potassium: formData.get("k_soil"),
      zinc: formData.get("zn_soil"),
      iron: formData.get("fe_soil"),
      manganese: formData.get("mn_soil"),
      boron: formData.get("b_soil"),
      copper: formData.get("cu_soil"),
      molybdenum: formData.get("mo_soil"),
      chlorine: formData.get("cl_soil"),
    };

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Analyze the following soil report parameters and recommend the best fertilizers along with their required amounts (kg/ha) based on the given data. Also, explain the merits and demerits of each fertilizer recommendation. \n                  - Nitrogen: ${soilData.nitrogen} mg/kg\n                  - Phosphorus: ${soilData.phosphorus} mg/kg\n                  - Potassium: ${soilData.potassium} mg/kg\n                  - Zinc: ${soilData.zinc} mg/kg\n                  - Iron: ${soilData.iron} mg/kg\n                  - Manganese: ${soilData.manganese} mg/kg\n                  - Boron: ${soilData.boron} mg/kg\n                  - Copper: ${soilData.copper} mg/kg\n                  - Molybdenum: ${soilData.molybdenum} mg/kg\n                  - Chlorine: ${soilData.chlorine} mg/kg.\n                  Provide precise recommendations including fertilizers and their required amounts in kg/ha.`,
                },
              ],
            },
          ],
        }
      );

      const recommendation = response.data.candidates[0].content.parts[0].text;
      setResults(recommendation);
    } catch (err) {
      setError("Failed to fetch recommendations. Check API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError("");
    if (formRef.current) {
      formRef.current.reset();
    }
    setTypedText("");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Soil Test & Fertilizer Recommendation", 10, 20);
    doc.setFontSize(12);
    doc.text(typedText, 10, 30); // Use typedText for the PDF
    doc.save("Soil_Test_Recommendation.pdf");
  };

  return (
    <div className="min-h-screen bg-green-50 p-8 flex gap-8">
      {/* Form Section */}
      <div className="w-1/3 bg-white rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">
          Fertilizer Recommendation
        </h1>
        <p className="mb-4 text-center">
          Enter soil test data to receive AI-generated fertilizer
          recommendations.
        </p>

        <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
          {[
            "n_soil",
            "p_soil",
            "k_soil",
            "zn_soil",
            "fe_soil",
            "mn_soil",
            "b_soil",
            "cu_soil",
            "mo_soil",
            "cl_soil",
          ].map((nutrient) => (
            <label key={nutrient} className="block">
              <span className="font-semibold">
                {nutrient.replace("_", " ").toUpperCase()} (mg/kg or ppm):
              </span>
              <input
                type="number"
                name={nutrient}
                required
                className="w-full p-2 border rounded"
                min="0"
              />
            </label>
          ))}

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Get Recommendation
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="flex-1 bg-white rounded-xl shadow-2xl p-8 h-[calc(100vh-4rem)] flex flex-col">
        <h2 className="text-2xl font-bold text-green-600 mb-6 border-b-2 border-green-100 pb-4">
          📁 AI Fertilizer Recommendation
        </h2>
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto scrollbar-custom">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <RiseLoader color="#36D7B7" />
              </div>
            ) : results ? (
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-wrap">{typedText}</p>{" "}
                {/* Use typedText */}
                <button
                  onClick={handleDownloadPDF}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  disabled={typing}
                >
                  Download Report 📄
                </button>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center space-y-2">
                  <div className="text-6xl">🌾</div>
                  <p className="font-medium">
                    Your fertilizer recommendations will appear here
                  </p>
                </div>
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

export default FertilizerRecommender;
