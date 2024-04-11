import React, { useState } from "react";

const OrderItem = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.status);

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
        status === "Pending"
          ? "bg-yellow-200"
          : status === "Delivered"
          ? "bg-green-200"
          : "bg-red-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`text-lg font-semibold mb-2 ${
            status === "Delivered"
              ? "line-through text-green-500"
              : status === "Canceled"
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
          <p className="text-gray-600 mb-2">Customer: {order.customer}</p>
          <p className="text-gray-600 mb-2">Total: ${order.total}</p>
          <p className="text-gray-600 mb-2">Status: {status}</p>
          {/* Add more details as needed */}
          <div className="flex justify-between">
            {status === "Pending" && (
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
            {status === "Delivered" && (
              <p className="text-green-500">Delivered</p>
            )}
            {status === "Canceled" && <p className="text-red-500">Canceled</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
