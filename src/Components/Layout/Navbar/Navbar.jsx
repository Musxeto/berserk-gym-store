import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import berserkLogo from "/berserk.png";
import { FaBars, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { useCart } from "../../../Contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGymWear, setShowGymWear] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    closeDropdown();
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdowns = () => {
    setShowGymWear(false);
    setShowNutrition(false);
    setShowAccessories(false);
  };

  const toggleGymWear = () => {
    setShowGymWear(!showGymWear);
    setShowNutrition(false);
    setShowAccessories(false);
  };

  const toggleNutrition = () => {
    setShowNutrition(!showNutrition);
    setShowGymWear(false);
    setShowAccessories(false);
  };

  const toggleAccessories = () => {
    setShowAccessories(!showAccessories);
    setShowGymWear(false);
    setShowNutrition(false);
  };
  const closeDropdown = () => {
    setShowGymWear(false);
    setShowNutrition(false);
    setShowAccessories(false);
  };

  // Sample data for dropdown menus
  const gymWearSubTabs = [
    { name: "T-Shirts", link: "/tshirts" },
    { name: "Tank Tops", link: "/tanktops" },
    { name: "Shorts", link: "/shorts" },
    { name: "Leggings", link: "/leggings" },
  ];

  const nutritionSubTabs = [
    { name: "Protein Powder", link: "/proteinpowder" },
    { name: "Creatine", link: "/creatine" },
    { name: "Vitamins", link: "/vitamins" },
    { name: "Pre-Workout", link: "/preworkout" },
  ];

  const accessoriesSubTabs = [
    { name: "Lifting Belts", link: "/accessories/lifting-belts" },
    { name: "Wrist Wraps", link: "/accessories/wrist-wraps" },
    { name: "Gym Bags", link: "/accessories/gym-bags" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={berserkLogo} className="h-10" alt="Berserk Fit Logo" />
          <span className="text-2xl font-semibold text-gray-900">
            Berserk Fit
          </span>
        </Link>

        <div className="flex items-center space-x-6 md:hidden">
          <button
            className="text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={toggleMenu}
          >
            <FaBars className="w-6 h-6" />
            <span className="sr-only">Open mobile menu</span>
          </button>
          <FaShoppingCart
            className="w-6 h-6 text-gray-600 relative"
            onClick={() => setShowCart(!showCart)}
          />
          {cart.length > 0 && (
            <span
              onClick={() => setShowCart(!showCart)}
              className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0 transform -translate-x-1 mt-5 "
            >
              {cart.length}
            </span>
          )}
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex flex-grow items-center justify-center space-x-6">
          <div className="relative" ref={dropdownRef}>
            <span
              className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-300"
              onClick={toggleGymWear}
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
          <div className="relative" ref={dropdownRef}>
            <span
              className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-300"
              onClick={toggleNutrition}
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

          {/* Accessories dropdown */}
          <div className="relative" ref={dropdownRef}>
            <span
              className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-300"
              onClick={toggleAccessories}
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
            to="/about"
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            <span
              className="block py-2 px-4 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={closeDropdown}
            >
              About
            </span>
          </Link>
          <Link
            to="/admin"
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            <span
              className="block py-2 px-4 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={closeDropdown}
            >
              Admin
            </span>
          </Link>
          {/* Add more navigation links as necessary */}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {/* Shopping cart icon */}
          <FaShoppingCart
            className="w-6 h-6 text-gray-600 relative"
            onClick={() => setShowCart(!showCart)}
          />
          {cart.length > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute top-0 right-0 transform -translate-x-8 mt-5 ">
              {cart.length}
            </span>
          )}
        </div>
      </div>
      {/*---------------------------------------M o b i l e   d r o p d o w n  m e n u----------------------------------------------------*/}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul className="text-center py-2">
          {/* Mobile dropdown menu items */}
          <li>
            <span
              className="block py-2 px-4 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={toggleGymWear}
            >
              Gym Wear <FaChevronDown className="inline-block" />
            </span>
            {showGymWear && (
              <ul className="pl-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {gymWearSubTabs.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className="block py-2                      px-4 text-gray-800 hover:bg-gray-100"
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
              onClick={toggleNutrition}
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
          <li>
            <span
              className="block py-2 px-4 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={toggleAccessories}
            >
              Accessories <FaChevronDown className="inline-block" />
            </span>
            {showAccessories && (
              <ul className="pl-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {accessoriesSubTabs.map((item, index) => (
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
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              <span
                className="block py-2 px-4 text-gray-600 hover:text-gray-900 cursor-pointer"
                onClick={closeDropdown}
              >
                About
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              <span
                className="block py-2 px-4 text-gray-600 hover:text-gray-900 cursor-pointer"
                onClick={closeDropdown}
              >
                Admin
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Shopping cart sidebar */}
      <ShoppingCart isOpen={showCart} closeSidebar={() => setShowCart(false)} />
    </nav>
  );
};

export default Navbar;
