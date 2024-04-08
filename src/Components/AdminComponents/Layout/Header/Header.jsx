import React from "react";

const Header = ({ pageTitle, pageDescription }) => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold">{pageTitle}</h1>
      <p className="mt-2">{pageDescription}</p>
    </div>
  );
};

export default Header;
