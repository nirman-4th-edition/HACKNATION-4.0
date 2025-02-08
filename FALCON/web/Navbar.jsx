import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBar.css'; // Import the CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        
        <Link to="/">Agri Tech</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/service">Services</Link></li>
        <li><Link to="/contener">login</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;