
const jwt = require("jsonwebtoken");
const User = require("../modules/auth/User");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.waitless_access_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not found or account is inactive.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Access token expired."
          : "Invalid access token.",
    });
  }
};

module.exports = { protect };
