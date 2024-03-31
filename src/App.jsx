import React from "react";
import "./App.css";
import Home from "./Pages/Home";
import ToastProvider from "./Contexts/ToastProvider";
import { CartProvider } from "./Contexts/CartContext";
import Navbar from "./Components/Layout/Navbar/Navbar";
import Footer from "./Components/Layout/Footer/Footer";

function App() {
  return (
    <CartProvider>
      {" "}
      <ToastProvider>
        <Navbar />
        <div>
          <Home />
        </div>
        <Footer />
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
