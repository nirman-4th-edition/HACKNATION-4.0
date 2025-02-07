import { Link } from "react-router-dom";
import "./HomePage.css"; // Optional, for custom styling

function HomePage() {
    return (
        <div className="home-page-container">
            <h1>Welcome to the Summarizer App</h1>
            <p>Choose a summarizer tool below to get started:</p>
            <div className="home-links">
                <Link to="/YoutubeSum" className="home-link">YouTube Summarizer</Link>
                <Link to="/PDFSum" className="home-link">PDF Summarizer</Link>
                <Link to="/WebSum" className="home-link">Web Page Summarizer</Link>
                <Link to="/quiz" className="home-link">Quiz</Link>
            </div>
        </div>
    );
}

export default HomePage;
