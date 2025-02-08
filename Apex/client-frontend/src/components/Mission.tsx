import SunsetFarmer from "../assets/SunsetFarmer.jpeg";

const Mission = () => {
	return (
		<div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
			<h2 className="text-3xl font-bold text-green-800 mb-6">
				Our Mission
			</h2>
			<div className="flex flex-col md:flex-row items-center gap-8">
				<div className="md:w-1/2">
					<img
						src={SunsetFarmer || "/placeholder.svg"}
						alt="Indian Farmer"
						className="rounded-lg shadow-md w-full h-auto"
					/>
				</div>
				<div className="md:w-1/2">
					<p className="text-lg text-gray-700 mb-4">
						At Bhumi, we are committed to empowering Indian farmers
						with cutting-edge technology. Our mission is to
						revolutionize agriculture by providing easy-to-use tools
						for crop disease prediction and climate-based crop
						selection.
					</p>
					<p className="text-lg text-gray-700 mb-4">
						We believe that by combining traditional farming wisdom
						with modern AI-driven solutions, we can help increase
						crop yields, reduce losses, and improve the livelihoods
						of millions of farmers across India.
					</p>
					<p className="text-lg text-gray-700">
						Join us in our journey to create a more sustainable and
						prosperous future for Indian agriculture!
					</p>
				</div>
			</div>
		</div>
	);
};

export default Mission;
