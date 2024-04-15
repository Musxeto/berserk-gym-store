import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products, onDelete, onUpdate }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default ProductList;
