import React, { useState } from "react";
import "../../public/Login1.png";
import "../../public/bg1.png";
import { useAuth } from "../contexts/auth.context";
export const Login: React.FC = () => {

  const { login, loginInfo, loginError, isLoginLoading, updateLoginInfo } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateLoginInfo({ ...loginInfo, [name]: value });
  };

  return (
    <div className="login min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-[1200px] grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left side - Image */}
        <div className="image bg-gray-200 p-12 flex items-center justify-center">
          <img
            src="../../public/Login1.png"
            alt="Graduate illustration"
            className="w-full max-w-[400px]"
          />
        </div>

        {/* Right side - Login form */}
        <div className="p-12 md:p-16">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              PeakPrep
            </h1>
          </div>

          <form onSubmit={login} className="space-y-8">
            <div>
              <label
                htmlFor="username"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={loginInfo.username}
                onChange={handleInputChange}
                className="input-field text-lg"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={loginInfo.password}
                onChange={handleInputChange}
                className="input-field text-lg"
                placeholder="Enter your password"
                required
              />
            </div>
{/* 
            <div className="flex items-center">
              <input
                id="keepSignedIn"
                name="keepSignedIn"
                type="checkbox"
                checked={formData.keepSignedIn}
                onChange={handleInputChange}
                className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label
                htmlFor="keepSignedIn"
                className="ml-3 block text-lg text-gray-700"
              >
                Keep me signed in
              </label>
            </div> */}

            <button type="submit" className="btn-primary text-lg py-3 px-6">
              Log in
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
