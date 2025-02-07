import React, { useState } from 'react';
import './About.css';

const About = ({ background }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    { 
      title: 'History', 
      image: '/assets/history.jpg',
      link: '#'
    },
    { 
      title: 'Culture', 
      image: '/assets/culture.jpg',
      link: '#'
    },
    { 
      title: 'Art and Craft', 
      image: '/assets/art-craft.jpg',
      link: '#'
    },
    { 
      title: 'Taste', 
      image: '/assets/taste.jpg',
      link: '#'
    },
    { 
      title: 'Tribe', 
      image: '/assets/tribe.jpg',
      link: '#'
    },
    { 
      title: 'Literature', 
      image: '/assets/literature.jpg',
      link: '#'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < cards.length - 3 ? prev + 1 : 0));
  };

  return (
    <section 
      className="section about-section"
      style={{ backgroundImage: `url(/assets/${background})` }}
    >
      <h1 className="about-heading">About Odisha</h1>
      <div className="carousel-container">
        <button className="nav-arrow left" onClick={handlePrev}>
          <img src="/assets/left-arrow.png" alt="Previous" className="arrow-icon" />
        </button>
        
        <div 
          className="carousel"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {cards.map((card, index) => (
            <div key={index} className="card">
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
            </div>
          ))}
        </div>
        
        <button className="nav-arrow right" onClick={handleNext}>
          <img src="/assets/right-arrow.png" alt="Next" className="arrow-icon" />
        </button>
      </div>
    </section>
  );
};

export default About;