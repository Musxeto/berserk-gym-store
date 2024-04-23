import React, { useState } from "react";
import {
  FiHome,
  FiLogOut,
  FiShoppingBag,
  FiPackage,
  FiUsers,
} from "react-icons/fi";
import { logout } from "../../../../firebase";
import { IoSettingsOutline } from "react-icons/io5";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import { showSuccessToast, showFailureToast } from "../../../../App";
import { MdCached } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ className }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState(null);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleLogoutModal = () => {
    setLogoutModalOpen(!logoutModalOpen);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      setSidebarOpen(false);
      setLoggingOut(true);
      console.log("Logging out...");
      await logout();
      setLoggingOut(false);
      showSuccessToast("Logged Out");
      console.log("Logged Out!");
      navigate("/admin");
    } catch (error) {
      console.error("Error logging out:", error);
      setLoggingOut(false);
      setLogoutError(error.message || "Failed to logout");
      showFailureToast(logoutError);
    }
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="fixed top-0 right-0 z-50 p-2 mt-4 mr-4 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen overflow-y-auto transition-transform shadow-lg ${className} ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full "
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 bg-gray-50 dark:bg-gray-800 shadow-lg">
          {/* Upper section */}
          <div>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FiHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FiShoppingBag className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FiPackage className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/settings"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <IoSettingsOutline className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/account"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FiUsers className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Account</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Lower section */}
          <div>
            <ul className="space-y-2 font-medium">
              <li>
                {/* Logout button with spinner */}
                <button
                  onClick={toggleLogoutModal}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {loggingOut ? (
                    <MdCached className="animate-spin w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  ) : (
                    <FiLogOut className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  )}
                  <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Logout confirmation modal */}
      <LogoutConfirmationModal
        isOpen={logoutModalOpen}
        onClose={toggleLogoutModal}
        onLogout={handleLogout} // Make sure this is passed correctly
      />
    </>
  );
};

export default Sidebar;
