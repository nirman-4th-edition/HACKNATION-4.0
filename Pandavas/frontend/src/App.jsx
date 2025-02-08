import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import YouTubeSummarizer from "./components/YouTubeSummarizer/YouTubeSummarizer";
import PdfSummarizer from "./components/PDFSummarizer/PDFSummarizer";
import HomePage from "./components/HomePage/HomePage";
import WebSummarizer from "./components/WebSummarizer/WebSummarizer";
import Quiz from "./components/Quiz/Quiz";
import TakeTest from "./components/TakeTest/TakeTest";  // Import the new component
import Grades from "./components/Grades/Grades";
import Feedback from "./components/Feedback/Feedback";
import Todo from "./components/Todo/Todo";
import Chatbot from "./components/Chatbot/Chatbot";
import LessonPlanner from "./components/LessonPlanner/LessonPlanner";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import Forum from "./components/Forum/Forum";
import About from "./components/About/About";
import Pricing from "./components/Pricing/Pricing";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/YoutubeSum" element={<YouTubeSummarizer />} />
        <Route path="/PDFSum" element={<PdfSummarizer />} />
        <Route path="/WebSum" element={<WebSummarizer />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/take_test" element={<TakeTest />} />  {/* New route */}
        <Route path="/grades" element={<Grades />} />
        <Route path="/contact" element={<Feedback />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/lessonplan" element={<LessonPlanner />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </div>
  );
}

export default App;
