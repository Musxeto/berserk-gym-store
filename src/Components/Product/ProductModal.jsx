import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const ProductModal = ({ isOpen, closeModal, product }) => {
  const [selectedSize, setSelectedSize] = useState(""); // State to store selected size
  const [quantity, setQuantity] = useState(1); // State to store quantity
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  // Function to handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Function to handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    setIsLoading(true); // Set loading state to true
    // Simulate an asynchronous action (e.g., API request) with setTimeout
    setTimeout(() => {
      // Implement your logic to add the product to cart
      console.log("Product added to cart:", product.name);
      console.log("Size:", selectedSize);
      console.log("Quantity:", quantity);
      setIsLoading(false); // Reset loading state
      closeModal(); // Close the modal after adding to cart
    }, 2000); // Simulated loading time of 2 seconds
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg max-w-4xl flex">
        {/* Left Column: Product Image */}
        <div className="w-1/2">
          <img src={product.image} alt={product.name} className="w-full mb-4" />
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
          <p className="text-gray-800 font-semibold">${product.price}</p>

          {/* Size Selector */}
          <div className="mt-4">
            <label className="text-gray-700">Select Size:</label>
            <div className="flex mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 rounded-full mr-2 ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
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

          {/* Add to Cart Button with Loading Spinner */}
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 relative"
            onClick={handleAddToCart}
          >
            {isLoading ? (
              <ClipLoader size={20} color="#fff" loading={true} />
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
