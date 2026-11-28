
const EmailVerificationToken = require("./EmailVerificationToken");

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

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await EmailVerificationToken.create({
      userId: user._id,
      tokenHash,
      expiresAt,
    });

    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
      throw new Error("FRONTEND_URL is not configured.");
    }

    const verificationUrl = `${frontendUrl.replace(/\/$/, "")}/verify-email/${verificationToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Verify Your WaitLess Email Address",
        textContent: `Hello ${user.name},

Thank you for registering with WaitLess.

Please open the following link to verify your email address:

${verificationUrl}

This link expires in 24 hours.

If you did not create this account, please ignore this email.`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; color: #334155;">
            <h2 style="color: #102a43;">Verify Your Email Address</h2>
            <p>Hello ${user.name},</p>
            <p>Thank you for creating your WaitLess account.</p>
            <p>Please verify your email address to activate your account.</p>
            <p style="margin: 30px 0;">
              <a href="${verificationUrl}" style="background: #2563eb; color: #ffffff; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Verify Email Address
              </a>
            </p>
            <p>This link expires in <strong>24 hours</strong>.</p>
            <p>If you did not create this account, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
            <p style="font-size: 12px; color: #64748b;">WaitLess — Your Time Matters.</p>
          </div>
        `,
      });
    } catch (emailError) {
      await EmailVerificationToken.deleteOne({ tokenHash });

      console.error("Verification Email Error:", emailError);

      return res.status(503).json({
        success: false,
        message:
          "Your account was created, but the verification email could not be sent. Please use the resend verification option.",
        email: user.email,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
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

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email address before logging in.",
        code: "EMAIL_NOT_VERIFIED",
        email: user.email,
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

    if (!user.isEmailVerified) {
      await revokeRefreshToken(refreshToken);

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

      return res.status(403).json({
        success: false,
        message: "Please verify your email address.",
        code: "EMAIL_NOT_VERIFIED",
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


const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required.",
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const verificationRecord = await EmailVerificationToken.findOne({
      tokenHash,
    });

    if (!verificationRecord) {
      return res.status(400).json({
        success: false,
        message: "Verification link is invalid or expired.",
      });
    }

    const user = await User.findById(verificationRecord.userId);

    if (!user || !user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Unable to verify this account.",
      });
    }

    if (user.isEmailVerified) {
      return res.status(200).json({
        success: true,
        message: "Your email address is already verified.",
      });
    }

    if (
      verificationRecord.usedAt ||
      verificationRecord.expiresAt <= new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Verification link is invalid or expired. Please request a new one.",
      });
    }

    user.isEmailVerified = true;
    await user.save();

    verificationRecord.usedAt = new Date();
    await verificationRecord.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Verify Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Email verification failed. Please try again.",
    });
  }
};

const resendVerificationEmail = async (req, res) => {
  const successMessage =
    "If an unverified account exists with this email, a verification link will be sent.";

  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
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

    // Do not reveal whether an account exists.
    if (!user || user.isEmailVerified) {
      return res.status(200).json({
        success: true,
        message: successMessage,
      });
    }

    await EmailVerificationToken.deleteMany({
      userId: user._id,
      usedAt: null,
    });

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await EmailVerificationToken.create({
      userId: user._id,
      tokenHash,
      expiresAt,
    });

    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
      throw new Error("FRONTEND_URL is not configured.");
    }

    const verificationUrl = `${frontendUrl.replace(/\/$/, "")}/verify-email/${verificationToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Verify Your WaitLess Email Address",
        textContent: `Hello ${user.name},

Please verify your WaitLess email address using this link:

${verificationUrl}

This link expires in 24 hours.

If you did not request this email, please ignore it.`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; color: #334155;">
            <h2 style="color: #102a43;">Verify Your Email Address</h2>
            <p>Hello ${user.name},</p>
            <p>Please verify your email address to activate your WaitLess account.</p>
            <p style="margin: 30px 0;">
              <a href="${verificationUrl}" style="background: #2563eb; color: #ffffff; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Verify Email Address
              </a>
            </p>
            <p>This link expires in <strong>24 hours</strong>.</p>
            <p>If you did not request this email, please ignore it.</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
            <p style="font-size: 12px; color: #64748b;">WaitLess — Your Time Matters.</p>
          </div>
        `,
      });
    } catch (emailError) {
      await EmailVerificationToken.deleteOne({ tokenHash });
      throw emailError;
    }

    return res.status(200).json({
      success: true,
      message: successMessage,
    });
  } catch (error) {
    console.error("Resend Verification Email Error:", error);

    // Keep the response generic to avoid revealing account existence.
    return res.status(200).json({
      success: true,
      message: successMessage,
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
  verifyEmail,
  resendVerificationEmail,
};
