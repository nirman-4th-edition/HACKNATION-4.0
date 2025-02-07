import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "Soil Testing",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLbLzkdZw7X7zu1ZJJ_VtOfd21MeBsb4_PgA&s",
      description: "We will test your soil in our labs",
      route: "/testing",
    },
    {
      title: "Best Suggestions",
      image:
        "https://images.pexels.com/photos/162870/rye-cereals-wheat-nature-162870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "According to the results AI will suggest for your farming",
      route: "/results",
    },
    {
      title: "Sell your raw items",
      image:
        "https://media.istockphoto.com/id/669652328/photo/hand-of-businessman-and-farmer-trading-rice-grain.jpg?s=612x612&w=0&k=20&c=ukyZEsNi0CZyuH905oxDEsVPFG1K3GsAULM6h1ILf8c=",
      description: "Sell your raw items to us in best market price",
      route: "/sell",
    },
    {
      title: "Schemes",
      image:
        "https://img.khetivyapar.com/images/news/1713762716-these-government-schemes-for-farmers-in-madhya-pradesh-madhya-pradesh-scheme-2024.jpg",
      description: "Get the free updates on govt schemes",
      route: "scheme",
    },
  ];

  return (
    <div className="container mx-auto px-8 py-10">
      <h2 className="text-4xl font-bold text-center text-green-600 mb-10">
        Services we offer
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="overflow-hidden rounded-t-2xl">
              <motion.img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between text-center">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {service.description}
              </p>
              <div className="flex justify-center">
                <Link
                  to={service.route} // Make sure you have routes defined for these
                  className="bg-yellow-400 text-white rounded-full p-3 flex items-center justify-center hover:bg-yellow-500 transition-colors"
                >
                  <FaArrowRight size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="text-center mt-8">
        {" "}
        {/* Center the "and many more" text */}
        <p className="text-green-600">and many more..</p>
      </div>
    </div>
  );
};

export default Services;
