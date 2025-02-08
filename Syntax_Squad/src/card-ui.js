import React from 'react';

import img1 from "./img/RedFort.png"
import img2 from "./img/amber.jpg"
import img3 from "./img/pune.jpeg"
import img4 from "./img/howrah.jpg"
import img5 from "./img/charmainar.jpeg"
import img6 from "./img/Taj_Mahal,_Agra,_India_edit3.jpg"

function Card(props) {
  return (
  
    <div>
      
    <ul>
      <li className="card-container ">
      <img className="card-image" style={{ height: '14rem' }}src={props.src} alt="" />
				
        <div className="card-container--content">
          <h3 className="card-header--title">{props.heading}</h3>
         
         
          <a href={props.link} class="btn btn-outline-warning">
            Explore
          </a>
        </div>
       
      </li>
    </ul>
    </div>

  );
}

export default function CardList(props) {
  return (
    <div>
    
    <div class="container">
  <div class="row">
    <div class="col">
      <Card
        heading="New Delhi"
       src={img1}
       link="/react/NewDelhi"
        
      />
    </div>
    <div class="col">
      <Card
        heading="Jaipur"
       src={img2}
       link="/react/Jaipur"
        
      />
    </div>
    <div class="col">
    <Card
        heading="Pune"
        src={img3}
        link="/react/Pune"
      />
    </div>
  </div>
  <div class="row">
    <div class="col">
    <Card
        heading="Kolkata"
        src={img4}
        link="/react/Kolkata"
      />
    </div>
    <div class="col">
    <Card
        heading="Hyderabad"
       src={img5}
       link="/react/Hyderabad"
        
      />
    </div>
    <div class="col">
    <Card
        heading="Agra"
        
        src={img6}
        link="/react/Agra"
        
      />
    </div>
  </div>
</div>
    <div class="container">
  <div class="row">
    <div class="col">
    
    </div>
    <div class="col">
    
    </div>
    <div class="col">
    
    </div>
  </div>
</div>
      
      
       <div class="container">
  <div class="row">
    <div class="col">
    <div class="col">
    
    </div>
    </div>
    <div class="col">
    
    </div>
    
  </div>
</div>
      
    </div>
  );
}