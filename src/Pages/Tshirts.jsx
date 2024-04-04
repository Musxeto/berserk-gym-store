import React from "react";
import Layout from "../Components/Layout/Layout";

const Tshirts = () => {
  // Sample data for T-shirts products
  const tshirtsProducts = [
    {
      id: 1,
      name: "Basic T-shirt",
      price: 15.99,
      discount: 0,
      image: "/basic_tshirt.webp",
      hoverImage: "/basic_tshirt_hover.webp",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 3,
      name: "Berserk Logo T-shirt",
      price: 18.99,
      discount: 0,
      image: "/berserk_logo_tshirt.jpg",
      hoverImage: "/berserk_logo_tshirt_hover.jpg",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 4,
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
