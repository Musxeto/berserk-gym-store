import React from "react";
import { MdCached } from "react-icons/md";

const LogoutConfirmationModal = ({
  isOpen,
  onClose,
  onLogout,
  loading,
  error,
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <p className="text-lg font-semibold mb-3">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-end">
          {loading ? (
            <MdCached className="animate-spin w-5 h-5 text-gray-500 mr-3" />
          ) : (
            <button
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg mr-3"
              onClick={onClose}
            >
              Cancel
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
            onClick={onLogout} // Ensure onLogout is called on click
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
