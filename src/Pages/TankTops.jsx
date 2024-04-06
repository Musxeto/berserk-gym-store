import React from "react";
import Layout from "../Components/Layout/Layout";

const TankTops = () => {
  // Sample data for tank tops products
  const tankTopsProducts = [
    {
      image: "/tanktop1.jpg",
      hoverImage: "/tanktop1_hover.jpg",
      name: "Gym Tanktop",
      sizes: ["S", "M", "L", "XL"],
      price: "27.99",
      discount: 0,
    },
  ];

  return (
    <div>
      <Layout
        pageTitle="Tank Tops Products"
        pageDescription="Explore our collection of comfortable and stylish tank tops for your workouts."
        products={tankTopsProducts}
      />
    </div>
  );
};

export default TankTops;
