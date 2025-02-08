import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-title">Lifeshield.in</h2>
          <p className="footer-description">
            Lifeshield.in connects medical professionals with healthcare
            providers, specializing in matching qualified staff for temporary
            and permanent positions.
          </p>
          <p className="footer-copyright">
            © 2025 Lifeshield.in. All rights reserved.
          </p>
        </div>

        <div className="footer-middle">
          <h3 className="footer-heading">Popular Job Categories</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Doctors</a>
            </li>
            <li>
              <a href="#">Nurses</a>
            </li>
          </ul>
        </div>

        <div className="footer-right">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="contact-icons">
            <a
              href="https://wa.me/7499544044"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <a href="mailto:info@medishifts.in"></a>
            <a href="tel:+917499544044"></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Refund & Cancellation Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
