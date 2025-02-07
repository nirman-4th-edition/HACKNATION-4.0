import { Link } from 'react-scroll';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const dropdownItems = {
    Home: ['History', 'Culture', 'Climate'],
    'About Odisha': ['Geography', 'Demographics', 'Government'],
    Attractions: ['Temples', 'Beaches', 'Wildlife'],
    Plan: ['Itinerary', 'Hotels', 'Transport'],
    Store: ['Souvenirs', 'Books', 'Handicrafts']
  };

  return (
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
              to={item.toLowerCase().replace(' ', '-')} 
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
        <div className="auth-item">
          <img src="./public/assets/login.png" alt="User" />
          <span>Login</span>
        </div>
        <div className="auth-item">
          <img src="./public/assets/register.png" alt="Register" />
          <span>Register</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;