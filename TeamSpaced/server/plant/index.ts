import express from "express";

const router = express.Router();

router.use("/", (req, res) => {
  res.send("Hello from plant");
});

export default router;
