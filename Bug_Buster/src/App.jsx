// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import AboutPage from "./components/Pages/AboutPage";
import InsightsPage from "./components/Pages/InsigntsPage";
import RemotePage from "./components/Pages/RemotePage";
import ErrorPage from "./components/Pages/404";
import ContactPage from "./components/Pages/ContactPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/insignts" element={<InsightsPage />} />
          <Route path="/Remote" element={<RemotePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
