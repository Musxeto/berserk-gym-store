import React, { useState } from "react";
import ModalBtn from "./ModalBtn.jsx";
import ProductModal from "./ProductModal.jsx";

const Product = ({ product }) => {
  // Calculate the discounted price
  const discountedPrice =
    product.price - (product.price * parseInt(product.discount)) / 100;

  // State to manage the visibility of the product modal
  const [modalOpen, setModalOpen] = useState(false);

  // Function to handle opening the product modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to handle closing the product modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex flex-col md:flex-row items-center md:items-start">
      <div className="w-full md:w-1/2 mr-0 md:mr-4 mb-4 md:mb-0">
        <div className="relative w-full h-0" style={{ paddingBottom: "100%" }}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
          <img
            src={product.hoverImage}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-0 hover:opacity-100 transition duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-gray-800 mr-2">
            <span className="text-red-500">${discountedPrice.toFixed(2)}</span>{" "}
            {product.discount > 0 && (
              <span className="ml-2 text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </span>
          {product.discount > 0 && (
            <div className="text-red-500">{product.discount}% off</div>
          )}
        </div>
        <div className="flex flex-wrap justify-start mb-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              className="bg-white hover:bg-black transition-opacity hover:text-white rounded-full px-1 py-0.5 mr-1 mb-1 text-xs"
            >
              {size}
            </button>
          ))}
        </div>
        <div className="mt-auto">
          <ModalBtn product={product} />
        </div>
      </div>
      <ProductModal
        isOpen={modalOpen}
        closeModal={closeModal}
        product={product}
      />
    </div>
  );
};

export default Product;
