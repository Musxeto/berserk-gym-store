import React, { useState } from "react";

const ProductItem = ({ product, onUpdate, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="flex items-center border-b py-4">
      <div className="flex-shrink-0 mr-4">
        {!imageLoaded && (
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-24 h-24 object-cover rounded-lg ${
            !imageLoaded ? "hidden" : ""
          }`}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">
          $
          {(product.price - product.price * (product.discount / 100)).toFixed(
            2
          )}
        </p>
        {product.discount > 0 && (
          <p className="text-gray-500 line-through">${product.price}</p>
        )}
        <p className="text-gray-600">Available Sizes: {product.sizes}</p>
      </div>
      <div className="flex-1">{/* Placeholder for product details */}</div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col max-w-min">
          <button
            onClick={() => onUpdate(product)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md mb-2"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
