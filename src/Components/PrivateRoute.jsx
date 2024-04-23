// PrivateRoute.js
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { auth } from "../firebase";

const PrivateRoute = ({ children }) => {
  const { currentUser } = auth.currentUser;
  if (currentUser !== null && currentUser !== undefined) {
    return children;
  } else {
    return <Navigate to={"/admin"} />;
  }
};

export default PrivateRoute;
