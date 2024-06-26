import React from "react";
import Navbar from "../Components/Layout/Navbar/Navbar";
import Footer from "../Components/Layout/Footer/Footer";

const About = () => {
  return (
    <>
      {" "}
      <Navbar />
      <div className="container mx-auto p-8 ">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 text-2xl leading-relaxed">
          Welcome to Berserk Fit! We are dedicated to providing high-quality
          fitness apparel, nutrition supplements, and accessories to support
          your fitness journey. At Berserk Fit, we believe in the power of
          fitness to transform lives and inspire greatness.
        </p>
        <p className="text-gray-700 text-2xl leading-relaxed mt-4">
          Our mission is to empower individuals to reach their fitness goals by
          offering a curated selection of products designed to enhance
          performance, recovery, and overall well-being. Whether you're a
          seasoned athlete or just starting your fitness journey, we're here to
          support you every step of the way.
        </p>
        <p className="text-gray-700 text-2xl leading-relaxed mt-4">
          Customer satisfaction is our top priority, and we strive to deliver
          exceptional service with every interaction. If you have any questions,
          feedback, or suggestions, please don't hesitate to contact us. Thank
          you for choosing Berserk Fit as your partner in fitness!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
