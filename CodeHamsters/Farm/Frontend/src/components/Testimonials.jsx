import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      text: "Lorem ipsum is simply free text dolor not sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore text.",
      name: "Willie Dawson",
      title: "Customer",
      image: "https://randomuser.me/api/portraits/men/1.jpg", // Replace with actual image URL
    },
    {
      text: "Lorem ipsum is simply free text dolor not sit amet, consectetur notted adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore text.",
      name: "Nancy Davis",
      title: "Customer",
      image: "https://randomuser.me/api/portraits/women/1.jpg", // Replace with actual image URL
    },
  ];

  return (
    <div className="relative">
      {/* Background Image with reduced opacity */}
      <img
        src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Farm background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Testimonials Content */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start">
            <div className="lg:w-1/4">
              <div className="text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  OUR TESTIMONIALS
                </h2>
                <h3 className="text-4xl font-extrabold text-green-600 mb-6">
                  What They're <br /> Talking About <br /> Krushak Bandhu
                </h3>
                {/* Navigation Buttons (Optional) */}
                <div className="flex space-x-4">
                  <button className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
                    {/* Previous arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center">
                    {/* Next arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4 lg:pl-16 mt-10 lg:mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-md"
                  >
                    <p className="text-gray-600 mb-6">{testimonial.text}</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
