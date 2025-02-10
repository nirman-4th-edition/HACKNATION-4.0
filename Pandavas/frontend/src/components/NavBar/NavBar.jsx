import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <img src="public/img/logo.png" style={{ height:"80px" }}></img>
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
              <Link to="/PDFSum">PDF</Link>
            </li>
            <li>
              <Link to="/WebSum">Web</Link>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <span>Exam</span>
          <ul className="dropdown-content">
            <li>
              <Link to="/quiz">Quiz</Link>
            </li>
            <li>
              <Link to="/grades">Grades</Link>
            </li>
          </ul>
        </li>
        
        <li>
          <Link to="/todo">Todo</Link>
        </li>
        
        <li>
          <Link to="/lessonplan">Lesson Planner</Link>
        </li>
        <li>
          <Link to="/chatbot">BuddyAI</Link>
        </li>
        <li>
          <Link to="/contact">Feedback</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>

        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
