import React from "react";
import AddToCartButton from "./AddToCartButton.jsx";

const Product = ({ product }) => {
  // Calculate the discounted price
  const discountedPrice =
    product.price - (product.price * parseInt(product.discount)) / 100;

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
        <div className="flex items-center mt-2">
          <ul className="list-disc">
            {/* Display available sizes as bullet points */}
            {product.sizes.map((size) => (
              <li key={size} className="text-gray-500 mr-2">
                {size}
              </li>
            ))}
          </ul>
          {/* Display the discounted price and original price */}
          <span className="text-gray-800">
            <span className="text-red-500">${discountedPrice.toFixed(2)}</span>{" "}
            {/* Display discounted price */}
            {product.discount && ( // Check if there's a discount
              <span className="ml-2 text-gray-400 line-through">
                ${product.price}
              </span> // Display original price with strike-through
            )}
          </span>
        </div>
        {product.discount && (
          <div className="mt-2">
            <span className="text-red-500">{product.discount}% off</span>
          </div>
        )}
        {/* Add the AddToCartButton component */}
        <div className="mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default Product;
