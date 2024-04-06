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
  const [dropdownState, setDropdownState] = useState([false, false, false]);
  const dropdownRefs = useRef([useRef(null), useRef(null), useRef(null)]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".navbar-dropdown") &&
        !event.target.closest(".dropdown-toggle")
      ) {
        closeDropdown();
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setShowGymWear(false);
    setShowNutrition(false);
    setShowAccessories(false);
    setDropdownState([false, false, false]);
  };

  const toggleDropdown = (index) => {
    const newState = [false, false, false];
    newState[index] = !dropdownState[index];
    setDropdownState(newState);
  };

  // Sample data for dropdown menus
  const dropdownTabs = [
    {
      name: "Gym Wear",
      subTabs: [
        { name: "T-Shirts", link: "/tshirts" },
        { name: "Tank Tops", link: "/tanktops" },
        { name: "Shorts", link: "/shorts" },
        { name: "Leggings", link: "/leggings" },
      ],
    },
    {
      name: "Nutrition",
      subTabs: [
        { name: "Protein Powder", link: "/proteinpowder" },
        { name: "Creatine", link: "/creatine" },
        { name: "Pre-Workout", link: "/preworkout" },
      ],
    },
    {
      name: "Accessories",
      subTabs: [
        { name: "Lifting Belts", link: "/accessories/lifting-belts" },
        { name: "Wrist Wraps", link: "/accessories/wrist-wraps" },
      ],
    },
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
          {dropdownTabs.map((tab, index) => (
            <div key={index} className="relative">
              <span
                className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-300 dropdown-toggle"
                onClick={() => toggleDropdown(index)}
              >
                {tab.name} <FaChevronDown className="inline-block" />
              </span>
              {dropdownState[index] && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg dropdown-menu">
                  {tab.subTabs.map((item, subIndex) => (
                    <Link
                      key={subIndex}
                      to={item.link}
                      className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
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
      <div className={`mobile-menu md:hidden ${isOpen ? "block" : "hidden"} `}>
        <ul className="text-center py-2">
          {/* Mobile dropdown menu items */}
          {dropdownTabs.map((tab, index) => (
            <li key={index}>
              <span
                className="block py-2 px-4 text-gray-600 hover:text-gray-900 cursor-pointer dropdown-toggle"
                onClick={() => toggleDropdown(index)}
              >
                {tab.name} <FaChevronDown className="inline-block" />
              </span>
              {dropdownState[index] && (
                <ul className="pl-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg dropdown-menu">
                  {tab.subTabs.map((item, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={item.link}
                        className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
              onClick={(e) => {
                closeDropdown();
                if (isOpen) {
                  e.stopPropagation();
                }
              }}
            >
              <span className="block py-2 px-4 cursor-pointer">About</span>
            </Link>
            <Link
              to="/admin"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
              onClick={(e) => {
                closeDropdown();
                if (isOpen) {
                  e.stopPropagation();
                }
              }}
            >
              <span className="block py-2 px-4 cursor-pointer">Admin</span>
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
