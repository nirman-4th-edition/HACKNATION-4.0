import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const conn = mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`Mongodb is Connected${(await conn).connection.host}`);
    } catch (error) {
        console.log(error)
    }
}

export default connectDB