import express from "express";
import plantRouter from "./plant/index.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/plant", plantRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
