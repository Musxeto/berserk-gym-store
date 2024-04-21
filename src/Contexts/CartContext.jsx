import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchSettings } from "../firebase";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0); // State to store delivery charges

  useEffect(() => {
    // Fetch delivery charges from settings when component mounts
    const fetchDeliveryCharges = async () => {
      try {
        const settings = await fetchSettings("allSettings");
        if (settings && settings.deliveryCharge) {
          setDeliveryCharges(settings.deliveryCharge);
        }
      } catch (error) {
        console.error("Error fetching delivery charges:", error);
        // Handle error
      }
    };

    fetchDeliveryCharges(); // Call the function to fetch delivery charges
  }, []);

  useEffect(() => {
    calculateTotal(); // Recalculate total whenever cart or delivery charges change
  }, [cart, deliveryCharges]);

  const calculateTotal = () => {
    let newTotal = deliveryCharges;
    cart.forEach((item) => {
      newTotal += item.productTotal;
    });
    setTotal(newTotal);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, total, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
