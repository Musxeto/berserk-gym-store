import React from "react";
import OrderItem from "./OrderItem";

const OrderList = () => {
  // Dummy data for demonstration
  const orders = [
    { id: 1, customer: "John Doe", total: 100, status: "Pending" },
    { id: 2, customer: "Jane Doe", total: 150, status: "Delivered" },
    { id: 3, customer: "Alice Smith", total: 200, status: "Canceled" },
    // Add more orders as needed
  ];

  return (
    <div className="container mx-auto">
      <div>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
