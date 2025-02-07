import mongoose from "mongoose";
export const mongooseRun = async () => {
	await mongoose.connect(process.env.MONGO_URL);
	mongoose.connection.on(
		"error",
		console.error.bind(console, "connection error"),
	);
	mongoose.connection.once("open", () => {
		console.log("Connection to MongoDB.");
	});
};
