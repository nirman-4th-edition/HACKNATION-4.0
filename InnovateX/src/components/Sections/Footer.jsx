import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  const links = {
    "About Odisha": ["History", "Culture", "Art & Craft", "Taste", "Tribe", "Literature"],
    "Attractions": ["Temples", "Beaches", "Wildlife", "Mountains", "Cities"],
    "Plan": ["Accommodation", "Travel Agents", "Transport", "Itinerary"],
    "Store": ["Arts", "Crafts", "Pottery", "Jewellery", "Clothes"]
  };

  const emergencyContacts = [
    "Police: 100",
    "Ambulance: 108",
    "Fire: 101",
    "Tourist Helpline: 1363"
  ];

  const socialMedia = [
    { name: "Facebook", icon: faFacebook, link: "#" },
    { name: "Twitter", icon: faTwitter, link: "#" },
    { name: "Instagram", icon: faInstagram, link: "#" },
    { name: "YouTube", icon: faYoutube, link: "#" }
  ];

  return (
    <section className="section footer-section">
      <div className="footer-content">
        <div className="footer-column logo-section">
          <img src="/assets/logo.jpg" alt="Website Logo" className="footer-logo" />
          <div className="emergency-contacts">
            <h3>Emergency Contacts</h3>
            {emergencyContacts.map((contact, index) => (
              <p key={index}>{contact}</p>
            ))}
          </div>
        </div>

        {Object.entries(links).map(([category, items]) => (
          <div className="footer-column" key={category}>
            <h3>{category}</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  <a 
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                    className="footer-link"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-column social-media">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            {socialMedia.map((platform, index) => (
              <a 
                key={index} 
                href={platform.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={platform.icon} className="social-icon" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;