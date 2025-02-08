import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BuyerLogin: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data Submitted:", loginData);
    alert("Login Successful!");
    setLoginData({ email: "", password: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-600 to-green-800">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg w-96 transition duration-300 hover:bg-opacity-20 hover:border-opacity-50">
        <h2 className="text-3xl font-bold text-center text-white mb-6 font-serif">Buyer Login</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div>
            <label className="block text-white font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/10 text-white placeholder-white font-mono transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-white font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/10 text-white placeholder-white font-mono transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <Link to="/home">
            <Button
              size="lg"
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-transform duration-300 transform hover:scale-105 shadow-md"
            >
              Login
            </Button>
          </Link>

          {/* Forgot Password & Signup Links */}
          <div className="text-center mt-4">
            <Link to="#" className="text-green-300 hover:underline text-sm">
              Forgot Password?
            </Link>
            <p className="text-white mt-2 text-sm">
              Don't have an account?{" "}
              <Link to="/bsignup" className="text-green-300 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyerLogin;
