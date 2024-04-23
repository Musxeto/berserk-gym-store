import React, { useState } from "react";
import ModalBtn from "./ModalBtn.jsx";
import ProductModal from "./ProductModal.jsx";

const Product = ({ product }) => {
  const discountedPrice = calculateDiscountedPrice(product);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="product-container bg-white rounded-lg shadow-lg p-4">
      <div
        className="image-container relative w-full h-0"
        style={{ paddingBottom: "100%" }}
      >
        <div className="loading-placeholder absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse rounded-lg"></div>
        <img
          src={product.image}
          alt={product.name}
          className="product-image absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
        <img
          src={product.hoverImage}
          alt={product.name}
          className="hover-image absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-0 hover:opacity-100 transition duration-300"
        />
      </div>
      <div className="details mt-4">
        <h3 className="product-name text-base font-semibold truncate">
          {product.name}
        </h3>
        <div className="prices flex items-center mt-2">
          <span className="discounted-price text-gray-800 mr-2 whitespace-nowrap">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="original-price text-sm text-gray-400 line-through whitespace-nowrap">
              ${product.price}
            </span>
          )}
          {product.discount > 0 && (
            <div className="discount text-red-500 text-sm ml-2">
              {product.discount}% off
            </div>
          )}
        </div>
        <div className="sizes mt-4 flex flex-wrap">
          {Array.isArray(product.sizes) ? (
            product.sizes.map((size) => (
              <button
                key={size}
                className="bg-white hover:bg-black transition-opacity hover:text-white rounded-full px-2 py-1 mr-1 mb-1 text-xs"
                onClick={openModal}
              >
                {size}
              </button>
            ))
          ) : (
            <p className="unavailable-sizes">Sizes not available</p>
          )}
        </div>
        <div className="add-to-cart mt-4">
          <ModalBtn product={product} />
        </div>
        <ProductModal
          isOpen={modalOpen}
          closeModal={closeModal}
          product={product}
        />
      </div>
    </div>
  );
};

const calculateDiscountedPrice = (product) => {
  return product.price - (product.price * parseInt(product.discount)) / 100;
};

export default Product;
