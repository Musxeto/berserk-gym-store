import React, { useState, useEffect } from "react";
import OrderItem from "./OrderItem";
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const OrderList = ({ orders }) => {
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("customer");
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Track the expanded order ID

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = orders.filter(
      (order) =>
        order.customer.toLowerCase().includes(term.toLowerCase()) ||
        order.status.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedOrders =
    orders.length > 0
      ? [...filteredOrders].sort((a, b) => {
          const aValue = a[sortField]?.toLowerCase();
          const bValue = b[sortField]?.toLowerCase();
          if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
          if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
          return 0;
        })
      : [];

  // Function to toggle the expanded state of an order
  const toggleExpanded = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4  ">
        {/* Search input */}
        <div className="flex items-center mb-4 md:mb-0 flex-grow">
          <FaSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search by customer or status..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Sort and order select */}
        <div className="flex items-center">
          <div className="mr-4">
            <select
              value={sortField}
              onChange={(e) => handleSort(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="customer">Sort by Customer</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="ml-2">
            {sortOrder === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
          </div>
        </div>
      </div>
      <hr />
      <br />
      {/* Order items */}
      <div className="grid grid-cols-1  gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
        {sortedOrders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            expanded={expandedOrderId === order.id} // Pass the expanded state to each OrderItem
            toggleExpanded={toggleExpanded} // Pass the toggle function to each OrderItem
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
