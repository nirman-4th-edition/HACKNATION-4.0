import mongoose from "mongoose";

export const switchDB = async (collegeName: string, key: string) => {
    const uri = `mongodb://localhost:27017/${collegeName}_${key}`;
    await connectDB(uri);
}

export const connectDB = async (uri: string) => {
    try {
        await mongoose.connect(uri, {
            maxPoolSize: 10, // Adjust the pool size as needed
        });
        console.log("Connected to the database");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }
};

