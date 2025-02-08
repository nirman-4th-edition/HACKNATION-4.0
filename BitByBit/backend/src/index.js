import dotenv from "dotenv";
import mongoose from "mongoose";
import {DB_NAME} from './constants.js';
import { app } from "./app.js";
import connectDB from "../db/index.js";


dotenv.config({
    path: './env'
})

connectDB()// returns a promise as it's async function
.then(() => {
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(`Server is running on port ${ process.env.PORT}`);
    })
})
.catch( (err) =>{
    console.log("MONGODB connection failed!!!", err);
} )





/*
import express from "express";

const app = express();
// use try catch
// the db is always on different continent. it takes time


;{ async ()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on('error' , (error) => {
            console.log("Error: ", error);
            throw error;

        })

        app.listen(process.env.PORT, ()=> {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("error", error);
        throw error;
    }

} }{}
*/