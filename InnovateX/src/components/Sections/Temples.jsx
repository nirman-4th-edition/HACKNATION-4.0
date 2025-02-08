import React from 'react'

function Temple() {
  const temples = [
    {
        name: "Puri Temple",
        description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
        image: "https://media.istockphoto.com/id/1069137628/photo/top-of-the-jagannath-temple-puri-odisha-india.jpg?s=612x612&w=0&k=20&c=QIj54CAlnD_CKzb1roAVms9f2fdWnqwOb3BMSMvbee4="
      },
    {
      name: "Konark Sun Temple",
      description: "The highest peak in Odisha, offering breathtaking views.",
      image: "https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk="
    },
    {
      name: "Lingaraj Temple",
      description: "A beautiful wildlife sanctuary with dense forests and waterfalls.",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Lingaraj_temple_Bhubaneswar.jpg"
    },
    {
      name: "Mukteswar Temple",
      description: "The largest coastal lagoon in India, Chilika Lake is a paradise for bird watchers and nature lovers.",
      image: "https://bhubaneswartourism.in/images/places-to-visit/headers/mukteswara-temple-bhubaneswar-tourism-entry-fee-timings-holidays-reviews-header.jpg"
    },
    {
      name: "Taratarini Temple",
      description: "A pristine and less crowded beach known for its golden sands, calm waves, and old lighthouse.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUhnSP8hIhvRO6RNtbm1eo-NzVF5AViJ45w&s"
    },
    {
      name: "Maa Samaleswari Temple",
      description: "A hidden gem in Odisha, Deojhar Waterfall is a stunning spot for trekking and picnics.",
      image: "https://www.odishalifestyle.com/wp-content/uploads/2023/07/EfmnpHmVoAAJVSk.jpg"
    },
    {
      name: "Alarnath Temple",
      description: "A hidden gem in Odisha, Deojhar Waterfall is a stunning spot for trekking and picnics.",
      image: "https://orissaguide.com/wp-content/uploads/2024/11/Alarnath-Temple-Brahmagiri-6.jpg"
    },
    {
      name: "Baldevjew Temple",
      description: "A hidden gem in Odisha, Deojhar Waterfall is a stunning spot for trekking and picnics.",
      image: "https://indiano.travel/wp-content/uploads/2024/08/Sri-Baladevjew-Temple-Feature-Image-.jpg"
    },
    {
      name: "Ghatagaon Tarini Temple",
      description: "A hidden gem in Odisha, Deojhar Waterfall is a stunning spot for trekking and picnics.",
      image: "https://pragativadi.com/core/uploads/2021/08/TARINI-TEMPLE-2.png"
    },
  ];
  return (
    <div>
      <div className="beach-section">
        <h2>Temples</h2>
        <div className="beach-card-container">
          {temples.map((place, index) => (
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

export default Temple
