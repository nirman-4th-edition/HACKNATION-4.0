import React from "react";
import "./Pottery.css"; // Ensure you create and style this CSS file

const potteryData = [
  {
    id: 1,
    name: "Ramesh Patra",
    product: "Terracotta Pots",
    description: "Handcrafted terracotta pots perfect for plants, home decor, and traditional rituals.",
    image: "https://images.pexels.com/photos/19035171/pexels-photo-19035171.jpeg?cs=srgb&dl=pexels-swastikarora-19035171.jpg&fm=jpg",
  },
  {
    id: 2,
    name: "Sunita Das",
    product: "Clay Sculptures",
    description: "Exquisite clay sculptures depicting Odisha's culture, gods, and goddesses.",
    image: "https://c1.wallpaperflare.com/preview/272/118/438/clay-sculpture-pottery-khmer.jpg",
  },
  {
    id: 3,
    name: "Manoj Nayak",
    product: "Earthen Lamps",
    description: "Traditional earthen lamps used for Diwali and other festivals, made with natural clay.",
    image: "https://c1.wallpaperflare.com/preview/595/75/637/earthen-lamps-diya-deepa-deepak.jpg",
  },
  {
    id: 4,
    name: "Priya Mohanty",
    product: "Decorative Vases",
    description: "Beautifully crafted clay vases for home decor, available in various designs and sizes.",
    image: "https://4.imimg.com/data4/HD/SX/ANDROID-31669432/product.jpeg",
  },
  {
    id: 5,
    name: "Anita Sahoo",
    product: "Kitchenware",
    description: "Eco-friendly clay kitchenware, including pots, pans, and utensils, perfect for healthy cooking.",
    image: "https://shivshaktiarts.in/cdn/shop/products/PUJATHALISET7PCS-2_e4f55aef-72be-48b3-854b-6d8d5690a07a_2048x.jpg?v=1647934374",
  },
  {
    id: 6,
    name: "Prakash Rout",
    product: "Temple Sculptures",
    description: "Handmade clay sculptures of deities and temple structures, ideal for religious and decorative purposes.",
    image: "https://www.worldhistory.org/image/11649/sculptures-at-konarak-sun-temple/download/",
  },
];

const Pottery = () => {
  return (
    <div className="pottery-page">
      <h1 className="page-title">Mati Shilpa - Pottery of Odisha</h1>
      <div className="pottery-container">
        {potteryData.map((potter) => (
          <div className="pottery-card" key={potter.id}>
            <img src={potter.image} alt={potter.product} className="pottery-image" />
            <div className="pottery-details">
              <h3>{potter.name}</h3>
              <h4>{potter.product}</h4>
              <p>{potter.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pottery;