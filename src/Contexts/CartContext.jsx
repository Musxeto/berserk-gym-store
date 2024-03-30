import React, { createContext, useContext, useState } from "react";

// Create a new context for the cart
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap your application and provide the cart context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
