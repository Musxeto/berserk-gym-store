import React from "react";
import Navbar from "../Components/Layout/Navbar/Navbar";
import HeroSection from "../Components/HeroSection/HeroSection";
import SectionPreview from "../Components/Sections/Sections";
import Products from "../Components/Product/Products";
// Sample product data
const productsData = [
  {
    image: "/product1.jpg",
    hoverImage: "/product2.jpg",
    name: "Product 1",
    sizes: "S, M, L",
    price: "$19.99",
    discount: "10% off",
  },
  // Add more product data as needed
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SectionPreview />
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <Products products={productsData} />
      </div>
    </div>
  );
};

export default Home;
