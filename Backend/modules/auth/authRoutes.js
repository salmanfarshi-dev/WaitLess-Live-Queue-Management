
const express = require("express");

const {
  register,
  login,
  getMe,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  logout,
} = require("./authController");

const { protect } = require("../../middlewares/authMiddleware");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get Logged-in User
router.get("/me", protect, getMe);

// Refresh Access Token
router.post("/refresh-token", refreshAccessToken);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// Logout
router.post("/logout", logout);

module.exports = router;
