// FinalModal.js
import React from "react";

const FinalModal = ({ orderDetails, userData, closeModal }) => {
  const calculateTotal = (orderDetails) => {
    let total = 0;
    orderDetails.forEach((item) => {
      total += item.productTotal;
    });
    return total.toFixed(2);
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
            <p className="mt-4">Total: ${calculateTotal(orderDetails)}</p>
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
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg mr-4"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalModal;
