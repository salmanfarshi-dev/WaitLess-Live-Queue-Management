
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./User");
const PasswordResetToken = require("./PasswordResetToken");

const {
  generateAccessToken,
  generateRefreshToken,
  sendTokenCookies,
} = require("../../utils/generateToken");

const {
  saveRefreshToken,
  revokeRefreshToken,
  isRefreshTokenValid,
} = require("../../utils/refreshTokenUtils");

const sendEmail = require("../../utils/sendEmail");

// Register

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password,
    });

    // Registration does not create an authenticated session.
    // Remove any stale authentication cookies from this browser.
    const existingRefreshToken = req.cookies?.waitless_refresh_token;

    if (existingRefreshToken) {
      await revokeRefreshToken(existingRefreshToken);
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    };

    res.clearCookie("waitless_access_token", cookieOptions);
    res.clearCookie("waitless_refresh_token", cookieOptions);

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please login to continue.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hospitalId: user.hospitalId,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
};


// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await saveRefreshToken(user._id, refreshToken);
    sendTokenCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hospitalId: user.hospitalId,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};

// Get Logged-in User
const getMe = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hospitalId: user.hospitalId,
        avatar: user.avatar,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error("Get Me Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile.",
    });
  }
};

// Refresh Access Token
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.waitless_refresh_token;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found. Please login again.",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const isValid = await isRefreshTokenValid(refreshToken, decoded.id);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is invalid or revoked. Please login again.",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      await revokeRefreshToken(refreshToken);

      return res.status(401).json({
        success: false,
        message: "User not found or account is inactive.",
      });
    }

    await revokeRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    await saveRefreshToken(user._id, newRefreshToken);
    sendTokenCookies(res, newAccessToken, newRefreshToken);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully.",
    });
  } catch (error) {
    console.error("Refresh Token Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token. Please login again.",
    });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
      isActive: true,
    });

    // Return the same response whether the account exists or not.
    const successMessage =
      "If an account exists with this email, a password reset link will be sent.";

    if (!user) {
      return res.status(200).json({
        success: true,
        message: successMessage,
      });
    }

    // Invalidate previous unused reset tokens.
    await PasswordResetToken.deleteMany({
      userId: user._id,
      usedAt: null,
    });

    // Generate a cryptographically secure token.
    const resetToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await PasswordResetToken.create({
      userId: user._id,
      tokenHash,
      expiresAt,
    });

    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
      throw new Error("FRONTEND_URL is not configured.");
    }

    const resetUrl = `${frontendUrl.replace(/\/$/, "")}/reset-password/${resetToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Reset Your WaitLess Password",
        textContent: `Hello ${user.name},

We received a request to reset your WaitLess password.

Open this link to reset your password:
${resetUrl}

This link expires in 15 minutes. If you did not request this, please ignore this email.`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; color: #334155;">
            <h2 style="color: #102a43;">Reset Your WaitLess Password</h2>
            <p>Hello ${user.name},</p>
            <p>We received a request to reset your WaitLess account password.</p>
            <p style="margin: 30px 0;">
              <a href="${resetUrl}" style="background: #2563eb; color: #ffffff; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Reset Password
              </a>
            </p>
            <p>This link expires in <strong>15 minutes</strong>.</p>
            <p>If you did not request a password reset, you can safely ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
            <p style="font-size: 12px; color: #64748b;">WaitLess — Your Time Matters.</p>
          </div>
        `,
      });
    } catch (emailError) {
      await PasswordResetToken.deleteOne({ tokenHash });
      throw emailError;
    }

    return res.status(200).json({
      success: true,
      message: successMessage,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process password reset request.",
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Reset token and new password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const resetRecord = await PasswordResetToken.findOne({
      tokenHash,
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or expired. Please request a new one.",
      });
    }

    const user = await User.findById(resetRecord.userId).select("+password");

    if (!user || !user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Unable to reset password for this account.",
      });
    }

    user.password = password;
    await user.save();

    resetRecord.usedAt = new Date();
    await resetRecord.save();

    // Revoke all refresh sessions after a password change.
    await require("../../modules/auth/RefreshToken").updateMany(
      { userId: user._id, revokedAt: null },
      { revokedAt: new Date() }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful. Please login with your new password.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Password reset failed.",
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.waitless_refresh_token;

    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    }

    res.clearCookie("waitless_access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.clearCookie("waitless_refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed.",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  logout,
};
