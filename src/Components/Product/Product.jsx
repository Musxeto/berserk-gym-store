import React, { useState } from "react";
import ModalBtn from "./ModalBtn.jsx";
import ProductModal from "./ProductModal.jsx"; // Assuming the path is correct

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
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="relative">
        <img
          src={product.hoverImage}
          alt={product.name}
          className="w-full rounded-lg"
        />
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg absolute top-0 opacity-0 hover:opacity-100 transition duration-300"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        {/* Display the discounted price and original price */}
        <div className="flex items-center">
          <span className="text-gray-800 mr-2">
            <span className="text-red-500">${discountedPrice.toFixed(2)}</span>{" "}
            {/* Display discounted price */}
            {product.discount && (
              <span className="ml-2 text-gray-400 line-through">
                ${product.price}
              </span> // Display original price with strike-through
            )}
          </span>
          {product.discount && (
            <div className="text-red-500">{product.discount}% off</div>
          )}
        </div>
        {/* Display sizes */}
        <div className="mt-4 flex">
          {product.sizes.map((size) => (
            <button
              key={size}
              className="bg-white hover:bg-black transition-opacity hover:text-white rounded-full px-3 py-1 mr-2"
              onClick={openModal}
            >
              {size}
            </button>
          ))}
        </div>
        {/* Add the AddToCartButton component */}
        <div className="mt-4">
          <ModalBtn product={product} />
        </div>

        {/* Product modal */}
        <ProductModal
          isOpen={modalOpen}
          closeModal={closeModal}
          product={...product}
        />
      </div>
    </div>
  );
};

export default Product;
