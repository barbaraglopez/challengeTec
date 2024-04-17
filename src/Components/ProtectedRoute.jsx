import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};
