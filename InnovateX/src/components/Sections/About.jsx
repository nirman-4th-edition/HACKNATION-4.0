import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './About.css';

const About = ({ background }) => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    {
      title: 'History',
      image: '/assets/history.jpg',
      link: '/history' // Link to History page
    },
    {
      title: 'Culture',
      image: '/assets/culture.jpg',
      link: '/culture' // Link to Culture page
    },
    {
      title: 'Art and Craft',
      image: '/assets/art-craft.jpg',
      link: '/art-and-craft' // Link to Art and Craft page
    },
    {
      title: 'Taste',
      image: '/assets/taste.jpg',
      link: '/taste' // Link to Taste page
    },
    {
      title: 'Tribe',
      image: '/assets/tribe.jpg',
      link: '/tribe' // Link to Tribe page
    },
    {
      title: 'Literature',
      image: '/assets/literature.jpg',
      link: '/literature' // Link to Literature page
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
      ref={sectionRef}
      className="section about-section"
      style={{ backgroundImage: `url(/assets/${background})` }}
    >
      <h1 className={`about-heading ${isSectionVisible ? 'animate' : ''}`}>
        About Odisha
      </h1>      
      <div className="carousel-container">
        <button className="nav-arrow left" onClick={handlePrev}>
          <img src="/assets/left-arrow.png" alt="Previous" className="arrow-icon" />
        </button>

        <div
          className="carousel"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {cards.map((card, index) => (
            <Link to={card.link} key={index} className="card">
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
            </Link>
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