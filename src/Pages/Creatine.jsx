import React from "react";
import Layout from "../Components/Layout/Layout";

const Creatine = () => {
  // Sample data for creatine products
  const creatineProducts = [
    {
      id: 1,
      name: "Creatine Monohydrate Powder",
      price: 19.99,
      discount: 10,
      image: "/creatine.webp",
      hoverImage: "/creatine.webp",
      sizes: ["500g"],
    },
    {
      id: 2,
      name: "Creatine Capsules",
      price: 10.99,
      discount: 0, // Set discount to 0 for products with no discount
      image: "/creatine_caps.webp",
      hoverImage: "/creatine_caps.webp",
      sizes: ["90 Capsules"],
    },
    // Add more creatine products as needed
  ];

  return (
    <div>
      <Layout
        pageTitle="Creatine Products"
        pageDescription="Browse our collection of creatine supplements."
        products={creatineProducts}
      />
    </div>
  );
};

export default Creatine;
