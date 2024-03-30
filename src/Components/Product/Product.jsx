import React from "react";

const Product = ({ image, hoverImage, name, sizes, price, discount }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="relative">
        {/* Main product image */}
        <img src={image} alt={name} className="w-full rounded-lg" />
        {/* Hovered product image */}
        <img
          src={hoverImage}
          alt={name}
          className="w-full rounded-lg absolute top-0 opacity-0 hover:opacity-100 transition duration-300"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center mt-2">
          <span className="text-gray-500 mr-2">{sizes}</span>
          <span className="text-gray-800">{price}</span>
        </div>
        {discount && (
          <div className="mt-2">
            <span className="text-red-500">{discount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
