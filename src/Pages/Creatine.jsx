import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { fetchProducts } from "../firebase";

const Creatine = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        const creatineProducts = productsData.filter(
          (product) => product.category === "creatine"
        );
        const formattedProducts = creatineProducts.map((product) => ({
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
        pageTitle="Creatine Products"
        pageDescription="Browse our collection of creatine products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default Creatine;
