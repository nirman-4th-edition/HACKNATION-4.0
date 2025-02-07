import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import YouTubeSummarizer from "./components/YouTubeSummarizer/YouTubeSummarizer";
import HomePage from "./components/HomePage/HomePage";
import WebSummarizer from "./components/WebSummarizer/WebSummarizer";
import Feedback from "./components/Feedback/Feedback";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import LessonPlanner from "./components/LessonPlanner/LessonPlanner";

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/YoutubeSum" element={<YouTubeSummarizer />} />
        <Route path="/WebSum" element={<WebSummarizer />} />
        <Route path="/contact" element={<Feedback />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/lessonplan" element={<LessonPlanner />} />
      </Routes>
    </div>
  );
}

export default App;
