import React, { useEffect, useState } from "react";

const HeroSection = () => {
  // Define array of image source links
  const imageSrcArray = [
    "/pic1.webp",
    "/pic2.webp",
    "/pics.webp",
    // Add more image source links as needed
  ];

  // State to keep track of current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % imageSrcArray.length);
    }, 5000); // Change the interval time as needed (5000 milliseconds = 5 seconds)

    return () => clearInterval(interval);
  }, [imageSrcArray.length]);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? imageSrcArray.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % imageSrcArray.length);
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 flex justify-center items-center">
        <div
          id="default-carousel"
          className="relative w-full h-full"
          data-carousel="static"
        >
          {/* Carousel wrapper */}
          <div className="overflow-hidden relative h-full">
            {/* Carousel items */}
            <div className="absolute top-0 left-0 w-full h-full flex">
              {imageSrcArray.map((src, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentSlide ? "" : "hidden"
                  } duration-700 ease-in-out`}
                  data-carousel-item
                >
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="block w-full h-full object-cover"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Slider indicators */}
      <div className="absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
        {imageSrcArray.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-500"
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
      {/* Arrows */}
      <button
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-white p-2 rounded-full text-gray-800"
        onClick={goToPreviousSlide}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white p-2 rounded-full text-gray-800"
        onClick={goToNextSlide}
      >
        {">"}
      </button>
    </div>
  );
};

export default HeroSection;
