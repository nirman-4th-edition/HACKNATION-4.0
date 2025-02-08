import React from 'react';
import HotelCard from '../../shared/HotelCard';
import { useLocation } from 'react-router-dom';

// Define the ShowAllHotels component
const ShowAllHotels = () => {
    const location=useLocation()
    console.log(location.state)
    const hotels=location.state;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
};

export default ShowAllHotels;
