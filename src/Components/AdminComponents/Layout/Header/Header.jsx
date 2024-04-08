import React from "react";

const Header = ({ pageTitle, pageDescription }) => {
  return (
    <div className="bg-white text-gray-900 py-6 text-center">
      <h1 className="text-5xl font-bold mb-4">{pageTitle}</h1>
      <p className="text-lg">{pageDescription}</p>
    </div>
  );
};

export default Header;
