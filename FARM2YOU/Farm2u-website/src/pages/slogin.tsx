import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SellerLogin: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Seller Login Successful! File uploaded successfully.");
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-xl p-8 rounded-2xl border border-gray-200 dark:border-gray-700 w-96 transition-all hover:shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-serif font-bold">Seller Login</h2>
          <button onClick={toggleTheme} className="px-3 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700">Toggle</button>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 dark:bg-gray-700 dark:text-white font-mono"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 dark:bg-gray-700 dark:text-white font-mono"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Upload Proof</label>
            <input
              type="file"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 bg-gray-50 dark:bg-gray-700 dark:text-white font-mono file:bg-green-500 file:text-white file:px-3 file:py-2 file:rounded-lg"
              required
            />
          </div>
          <Link to="/dashboard">
          <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-all hover:scale-105">
            Login as Seller
          </Button>
             </Link>
          
          <div className="text-center mt-4">
            <Link to="#" className="text-green-600 dark:text-green-300 hover:underline">Forgot Password?</Link>
            <p className="mt-2">
              Don't have an account? 
              <Link to="/fsignup" className="text-green-600 dark:text-green-300 hover:underline"> Sign Up</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SellerLogin;
