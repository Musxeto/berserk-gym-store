import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { fetchProducts } from "../firebase";

const TankTops = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        const tankTopsProducts = productsData.filter(
          (product) => product.category === "tanktops"
        );
        const formattedProducts = tankTopsProducts.map((product) => ({
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
        pageTitle="Tank Tops Products"
        pageDescription="Browse our collection of tank tops."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default TankTops;
