import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLongArrowAltUp } from "react-icons/fa";

const Card = ({ title, value, link }) => {
  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-10 m-4 flex flex-col justify-center items-center">
      <div className="border-b-2 border-gray-200 mb-4 pb-2 w-full flex items-center justify-around">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {link && (
          <Link
            to={link}
            className="text-gray-800 py-2 px-4 rounded-full hover:text-gray-600 transition-colors duration-300 flex items-center"
          >
            <FaArrowRight />
          </Link>
        )}
      </div>
      <div className="flex items-center mb-4">
        <p className="text-5xl text-black font-bold mr-2">{value}</p>
        <FaLongArrowAltUp className="text-green-500 text-xl" />
      </div>
    </div>
  );
};

export default Card;
