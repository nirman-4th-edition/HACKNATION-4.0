
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Mission from "./components/Mission";
import CropDiseasePrediction from "./components/CropDiseasePrediction";
import BestCropPrediction from "./components/BestCropPrediction";
import Footer from "./components/Footer";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import "./App.css";
import { AuthProvider } from "./components/contexts/AuthContext";
import FertiliserRecommender from "./components/FertiliserRecommender";

function App() {

	return (
		<Router>
			<AuthProvider>
				<div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
					<Header />
					<main className="container mx-auto px-4 py-8">
						<Routes>
							<Route path="/" element={<Mission />} />
							<Route
								path="/disease"
								element={<CropDiseasePrediction />}
							/>
							<Route
								path="/best-crop"
								element={<BestCropPrediction />}
							/>
							<Route
								path="/fertiliser-recommender"
								element={<FertiliserRecommender />}
							/>
							<Route path="/signup" element={<SignUp />} />
							<Route path="/login" element={<Login />} />
						</Routes>
					</main>
					<Footer />
				</div>
			</AuthProvider>
		</Router>
	);
}

export default App;
