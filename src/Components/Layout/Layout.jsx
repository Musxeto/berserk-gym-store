import React, { useState } from "react";
import Products from "../Product/Products";

const Layout = ({ pageTitle, pageDescription, products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <div className="container mx-auto">
        <header className="mt-8 mb-4">
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
          <p className="text-gray-600">{pageDescription}</p>
        </header>

        <div className="mt-8">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Products products={filteredProducts} />
      </div>
    </div>
  );
};

export default Layout;
