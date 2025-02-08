import React from 'react';
import './Sponsors.css';

function Sponsors() {
  return (
    <div className="sponsors">
      <h1 className='sponsors-title'>Our Sponsors</h1>
      <div className="sponsor-slide">
        <img src="./logo1-notesphere.png" alt="Sponsor 1" />
        <img src="./logo1-talentconnect.png" alt="Sponsor 2" />
        <img src="./logo-1-bistro.png" alt="Sponsor 3" />
        <img src="./logo-1-travel.png" alt="Sponsor 4" />
        <img src="./logo-1-beyound.png" alt="Sponsor 5" />
        {/* Add more sponsors as needed */}
      </div>
    </div>
  );
}

export default Sponsors;
