"use client";

import { useState } from "react";

const FertiliserRecommender = () => {
	const [nitrogen, setNitrogen] = useState("");
	const [phosphorus, setPhosphorus] = useState("");
	const [potassium, setPotassium] = useState("");
	const [pH, setPH] = useState("");
	const [cropName, setCropName] = useState("");
	const [recommendation, setRecommendation] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch(
				"http://localhost:3000/fertiliser-recommender",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						nitrogen,
						phosphorus,
						potassium,
						pH,
						cropName,
					}),
				}
			);
			const data = await response.json();
			setRecommendation(data.recommended_fertiliser);
		} catch (error) {
			console.error("Error recommending fertiliser:", error);
			setRecommendation("Error occurred while recommending fertiliser");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
			<h2 className="text-3xl font-bold text-green-800 mb-6">
				Fertiliser Recommender
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="nitrogen"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Nitrogen (N)
						</label>
						<input
							type="number"
							id="nitrogen"
							value={nitrogen}
							onChange={(e) => setNitrogen(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Enter nitrogen content"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="phosphorus"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Phosphorus (P)
						</label>
						<input
							type="number"
							id="phosphorus"
							value={phosphorus}
							onChange={(e) => setPhosphorus(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Enter phosphorus content"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="potassium"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Potassium (K)
						</label>
						<input
							type="number"
							id="potassium"
							value={potassium}
							onChange={(e) => setPotassium(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Enter potassium content"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="pH"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							pH Value
						</label>
						<input
							type="number"
							id="pH"
							value={pH}
							onChange={(e) => setPH(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
							placeholder="Enter pH value"
							step="0.1"
							min="0"
							max="14"
							required
						/>
					</div>
				</div>
				<div>
					<label
						htmlFor="cropName"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Crop Name
					</label>
					<input
						type="text"
						id="cropName"
						value={cropName}
						onChange={(e) => setCropName(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
						placeholder="Enter crop name (currently only supports Wheat, Rice and Maize)"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
					disabled={isLoading}
				>
					{isLoading
						? "Recommending..."
						: "Get Fertiliser Recommendation"}
				</button>
			</form>
			{recommendation && (
				<div className="mt-6 p-4 bg-green-100 rounded-lg">
					<h3 className="text-xl font-semibold text-green-800 mb-2">
						Recommended Fertiliser:
					</h3>
					<p className="text-lg text-green-700">{recommendation}</p>
				</div>
			)}
		</div>
	);
};

export default FertiliserRecommender;
