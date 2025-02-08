import { Link } from 'react-scroll';
import { useState } from 'react';
import './Navbar.css';
import AuthPopup from './AuthPopup';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const dropdownItems = {
    Home: ['home'],
    'About Odisha': ['History', 'Culture', 'Art and craft', 'Taste', 'Tribe', 'Literature'],
    Attractions: ['Temples', 'Beaches', 'Mountains', 'Wildlife', 'Cities'],
    Plan: ['Accommodations', 'Travel Agents', 'On roads'],
    Store: ['Arts', 'Crafts', 'Pottery', 'Jewellery', 'Clothes']
  };

  return (
    <>
      <nav className="navbar">
        <img src="./public/assets/logo.jpg" alt="Logo" className="logo" />

        <div className="nav-links">
          {Object.keys(dropdownItems).map((item) => (
            <div
              key={item}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to="about-odisha"
                spy={true}
                smooth={true}
                duration={500}
                offset={-50}
                className="nav-item"
              >
                {item}
              </Link>
              {hoveredItem === item && (
                <div className="dropdown">
                  {dropdownItems[item].map((subItem) => (
                    <div key={subItem} className="dropdown-item">
                      {subItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="user-auth">
          <div className="auth-item" >
            <img src="/assets/notification.png" alt="User" />
            <span>Notifications</span>
          </div>
          <div className="auth-item" onClick={() => setShowAuthPopup(true)}>
            <img src="/assets/login.png" alt="User" />
            <span>Login</span>
          </div>

        </div>
      </nav>
      {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
    </>
  );
};

export default Navbar;