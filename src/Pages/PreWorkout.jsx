import React from "react";
import Layout from "../Components/Layout/Layout";

const PreWorkout = () => {
  // Sample data for pre-workout products
  const preWorkoutProducts = [
    {
      id: 1,
      name: "Pre-Workout Powder",
      price: 29.99,
      discount: 0,
      image: "/preworkout_powder.jpg",
      hoverImage: "/preworkout_powder_hover.jpg",
      sizes: ["250g", "500g", "1kg"],
    },
    {
      id: 2,
      name: "Pre-Workout Drink",
      price: 19.99,
      discount: 10,
      image: "/preworkout_drink.jpg",
      hoverImage: "/preworkout_drink_hover.jpg",
      sizes: ["300g"],
    },
    // Add more pre-workout products as needed
  ];

  return (
    <div>
      <Layout
        pageTitle="Pre-Workout Products"
        pageDescription="Explore our selection of pre-workout supplements to enhance your performance."
        products={preWorkoutProducts}
      />
    </div>
  );
};

export default PreWorkout;
