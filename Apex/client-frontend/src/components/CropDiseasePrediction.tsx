import { useState } from "react";

const CropDiseasePrediction = () => {
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [prediction, setPrediction] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setPreview(URL.createObjectURL(selectedFile));
			setPrediction(null);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) return;

		setIsLoading(true);
		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await fetch(
				"http://localhost:3000/predict-disease",
				{
					method: "POST",
					body: formData,
				}
			);
			const data = await response.json();
			setPrediction(data.disease_name);
		} catch (error) {
			console.error("Error predicting disease:", error);
			setPrediction("Error occurred while predicting disease");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
			<h2 className="text-3xl font-bold text-green-800 mb-6">
				Crop Disease Prediction
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="flex items-center justify-center w-full">
					<label
						htmlFor="dropzone-file"
						className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100"
					>
						{preview ? (
							<img
								src={preview || "/placeholder.svg"}
								alt="Preview"
								className="w-full h-full object-cover rounded-lg"
							/>
						) : (
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									className="w-10 h-10 mb-3 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
									></path>
								</svg>
								<p className="mb-2 text-sm text-green-600">
									<span className="font-semibold">
										Click to upload
									</span>{" "}
									or drag and drop
								</p>
								<p className="text-xs text-green-500">
									PNG, JPG or GIF (MAX. 800x400px)
								</p>
							</div>
						)}
						<input
							id="dropzone-file"
							type="file"
							className="hidden"
							onChange={handleFileChange}
							accept="image/*"
						/>
					</label>
				</div>
				<button
					type="submit"
					className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
					disabled={!file || isLoading}
				>
					{isLoading ? "Predicting..." : "Predict Disease"}
				</button>
			</form>
			{prediction && (
				<div className="mt-6 p-4 bg-green-100 rounded-lg">
					<h3 className="text-xl font-semibold text-green-800 mb-2">
						Prediction Result:
					</h3>
					<p className="text-lg text-green-700">{prediction}</p>
				</div>
			)}
		</div>
	);
};

export default CropDiseasePrediction;
