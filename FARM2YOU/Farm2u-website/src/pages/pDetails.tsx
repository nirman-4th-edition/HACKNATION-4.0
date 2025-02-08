import React from "react";
import { useParams } from "react-router-dom";

const product = {
  id: 1,
  name: "Organic Apples",
  price: 150,
  image: "https://via.placeholder.com/400",
  description:
    "Fresh, organic apples grown naturally without any harmful chemicals. Rich in vitamins and essential nutrients, sourced from eco-friendly farms.",
  farmer: {
    name: "Narsi's Traditional Farm",
    location: "Paralakhemundi",
    rating: "4.8⭐",
  },
};

const ProductDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center items-center p-6">
      <div className="bg-green-900 bg-opacity-80 text-white p-8 rounded-xl shadow-xl w-full max-w-4xl transition-all hover:shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-wide">{product.name}</h1>
            <p className="text-green-300 text-xl font-semibold">₹{product.price} / kg</p>
            <p className="text-gray-200 leading-relaxed">{product.description}</p>

            {/* Farmer Details */}
            <div className="mt-4 bg-green-700 bg-opacity-50 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold text-green-300">Farmer Details</h2>
              <p className="text-gray-100 font-semibold">{product.farmer.name}</p>
              <p className="text-gray-300">{product.farmer.location}</p>
              <p className="text-yellow-400">{product.farmer.rating}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-400 transition-all shadow-md">
                Buy Now
              </button>
              <button className="bg-gray-600 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-500 transition-all shadow-md">
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
