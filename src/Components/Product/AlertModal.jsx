import React from "react";

const AlertModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <button
          onClick={onClose}
          className="bg-black text-white py-2 px-4 rounded-lg mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
