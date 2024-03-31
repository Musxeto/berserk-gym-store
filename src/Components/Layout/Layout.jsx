import React from "react";
import Navbar from "./Navbar/Navbar";
import Products from "../Product/Products";

const Layout = ({ pageTitle, pageDescription, products }) => {
  const searchFilterSortProducts = () => {};

  return (
    <div>
      <Navbar />
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
          />
        </div>
        <Products products={products} />
      </div>
    </div>
  );
};

export default Layout;
