import React from "react";
import Layout from "../Components/Layout/Layout";
const AllProducts = () => {
  const allProducts = [
    {
      image: "/bag_hover.webp",
      hoverImage: "/bag.webp",
      name: "Gym Accessory",
      sizes: ["One Size"],
      price: "14.99",
      discount: 0,
    },
    {
      name: "Creatine Monohydrate Powder",
      price: 19.99,
      discount: 10,
      image: "/creatine.webp",
      hoverImage: "/creatine.webp",
      sizes: ["500g"],
    },
    {
      name: "Creatine Capsules",
      price: 10.99,
      discount: 0,
      image: "/creatine_caps.webp",
      hoverImage: "/creatine_caps.webp",
      sizes: ["90 Capsules"],
    },

    {
      name: "Berserk Black Leather Lifting Belt",
      price: 39.99,
      discount: 0,
      image: "/black_lifting_belt.jpg",
      hoverImage: "/black_lifting_belt_hover.jpg",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "White Lifting Belt",
      price: 29.99,
      discount: 50,
      image: "/white_lifting_belt.jpg",
      hoverImage: "/white_lifting_belt_hover.jpg",
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Pre-Workout Powder",
      price: 29.99,
      discount: 0,
      image: "/preworkout_powder.jpg",
      hoverImage: "/preworkout_powder_hover.jpg",
      sizes: ["500g"],
    },
    {
      name: "Pre-Workout Drink",
      price: 19.99,
      discount: 10,
      image: "/preworkout_drink.jpg",
      hoverImage: "/preworkout_drink_hover.jpg",
      sizes: ["12 FL OZ"],
    },
    {
      image: "/protienpowder.jpg",
      hoverImage: "/protienpowder_hover.jpg",
      name: "Protein Powder",
      sizes: ["1kg"],
      price: "49.99",
      discount: 20,
    },
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
    {
      image: "/tanktop1.jpg",
      hoverImage: "/tanktop1_hover.jpg",
      name: "Gym Tanktop",
      sizes: ["S", "M", "L", "XL"],
      price: "27.99",
      discount: 0,
    },
    {
      name: "Heavy Duty Wrist Wraps",
      price: 9.99,
      discount: 0,
      image: "/wristbands.jpg",
      hoverImage: "/wristbands.jpg",
      sizes: ["One Size"],
    },
    {
      name: "Compression Leggings",
      price: 24.99,
      discount: 0,
      image: "/compression_leggings.jpg",
      hoverImage: "/compression_leggings_hover.jpg",
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ];

  return (
    <div>
      <Layout
        pageTitle="All Products"
        pageDescription="Browse our collection of products."
        products={allProducts}
      />
    </div>
  );
};

export default AllProducts;
