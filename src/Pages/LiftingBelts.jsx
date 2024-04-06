import React from "react";
import Layout from "../Components/Layout/Layout";

const LiftingBelts = () => {
  // Sample data for lifting belts products
  const liftingBeltsProducts = [
    {
      id: 1,
      name: "Berserk Black Leather Lifting Belt",
      price: 39.99,
      discount: 0,
      image: "/black_lifting_belt.jpg",
      hoverImage: "/black_lifting_belt_hover.jpg",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "White Lifting Belt",
      price: 29.99,
      discount: 50,
      image: "/white_lifting_belt.jpg",
      hoverImage: "/white_lifting_belt_hover.jpg",
      sizes: ["S", "M", "L", "XL"],
    },
  ];

  return (
    <div>
      <Layout
        pageTitle="Lifting Belts Products"
        pageDescription="Browse our collection of high-quality lifting belts for your strength training needs."
        products={liftingBeltsProducts}
      />
    </div>
  );
};

export default LiftingBelts;
