import axios from "axios";
import React, { useState } from "react";
import { GiNestBirds } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const userData = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:3001/users/signin",
        userData
      );

      // Saved token to localStorage
      localStorage.setItem("authToken", response.data.token);

      setMessage(response.data.message);
      setEmail("");
      setPassword("");

      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.error || "Signin failed. Please try again." + err
      );
    }
  };

  return (
    <>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gradient-to-tr from-[#470552] via-[#0d021f] via-[#20072f] via-[#3a0842] to-[#000000]
">
          <a
            href="#"
            className="flex items-center justify-center mb-6 text-3xl gap-2 font-semibold text-white"
          >
            <GiNestBirds className="text-4xl text-gray-50" />
            FileNest
          </a>
          <div className="w-full bg-gray-200 rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 border-2 border-white shadow-[0_0_10px_white]">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-black">
                Sign in to your account
              </h1>
              <form
                className="space-y-6 md:space-y-6"
                onSubmit={handleSubmit}
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" border border-gray-300 text-black-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-slate-500 placeholder-gray-600 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-black-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-slate-500 placeholder-gray-600 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-500 focus:ring-2 focus:ring-primary-300 dark:bg-gray-500 dark:border-gray-500 dark:focus:ring-primary-600"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 text-gray-800"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline text-gray-600"
                  >
                    Forgot password?
                  </a>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-400">{message + "."}</p>}
                <button
                  type="submit"
                  className="w-full text-white bg-primary-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  Sign in
                </button>
                <p className="text-sm font-dark text-gray-800">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;