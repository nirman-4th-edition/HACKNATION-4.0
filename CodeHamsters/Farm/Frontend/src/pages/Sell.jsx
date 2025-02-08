<<<<<<< HEAD
import React from "react";
=======
import React from 'react';
>>>>>>> ea9f875ee6ae9fb46af2902f2f82b7d379fe12e8

const Sell = () => {
  const crops = [
    {
      id: 1,
<<<<<<< HEAD
      name: "Tomatoes",
      image: "https://via.placeholder.com/150",
      quantity: "50 kg",
      price: "$30",
    },
    {
      id: 2,
      name: "Potatoes",
      image: "https://via.placeholder.com/150",
      quantity: "100 kg",
      price: "$20",
    },
    {
      id: 3,
      name: "Carrots",
      image: "https://via.placeholder.com/150",
      quantity: "70 kg",
      price: "$25",
=======
      name: 'Organic Wheat',
      quantity: '500 kg',
      price: '$0.50/kg',
      image: 'https://picsum.photos/400/300?random=1'
    },
    {
      id: 2,
      name: 'Premium Rice',
      quantity: '300 kg',
      price: '$0.75/kg',
      image: 'https://picsum.photos/400/300?random=2'
    },
    {
      id: 3,
      name: 'Sweet Corn',
      quantity: '200 kg',
      price: '$0.90/kg',
      image: 'https://picsum.photos/400/300?random=3'
    },
    {
      id: 4,
      name: 'Golden Soybean',
      quantity: '450 kg',
      price: '$1.20/kg',
      image: 'https://picsum.photos/400/300?random=4'
    },
    {
      id: 5,
      name: 'Fresh Vegetables',
      quantity: '100 kg',
      price: '$2.00/kg',
      image: 'https://picsum.photos/400/300?random=5'
    },
    {
      id: 6,
      name: 'Organic Potatoes',
      quantity: '600 kg',
      price: '$0.40/kg',
      image: 'https://picsum.photos/400/300?random=6'
>>>>>>> ea9f875ee6ae9fb46af2902f2f82b7d379fe12e8
    },
  ];

  return (
<<<<<<< HEAD
    <div>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
              Marketplace
            </h2>
            <p className="text-xl text-gray-500">
              Buy fresh crops directly from local farmers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">
                      {crop.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Available</p>
                      <p className="text-lg font-semibold text-green-600">
                        {crop.quantity}
                      </p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-lg font-bold text-gray-900">
                        {crop.price}
                      </p>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300">
                    Buy Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
=======
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Marketplace
          </h2>
          <p className="text-xl text-gray-500">
            Buy fresh crops directly from local farmers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">{crop.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Available</p>
                    <p className="text-base font-semibold text-green-600">
                      {crop.quantity}
                    </p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-base font-bold text-gray-900">
                      {crop.price}
                    </p>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300">
                  Buy Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Sell;
>>>>>>> ea9f875ee6ae9fb46af2902f2f82b7d379fe12e8
