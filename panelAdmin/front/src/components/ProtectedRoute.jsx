import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth.js";

const ProtectedRoute = () => {
  if (!isTokenValid()) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
  return <Outlet />; 
};

export default ProtectedRoute;
