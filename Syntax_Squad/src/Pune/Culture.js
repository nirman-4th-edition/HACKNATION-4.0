import React from 'react';
import imgCard1 from "./pune_shopping.jpg";
import imgCard2 from "./besttimetovisit_pune.jpg";
import imgCard4 from "./pune_food.jpg"
import imgCard6 from "./pune_dance.jpg"
import ShowMoreText from 'react-show-more-text';
 
function Card1(props) {
    return (
    
      <div>
        <br/>
      <ul>
        <div className="card" >
        <h3 className="card-header--title">{props.heading}</h3>
        <img className="card-image" style={{ height: '15rem' }}src={props.src} alt="" />
                  
          <div className="card-container--content">
  
            
            <p class="card-text">
              <p align="left">
            <ShowMoreText
                  
                  lines={3}
                  more='Show more'
                  less='Show less'
                  className='content-css'
                  anchorClass='my-anchor-css-class'
                  
                  expanded={false}
                  width={280}
              >
          
        {props.text.split("\\n").map(line => (<p>{line}</p>))}
        </ShowMoreText>
        </p>
        
         </p>
         
           </div>
         
        </div>
      </ul>
      </div>
  
    );
  }
  
  export default function CardList1(props) {
    return (
      <div>
      <div className="card-masonry">
        <Card1
          heading="FOOD"
          
          src={imgCard4}
          text="From local Maharashtrian street food like vada pav, misal pav ,and bhel to the most sophisticated continental food, 
          Pune has it all on offer. \nBut while in Pune make sure to try a typical Pune meal that consists of bhakri-pitla. \nSpecial foods like soonth panak, puran poli, coconut potali, karanji and chakli are favorites of Maharashtrians during festivals."
        />
        <Card1
          heading="ART AND MUSIC"
          text="Pune exemplifies an indigenous Marathi culture and ethos, in which education, arts and crafts, and theatres are given due prominence.Pune is the seat of North Indian Classical music."
         src={imgCard6}
          
        />
        <Card1
          heading="SHOPPING"
          text="Pune, often called the cultural capital of Maharashtra, is a city that exemplifies a lifestyle that is cosmopolitan, yet rooted in its years-old heritage. Pune offers a wide variety of things to do. Shopping is part of any travel experience, and Pune has a flourishing shopping scene, defined by the most luxurious shopping malls and elegant retail stores as well as budget street markets."
          src={imgCard1}
        />
        <Card1
          heading="BEST TIME TO VISIT"
          text="Well, the months of October to February is the ideal time to visit Pune as the climate is pleasant with cool and humid atmosphere and makes it perfect for sightseeing."
          src={imgCard2}
        />
       
      </div>
      
     </div>
    );
  }