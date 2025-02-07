import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <img style={{height:"80px"}} src="../../../public/logo/StudyBuddy.png" />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="dropdown">
          <span>Summarization</span>
          <ul className="dropdown-content">
            <li>
              <Link to="/YoutubeSum">YouTube</Link>
            </li>
            <li>
              <Link to="/WebSum">Web</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/lessonplan">Lesson Planner</Link>
        </li>
        <li className="dropdown">
          <span>Productivity</span>
          <ul className="dropdown-content">
            <li>
              <Link to="/pomodoro">Focus Mode</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/contact">Feedback</Link>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
