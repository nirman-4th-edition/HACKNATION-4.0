const express = require("express");
const router = express.Router();
const authController = require("../userControllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/profile", authMiddleware.protect, authController.getProfile);
router.patch(
  "/update-basic-info",
  authMiddleware.protect,
  authController.updateBasicInfo
);
router.patch(
  "/update-security-info",
  authMiddleware.protect,
  authController.updateSecurityInfo
);
module.exports = router;
