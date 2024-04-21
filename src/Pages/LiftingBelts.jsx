import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { fetchProducts } from "../firebase";

const LiftingBelts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        const beltsProducts = productsData.filter(
          (product) => product.category === "belts"
        );
        const formattedProducts = beltsProducts.map((product) => ({
          ...product,
          sizes: product.sizes.split(",").map((size) => size.trim()), // Trim to remove whitespace
        }));
        setProducts(formattedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Layout
        pageTitle="Lifting Belts Products"
        pageDescription="Browse our collection of belts products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default LiftingBelts;
