import React from 'react';
import imgCard1 from "./jaipur_shopping.jpeg";
import imgCard2 from "./besttimetovisit_jaipur.jpeg";
import imgCard4 from "./jaipur_food.jpeg"
import imgCard6 from "./jaipur_dance.jpeg"
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
          text="You will find daal (lentil curry), Bati (baked round bread topped with a dollop of ghee), Churma (dessert), Kheer & Sangri (fried version of dried veggie), Gatte ki sabzi (curry) and all typical Rajasthani dishes and the fun of food get doubled here with village ambience."
        />
        <Card1
          heading="ART AND MUSIC"
          text="Jaipur is a shoppers' elysium. You can find many different kinds of handicrafts, jewelry, fabrics and even carpets here. Jaipur represents the rich and vibrant lifestyle and tradition of Rajasthan. It offers the best traditional Rajasthani art work and textiles from this city are world famous. They have different types of products like tie-n-dye and bandhej sarees, kurtas and dress materials. These products are most popular for their patterns and designs."
         src={imgCard6}
          
        />
        <Card1
          heading="SHOPPING"
          text="Jaipur is also famous for its jewelry which is a beautiful combination of traditional and contemporary styles with Thewa and Kundan being the most popular"
          src={imgCard1}
        />
        <Card1
          heading="BEST TIME TO VISIT"
          text="Jaipur has a warm climate but October to March can be described as the best time to visit the pink city. In the summer months of April to June, average daily temperature remains around 35 degree Calcius in Jaipur. May and June are the hottest months in Jaipur. Temperature reaches up to 40-45 degree Calcius in these months."
          src={imgCard2}
        />
       
      </div>
      
     </div>
    );
  }