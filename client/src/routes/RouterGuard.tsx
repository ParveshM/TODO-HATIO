import { useAppSelector } from "@/redux/Store";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoute = () => {
  const user = useAppSelector((state) => state.user);
  return !user.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
