import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import RefreshHandler from './RefreshHandler';
import Marketplace from './components/Marketplace';
import RecyclingFacilities from "./components/RecyclingFacilities"
import AboutUs from "./components/AboutUs"
import Checkout from './components/Checkout';
import Success from "./components/Success"
function App() {
  

  return (
    <>
    <RefreshHandler/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/success" element={<Success />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/recycling-facilities" element={<RecyclingFacilities />} />
      <Route path="/about-us" element={<AboutUs />} /> 
    </Routes>
    </>
  )
}

export default App
