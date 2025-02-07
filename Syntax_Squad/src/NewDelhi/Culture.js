import React from 'react';
import imgCard1 from "./delhi_shopping.jpg";
import imgCard2 from "./besttimetovisit.jpg";
import imgCard4 from "./delhi_food.jpg"
import imgCard6 from "./delhi_dance.jpg"
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
          text="No visit to Delhi is complete without an experience of its famed specialties such as its delicious curries, barbecued tikkas and kebabs. Delhi and Delhi-ites are known as much for their insatiable appetites as they are for the unending variety of food found in the city. Any cuisine, Indian or international, you name it, we have it. But what really captures the essence of the city is the street food that changes colour and taste but gets only better with discovering the city."
        />
        <Card1
          heading="ART AND MUSIC"
          text="Whether it's Western genres, like jazz and rock, melodious Bollywood tunes or classical forms like qawwali, Delhi's music scene has developed from a wide range of inspirations."
         src={imgCard6}
          
        />
        <Card1
          heading="SHOPPING"
          text="Shopping is always on the top of the wish list for any tourist visiting Delhi. Shopping in Delhi is famous not only for its high-end designer malls and classy boutiques, but you will also encounter several wholesale markets, vibrant bazaars, and roadside flea markets while in the city. Delhi offers you a wide variety of options from accessories and fashion apparel to home decor products and imported food. With their entertaining budgets, tastes, and preferences, these shopping hubs serve everyone."
          src={imgCard1}
        />
        <Card1
          heading="BEST TIME TO VISIT"
          text="The best time to visit Delhi is from October to March when the weather is at its best. During this period flowers are at their blooming best, the weather is pleasent and enjoyable to experience Incredible Delhi."
          src={imgCard2}
        />
       
      </div>
      
     </div>
    );
  }