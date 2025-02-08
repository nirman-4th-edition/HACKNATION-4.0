import React from 'react'

function WildLife() {
  const wildlifes = [
    {
        name: "Barehipani",
        description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
        image: "https://www.odishavisit.com/wp-content/uploads/2021/06/Barehipani-Waterfall.jpg"
      },
    {
      name: "Duduma Waterfalls",
      description: "The highest peak in Odisha, offering breathtaking views.",
      image: "https://www.toursorissa.com/wp-content/uploads/2016/11/duduma-waterfalls.jpg"
    },
    {
      name: "Khandadhar Waterfall",
      description: "A beautiful wildlife sanctuary with dense forests and waterfalls.",
      image: "https://odishatour.in/wp-content/uploads/2021/12/Khandadhar-Waterfall-Sundargarh-Odisha.jpg"
    },
    {
      name: "Joranda Waterfall",
      description: "The largest coastal lagoon in India, Chilika Lake is a paradise for bird watchers and nature lovers.",
      image: "https://odishatour.in/wp-content/uploads/2022/09/baripada-joranda-picnic-spot.jpg"
    },
    {
      name: "Deojhar Waterfall",
      description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
      image: "https://odishatour.in/wp-content/uploads/2022/02/Deojhar-Waterfall-Talapunji-Narasinghpur-Cuttack-2.jpg"
    },
    {
      name: "Devkund Waterfall",
      description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
      image: "https://orissaguide.com/wp-content/uploads/2024/07/Devkund-Temple-Waterfall-8.jpg"
    },
    {
      name: "Rani Duduma Waterfall",
      description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
      image: "https://s7ap1.scene7.com/is/image/incredibleindia/duduma-koraput-odisha-2-attr-hero?qlt=82&ts=1726663694381"
    },
    {
      name: "Harisankar Waterfall",
      description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
      image: "https://static.where-e.com/India/Odisha/Northern_Division/Harishankar-Waterfall-Khaprakhol_e3bebf84cd2881463736b1caf77e1c07.jpg"
    },
    {
      name: "Bhimkund Waterfall",
      description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
      image: "https://pbs.twimg.com/media/DztaKYiUcAIuTUR.jpg"
    },
  ]
  return (
    <div>
      <div>
      <div className="beach-section">
        <h2>Wildlifes</h2>
        <div className="beach-card-container">
          {wildlifes.map((place, index) => (
            <div key={index} className="beach-card">
              <img src={place.image} alt={place.name} />
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default WildLife
