import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import History from './components/Sections/History';
import Culture from './components/Sections/Culture';
import Temples from './components/Sections/Temples'; // Example for Attractions
import ArtandCraft from './components/Sections/ArtandCraft';
import Beach from './components/Sections/Beach';
import Taste from './components/Sections/Taste';
import Tribe from './components/Sections/Tribe';
import Mountain from './components/Sections/Mountain';
import WildLife from './components/Sections/Wildlife';
import City from './components/Sections/City';
import Resorts from './components/Sections/Resorts';
import Hotel from './components/Sections/Hotel';
import Camps from './components/Sections/Camp';
import Oyo from './components/Sections/Oyo';
import TravelAgencies from './components/Sections/TravelAgencies';
import RentalPage from './components/Sections/RentalPage';
import Arts from './components/Sections/Arts';
import Crafts from './components/Sections/Craft';
import Pottery from './components/Sections/Pottery';
import Jewellery from './components/Sections/Jwellery';
import Fabrics from './components/Sections/Fabrics';
import Footer from './components/Sections/Footer';
// import Accommodation from './components/Sections/Accommodation'; // Example for Plan
// import Arts from './components/Sections/Arts'; // Example for Store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/history" element={<History />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/art-and-craft" element={<ArtandCraft />} />
        <Route path="/taste" element={<Taste />} />
        <Route path="/tribe" element={<Tribe />} />
        <Route path="/temples" element={<Temples />} />
        <Route path="/beaches" element={<Beach />} />
        <Route path="/mountains" element={<Mountain />} />
        <Route path="/wildlife" element={<WildLife />} />
        <Route path="/cities" element={< City/>} />
        <Route path="/resort" element={< Resorts/>} />
        <Route path="/hotel" element={< Hotel/>} />
        <Route path="/camp" element={< Camps/>} />
        <Route path="/Oyo" element={< Oyo/>} />
        <Route path="/travel-agents" element={< TravelAgencies/>} />
        <Route path="/on-roads" element={< RentalPage/>} />
        <Route path="/arts" element={< Arts/>} />
        <Route path="/crafts" element={< Crafts/>} />
        <Route path="/pottery" element={< Pottery/>} />
        <Route path="/jewellery" element={< Jewellery/>} />
        <Route path="/clothes" element={< Fabrics/>} />



        {/* <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/arts" element={<Arts />} /> */}
        {/* Add more routes for other cards */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);