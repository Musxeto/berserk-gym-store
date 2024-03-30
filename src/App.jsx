import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import ToastProvider from "./Contexts/ToastProvider";
import { CartProvider } from "./Contexts/CartContext";

function App() {
  return (
    <CartProvider>
      {" "}
      <ToastProvider>
        <div>
          <Home />
        </div>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
