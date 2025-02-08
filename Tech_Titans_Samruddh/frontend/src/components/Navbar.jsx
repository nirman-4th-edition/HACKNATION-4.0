import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { handleerror, handlesuccess } from '../utils.jsx';
import { AuthContext } from '../Context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handlenavigation = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      handleerror("Please login to access this page");
    }
    setMenuOpen(false); // Close menu on navigation
  };

  const handlelogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedinuser');
    setIsAuthenticated(false);
    handlesuccess('User Logged Out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
    setMenuOpen(false); // Close menu on logout
  };

  return (
    <>
      <section className="bg-gray-800 text-white fixed top-0 w-full z-50">
        <nav className="container mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
            <img src="./logo.png" className="h-12 transition-transform duration-300 hover:scale-110" alt="Logo" />
            <span>C&D Waste Connect</span>
          </Link>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Nav Links */}
          <ul className={`md:flex md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent ${menuOpen ? 'block' : 'hidden'} md:flex-row md:items-center p-4 md:p-0`}>            
            <li className="hover:bg-gray-700 hover:bg-opacity-50 py-2 px-4 md:px-2 rounded cursor-pointer" onClick={() => handlenavigation('/classifier')}>Classifier</li>
            <li className="hover:bg-gray-700 hover:bg-opacity-50 py-2 px-4 md:px-2 rounded cursor-pointer" onClick={() => handlenavigation('/marketplace')}>Marketplace</li>
            <li className="hover:bg-gray-700 hover:bg-opacity-50 py-2 px-4 md:px-2 rounded cursor-pointer" onClick={() => handlenavigation('/recycling-facilities')}>Recycling Facilities</li>
            <li className="hover:bg-gray-700 hover:bg-opacity-50 py-2 px-4 md:px-2 rounded cursor-pointer" onClick={() => handlenavigation('/about-us')}>About Us</li>
            <li className="hover:bg-gray-700 hover:bg-opacity-50 py-2 px-4 md:px-2 rounded cursor-pointer" onClick={() => handlenavigation('/futureplans')}>Future</li>
            {/* Authentication Section */}
            <li>
              {isAuthenticated ? (
                <div className="flex items-center bg-amber-800 text-white px-4 py-2 rounded-full mt-2 md:mt-0">
                  <img src="/user.png" alt="User Icon" className="ml-2 w-8 h-8 rounded-full" />
                  <button onClick={handlelogout} className='px-4 cursor-pointer'>Logout</button>
                </div>
              ) : (
                <div className="flex items-center bg-amber-800 text-white px-4 py-2 rounded-full mt-2 md:mt-0">
                  <Link to='/signup'>Signup</Link>
                  <img src="/user.png" alt="User Icon" className="ml-2 w-8 h-8 rounded-full" />
                </div>
              )}
            </li>
          </ul>
        </nav>
      </section>
      <ToastContainer />
    </>
  );
};

export default Navbar;
