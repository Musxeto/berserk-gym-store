import React from "react";
import { FaTrash } from "react-icons/fa"; // Import FaTrash for the dustbin icon
import { useCart } from "../../../Contexts/CartContext";
import { FaTimes } from "react-icons/fa";
const ShoppingCart = ({ isOpen, closeSidebar }) => {
  // Access the cart context using the useCart hook
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-10 transition-transform duration-300 ${
        isOpen ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button onClick={closeSidebar}>
          <FaTimes className="text-gray-500 hover:text-gray-900" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        {/* Display the items in the cart */}
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cart.map((item, index) => (
              <li key={index} className="py-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">
                      Total: ${item.productTotal.toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="text-red-600 ml-auto"
                    onClick={() => removeFromCart(index)}
                  >
                    <FaTrash /> {/* Dustbin icon for removal */}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Button to clear the cart */}
      {cart.length > 0 && (
        <div className="p-4 border-t">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg w-full"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
