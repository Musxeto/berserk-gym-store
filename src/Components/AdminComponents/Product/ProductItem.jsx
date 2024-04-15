import React from "react";

const ProductItem = ({ product, onUpdate, onDelete }) => {
  return (
    <div className="flex items-center border-b py-4">
      <div className="flex-shrink-0 mr-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
        {product.discount > 0 && (
          <p className="text-gray-500 line-through">${product.price}</p>
        )}
        <p className="text-gray-600">
          Available Sizes: {product.sizes.join(", ")}
        </p>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={() => onUpdate(product)}
          className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md"
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
  );
};

export default ProductItem;
