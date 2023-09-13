import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isUserLoggedIn = localStorage.getItem("login");

  return isUserLoggedIn === "true" ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
