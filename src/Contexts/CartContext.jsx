import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchSettings } from "../firebase";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    const fetchDeliveryCharges = async () => {
      try {
        const settings = await fetchSettings("allSettings");
        if (settings && settings.deliveryCharge) {
          setDeliveryCharges(settings.deliveryCharge);
        }
      } catch (error) {
        console.error("Error fetching delivery charges:", error);
      }
    };

    fetchDeliveryCharges();
  }, []);

  useEffect(() => {
    calculateTotal();
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
