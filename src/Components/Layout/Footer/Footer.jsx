import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchSettings } from "../../../firebase";

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const settingsData = await fetchSettings("allSettings");
        if (settingsData && settingsData.socialLinks) {
          setSocialLinks(settingsData.socialLinks);
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <footer className="bg-white text-gray-950 py-8 border-t border-gray-900">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="text-center lg:text-center mb-4 lg:mb-0">
          <Link to="/" className="flex items-center space-x-2 text-black">
            <img
              src="/berserk.png"
              alt="Berserk Fit Logo"
              className="h-8 ml-5"
            />
            <span className="text-xl font-bold">Berserk Fit</span>
          </Link>
          <div className="flex justify-center lg:justify-start mt-4">
            {socialLinks && socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" className="mr-4">
                <FaFacebook className="w-6 h-6" />
              </a>
            )}
            {socialLinks && socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" className="mr-4">
                <FaTwitter className="w-6 h-6" />
              </a>
            )}
            {socialLinks && socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" className="mr-4">
                <FaInstagram className="w-6 h-6" />
              </a>
            )}
            {socialLinks && socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" className="mr-4">
                <FaLinkedin className="w-6 h-6" />
              </a>
            )}
            {socialLinks && socialLinks.github && (
              <a href={socialLinks.github} target="_blank" className="mr-4">
                <FaGithub className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
        <div className="text-center lg:text-right">
          <h3 className="text-2xl font-bold text-black">
            Subscribe to Our Newsletter
          </h3>
          <form className="mt-4">
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Your email"
                className="py-2 px-4 rounded-l-lg focus:outline-none focus:border-black focus-within:border-white"
              />
              <button className="bg-gray-950 hover:bg-gray-800 py-2 px-6 rounded-r-lg text-white">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center mt-8">
        <nav className="mb-4">
          <Link to="/" className="text-black hover:text-gray-600 mx-2">
            Home
          </Link>
          <Link to="/products" className="text-black hover:text-gray-600 mx-2">
            Products
          </Link>
          <Link to="/about" className="text-black hover:text-gray-600 mx-2">
            About
          </Link>
        </nav>
        <p className="text-black">
          &copy; {new Date().getFullYear()} Berserk Fit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
