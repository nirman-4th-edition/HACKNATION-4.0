import React from 'react';

const Products = () => {
  const crops = [
    {
      id: 1,
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
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-green-800 sm:text-6xl mb-6 animate-fade-in">
            Fresh & Organic Crops
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Buy directly from trusted local farmers and experience the freshness in every bite.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">{crop.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Available</p>
                    <p className="text-lg font-semibold text-green-700">{crop.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-lg font-bold text-gray-900">${crop.price}</p>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
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

export default Products;