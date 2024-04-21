// Layout.jsx
import React from "react";
import Products from "../Product/Products";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Layout = ({ pageTitle, pageDescription, products, loading }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8 px-10">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">{pageTitle}</h1>
            <p className="text-gray-600">{pageDescription}</p>
          </header>

          {loading ? ( // Display spinner while loading
            <div className="flex items-center justify-center h-screen">
              <ClipLoader
                color={"#000"}
                loading={true}
                css={override}
                size={50}
              />
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center h-screen">
              <p className="text-gray-600 text-4xl">No products found.</p>
            </div>
          ) : (
            <Products products={products} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
