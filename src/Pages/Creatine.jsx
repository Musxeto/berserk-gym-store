import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { fetchProducts } from "../firebase";

const Creatine = () => {
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
          const creatineProducts = productsData.filter(
            (product) => product.category === "creatine"
          );
          // Format sizes for each product in the array
          const formattedProducts = creatineProducts.map((product) => ({
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
        pageTitle="Creatine Products"
        pageDescription="Browse our collection of creatine products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default Creatine;
