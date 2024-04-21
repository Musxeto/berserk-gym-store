import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { fetchProducts } from "../firebase";

const Leggings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        const leggingsProducts = productsData.filter(
          (product) => product.category === "leggings"
        );
        setProducts(leggingsProducts);
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
        pageTitle="Leggings Products"
        pageDescription="Browse our collection of leggings products."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default Leggings;
