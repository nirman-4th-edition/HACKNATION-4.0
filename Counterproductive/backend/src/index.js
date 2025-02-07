// require("dotenv").config({path:'./env'});






import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js'


dotenv.config({
    path:'./env'
})




connectDB()
.then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`Server is running on port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.error("MongoDB connection FAILED. ", err);
    process.exit(1);
})