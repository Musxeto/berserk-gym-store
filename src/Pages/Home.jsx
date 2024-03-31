import React from "react";
import Navbar from "../Components/Layout/Navbar/Navbar";
import HeroSection from "../Components/HeroSection/HeroSection";
import SectionPreview from "../Components/Sections/Sections";
import Products from "../Components/Product/Products";
import { Footer } from "flowbite-react";

const productsData = [
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
    image: "/product2_hover.jpg",
    hoverImage: "/product2.jpg",
    name: "Gym Shorts 1",
    sizes: ["S", "M", "L", "XL"],
    price: "34.99",
    discount: 5,
  },
  {
    image: "/product1_hover.jpg",
    hoverImage: "/product1.jpg",
    name: "Gym Shorts 2",
    sizes: ["S", "M", "L", "XL"],
    price: "39.99",
    discount: 0,
  },
  {
    image: "/bag_hover.webp",
    hoverImage: "/bag.webp",
    name: "Gym Accessory",
    sizes: ["One Size"],
    price: "14.99",
    discount: 0,
  },
  {
    image: "/protienpowder_hover.jpg",
    hoverImage: "/protienpowder.jpg",
    name: "Protein Powder",
    sizes: ["500g", "1kg", "2kg"],
    price: "49.99",
    discount: 20,
  },
  {
    image: "/tanktop1_hover.jpg",
    hoverImage: "/tanktop1.jpg",
    name: "Gym Tanktop",
    sizes: ["S", "M", "L", "XL"],
    price: "27.99",
    discount: 0,
  },
];

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SectionPreview />
      <div className="container mx-auto mt-8 mb-20">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Featured Products
        </h2>
        <Products products={productsData} />
      </div>
    </div>
  );
};

export default Home;
