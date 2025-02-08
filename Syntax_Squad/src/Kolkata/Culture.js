import React from 'react';
import imgCard1 from "./kolkata_shopping.jpg";
import imgCard2 from "./besttimetovisit.jpg";
import imgCard4 from "./kolkata_food.jpg"
import imgCard6 from "./kolkata_dance.jpg"
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
          text="Kolkata - the Cultural Capital of India is a heaven for foodies and especially for people with a sweet tooth. \nBengali sweets are famous and certainly needs no introduction, however; the spicy, tangy and absolutely mouth-watering street food of Kolkata will leave you undecided on whether you like the spicy Bengali cuisine more or the melting flavors of the sweetmeats."
        />
        <Card1
          heading="ART AND MUSIC"
          text="Dokra Metal Craft is one of the most popular forms of art practiced in Bengal. This rare art is the practice of creating statues, idols, jewellery and other pieces with the help of clay, wax and molten metal. \nMany of the Ragas that are native to the classical Bangla music can also be found in the Hindustani classic or Carnatic classical music. The most popular form of Bengali music is the Rabindra Sangeet developed by Noble Laureate Rabindranath Tagore."
         src={imgCard6}
          
        />
        <Card1
          heading="SHOPPING"
          text="Kolkata is not only famous for its wide options of food dishes but is also one of the great places to shop. Shopping places in Kolkata can be extremely fun as the place has so much to offer to its visitors. \nThere isn’t anything that you cannot find in this place. Further, as an advantage for the shoppers, most of the items in the market area of Kolkata are available in the affordable range."
          src={imgCard1}
        />
        <Card1
          heading="BEST TIME TO VISIT"
          text="October-March: Starting from autumn the weather is pleasant and is a great time to visit Kolkata. \n June to September: This is the famous monsoon season of Kolkata when the city experiences heavy showers."
          src={imgCard2}
        />
       
      </div>
      
     </div>
    );
  }