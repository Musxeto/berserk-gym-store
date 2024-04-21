import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";

const PreWorkout = () => {
  // const preWorkoutProducts = [
  //   {
  //     id: 1,
  //     name: "Pre-Workout Powder",
  //     price: 29.99,
  //     discount: 0,
  //     image: "/preworkout_powder.jpg",
  //     hoverImage: "/preworkout_powder_hover.jpg",
  //     sizes: ["500g"],
  //   },
  //   {
  //     id: 2,
  //     name: "Pre-Workout Drink",
  //     price: 19.99,
  //     discount: 10,
  //     image: "/preworkout_drink.jpg",
  //     hoverImage: "/preworkout_drink_hover.jpg",
  //     sizes: ["12 FL OZ"],
  //   },
  // ];

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        if (Array.isArray(productsData)) {
          // Filter products based on category
          const preworkoutProducts = productsData.filter(
            (product) => product.category === "preworkout"
          );
          // Format sizes for each product in the array
          const formattedProducts = preworkoutProducts.map((product) => ({
            ...product,
            sizes: product.sizes.split(",").map((size) => size.trim()),
          }));
          setProducts(formattedProducts);
        } else {
          console.error("Invalid products data:", productsData);
          // Handle invalid data
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Layout
        pageTitle="Pre Workout Products"
        pageDescription="Browse our collection of preworkout products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default PreWorkout;
