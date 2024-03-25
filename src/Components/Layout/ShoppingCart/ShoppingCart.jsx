import React from "react";
import { FaTimes } from "react-icons/fa"; // Add this line to import FaTimes

const ShoppingCart = ({ isOpen, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-10 transition-transform duration-300 ${
        isOpen ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button onClick={closeSidebar}>
          <FaTimes className="text-gray-500 hover:text-gray-900" />
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
