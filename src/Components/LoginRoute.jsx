import React from "react";
import { Navigate, Route } from "react-router-dom";
import { auth } from "../firebase";

const LoginRoute = ({ children }) => {
  const currentUser = auth.currentUser;
  if (currentUser !== null && currentUser !== undefined) {
    return <Navigate to={"/admin/dashboard"} />;
  } else {
    return children;
  }
};

export default LoginRoute;
