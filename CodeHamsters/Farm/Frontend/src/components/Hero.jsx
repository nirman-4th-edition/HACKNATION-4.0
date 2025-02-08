import React from "react";
import "./../styles/Hero.css";

const Hero = () => {
  return (
    <div
      className="h-screen relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1443867/pexels-photo-1443867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

      {/* Content container with extra top spacing and centered text */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col items-center justify-center pt-24">
        <div className="w-full lg:w-1/2 text-center">
          {/* Animated Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-float">
            <span className="block mb-2">Cultivating</span>
            <span className="text-4xl md:text-5xl font-light">
              the Future of
            </span>
            <span className="block mt-4 text-6xl md:text-7xl text-green-300 font-serif">
              Agriculture
            </span>
          </h1>

          {/* Animated Subtext */}
          <div className="border-l-4 border-green-500 pl-4 my-8">
            <p className="text-xl md:text-2xl text-gray-200 mb-2 animate-fadeIn delay-300">
              Revolutionizing modern farming through
            </p>
            <p className="text-lg md:text-xl text-green-100 font-medium">
              Innovation & Sustainability
            </p>
          </div>

          {/* Enhanced Get Started Button */}
          <button className="group relative bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-lg text-xl font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-pulse">
            <span className="flex items-center gap-3 justify-center">
              Get Started
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 border-2 border-white/30 rounded-lg group-hover:border-white/50 transition-colors -z-10"></div>
          </button>

          {/* Additional Decorative Element */}
          <div className="mt-12 flex items-center gap-4 opacity-75 justify-center">
            <div className="w-16 h-1 bg-green-500"></div>
            <span className="text-sm text-green-100">Since 1998</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
