import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, userRole }) => {
  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoutes;