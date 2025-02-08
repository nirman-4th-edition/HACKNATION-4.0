import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';


function Hero() {
  return (
    <div className="flex flex-col items-center mx-57 gap-9">
      <h1
      className="font-extrabold text-[50px] text-center mt-16">
        <span className='text-[#14a91e]'>Plan Smarter, Travel Better :</span> <br></br> Let AI Craft Your Trip Better !</h1>
        <p className='text-xl text-gray-500 text-center'>Our expert travel architects craft bespoke itineraries that seamlessly blend your passions with your budget, turning every trip into a tailored masterpiece.</p>
        <Link to={'/create-trip'}>
          <Button>Get Started</Button>
        </Link>
        <img src='public/landing page image1.jpg' className='-mt-30 width-[120px] height-[120px]'/>
    </div>
  )
}

export default Hero
