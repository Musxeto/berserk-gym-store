import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";

const WristWraps = () => {
  // Sample data for wrist wraps products
  // const wristWrapsProducts = [
  //   {
  //     name: "Heavy Duty Wrist Wraps",
  //     price: 9.99,
  //     discount: 0,
  //     image: "/wristbands.jpg",
  //     hoverImage: "/wristbands.jpg",
  //     sizes: ["One Size"],
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
          const wrapsProducts = productsData.filter(
            (product) => product.category === "wraps"
          );
          // Format sizes for each product in the array
          const formattedProducts = wrapsProducts.map((product) => ({
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
        pageTitle="Wrist Wraps Products"
        pageDescription="Browse our collection of wraps products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default WristWraps;
