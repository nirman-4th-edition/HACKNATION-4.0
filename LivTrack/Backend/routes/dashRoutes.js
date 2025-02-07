const express = require("express");
const {
  getHealthDashboard,
} = require("../healthControllers/dashBoardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get health dashboard metrics
router.get("/", protect, getHealthDashboard);

module.exports = router;
