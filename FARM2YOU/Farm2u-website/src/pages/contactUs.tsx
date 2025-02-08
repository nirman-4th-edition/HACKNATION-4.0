import React from "react";
import NavMenuBar from "@/components/NavMenuBar";
import Footer_1 from "@/components/footer";

const ContactUs: React.FC = () => {
  return (
    <>
      <NavMenuBar />
      <section className="bg-green-100 min-h-screen flex flex-col items-center">
        {/* Header */}
        <div className="w-full  py-8 text-center">
          <h1 className="text-black text-4xl font-bold">Contact Us</h1>
        </div>

        {/* Contact Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 mt-10 max-w-2xl w-full">
          <p className="text-gray-700 text-lg">
            <strong>Website:</strong> <a href="https://www.farmerbazaarapp.com" className="text-green-600">www.farm2uapp.com</a>
          </p>
          <p className="text-gray-700 text-lg">
            <strong>Email:</strong> <a href="mailto:farmerbazaar@sofvare.com" className="text-green-600">farm2u@sofvare.com</a>
          </p>
          <p className="text-gray-700 text-lg">
            <strong>Contact Number:</strong> <a href="tel:+918980251232" className="text-green-600">+91 89-8025-1232</a>
          </p>

          <div className="border-t mt-6 pt-6">
            <h2 className="text-xl font-semibold text-gray-800">Developed By</h2>
            <p className="text-gray-700 text-lg">softpath Solutions LLC</p>
            <p className="text-gray-700 text-lg">
              <strong>Website:</strong> <a href="https://www.sofvare.com" className="text-green-600">www.softpath.com</a>
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Email:</strong> <a href="mailto:connect@sofvare.com" className="text-green-600">connect@softpath.com</a>
            </p>

          </div>
          
        </div>
        
        </section>
        <Footer_1 />
      
    </>
  );
};

export default ContactUs;
