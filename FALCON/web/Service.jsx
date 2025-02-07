// src/Service.js
import React from 'react';
import '../style/service.css'; // Import CSS for styling
import NavBar from './Navbar';

const servicesData = [
  {
    title: 'Service One',
    description: 'Description of Service One. This service provides excellent value and quality.',
  },
  {
    title: 'Service Two',
    description: 'Description of Service Two. This service is designed to meet your needs effectively.',
  },
  {
    title: 'Service Three',
    description: 'Description of Service Three. Experience the best with our top-notch service.',
  },
];

const Service = () => {
  return <>
  
  <NavBar></NavBar>
    <div className="service-container">
      <h1>Our Services</h1>
      <div className="service-list">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    
    </>
};

export default Service;