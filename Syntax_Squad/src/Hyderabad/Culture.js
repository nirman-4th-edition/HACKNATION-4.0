import React from 'react';
import imgCard1 from "./hyderabad_shopping.jpeg";
import imgCard2 from "./besttimetovisit_hyderabad.jpeg";
import imgCard4 from "./hyderabad_food.jpeg"
import imgCard6 from "./hyderabad_dance.jpeg"
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
          text="Hyderabadi cuisine, also known as Deccani cuisine, is the native cooking style of the Hyderabad, the haute cuisine of Hyderabad began to develop after the foundation of the Bahmani Sultanate, and the Qutb Shahi dynasty centered in the city of Hyderabad promoted the native cuisine along with their own."
        />
        <Card1
          heading="ART AND MUSIC"
          text="Hyderabad is a famous city for its performing arts and its rich legacy in dance and music. Hyderabad is an important seat of Carnatic music. Several important gurus of the Carnatic music are from the city of Hyderabad. Apart from the classical music, the city populace also enjoys popular numbers from Hindi, Telegu and Tamil movies.  Varied classical dance forms such as Kuchipudi, and Perini are also performed by the accomplished dancers in the city."
         src={imgCard6}
          
        />
        <Card1
          heading="SHOPPING"
          text="Koti Market also known as the Residency Market during the British rule in India, the Koti Sultan Bazaar is the hub for latest fashions in women’s clothing when it comes to street shopping in Hyderabad. Be it silver junk jewellery, dazzling footwear, bags, an array of women’s clothing; you will find it all here and are bound to find something that attracts you immensely."
          src={imgCard1}
        />
        <Card1
          heading="BEST TIME TO VISIT"
          text="Hyderabad has a warmer climate and hence cooler months, i.e. October to March are considered ideal to visit the city."
          src={imgCard2}
        />
       
      </div>
      
     </div>
    );
  }