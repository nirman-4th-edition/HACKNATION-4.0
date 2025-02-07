import React from "react";

const data = [
  {
    id: 0,
    title: "Active registered farmers",
    num: "1.4M+",
    img: "https://agrevolution.in/assets/images/farmer-solution/registered-farmer.webp",
  },
  {
    id: 1,
    title: "Active app users",
    num: "1.2M+",
    img: "https://agrevolution.in/assets/images/farmer-solution/farmer-app.webp",
  },
  {
    id: 2,
    title: "States covered",
    num: "12+",
    img: "https://agrevolution.in/assets/images/farmer-solution/farmer-app.webp",
  },
];

const Solutions = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Empowering Farmers with
            <span className="text-green-600"> Digital Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revolutionizing agriculture through technology-driven services and
            expert guidance for modern farming practices
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              All-in-One Farming Platform
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              DeHaat Farmer App provides comprehensive agricultural services
              including crop reminders, regional language support, weather
              forecasts, and real-time market prices to empower farmers
              nationwide.
            </p>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Expert Consultations
                  </h4>
                  <p className="text-gray-600">
                    Direct access to agricultural experts for crop management
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Marketplace Access
                  </h4>
                  <p className="text-gray-600">
                    Seamless input purchase and crop sales platform
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://agrevolution.in/assets/images/farmer-solution/farmer.webp"
              alt="Happy farmer using app"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 to-transparent" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-bold text-gray-900">{item.num}</p>
                  <p className="text-gray-600 font-medium">{item.title}</p>
                </div>
              </div>
              <div className="h-1 bg-green-50 rounded-full">
                <div className="h-1 bg-green-500 rounded-full w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
