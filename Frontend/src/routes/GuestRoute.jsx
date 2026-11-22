
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function GuestRoute() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (isAuthenticated) {
    const userRole = user?.role;

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
