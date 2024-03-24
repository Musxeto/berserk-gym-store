import React, { useState } from "react";
import { Link } from "react-router-dom";
import berserkLogo from "/berserk.png";
import { FaBars, FaShoppingCart, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGymWear, setShowGymWear] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const gymWearSubTabs = [
    { name: "Shirts", link: "/gym-wear/shirts" },
    { name: "Tank Tops", link: "/gym-wear/tanktops" },
    { name: "Hoodies", link: "/gym-wear/hoodies" },
  ];

  const nutritionSubTabs = [
    { name: "Protein Powder", link: "/nutrition/protein-powder" },
    { name: "Protein Bars", link: "/nutrition/protein-bars" },
  ];
  const accessoriesSubTabs = [
    { name: "Weightlifting Belt", link: "/accessories" },
    { name: "Wrist Wraps", link: "/accessories" },
    { name: "Lifting Straps", link: "/accessories" },
    { name: "Gloves", link: "/accessories" },
  ];
  return (
    <nav className="bg-white border-b-2 border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Brand logo and name */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={berserkLogo} className="h-10" alt="Berserk Fit Logo" />
          <span className="text-2xl font-semibold">Berserk Fit</span>
        </Link>

        {/* Mobile hamburger menu and Shopping cart */}
        <div className="flex items-center space-x-6 md:hidden">
          <button
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={toggleMenu}
          >
            <FaBars className="w-6 h-6" />
            <span className="sr-only">Open mobile menu</span>
          </button>
          <div className="flex items-center space-x-3">
            <FaShoppingCart className="w-6 h-6 text-gray-600" />
            {/* Implement cart component */}
          </div>
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex flex-grow items-center justify-center space-x-6">
          <div className="relative">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Home
            </Link>
          </div>
          <div className="relative">
            <span
              className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-300"
              onClick={() => setShowGymWear(!showGymWear)}
            >
              Gym Wear <FaChevronDown className="inline-block" />
            </span>
            {showGymWear && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                {gymWearSubTabs.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* Nutrition dropdown */}
          <div className="relative">
            <span
              className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-300"
              onClick={() => setShowNutrition(!showNutrition)}
            >
              Nutrition <FaChevronDown className="inline-block" />
            </span>
            {showNutrition && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                {nutritionSubTabs.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <span
              className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-300"
              onClick={() => setShowAccessories(!showAccessories)}
            >
              Accessories <FaChevronDown className="inline-block" />
            </span>
            {showAccessories && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                {accessoriesSubTabs.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/Bundles"
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            Bundles
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            About
          </Link>
          {/* Add more navigation links as necessary */}
        </div>

        {/* Shopping cart icon */}
        <div className="hidden md:flex items-center space-x-3">
          <FaShoppingCart className="w-6 h-6 text-gray-600 hover:text-gray-900 hover:cursor-pointer" />
          {/* Implement cart component */}
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul className="text-center py-2">
          <li>
            <Link
              to="/"
              className="block py-2 px-4 text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>
          </li>
          <li>
            <span
              className="block py-2 px-4 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={() => setShowGymWear(!showGymWear)}
            >
              Gym Wear <FaChevronDown className="inline-block" />
            </span>
            {showGymWear && (
              <ul className="pl-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {gymWearSubTabs.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <span
              className="block py-2 px-4 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={() => setShowNutrition(!showNutrition)}
            >
              Nutrition <FaChevronDown className="inline-block" />
            </span>
            {showNutrition && (
              <ul className="pl-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {nutritionSubTabs.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
