import React from "react";
import "./HomePage.css";
import Footer from "../Footer/Footer.jsx";
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx"

const HomePage = () => {
    return (
        <div>
            <section className="hero">
                <h2>Boost Your Learning with AI</h2>
                <p>Get instant help, summaries, and explanations for your studies.</p>
                <a href="/YoutubeSum" className="cta-button"><Link to="/quiz">Get Started</Link></a>
            </section>
            
            <section id="features" className="features">
                <h2>Features</h2>
                <div className="feature-grid">
                    <div className="feature-item">Smart AI Summarization</div>
                    <div className="feature-item">AI generated mock tests</div>
                    <div className="feature-item">Todo app based on priority</div>
                    <div className="feature-item">Interactive QnA discussion forum</div>
                    <div className="feature-item">Lesson Planner</div>
                    <div className="feature-item center">Focus Mode using Pomodoro technique</div>
                </div>
            </section>
            
            <section id="about" className="about">
                <h2>About StudyBuddy</h2>
                <p>StudyBuddy is designed to make learning easier and more effective using AI-powered tools.</p>
                <Button><Link to="/about">Learn More</Link></Button>
            </section>
            
            <Footer />
        </div>
    );
};

export default HomePage;