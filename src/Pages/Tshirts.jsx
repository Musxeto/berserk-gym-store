import React from "react";
import Layout from "../Components/Layout/Layout";

const Tshirts = () => {
  // Sample data for T-shirts products
  const tshirtsProducts = [
    {
      image: "/gym_tee1_hover.jpg",
      hoverImage: "/gym_tee1.jpg",
      name: "Gym Tee 1",
      sizes: ["S", "M", "L", "XL"],
      price: "24.99",
      discount: 10,
    },
    {
      hoverImage: "/gym_tee2.jpg",
      image: "/gym_tee2_hover.jpg",
      name: "Gym Tee 2",
      sizes: ["S", "M", "L", "XL"],
      price: "29.99",
      discount: 15,
    },
    {
      name: "Basic T-shirt",
      price: 15.99,
      discount: 0,
      image: "/basic_tshirt.webp",
      hoverImage: "/basic_tshirt_hover.webp",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Berserk Logo T-shirt",
      price: 18.99,
      discount: 0,
      image: "/berserk_logo_tshirt.jpg",
      hoverImage: "/berserk_logo_tshirt_hover.jpg",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Guts T-shirt",
      price: 22.99,
      discount: 10,
      image: "/guts_tshirt.jpg",
      hoverImage: "/guts_tshirt_hover.jpg",
      sizes: ["S", "M", "L", "XL"],
    },
    // Add more T-shirts products as needed
  ];

  return (
    <div>
      <Layout
        pageTitle="T-shirts "
        pageDescription="Explore our collection of stylish gym T-shirts."
        products={tshirtsProducts}
      />
    </div>
  );
};

export default Tshirts;
