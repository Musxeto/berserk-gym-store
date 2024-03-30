import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Import the FaShoppingCart icon from react-icons
import ProductModal from "./ProductModal";

const AddToCartButton = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="bg-black text-white py-2 px-4 rounded-lg flex items-center"
        onClick={openModal}
      >
        <FaShoppingCart className="mr-2" /> Add to Cart{" "}
        {/* Include the icon before the text */}
      </button>
      <ProductModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        product={product}
      />
    </>
  );
};

export default AddToCartButton;
