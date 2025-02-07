import React from 'react';
import imgCard1 from "./agra_shopping.jpeg";
import imgCard2 from "./besttimetovisit_agra.jpeg";
import imgCard4 from "./agra_food.jpeg"
import imgCard6 from "./agra_dance.jpeg"
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
          text="Once being a home of the Mughals, the city is widely famous for the Mughal cuisines like Kebabs, Kormas and curries that involve curd, cream, nuts, almond and selected spices.\nThe most popular food item of Agra, apart from the famous Mughlai dishes, is the Pethas made from pumpkin and glucose and is popular all over India. \nDal moth is a kind of snack and also one of the specialties of the city."
        />
        <Card1
          heading="ART AND MUSIC"
          text="A variety of colourful festivals are celebrated in this cultural city. Taj Mahotsav held in Shilpgram is a ten-day long festival that hosts an exhibition of crafts, arts, classical song and dance performances. The Islamic festival Id is also celebrated with great enthusiasm in the city."
         src={imgCard6}
          
        />
        <Card1
          heading="SHOPPING"
          text="But another phase of Agra we have to know is shopping world. Yes, Agra is one of the best places in India for shopping. Particularly, handicrafts and souvenirs of Agra are very popular."
          src={imgCard1}
        />
        <Card1
          heading="BEST TIME TO VISIT"
          text="The Winter season in Agra begins in October and extends roughly till March. Pleasant weather and cool breezes make sightseeing a memorable experience. Explore the wonderful heritage and admire timeless monuments at your leisure.\nThe month of January witness Chilly weather and the charm of enjoying a hot cup of tea in some shack with the backdrop of exquisite history and heritage is amazing and without any parallel. Also know best  time to Visit Taj  Mahal ."
          src={imgCard2}
        />
       
      </div>
      
     </div>
    );
  }