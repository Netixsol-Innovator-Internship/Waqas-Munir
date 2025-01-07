import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  const location = useLocation();

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
