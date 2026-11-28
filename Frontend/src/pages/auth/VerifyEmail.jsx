import { useEffect, useRef, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FiCheckCircle, FiMail, FiRefreshCw, FiShield } from "react-icons/fi";

import {
  verifyEmail,
  resendVerificationEmail,
} from "../../services/authService";

function VerifyEmail() {
  const { token } = useParams();
  const location = useLocation();
  const effectStarted = useRef(false);

  const [email, setEmail] = useState(location.state?.email || "");
  const [status, setStatus] = useState(token ? "loading" : "pending");
  const [message, setMessage] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  useEffect(() => {
    if (!token || effectStarted.current) return;

    effectStarted.current = true;

    const confirmEmail = async () => {
      try {
        const response = await verifyEmail(token);

        setStatus("success");
        setMessage(response.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Unable to verify your email. The link may be invalid or expired.",
        );
      }
    };

    confirmEmail();
  }, [token]);

  const handleResend = async (event) => {
    event.preventDefault();

    setResendMessage("");
    setResendError("");

    if (!email.trim()) {
      setResendError("Please enter your email address.");
      return;
    }

    setResendLoading(true);

    try {
      const response = await resendVerificationEmail(
        email.trim().toLowerCase(),
      );

      setResendMessage(response.message);
    } catch (error) {
      setResendError(
        error.response?.data?.message ||
          "Unable to process your request. Please try again.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
          {status === "success" ? (
            <FiCheckCircle className="h-7 w-7 text-primary" />
          ) : (
            <FiMail className="h-7 w-7 text-primary" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-heading">
          {status === "loading" && "Verifying Your Email"}
          {status === "success" && "Email Verified!"}
          {status === "error" && "Verification Failed"}
          {status === "pending" && "Verify Your Email"}
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          {status === "loading" &&
            "Please wait while we verify your email address."}

          {status === "success" &&
            "Your email address has been successfully verified."}

          {status === "error" && "We could not verify your email address."}

          {status === "pending" &&
            "Check your inbox and follow the verification link to activate your WaitLess account."}
        </p>
      </div>

      {status === "loading" && (
        <div className="flex justify-center py-6">
          <FiRefreshCw className="h-7 w-7 animate-spin text-primary" />
        </div>
      )}

      {(status === "success" || status === "error") && (
        <div
          role={status === "success" ? "status" : "alert"}
          className={`mb-5 rounded-xl border px-4 py-3 text-sm leading-6 ${
            status === "success"
              ? "border-secondary/20 bg-secondary-light text-secondary-dark"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {status === "success" ? (
        <Link
          to="/login"
          state={{ emailVerified: true, registeredEmail: email }}
          className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Continue to Sign In
        </Link>
      ) : (
        <div className="space-y-5">
          <form onSubmit={handleResend} className="space-y-4">
            <div>
              <label
                htmlFor="verificationEmail"
                className="mb-2 block text-sm font-semibold text-heading"
              >
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

                <input
                  id="verificationEmail"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setResendMessage("");
                    setResendError("");
                  }}
                  placeholder="Enter your registered email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            {resendMessage && (
              <div
                role="status"
                className="rounded-xl border border-secondary/20 bg-secondary-light px-4 py-3 text-sm leading-6 text-secondary-dark"
              >
                {resendMessage}
              </div>
            )}

            {resendError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {resendError}
              </div>
            )}

            <button
              type="submit"
              disabled={resendLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiRefreshCw className={resendLoading ? "animate-spin" : ""} />
              {resendLoading ? "Sending..." : "Resend Verification Email"}
            </button>
          </form>

          <div className="flex items-center gap-2 rounded-xl bg-primary-light px-4 py-3 text-xs leading-5 text-muted">
            <FiShield className="h-5 w-5 shrink-0 text-primary" />
            Your account remains inactive until your email is verified.
          </div>
        </div>
      )}

      <p className="mt-7 text-center text-sm text-muted">
        Already verified?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default VerifyEmail;
