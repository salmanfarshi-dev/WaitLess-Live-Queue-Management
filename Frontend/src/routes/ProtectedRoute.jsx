import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRoles = [] }) {
  // Temporary authentication check.
  // Later, this will come from Redux auth state.
  const isAuthenticated = false;
  const userRole = null;

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
