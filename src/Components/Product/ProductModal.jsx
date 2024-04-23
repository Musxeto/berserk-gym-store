// ProductModal.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useCart } from "../../Contexts/CartContext";

const ProductModal = ({ isOpen, closeModal, openModal, product }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const showFailureToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const discountedPrice =
    product.price - (product.price * parseInt(product.discount)) / 100;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !quantity) {
      showFailureToast("Please select both size and quantity.");
      return;
    }

    setIsLoading(true);
    const total = discountedPrice * quantity;

    // Simulating an asynchronous operation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const item = {
      ...product,
      size: selectedSize,
      quantity: quantity,
      productTotal: total,
    };

    // Add the item to the cart using the addToCart function from the cart context
    addToCart(item);

    setIsLoading(false);
    showSuccessToast("Product added to cart!");
    closeModal();
  };

  if (isLoading) {
    // Display a loading spinner while adding to cart
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <ClipLoader size={50} color="#ffffff" loading={true} />
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg max-w-4xl flex">
        {/* Left Column: Product Image */}
        <div className="w-1/2">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
            <img
              src={product.hoverImage}
              alt={product.name}
              className="w-full rounded-lg absolute top-0 opacity-0 hover:opacity-100 transition duration-300"
            />
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="w-1/2 pl-8">
          <h2 className="text-2xl font-semibold mb-4 flex justify-between items-center">
            {product.name}
            <button onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 hover:text-gray-800 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-gray-800 font-semibold">
            {" "}
            {product.discount > 0 && (
              <div>
                <span className="text-red-500">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-gray-400 line-through">
                  ${product.price}
                </span>
              </div>
            )}
          </div>

          {/* Size Selector */}
          <div className="mt-4">
            <label className="text-gray-700">Select Size:</label>
            <div className="flex mt-2">
              {Array.isArray(product.sizes) ? (
                product.sizes.map((size) => (
                  <button
                    key={size}
                    className="bg-white hover:bg-black transition-opacity hover:text-white rounded-full px-2 py-1 mr-1 mb-1 text-xs"
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p>Sizes not available</p>
              )}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4">
            <label className="text-gray-700">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 border rounded-md py-1 px-2 mt-2"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            className="bg-black text-white py-2 px-4 rounded-lg mt-4"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
