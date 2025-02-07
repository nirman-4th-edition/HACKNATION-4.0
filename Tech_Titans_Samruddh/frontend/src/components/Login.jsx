import React,{useContext, useState} from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleerror,handlesuccess } from "../utils";
import { AuthContext } from "../Context/AuthContext.jsx";
const Login = () => {
    const navigate = useNavigate()
    const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext)
  const [logininfo, setlogininfo] = useState({
    email:"",
    password:""
  })
  const handlechange = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    const copylogininfo = {...logininfo}
    copylogininfo[name] =value;
    setlogininfo(copylogininfo)
  }
  const handlelogin= async(e)=>{
    e.preventDefault();
    const{email,password}=logininfo;
    if(!email||!password){
      return handleerror(" email and password are required")
    }
    try {
      const url = "http://localhost:8080/auth/login"
      const response = await fetch(url,
        {
          method:"POST",
          headers:{
            'Content-type':"application/json"
          },
          body:JSON.stringify(logininfo)
        }
      )
      const result = await response.json();
      const{success,message,jwttoken,name,error} = result
      if(success){       
         localStorage.setItem('token',jwttoken)
         localStorage.setItem('loggedinuser',name)
        setIsAuthenticated(true)
        handlesuccess(message)
        setTimeout(() => {        
          navigate('/')
        }, 1000);
      }else if(error){
         const details = error?.details[0].message;
        
         handleerror(details)
          }else if(!success){
           
         handleerror(message)
        }
    } catch (err) {
      handleerror(err)
    }
  }
  
  return (
    <>
      <div className="h-screen md:flex">
        {/* Left Side (Info Panel) */}
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              C&D Waste Management System
            </h1>
            <p className="text-white mt-1">Efficient Sustainable Compliant</p>
            <button
              type="button"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
          {/* Circular Borders */}
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white" onSubmit={handlelogin}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>

            {/* Email Input */}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none w-full"
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handlechange}
                value={logininfo.email}
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none w-full"
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handlechange}
                value={logininfo.password}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>

            {/* Signup Link */}
            <span className="text-gray-600 text-sm">
              Do not have an Account?
              <Link
                to="/signup"
                className="ml-2 hover:text-blue-500 cursor-pointer font-bold"
              >
                Signup
              </Link>
            </span>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Login;
