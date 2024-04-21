import React, { useState, useEffect } from "react";
import Navbar from "../Components/Layout/Navbar/Navbar";
import HeroSection from "../Components/HeroSection/HeroSection";
import SectionPreview from "../Components/Sections/Sections";
import Products from "../Components/Product/Products";
import Footer from "../Components/Layout/Footer/Footer";
import { showFailureToast, showSuccessToast } from "../App";
import { fetchProducts } from "../firebase";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await fetchProducts();
        if (Array.isArray(productsData)) {
          const formattedProducts = productsData.map((product) => ({
            ...product,
            sizes: product.sizes.split(",").map((size) => size.trim()),
          }));
          setProducts(formattedProducts);
        } else {
          console.error("Invalid products data:", productsData);
          setError("Invalid products data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <SectionPreview />
      <div className="container mx-auto mt-8 mb-20">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Featured Products
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!isLoading ? (
          <Products products={products} />
        ) : (
          <div className="flex justify-center">
            <ClipLoader color={"#000"} loading={true} size={50} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
