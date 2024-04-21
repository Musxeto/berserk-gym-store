import React, { useState } from "react";

const OrderItem = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.deliveryStatus);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const handleDeliver = () => {
    console.log(`Order ${order.id} delivered.`);
    setStatus("Delivered");
  };

  const handleCancel = () => {
    console.log(`Order ${order.id} canceled.`);
    setStatus("Canceled");
  };

  return (
    <div
      className={`bg-white border border-gray-200 p-4 my-4 rounded-lg w-full ${
        status === "pending"
          ? "bg-yellow-100" /* Yellow for pending */
          : status === "delivered"
          ? "bg-green-100" /* Green for delivered */
          : "bg-red-100" /* Red for canceled */
      }`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`text-lg font-semibold mb-2 ${
            status === "delivered"
              ? "line-through text-green-500"
              : status === "canceled"
              ? "line-through text-red-500"
              : ""
          }`}
        >
          Order #{order.id}
        </h3>
        <button
          onClick={toggleAccordion}
          className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          {expanded ? "-" : "+"}
        </button>
      </div>
      {expanded && (
        <div>
          <div className="text-gray-600 mb-2">
            <h4>User Data:</h4>
            <p>Name: {order.userData.name}</p>
            <p>Email: {order.userData.email}</p>
            <p>Phone Number: {order.userData.phoneNumber}</p>
            <p>Address: {order.userData.address}</p>
            <p>Additional Info: {order.userData.additionalInfo}</p>
          </div>
          <div className="text-gray-600 mb-2">
            <h4>Products:</h4>
            {order.products && order.products.length > 0 ? (
              order.products.map((product) => (
                <div key={product.id}>
                  <p>Name: {product.name}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  {/* Add more product details as needed */}
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          <p className="text-gray-600 mb-2">Total: ${order.total}</p>
          <p className="text-gray-600 mb-2">Status: {status}</p>
          <div className="flex justify-between">
            {status === "pending" && (
              <>
                <button
                  onClick={handleDeliver}
                  className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  Deliver
                </button>
                <button
                  onClick={handleCancel}
                  className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Cancel
                </button>
              </>
            )}
            {status === "delivered" && (
              <p className="text-green-500">Delivered</p>
            )}
            {status === "canceled" && <p className="text-red-500">Canceled</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
