
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUser,
} from "react-icons/fi";

import { register } from "../../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setValidationError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password.length < 8) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    try {
      await dispatch(
        register({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        })
      ).unwrap();

      navigate("/login", {
        replace: true,
        state: {
          registrationSuccess: true,
          registeredEmail: formData.email.trim().toLowerCase(),
        },
      });
    } catch {
      // Redux handles registration errors.
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
          <FiUser className="h-7 w-7 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-heading">
          Create Your Account
        </h1>

        <p className="mt-2 text-sm text-muted">
          Get started with WaitLess today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Full Name
          </label>

          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Email Address
          </label>

          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Password
          </label>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-12 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          </div>

          <p className="mt-2 text-xs text-muted">
            Password must contain at least 8 characters.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Confirm Password
          </label>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-12 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((previous) => !previous)
              }
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
            >
              {showConfirmPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {(validationError || error) && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {validationError || error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-muted">
        Already have an account?{" "}
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

export default Register;
