const express = require("express");

const {
  register,
  login,
  getMe,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  logout,
  verifyEmail,
  resendVerificationEmail,
} = require("./authController");

const { protect } = require("../../middlewares/authMiddleware");
const emailVerificationLimiter = require("../../middlewares/emailVerificationLimiter");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/refresh-token", refreshAccessToken);

router.get("/verify-email/:token", verifyEmail);
router.post(
  "/resend-verification",
  emailVerificationLimiter,
  resendVerificationEmail
);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", logout);

module.exports = router;