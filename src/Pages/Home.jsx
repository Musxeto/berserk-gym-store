import React from "react";
import Navbar from "../Components/Layout/Navbar/Navbar";
import HeroSection from "../Components/HeroSection/HeroSection";
import SectionPreview from "../Components/Sections/Sections";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SectionPreview />
    </div>
  );
};

export default Home;
