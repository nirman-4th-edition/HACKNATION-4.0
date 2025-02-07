import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3031;

app.use(express.json());

mongoose
  .connect(process.env.DBURI as string)
  .then(() => {
    console.log("Connected to Database !");
    app.listen(PORT, () => {
      console.log(`API running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.error(err));
