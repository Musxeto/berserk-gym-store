import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBox, FaUserCog, FaCogs } from "react-icons/fa";

const QuickAccess = () => {
  return (
    <div className="bg-white py-4 shadow-md rounded-md">
      <ul className="flex justify-center">
        <li className="mx-4">
          <Link
            to="/admin/orders"
            className="flex flex-col items-center text-gray-900 hover:text-gray-600 text-lg"
          >
            <FaShoppingCart className="text-2xl mb-1" />
            Orders
          </Link>
        </li>
        <li className="mx-4">
          <Link
            to="/admin/products"
            className="flex flex-col items-center text-gray-900 hover:text-gray-600 text-lg"
          >
            <FaBox className="text-2xl mb-1" />
            Products
          </Link>
        </li>
        <li className="mx-4">
          <Link
            to="/admin/account"
            className="flex flex-col items-center text-gray-900 hover:text-gray-600 text-lg"
          >
            <FaUserCog className="text-2xl mb-1" />
            Account
          </Link>
        </li>
        <li className="mx-4">
          <Link
            to="/admin/settings"
            className="flex flex-col items-center text-gray-900 hover:text-gray-600 text-lg"
          >
            <FaCogs className="text-2xl mb-1" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default QuickAccess;
