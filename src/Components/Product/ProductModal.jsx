import React from "react";

const ProductModal = ({ isOpen, closeModal, product }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
        <img src={product.image} alt={product.name} className="w-full mb-4" />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-gray-800 font-semibold">{product.price}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
