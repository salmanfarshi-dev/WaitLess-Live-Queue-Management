import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import api from "../../services/api";

function ResetPassword() {
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(`/auth/reset-password/${token}`, {
        password: formData.password,
      });

      setMessage(
        response.data.message || "Your password has been reset successfully.",
      );

      setIsSuccess(true);

      setFormData({
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password. The link may be invalid or expired.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <FiLock size={28} />
        </div>

        <h1 className="text-2xl font-bold text-heading sm:text-3xl">
          Reset Password
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          Create a new password for your WaitLess account. Make sure it is
          strong and secure.
        </p>
      </div>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-heading"
            >
              New Password
            </label>

            <div className="relative">
              <FiLock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                size={18}
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-12 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-muted">
              Password must contain at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-heading"
            >
              Confirm New Password
            </label>

            <div className="relative">
              <FiLock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                size={18}
              />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-12 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      ) : (
        <div className="space-y-5">
          <div
            role="status"
            className="rounded-xl border border-secondary/20 bg-secondary-light px-4 py-4 text-center text-sm text-secondary-dark"
          >
            {message}
          </div>

          <Link
            to="/login"
            className="flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Continue to Login
          </Link>
        </div>
      )}

      {!isSuccess && (
        <div className="mt-7 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
          >
            <FiArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
