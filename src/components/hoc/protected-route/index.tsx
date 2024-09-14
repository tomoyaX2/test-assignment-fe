import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../store";
import { BASE_APP_PATH } from "../../../shared/constants";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = BASE_APP_PATH,
}) => {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
