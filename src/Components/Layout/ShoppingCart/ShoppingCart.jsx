import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../../Contexts/CartContext";
import { FaTimes } from "react-icons/fa";
import PlaceOrder from "./PlaceOrder";

const ShoppingCart = ({ isOpen, closeSidebar }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [checkoutMode, setCheckoutMode] = useState(false);

  const handleProceedToCheckout = () => {
    setCheckoutMode(true);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.productTotal, 0)
      .toFixed(2);
  };
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
      <div
        className="p-4 overflow-y-auto"
        style={!checkoutMode ? { maxHeight: "calc(100% - 15rem)" } : {}}
      >
        {checkoutMode ? (
          <PlaceOrder setCheckoutMode={setCheckoutMode} />
        ) : (
          // Display shopping cart items
          <div>
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
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-gray-600">
                          Total: ${item.productTotal.toFixed(2)}
                        </p>
                      </div>
                      <button
                        className="text-red-600 ml-auto"
                        onClick={() => removeFromCart(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {cart.length > 0 && !checkoutMode && (
        // Display clear cart and proceed to checkout buttons
        <div className="p-4 border-t flex justify-between">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg mb-4"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <div>
            <p>Total: ${calculateTotal()}</p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
