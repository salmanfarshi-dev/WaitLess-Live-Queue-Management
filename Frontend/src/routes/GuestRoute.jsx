import { Navigate, Outlet } from "react-router-dom";

function GuestRoute() {
  // Temporary authentication check.
  // Later, this will come from Redux auth state.
  const isAuthenticated = false;
  const userRole = "hospital_admin";

  if (isAuthenticated) {
    if (userRole === "super_admin") {
      return <Navigate to="/super-admin/dashboard" replace />;
    }

    if (userRole === "doctor") {
      return <Navigate to="/doctor/dashboard" replace />;
    }

    return <Navigate to="/hospital/dashboard" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;
