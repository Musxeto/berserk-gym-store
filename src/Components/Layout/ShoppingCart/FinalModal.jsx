import React, { useState } from "react";
import { useCart } from "../../../Contexts/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeOrder } from "../../../firebase";
import { showFailureToast, showSuccessToast } from "../../../App";

const FinalModal = ({ orderDetails, userData, closeModal }) => {
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const { clearCart, total } = useCart(); // Accessing clearCart function from the cart context

  const confirmOrder = async () => {
    setLoading(true); // Set loading to true when confirming order

    const orderDetailsWithTimestamp = {
      ...orderDetails,
      userData,
      total,
      timestamp: new Date(), // Add a timestamp to the order details
      deliveryStatus: "pending", // Add delivery status field
    };

    try {
      const orderId = await storeOrder(orderDetailsWithTimestamp);
      console.log("Order placed successfully with ID:", orderId);
      showSuccessToast("Your order has been confirmed!");
      // Reset states and clear the shopping cart
      closeModal();
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      showFailureToast("Failed to place order. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
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
              className={`bg-green-600 text-white py-2 px-4 rounded-lg mr-4 ${
                loading && "opacity-50 cursor-not-allowed"
              }`} // Disable button and change cursor when loading
              onClick={confirmOrder}
              disabled={loading} // Disable button when loading
            >
              {loading ? "Loading..." : "Done"}{" "}
              {/* Change button text when loading */}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalModal;
