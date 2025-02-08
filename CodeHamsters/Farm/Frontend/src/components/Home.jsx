import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import Discover from "./Discover";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About/>
      <Services/>
      <Testimonials/>
      <Discover/>
      <Footer/>
    </div>
  );
};

export default Home;
