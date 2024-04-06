import React from "react";
import Layout from "../Components/Layout/Layout";

const Leggings = () => {
  const leggingsProducts = [
    {
      name: "Compression Leggings",
      price: 24.99,
      discount: 0,
      image: "/compression_leggings.jpg",
      hoverImage: "/compression_leggings_hover.jpg",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ];

  return (
    <div>
      <Layout
        pageTitle="Leggings Products"
        pageDescription="Explore our collection of comfortable and stylish leggings."
        products={leggingsProducts}
      />
    </div>
  );
};

export default Leggings;
