import { useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import './App.css';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Home from './components/Sections/Home';
import About from './components/Sections/About';
import Attractions from './components/Sections/Attractions';
import Plan from './components/Sections/Plan';
import Store from './components/Sections/Store';
import Footer from './components/Sections/Footer';
import Chatbot from "./components/Chatbot";
import QuizBot from "./components/QuizBot";

import './components/Navbar.css';
import './components/Sections/Home.css';
import './components/Cursor.css';

const App = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Force initial scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Handle mobile browsers
    const appElement = document.querySelector('.app');
    if (appElement) {
      appElement.scrollTop = 0;
    }

    // Disable initial load flag after first render
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      // Prevent scroll-snap from jumping during initial load
      const appElement = document.querySelector('.app');
      if (appElement) {
        appElement.style.scrollSnapType = 'none';
        setTimeout(() => {
          appElement.style.scrollSnapType = 'y mandatory';
        }, 100);
      }
    }
  }, [isInitialLoad]);

  const sectionBackgrounds = {
    home: ['home1.jpg', 'home2.jpg', 'home3.jpg', 'home4.jpg', 'home5.jpg', 'home6.jpg'],
    about: 'about.jpg',
    attractions: 'attractions.jpg',
    plan: 'plan.jpg',
    store: 'store.jpg',
    footer: 'footer.jpg'
  };

  return (
    <div className="app">
      <Cursor />
      <Navbar />
      
      <Element name="home">
        <Home images={sectionBackgrounds.home} />
      </Element>
      
      <Element name="about-odisha">
        <About background={sectionBackgrounds.about} />
      </Element>

      <Element name="attractions">
        <Attractions background={sectionBackgrounds.attractions} />
      </Element>

      <Element name="plan">
        <Plan background={sectionBackgrounds.plan} />
      </Element>

      <Element name="store">
        <Store background={sectionBackgrounds.store} />
      </Element>

      <Element name="important links">
        <Footer background={sectionBackgrounds.footer} />
      </Element>
      <QuizBot />
      <Chatbot />
    </div>
  );
};

export default App;