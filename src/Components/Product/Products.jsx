import React from "react";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Product
          key={index}
          image={product.image}
          hoverImage={product.hoverImage}
          name={product.name}
          sizes={product.sizes}
          price={product.price}
          discount={product.discount}
        />
      ))}
    </div>
  );
};

export default Products;
