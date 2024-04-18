import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const OrderList = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", total: 100, status: "Pending" },
    { id: 2, customer: "Jane Doe", total: 150, status: "Delivered" },
    { id: 3, customer: "Alice Smith", total: 200, status: "Canceled" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [sortField, setSortField] = useState("customer");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const aValue = a[sortField].toLowerCase();
    const bValue = b[sortField].toLowerCase();
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 bg-gray-100 p-4 rounded-lg border border-gray-200">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
        {sortedOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
