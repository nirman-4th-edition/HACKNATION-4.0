import React from "react";

const GovtScheme = () => {
  const schemes = [
    {
      id: 1,
      title: "Pradhan Mantri Kisan Samman Nidhi",
      description: "Income support scheme for farmers with land holdings",
      eligibility: "All landholding farmer families",
      link: "https://pmkisan.gov.in",
      category: "Financial Aid",
    },
    {
      id: 2,
      title: "Paramparagat Krishi Vikas Yojana",
      description: "Promotion of organic farming in India",
      eligibility: "Farmers groups/cooperatives",
      link: "https://pgsindia-ncof.gov.in",
      category: "Organic Farming",
    },
    {
      id: 3,
      title: "PM Fasal Bima Yojana",
      description: "Crop insurance scheme against natural calamities",
      eligibility: "All farmers including sharecroppers",
      link: "https://pmfby.gov.in",
      category: "Insurance",
    },
    // Add more schemes as needed
  ];

  const categories = [
    "All",
    "Financial Aid",
    "Organic Farming",
    "Insurance",
    "Training",
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredSchemes =
    selectedCategory === "All"
      ? schemes
      : schemes.filter((scheme) => scheme.category === selectedCategory);

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Government Schemes for Farmers
        </h1>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-700 border border-green-300 hover:bg-green-50"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 text-xs font-medium rounded-full">
                    {scheme.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {scheme.title}
                </h3>
                <p className="text-gray-600 mb-4">{scheme.description}</p>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">
                    Eligibility:
                    <span className="font-normal ml-1">
                      {scheme.eligibility}
                    </span>
                  </p>
                </div>
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Apply Now
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovtScheme;
