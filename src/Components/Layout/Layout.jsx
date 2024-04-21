import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import Products from "../Product/Products";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { fetchProducts } from "../../firebase";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Layout = ({ pageTitle, pageDescription }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Initially set to true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setIsLoading(false); // Set loading to false once products are fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Handle errors by setting loading to false
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      filterProducts();
    }
  }, [searchQuery, sortBy, sortOrder, products]);

  const filterProducts = () => {
    let tempProducts = [...products];
    if (searchQuery !== "") {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortBy && sortOrder) {
      tempProducts.sort((a, b) => {
        const varA =
          typeof a[sortBy] === "string" ? a[sortBy].toUpperCase() : a[sortBy];
        const varB =
          typeof b[sortBy] === "string" ? b[sortBy].toUpperCase() : b[sortBy];
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return sortOrder === "asc" ? comparison : comparison * -1;
      });
    }
    setFilteredProducts(tempProducts);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8 px-10">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">{pageTitle}</h1>
            <p className="text-gray-600">{pageDescription}</p>
          </header>

          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg mb-4 md:mb-0"
            />

            <div className="flex items-center">
              <span className="mr-2">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded-md mr-2"
              >
                <option value="">-- Select --</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded-md"
              >
                <option value="">-- Order --</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {isLoading ? ( // Display spinner while loading
            <div className="flex items-center justify-center h-screen">
              <ClipLoader
                color={"#000"}
                loading={true}
                css={override}
                size={50}
              />
            </div>
          ) : filteredProducts === null ? (
            <div className="flex items-center justify-center h-screen">
              <p className="text-gray-600 text-4xl">No products found.</p>
            </div>
          ) : (
            <Products products={filteredProducts} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
