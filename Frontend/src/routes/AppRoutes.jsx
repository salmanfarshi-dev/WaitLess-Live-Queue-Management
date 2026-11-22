import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import PlaceholderPage from "../components/common/PlaceholderPage";
import Home from "../pages/public/Home";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/hospitals"
          element={<PlaceholderPage title="Hospitals" />}
        />

        <Route
          path="/how-it-works"
          element={<PlaceholderPage title="How It Works" />}
        />

        <Route
          path="/about"
          element={<PlaceholderPage title="About WaitLess" />}
        />

        <Route
          path="/contact"
          element={<PlaceholderPage title="Contact Us" />}
        />
      </Route>

      {/* Authentication */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<PlaceholderPage title="Login" />} />

          <Route
            path="/register"
            element={<PlaceholderPage title="Register" />}
          />

          <Route
            path="/forgot-password"
            element={<PlaceholderPage title="Forgot Password" />}
          />
        </Route>
      </Route>

      {/* Super Admin Dashboard */}
      <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/super-admin/dashboard"
            element={<PlaceholderPage title="Super Admin Dashboard" />}
          />
        </Route>
      </Route>

      {/* Hospital Dashboard */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["hospital_admin", "receptionist"]} />
        }
      >
        <Route element={<DashboardLayout />}>
          <Route
            path="/hospital/dashboard"
            element={<PlaceholderPage title="Hospital Dashboard" />}
          />
        </Route>
      </Route>

      {/* Doctor Dashboard */}
      <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/doctor/dashboard"
            element={<PlaceholderPage title="Doctor Dashboard" />}
          />
        </Route>
      </Route>

      {/* Patient Guest Token Tracking */}
      <Route
        path="/track/:token"
        element={
          <PlaceholderPage
            title="Track Your Token"
            description="Check your queue status without creating an account."
          />
        }
      />

      {/* Hospital Public Profile */}
      <Route
        path="/hospitals/:slug"
        element={<PlaceholderPage title="Hospital Profile" />}
      />

      {/* 404 Page */}
      <Route
        path="*"
        element={
          <PlaceholderPage
            title="404 - Page Not Found"
            description="The page you are looking for does not exist."
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
