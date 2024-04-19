import React from "react";
import { Link } from "react-router-dom";

const SectionPreview = () => {
  const categories = [
    {
      name: "T-Shirts",
      description: "Explore our latest T-Shirt collection.",
      image: "/tshirts.jpg",
      link: "/tshirts",
    },
    {
      name: "Tank Tops",
      description: "Discover our stylish Tank Tops.",
      image: "/tanktop.jpeg",
      link: "/tanktops",
    },
    {
      name: "Protein Powders",
      description: "Find the perfect Protein Powder for your needs.",
      image: "/protien.jpg",
      link: "/proteinpowder",
    },
    {
      name: "Wrist Wraps",
      description: "Browse our selection of workout Accessories.",
      image: "/accessories.jpeg",
      link: "accessories/wrist-wraps",
    },
  ];

  return (
    <section className="py-16 px-4 lg:px-0 mb-6 bg-white text-black">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Link to={category.link}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover mb-4 rounded-lg bg-white"
                />
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionPreview;
