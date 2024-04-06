import React from "react";
import Layout from "../Components/Layout/Layout";

const ProteinPowder = () => {
  // Sample data for protein powder products
  const proteinPowderProducts = [
    {
      image: "/protienpowder.jpg",
      hoverImage: "/protienpowder_hover.jpg",
      name: "Protein Powder",
      sizes: ["1kg"],
      price: "49.99",
      discount: 20,
    },
  ];

  return (
    <div>
      <Layout
        pageTitle="Protein Powder Products"
        pageDescription="Discover our high-quality protein powder options."
        products={proteinPowderProducts}
      />
    </div>
  );
};

export default ProteinPowder;
