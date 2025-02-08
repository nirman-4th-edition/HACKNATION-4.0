import React from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Register from "./components/Register";
import Login from "./components/Login";
import SoilTest from "./components/SoilTest";
import Solutions from "./components/Solutions";
import Weather from "./pages/Weather";
import ScheduleForm from "./components/ScheduleForm";
import FertilizerRecommender from "./components/FertilizerRecommender";
import CropRecommandations from "./pages/CropRecommadations";
import { useQuery } from "@tanstack/react-query";
import GovtScheme from "./pages/GovtScheme";
import Sell from "./pages/Sell";
import Products from "./pages/Products";

const App = () => {
  // const { data: authUser, isLoading } = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: async () => {
  //     try {
  //       const res = await fetch("/api/v1/auth/me");
  //       const data = await res.json();

  //       if (data.error) {
  //         return null;
  //       }

  //       if (!res.ok) {
  //         throw new Error(data.error || "Something went wrong");
  //       }

  //       return data;
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   },
  // });

  // if (isLoading)
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/soilTest" element={<SoilTest />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/schedule" element={<ScheduleForm />} />
        <Route
          path="/recommandation/fertilizer"
          element={<FertilizerRecommender />}
        />
        <Route path="/recommandation/crop" element={<CropRecommandations />} />
        <Route path="/schemes" element={<GovtScheme />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;
