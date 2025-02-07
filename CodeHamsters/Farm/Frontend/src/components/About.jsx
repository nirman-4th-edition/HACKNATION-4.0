import React from "react";
import { motion } from "framer-motion";
import { Leaf, TestTube, ChartLine, UserCircleGear } from "phosphor-react";
import "./../styles/About.css"; // Make sure this path is correct

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const cardVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const team = [
    {
      name: "Dr. M.S.Swaminathan",
      role: "Agricultural Scientist",
      exp: "10+ years in soil biology",
      img: "https://www.mssrf.org/wp-content/uploads/2023/09/dsc_0200_17140664696_o-scaled.jpg",
    },
    {
      name: "Sunil Khairnar",
      role: "Tech Lead",
      exp: "AI & Data Analysis expert",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA3FDnN6hB9VXwmuVwQN_h6roZVt6f4plsjw&s",
    },
    {
      name: "Dr. Ravi G R",
      role: "Field Coordinator",
      exp: "Farmer relations specialist",
      img: "https://content3.jdmagicbox.com/v2/comp/chennai/w5/044pxx44.xx44.090723101009.e7w5/catalogue/dr-ravi-g-r-anna-nagar-east-chennai-diabetologist-doctors-zv0qdxft0k.jpg",
    },
    {
      name: "Ankita Gupta",
      role: "Sustainability Expert",
      exp: "Organic farming advocate",
      img: "https://assets.kimshospitals.com/images/doctors/consultant-obstetrician-gynaecologist_1684561168.jpg",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-b from-green-50 to-white py-24 relative overflow-hidden"
    >
      {/* Decorative elements (Animated blobs) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div variants={itemVariants} className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              About Krishi Bandhu
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Revolutionizing agriculture through technology and innovation
          </p>
        </motion.div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative h-full bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <Leaf
                className="w-12 h-12 text-green-600 mb-6"
                weight="duotone"
              />
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To empower farmers with AI-driven soil analysis and personalized
                crop recommendations, ensuring sustainable agriculture and
                improved livelihoods.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl overflow-hidden"
          >
            <img
              src="https://images.pexels.com/photos/2203683/pexels-photo-2203683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Farm"
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          {[
            {
              icon: TestTube,
              title: "Precision Analysis",
              text: "Advanced soil nutrient testing",
            },
            {
              icon: ChartLine,
              title: "Smart Insights",
              text: "Data-driven crop recommendations",
            },
            {
              icon: UserCircleGear,
              title: "Expert Support",
              text: "24/7 agricultural guidance",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl"
            >
              <item.icon
                className="w-16 h-16 text-green-600 mb-6"
                weight="duotone"
              />
              <h4 className="text-2xl font-bold text-gray-800 mb-3">
                {item.title}
              </h4>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <motion.div variants={containerVariants} className="text-center mt-24">
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Experts
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A dedicated team combining agricultural wisdom with technological
              innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <motion.div
                  variants={cardVariants}
                  className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-green-50 shadow-lg">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-green-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.exp}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
