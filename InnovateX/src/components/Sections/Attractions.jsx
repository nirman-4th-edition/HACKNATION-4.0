import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Attractions.css';

const Attractions = ({ background }) => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  const cards = [
    { title: 'Temples', image: '/assets/temples.jpg', link: '/temples' },
    { title: 'Beaches', image: '/assets/beaches.jpg', link: '/beaches' },
    { title: 'Mountains', image: '/assets/mountains.jpg', link: '/mountains' },
    { title: 'Wildlife', image: '/assets/wildlife.jpg', link: '/wildlife' },
    { title: 'Cities', image: '/assets/cities.jpg', link: '/cities' }
  ];

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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < cards.length - 3 ? prev + 1 : 0));
  };

  return (
    <section
      ref={sectionRef}
      className="section attractions-section"
      style={{ backgroundImage: `url(/assets/${background})` }}
    >
      <h1 className={`attractions-heading ${isSectionVisible ? 'animate' : ''}`}>
        Attractions
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

export default Attractions;