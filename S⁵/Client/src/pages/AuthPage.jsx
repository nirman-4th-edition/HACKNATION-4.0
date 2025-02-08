import React, { useState } from "react";

const AuthPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-[#0f172a]">
      <div
        className={`relative w-[768px] max-w-full min-h-[480px] bg-[#1e293b] shadow-2xl rounded-lg overflow-hidden transition-all duration-500 ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        <div
          className={`absolute top-0 w-1/2 h-full transition-all duration-500 flex flex-col items-center justify-center p-8 ${
            isRightPanelActive ? "opacity-100 z-10 translate-x-full" : "opacity-0 z-0"
          }`}
        >
          <form className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <div className="flex space-x-3 my-4">
              <a href="#" className="p-2 border rounded-full border-gray-500 text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="p-2 border rounded-full border-gray-500 text-white">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="p-2 border rounded-full border-gray-500 text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-sm text-gray-400">or use your email for registration</span>
            <input type="text" placeholder="Name" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            <button className="btn-primary-bordered mt-4">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 flex flex-col items-center justify-center p-8 ${
            isRightPanelActive ? "opacity-0 z-0" : "opacity-100 z-10"
          }`}
        >
          <form className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold text-white">Sign In</h1>
            <div className="flex space-x-3 my-4">
              <a href="#" className="p-2 border rounded-full border-gray-500 text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="p-2 border rounded-full border-gray-500 text-white">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="p-2 border rounded-full border-gray-500 text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-sm text-gray-400">or use your account</span>
            <input type="email" placeholder="Email" className="w-full bg-transparent border border-gray-500 text-white p-3 rounded-md mt-3 focus:outline-none focus:border-blue-400 transition-all placeholder-gray-400" />
            <input type="password" placeholder="Password" className="w-full bg-transparent border border-gray-500 text-white p-3 rounded-md mt-3 focus:outline-none focus:border-blue-400 transition-all placeholder-gray-400" />
            <a href="#" className="text-sm text-blue-400 mt-2">Forgot your password?</a>
            <button className="btn-primary-bordered mt-4">Sign In</button>
          </form>
        </div>
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-[#1e293b] to-[#0f172a] text-white flex items-center justify-center transition-all duration-500 ${
            isRightPanelActive ? "translate-x-[-100%]" : "translate-x-0"
          }`}
        >
          <div className="text-center px-8">
            {isRightPanelActive ? (
              <>
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-sm mt-2">To keep connected with us, please log in with your personal info</p>
                <button
                  className="border-2 border-blue-400 text-blue-400 px-6 py-2 rounded-full font-bold uppercase tracking-wide transition-all duration-300 hover:bg-blue-400 hover:text-white"
                  onClick={() => setIsRightPanelActive(false)}
                >
                  <h2>Sign in</h2>
                </button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold">Hello!</h1>
                <p className="text-sm mt-2">Enter your personal details and start the journey with us</p>
                <button
                  className="border-2 border-white text-white px-6 py-2 rounded-full font-bold uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-blue-500"
                  onClick={() => setIsRightPanelActive(true)}
                >
                  <h2>Sign up</h2>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;