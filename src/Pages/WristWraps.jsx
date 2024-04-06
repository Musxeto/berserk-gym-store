import React from "react";
import Layout from "../Components/Layout/Layout";

const WristWraps = () => {
  // Sample data for wrist wraps products
  const wristWrapsProducts = [
    {
      id: 1,
      name: "Heavy Duty Wrist Wraps",
      price: 9.99,
      discount: 0,
      image: "/wristbands.jpg",
      hoverImage: "/wristbands.jpg",
      sizes: ["One Size"],
    },
  ];

  return (
    <div>
      <Layout
        pageTitle="Wrist Wraps Products"
        pageDescription="Browse our collection of wrist wraps designed to provide support and stability during your workouts."
        products={wristWrapsProducts}
      />
    </div>
  );
};

export default WristWraps;
