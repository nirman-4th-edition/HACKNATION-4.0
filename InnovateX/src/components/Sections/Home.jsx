import { useEffect, useState } from 'react';
import './Home.css';

const Home = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="home-section">
      {images.map((img, index) => (
        <img 
          key={img}
          src={`/assets/${img}`}
          alt="Background"
          className={`bg-image ${index === currentImage ? 'active' : ''}`}
        />
      ))}
      <div className="home-content">
        <div className="container">
        <h1>Welcome to Odisha</h1>
        <p>
          Discover the land of ancient temples, pristine beaches, and rich cultural heritage.
          Explore the beauty of Odisha through our curated experiences.
        </p>
        </div>
        
      </div>
    </section>
  );
};

export default Home;