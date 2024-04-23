import React, { useState } from "react";
import { updateOrderStatus, updateAnalytics } from "../../../firebase";
import { ClipLoader } from "react-spinners";

const OrderItem = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.deliveryStatus);
  const [loading, setLoading] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const handleDeliver = async () => {
    try {
      setLoading(true);
      await updateOrderStatus(order.id, "Delivered");
      setStatus("Delivered");
      await updateAnalytics(order); // Update analytics after delivering order
    } catch (error) {
      console.error("Error delivering order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      await updateOrderStatus(order.id, "Canceled");
      setStatus("Canceled");
    } catch (error) {
      console.error("Error canceling order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 p-4 my-4 rounded-lg w-full ${
        status === "pending" || status === "Pending"
          ? "bg-yellow-100"
          : status === "delivered" || status === "Delivered"
          ? "bg-green-200"
          : "bg-red-200"
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
            <div className="grid grid-cols-1 md:grid-cols-3 mx-10  gap-4 ">
              {order.products && order.products.length > 0 ? (
                order.products.map((product) => (
                  <div
                    className="bg-gray-50 p-4 rounded-lg border border-black"
                    key={product.id}
                  >
                    <p>Name: {product.name}</p>
                    <p>Category: {product.category}</p>
                    <p>Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-2">Total: ${order.total}</p>
          <p className="text-gray-600 mb-2">Status: {status}</p>
          <div className="flex justify-between">
            {(status === "pending" || status === "Pending") && (
              <>
                <button
                  onClick={handleDeliver}
                  disabled={loading}
                  className="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                >
                  {loading ? (
                    <ClipLoader color={"#ffffff"} loading={true} size={20} />
                  ) : (
                    "Deliver"
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  {loading ? (
                    <ClipLoader color={"#ffffff"} loading={true} size={20} />
                  ) : (
                    "Cancel"
                  )}
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
