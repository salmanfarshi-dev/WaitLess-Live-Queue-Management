
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

import { login } from "../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);

  const registrationSuccess =
    location.state?.registrationSuccess === true;

  const registeredEmail = location.state?.registeredEmail || "";

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: registeredEmail,
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await dispatch(login(formData)).unwrap();

      const roleRoutes = {
        super_admin: "/super-admin/dashboard",
        hospital_admin: "/hospital/dashboard",
        receptionist: "/hospital/dashboard",
        doctor: "/doctor/dashboard",
      };

      const destination = roleRoutes[user.role] || "/";

      navigate(location.state?.from?.pathname || destination, {
        replace: true,
      });
    } catch {
      // Login error is handled by Redux.
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
          <FiLock className="h-7 w-7 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-heading">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm text-muted">
          Sign in to your WaitLess account
        </p>
      </div>

      {registrationSuccess && (
        <div
          role="status"
          className="mb-5 rounded-xl border border-secondary/20 bg-secondary-light px-4 py-3 text-sm leading-6 text-secondary-dark"
        >
          Your account has been created successfully!
          Please sign in with your registered email and password.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-heading"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-12 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-heading"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
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
          className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-muted">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
          Create Account
        </Link>
      </p>

      <p className="mt-6 text-center text-xs leading-5 text-muted">
        By signing in, you agree to WaitLess Terms of Service
        and Privacy Policy.
      </p>
    </div>
  );
}

export default Login;
