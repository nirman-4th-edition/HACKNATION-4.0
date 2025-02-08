import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, ShoppingCart, Heart, LogOut } from "lucide-react";
import Navbar from "../components/NavMenuBar";
import Footer_1 from "../components/footer";

const BuyerProfile: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area (Scrollable) */}
      <main className="flex-grow flex flex-col items-center bg-green-50 p-6">
        {/* Profile Card with Image on Left & Content on Right */}
        <motion.div
          className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Image - Left */}
          <motion.img
            src="https://via.placeholder.com/100"
            alt="Buyer Profile"
            className="w-24 h-24 rounded-full border-4 border-green-500"
            whileHover={{ scale: 1.1 }}
          />

          {/* Profile Details - Right */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-gray-500">john.doe@email.com</p>

            {/* Buyer Details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">Personal Info</h3>
              <p className="text-gray-600 mt-1">📍 Location: California, USA</p>
              <p className="text-gray-600">📞 Phone: +1 234 567 890</p>
            </div>

            {/* Navigation Links */}
            <div className="mt-4 flex gap-3">
              <Link to="/editProfile">
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit size={16} /> Edit Profile
                </Button>
              </Link>

              <Link to="/">
                <Button variant="destructive" className="flex items-center gap-2">
                  <LogOut size={16} /> Logout
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Order History & Wishlist */}
        <div className="mt-8 w-full max-w-2xl">
          <h3 className="text-xl font-semibold text-gray-700">Order History</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4 flex items-center justify-between">
              <CardContent>
                <p className="text-gray-700">Organic Tomatoes</p>
                <p className="text-gray-500 text-sm">Purchased on: Jan 20, 2025</p>
              </CardContent>
              <ShoppingCart className="text-green-600" size={24} />
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <CardContent>
                <p className="text-gray-700">Fresh Milk</p>
                <p className="text-gray-500 text-sm">Purchased on: Feb 2, 2025</p>
              </CardContent>
              <ShoppingCart className="text-green-600" size={24} />
            </Card>
          </motion.div>

          <h3 className="text-xl font-semibold text-gray-700 mt-6">Wishlist</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-4 flex items-center justify-between">
              <CardContent>
                <p className="text-gray-700">Organic Honey</p>
              </CardContent>
              <Heart className="text-red-500" size={24} />
            </Card>

            <Card className="p-4 flex items-center justify-between">
              <CardContent>
                <p className="text-gray-700">Fresh Avocados</p>
              </CardContent>
              <Heart className="text-red-500" size={24} />
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer_1 />
    </div>
  );
};

export default BuyerProfile;
