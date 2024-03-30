import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const ProductModal = ({ isOpen, closeModal, product, discountedPrice }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productTotal, setProductTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  discountedPrice =
    product.price - (product.price * parseInt(product.discount)) / 100;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleAddToCart = () => {
    if (!selectedSize || !quantity) {
      console.error("Please select both size and quantity.");
      toast.error("Please select both size and quantity.");
      return;
    }

    setIsLoading(true);
    const total = discountedPrice * quantity;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      ...product,
      size: selectedSize,
      quantity,
      productTotal: total,
    }));

    console.log("Product added to cart:", selectedProduct.name);
    console.log("Size:", selectedProduct.size);
    console.log("Quantity:", selectedProduct.quantity);
    console.log("Total:", selectedProduct.productTotal);
    setIsLoading(false);

    toast.success("Product added to cart!");
    closeModal();
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
          <p className="text-gray-800 font-semibold">
            <span className="text-red-500">${discountedPrice.toFixed(2)}</span>{" "}
            {product.discount && (
              <span className="ml-2 text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </p>

          {/* Size Selector */}
          <div className="mt-4">
            <label className="text-gray-700">Select Size:</label>
            <div className="flex mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 rounded-full mr-2 ${
                    selectedSize === size
                      ? "bg-gray-900 text-white"
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
            className="bg-black text-white py-2 px-4 rounded-lg mt-4 relative"
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
