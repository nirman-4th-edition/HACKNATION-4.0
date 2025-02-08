import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Plan.css';

const Plan = ({ background }) => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  const cards = [
    { title: 'Resorts', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/9b/44/ca/nirali-resorts.jpg?w=700&h=-1&s=1', link: '/resort' },
    { title: 'Hotels', image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/620719916.webp?k=616cefe723433fd501f4fe89c7f415ce49822b10d769c7a725f8e35b39be66af&o=', link: '/hotel' },
    { title: 'Camps', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu3rOuNz-4AFb721hAxOChFHaqgDavPiudNQ&s', link: '/camp' },
    { title: 'Oyos', image: '/assets/accommodation.jpg', link: '/oyo' },
    { title: 'Travel Agents', image: '/assets/travel-agents.jpg', link: '/travel-agents' },
    { title: 'On Roads', image: '/assets/roads.jpg', link: '/on-roads' }
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
    setCurrentIndex(prev => prev > 0 ? prev - 1 : cards.length - 3);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < cards.length - 3 ? prev + 1 : 0);
  };

  return (
    <section 
      ref={sectionRef}
      className="section plan-section"
      style={{ backgroundImage: `url(/assets/${background})` }}
    >
      <h1 className={`plan-heading ${isSectionVisible ? 'animate' : ''}`}>
        Plan Your Trip
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

export default Plan;