import React from 'react'
import './Beach.css'
function Beach() {
    const destinations = [
        {
            name: "Gopalpur Beach",
            description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
            image: "https://res.cloudinary.com/simplotel/image/upload/x_0,y_32,w_620,h_349,r_0,c_crop/q_80,w_900,dpr_1,f_auto,fl_progressive,c_limit/mayfair-hotels-resorts/b-gopalpur-beach_f7efhl"
          },
        {
          name: "Puri Beach",
          description: "The highest peak in Odisha, offering breathtaking views.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGA4NAu3OgvO4kPAPhunE1Gh6pDyhMPlzeKA&s"
        },
        {
          name: "Chandipur Beach",
          description: "A beautiful wildlife sanctuary with dense forests and waterfalls.",
          image: "https://arpitabeachresort.in/be/admin/img/nearby/chandipur-beach.jpg"
        },
        {
          name: "Paradip Beach",
          description: "The largest coastal lagoon in India, Chilika Lake is a paradise for bird watchers and nature lovers.",
          image: "https://odishatour.in/wp-content/uploads/2021/08/Paradip-Sea-beach-Nehru-bangla-jagatsinghpur-3.jpg"
        },
        {
          name: "Chandrabhaga Beach",
          description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
          image: "https://ruchiraroychowdhury.wordpress.com/wp-content/uploads/2017/03/chandrabhaga-sea-beach-1.jpg?w=1200"
        },
        {
          name: "Dhamara Beach",
          description: "A hidden gem in Odisha, Deojhar Waterfall is a stunning spot for trekking and picnics.",
          image: "https://orissaguide.com/wp-content/uploads/2023/12/Bagda-Sea-Beach-Dublagadi-Balasore_0000s_0008_Layer-3.jpg"
        },
      ];
  return (
    <div>
      <div className="beach-section">
        <h2>Beaches</h2>
        <div className="beach-card-container">
          {destinations.map((place, index) => (
            <div key={index} className="beach-card">
              <img src={place.image} alt={place.name} />
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Beach
