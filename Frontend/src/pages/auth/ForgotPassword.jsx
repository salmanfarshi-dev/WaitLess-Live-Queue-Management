import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail, FiSend } from "react-icons/fi";
import api from "../../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/forgot-password", {
        email: email.trim().toLowerCase(),
      });

      setMessage(
        response.data.message ||
          "If an account exists with this email, a password reset link has been sent.",
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <FiMail size={28} />
        </div>

        <h1 className="text-2xl font-bold text-heading sm:text-3xl">
          Forgot Password?
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          No worries! Enter your registered email address and we'll send you a
          link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Email Address
          </label>

          <div className="relative">
            <FiMail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />

            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-4 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
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

        {message && (
          <div
            role="status"
            className="rounded-xl border border-secondary/20 bg-secondary-light px-4 py-3 text-sm text-secondary-dark"
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              Send Reset Link
              <FiSend size={17} />
            </>
          )}
        </button>
      </form>

      <div className="mt-7 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
        >
          <FiArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
