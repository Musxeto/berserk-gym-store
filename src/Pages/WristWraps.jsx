import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { fetchProducts } from "../firebase";

const WristWraps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        const wrapsProducts = productsData.filter(
          (product) => product.category === "wraps"
        );
        setProducts(wrapsProducts);
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
        pageTitle="Wrist Wraps Products"
        pageDescription="Browse our collection of wraps products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default WristWraps;
