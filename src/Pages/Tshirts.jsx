import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout/Layout";

const Tshirts = () => {
  // // Sample data for T-shirts products
  // const tshirtsProducts = [
  //   {
  //     image: "/gym_tee1_hover.jpg",
  //     hoverImage: "/gym_tee1.jpg",
  //     name: "Gym Tee 1",
  //     sizes: ["S", "M", "L", "XL"],
  //     price: "24.99",
  //     discount: 10,
  //   },
  //   {
  //     hoverImage: "/gym_tee2.jpg",
  //     image: "/gym_tee2_hover.jpg",
  //     name: "Gym Tee 2",
  //     sizes: ["S", "M", "L", "XL"],
  //     price: "29.99",
  //     discount: 15,
  //   },
  //   {
  //     name: "Basic T-shirt",
  //     price: 15.99,
  //     discount: 0,
  //     image: "/basic_tshirt.webp",
  //     hoverImage: "/basic_tshirt_hover.webp",
  //     sizes: ["S", "M", "L", "XL"],
  //   },
  //   {
  //     name: "Berserk Logo T-shirt",
  //     price: 18.99,
  //     discount: 0,
  //     image: "/berserk_logo_tshirt.jpg",
  //     hoverImage: "/berserk_logo_tshirt_hover.jpg",
  //     sizes: ["S", "M", "L", "XL"],
  //   },
  //   {
  //     name: "Guts T-shirt",
  //     price: 22.99,
  //     discount: 10,
  //     image: "/guts_tshirt.jpg",
  //     hoverImage: "/guts_tshirt_hover.jpg",
  //     sizes: ["S", "M", "L", "XL"],
  //   },
  // Add more T-shirts products as needed
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
          const tshirtsProducts = productsData.filter(
            (product) => product.category === "tshirts"
          );
          // Format sizes for each product in the array
          const formattedProducts = tshirtsProducts.map((product) => ({
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
        pageTitle="T-Shirts Products"
        pageDescription="Browse our collection of T-shirts."
        products={products}
        loading={isLoading}
      />
    </div>
  );
};

export default Tshirts;
