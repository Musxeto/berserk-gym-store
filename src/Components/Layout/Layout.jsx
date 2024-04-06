import React, { useState, useEffect } from "react";
import Products from "../Product/Products";
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const Layout = ({ pageTitle, pageDescription, products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = query
      ? products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      : products;
    setFilteredProducts(filtered);
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortBy(value);

    if (filteredProducts) {
      sortProducts(value, sortOrder);
    }
  };

  const handleSortOrderChange = (event) => {
    const { value } = event.target;
    setSortOrder(value);

    if (filteredProducts) {
      sortProducts(sortBy, value);
    }
  };

  const sortProducts = (sortBy, order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const propA = sortBy === "price" ? parseFloat(a[sortBy]) : a[sortBy];
      const propB = sortBy === "price" ? parseFloat(b[sortBy]) : b[sortBy];

      if (sortBy === "name") {
        if (order === "asc") {
          return propA.localeCompare(propB);
        } else {
          return propB.localeCompare(propA);
        }
      } else {
        if (order === "asc") {
          return propA - propB;
        } else {
          return propB - propA;
        }
      }
    });
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-gray-600">{pageDescription}</p>
        </header>

        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1 mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-blue-400"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FaSearch className="absolute top-0 right-0 mt-3 mr-3 text-gray-500" />
          </div>
          <div className="flex items-center">
            <label className="mr-2">Sort by:</label>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none"
              value={sortBy || ""}
              onChange={handleSortChange}
            >
              <option value="">Default</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
              value={sortOrder || ""}
              onChange={handleSortOrderChange}
            >
              <option value="">Default</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            {sortBy && (
              <div className="ml-2">
                {sortOrder === "asc" ? (
                  <FaSortAlphaDown className="text-xl text-gray-500" />
                ) : (
                  <FaSortAlphaUp className="text-xl text-gray-500" />
                )}
              </div>
            )}
          </div>
        </div>

        {filteredProducts === null ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-gray-600 text-4xl">Loading...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-gray-600 text-4xl">No products found.</p>
          </div>
        ) : (
          <Products products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default Layout;
