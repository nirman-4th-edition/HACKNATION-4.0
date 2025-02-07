import React from "react";
import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* About Us Content */}
      <section className="bg-gray-200 text-gray-900 pt-24 pb-10 min-h-screen mt-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl bg-white p-8 rounded-2xl shadow-lg mx-auto">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
              About Us
            </h1>

            {/* About Us Section */}
            <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
              <p className="text-gray-600 text-lg leading-relaxed">
                At C&D Waste Connect, we are dedicated to revolutionizing
                construction waste management with smart, AI-powered solutions.
                Our mission is to minimize environmental impact by promoting
                efficient recycling and reuse of construction and demolition
                materials.
              </p>
            </div>

            <div className="space-y-6 mt-6">
              <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">Our Vision</h2>
                <p className="text-gray-600 text-lg mt-2 leading-relaxed">
                  Our vision is to lead the construction industry towards zero waste
                  by leveraging AI-driven solutions for a greener, more sustainable
                  future.
                </p>
              </div>

              <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">Why Choose Us</h2>
                <p className="text-gray-600 text-lg mt-2 leading-relaxed">
                  We combine AI-driven innovation with sustainable practices to help
                  construction companies reduce waste, cut costs, and build a
                  greener future.
                </p>
              </div>

              <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">Our Commitment</h2>
                <p className="text-gray-600 text-lg mt-2 leading-relaxed">
                  We are committed to driving a zero-waste future by empowering
                  businesses with smart, sustainable waste management solutions.
                </p>
              </div>
            </div>

            {/* Terms and Conditions Section */}
            <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700">Terms and Conditions</h2>
              <p className="text-gray-600 text-lg mt-2 leading-relaxed">
                By using our services, you agree to comply with our waste management
                policies and ethical guidelines. Unauthorized use of our platform
                for improper disposal practices is strictly prohibited. We reserve
                the right to update our terms as needed.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700">Frequently Asked Questions</h2>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">How can I start using C&D Waste Connect?</h3>
                <p className="text-gray-600 mt-2">Simply sign up on our platform and explore our waste management solutions tailored for your needs.</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">Is there a cost associated with your services?</h3>
                <p className="text-gray-600 mt-2">We offer both free and premium plans based on your waste management requirements.</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">How does AI help in waste management?</h3>
                <p className="text-gray-600 mt-2">Our AI technology optimizes waste sorting, tracking, and recycling to improve efficiency and reduce environmental impact.</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700">Contact Us</h2>
              <p className="text-gray-600 text-lg mt-2 leading-relaxed">
                For inquiries or partnerships, please reach out to us. Together,
                we can build a sustainable future.
              </p>
              <div className="mt-4 text-center">
                <a
                  href="mailto:info@cdwasteconnect.com"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  info@cdwasteconnect.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-10">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <p>Contact us: info@cdwastemanagement.com</p>
          </div>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
            <a href="#" className="hover:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutUs;