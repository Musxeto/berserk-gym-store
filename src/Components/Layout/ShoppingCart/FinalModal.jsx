import React, { useState } from "react";
import { useCart } from "../../../Contexts/CartContext";

const FinalModal = ({
  orderDetails,
  userData,
  closeModal,
  onCheckoutModeChange,
}) => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { clearCart, total } = useCart(); // Accessing clearCart function from the cart context

  const confirmOrder = () => {
    // Log the complete order details object
    console.log("Complete Order Details:", {
      orderDetails,
      userData,
      total,
    });

    // Add your confirmation message here
    setConfirmationMessage("Your order has been confirmed!");

    // Reset states and clear the shopping cart
    closeModal();
    clearCart();

    // Set checkoutMode to false
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <ul>
              {orderDetails.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.productTotal.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-4">Total: ${total}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">User Information</h2>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Address:</strong> {userData.address}
            </p>
            <p>
              <strong>Phone Number:</strong> {userData.phoneNumber}
            </p>
            <p>
              <strong>Additional Info:</strong> {userData.additionalInfo}
            </p>
          </div>
        </div>
        <div className="mt-8 text-right">
          {confirmationMessage ? (
            <p className="text-green-600">{confirmationMessage}</p>
          ) : (
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-lg mr-4"
              onClick={confirmOrder}
            >
              Confirm Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalModal;
