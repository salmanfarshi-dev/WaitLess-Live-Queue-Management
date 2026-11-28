
import api from "./api";

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Verify Email
export const verifyEmail = async (token) => {
  const response = await api.get(`/auth/verify-email/${token}`);
  return response.data;
};

// Resend Verification Email
export const resendVerificationEmail = async (email) => {
  const response = await api.post("/auth/resend-verification", {
    email,
  });
  return response.data;
};

// Get Logged-in User
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Refresh Access Token
export const refreshAccessToken = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
