import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
  return (
    <>
      <ToastContainer position="bottom-center" autoClose={3000} />
      {children}
    </>
  );
};

export default ToastProvider;
