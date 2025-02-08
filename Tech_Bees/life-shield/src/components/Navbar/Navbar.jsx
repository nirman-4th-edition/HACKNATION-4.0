import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { logout } from "../../redux/action.js";

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout(user?.role));
  };
  return (
    <nav
      style={{
        display: !user ? "block" : "flex",
        justifyContent: !user ? "space-between" : "center",
        backgroundColor: !user ? "#C7C7CA" : "#17C964",
      }}
    >
      <div
        className="nav-content"
        style={{
          justifyContent: !user ? "space-between" : "center",
        }}
      >
        {!user && (
          <div className="logo">
            <Link
              to="/"
              style={{
                color: !user ? "black" : "white",
              }}
            >
              Lifeshield
            </Link>
          </div>
        )}
        <ul className="nav-links">
          {!user ? (
            <>
              <li>
                <Link
                  to="/"
                  style={{
                    color: !user ? "black" : "white",
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  style={{
                    color: !user ? "black" : "white",
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  style={{
                    color: !user ? "black" : "white",
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{
                    color: !user ? "black" : "white",
                  }}
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  style={{
                    color: !user ? "black" : "white",
                  }}
                >
                  Login
                </Link>
              </li>
            </>
          ) : user?.role === "patient" ? (
            <>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/patient-profile">Profile</Link>
              </li>
              <li>
                <Link to="/appointment">Book Appointment</Link>
              </li>
              <li>
                <Link to="/bc-landing">Breast Cancer</Link>
              </li>
              <li>
                <Link to="/pankrison">Parkinson</Link>
              </li>
              <li>
                <Link to={"/"} onClick={handleClick}>
                  Logout
                </Link>
              </li>
            </>
          ) : user?.role === "doctor" ? (
            <>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/doctor-profile">Profile</Link>
              </li>
              <li>
                <Link to="/appointments">Appointments</Link>
              </li>
              <li>
                <Link to="/" onClick={handleClick}>
                  Logout
                </Link>
              </li>
            </>
          ) : user?.role === "hospital" ? (
            <>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/hospital-profile">Profile</Link>
              </li>
              <li>
                <Link to="/" onClick={handleClick}>
                  Logout
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
