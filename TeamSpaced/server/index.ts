import express from "express";
import plantRouter from "./plant/index.js";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/plant", plantRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
