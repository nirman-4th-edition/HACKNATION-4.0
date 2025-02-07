import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Qp0AAE45JkeTHBMgl52LYdJWQx9QpVJHTkUSfHZENGioko8hicS9iptZTZTMVdaDCeDwEvdMf0dbYaCP40aH71u00jCCzXcFm");

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    const price = typeof item.price === "string" ? item.price.replace("₹", "") : item.price;
    return sum + parseFloat(price || 0);
  }, 0);

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url; // Redirects to Stripe Checkout
      } else {
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>
        {cart.length === 0 ? (
          <p className="text-center text-gray-700">Your cart is empty.</p>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-300 mb-4">
              {cart.map((item, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-green-500 text-white py-2 rounded hover:bg-green-700"
            >
              Proceed to Payment
            </button>
            <button
              onClick={() => navigate("/marketplace")}
              className="bg-gray-500 text-white px-4 py-2 mt-4 ml-4 rounded"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
