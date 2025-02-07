// src/About.js
import React from 'react';
import '../style/about.css'; // Import CSS for styling
import NavBar from './Navbar';
import {motion} from 'framer-motion'

const About = () => {
  return <>
  <NavBar></NavBar>
    < motion.div  initial={{opacity:0,scale:0}}
         whileInView={{opacity:1,scale:1}}
         transition={{duration:2}} className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our application! We are dedicated to providing the best service possible.
        Our team is committed to ensuring that you have a great experience while using our platform.
      </p>
      <p>
        Our mission is to deliver high-quality data and insights to help you make informed decisions.
        We believe in transparency, reliability, and innovation.
      </p>
      <p>
        Thank you for choosing us! If you have any questions or feedback, feel free to reach out.
      </p>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Agri_tech. agritech@gmail.com</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
        </p>
      </footer>
    </motion.div>
    </>
};

export default About;