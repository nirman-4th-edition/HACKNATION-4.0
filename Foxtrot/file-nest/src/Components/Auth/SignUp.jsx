import React, { useState, useEffect } from "react";
import { GiNestBirds } from "react-icons/gi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const userData = { email, password, firstName, lastName };

    try {
      const response = await axios.post(
        "http://localhost:3001/users/signup",
        userData
      );
      setMessage(response.data.message);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.error || "Signup failed. Please try again."
      );
    }
  };

  return (
    <>
      <section className="bg-gray-800 bg-gradient-to-tr from-[#470552] via-[#0d021f] via-[#20072f] via-[#3a0842] to-[#000000]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center justify-center mb-6 text-3xl gap-2 font-semibold text-white">
            <GiNestBirds className="text-4xl text-gray-50" />
            FileNest
          </a>
          <div className="w-full rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-200/60 border-2 border-[#f8f4ff] shadow-[0_0_10px_#f8f4ff]">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-50 md:text-2xl">
                Sign up to your account
              </h1>
              <form className="space-y-6" onSubmit={handleSubmit} action="#">
                <div className="flex flex-col gap-4">
                  <span>
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-50 "
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first"
                      id="first"
                      className="bg-gray-300 border text-black-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-400 placeholder-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Ex: Joe"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </span>
                  <span>
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-50 "
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="second"
                      id="second"
                      className="bg-gray-300 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 dark:placeholder-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Ex: Rogan"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </span>

                  <span>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-50 "
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-300 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 dark:placeholder-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </span>

                  <span>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-50 "
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-300 border-gray-600 placeholder-gray-600 text-black focus:ring-blue-500 focus:border-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </span>
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-400">{message+"."}</p>}

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-[#610A70] dark:hover:bg-[#A210BC] focus:ring-[#610A70] cursor-pointer"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-50/70">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="font-medium hover:text-gray-50 hover:underline dark:text-primary-500"
                  >
                    Sign in
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
export default SignUp;