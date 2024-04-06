import React from "react";
import Layout from "../Components/Layout/Layout";

const Shorts = () => {
  // Sample data for shorts products
  const shortsProducts = [
    {
      image: "/product2_hover.jpg",
      hoverImage: "/product2.jpg",
      name: "Berserk White  Shorts ",
      sizes: ["S", "M", "L", "XL"],
      price: "34.99",
      discount: 5,
    },
    {
      image: "/product1_hover.jpg",
      hoverImage: "/product1.jpg",
      name: "Berserk Black Shorts ",
      sizes: ["S", "M", "L", "XL"],
      price: "39.99",
      discount: 10,
    },
  ];

  return (
    <div>
      <Layout
        pageTitle="Shorts Products"
        pageDescription="Discover our collection of comfortable and stylish shorts for your workouts."
        products={shortsProducts}
      />
    </div>
  );
};

export default Shorts;
