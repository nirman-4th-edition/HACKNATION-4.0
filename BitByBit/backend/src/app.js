import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    // explore all .use()
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser()); // to get access and set cookies of the client's browser

//routes import
import userRouter from "../routes/user.routes.js";
import feedRouter from "../routes/feed.routes.js";
//import contactRouter from "../routes/contact.routes.js";

//import feedRouter from "../routes/feed.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/feed", feedRouter);
//app.use("/api/v1/users", contactRouter)

export { app };
