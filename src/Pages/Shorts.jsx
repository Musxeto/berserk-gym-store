import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { fetchProducts } from "../firebase";

const Shorts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        const shortsProducts = productsData.filter(
          (product) => product.category === "shorts"
        );
        setProducts(shortsProducts);
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
        pageTitle="Shorts Products"
        pageDescription="Browse our collection of shorts."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default Shorts;
