import React from "react";
import "./Craft.css"; // Ensure you create and style this CSS file

const craftsData = [
  {
    id: 1,
    name: "Laxmi Maharana",
    craft: "Tassar Silk Weaving",
    description: "A traditional craft of Odisha where fine Tassar silk is woven into beautiful sarees and fabrics, known for their elegance and durability.",
    image: "https://cdn.shopaccino.com/nirguna/products/tri3dnirguna-sarees-202304104allset0nomofolded32023-4-10-15-34-471600x2400-832888_l.jpg?v=526",
  },
  {
    id: 2,
    name: "Biswajit Das",
    craft: "Horn Work",
    description: "A unique craft where buffalo horns are carved into intricate jewelry, decorative items, and utensils, showcasing Odisha's artistry.",
    image: "https://www.indoscraft.com/media/uploads/product/thumbs/1692009012_211.jpg",
  },
  {
    id: 3,
    name: "Sunita Pradhan",
    craft: "Terracotta Pottery",
    description: "An ancient craft where clay is molded into beautiful pots, sculptures, and decorative items, reflecting Odisha's rich cultural heritage.",
    image: "https://cdn.pixabay.com/photo/2023/05/29/18/10/pottery-8026823_1280.jpg",
  },
  {
    id: 4,
    name: "Rajesh Mohapatra",
    craft: "Coir Craft",
    description: "A sustainable craft where coconut coir is used to create eco-friendly mats, baskets, and home decor items.",
    image: "https://i.pinimg.com/736x/d6/ec/54/d6ec542f6be6a46ba769399deb77913a.jpg",
  },
  {
    id: 5,
    name: "Anita Sahoo",
    craft: "Jute Products",
    description: "A traditional craft where jute fibers are woven into bags, wall hangings, and other decorative items, promoting eco-friendly living.",
    image: "https://www.dhokrahandicrafts.com/images/bag-13.jpg",
  },
  {
    id: 6,
    name: "Prakash Rout",
    craft: "Wood Carving",
    description: "A skilled craft where wood is intricately carved into statues, furniture, and decorative pieces, showcasing Odisha's craftsmanship.",
    image: "https://i0.wp.com/www.craftsodisha.com/wp-content/uploads/2017/11/p00486_0299-Konark-wheel-soap-stone-sculpture-for-home-decor.jpg",
  },
];

const Crafts = () => {
  return (
    <div className="crafts-page">
      <h1 className="page-title">Shilpa Utkala - Crafts of Odisha</h1>
      <div className="crafts-container">
        {craftsData.map((craftsman) => (
          <div className="craft-card" key={craftsman.id}>
            <img src={craftsman.image} alt={craftsman.craft} className="craft-image" />
            <div className="craft-details">
              <h3>{craftsman.name}</h3>
              <h4>{craftsman.craft}</h4>
              <p>{craftsman.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crafts;