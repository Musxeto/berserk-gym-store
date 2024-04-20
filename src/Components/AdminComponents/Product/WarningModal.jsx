import React from "react";

const WarningModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <div className={`modal ${isOpen ? "block" : "hidden"} ...`}>
      <div className="modal-overlay ..."></div>
      <div className="modal-container ...">
        <div className="modal-content">
          <h2 className="text-lg font-semibold mb-4">Warning</h2>
          <p className="mb-4">Are you sure you want to delete this product?</p>
          <div className="flex justify-end">
            <button
              className="button mr-2 bg-red-500 text-white px-3 py-1 rounded-md"
              onClick={onConfirm}
            >
              Delete
            </button>
            <button
              className="button bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
