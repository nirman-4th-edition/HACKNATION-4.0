import mongoose from "mongoose";

export const connectiToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to db");
    } catch (err) {
        console.log(`failed to connect to db ${err}`);
    }
}