import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import logo_1 from "../assets/logo-removebg-preview.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-forest text-white py-16">
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Left Side: Name & Buttons */}
          <div>
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl md:text-6xl font-bold">Farm2You</h1>
            </div>
            <p className="text-xl md:text-2xl text-forest-light mb-8">
              Fresh from Farm, Direct to Doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/bsignup">
                <Button size="lg" className="bg-white text-forest hover:bg-forest-light hover:text-white">
                  Start Buying <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/fsignup">
                <Button size="lg" className="bg-white text-forest hover:bg-forest-light hover:text-white">
                  Start Selling <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Logo */}
          <div>
            <img 
              src={logo_1} 
              alt="Farm2You Logo" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-forest">Why Choose Farm2You?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-white shadow-md">
            <div className="inline-block p-3 bg-forest-light/10 rounded-full mb-4">
              <Leaf className="w-8 h-8 text-forest" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fresh & Direct</h3>
            <p className="text-gray-600">
              Get fresh produce directly from local farmers, ensuring quality and supporting local agriculture.
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white shadow-md">
            <div className="inline-block p-3 bg-forest-light/10 rounded-full mb-4">
              <Shield className="w-8 h-8 text-forest" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Order Management & Tracking</h3>
            <p className="text-gray-600">
              Farmers can manage received orders, update statuses, and track transactions, while buyers can track their orders.
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white shadow-md">
            <div className="inline-block p-3 bg-forest-light/10 rounded-full mb-4">
              <Truck className="w-8 h-8 text-forest" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Direct Delivery</h3>
            <p className="text-gray-600">
              Get your fresh produce delivered directly to your doorstep from our network of trusted farmers.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-forest-light/10">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-forest">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-forest">For Buyers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  Browse fresh produce from local farmers
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  Choose between direct purchase for fresh produce.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  Get fresh produce delivered to your doorstep
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-forest">For Farmers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span>
                  Sell produce without middlemen.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span>
                  Get fair prices through direct buyer connections.
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span>
                  Track sales and orders effortlessly.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
