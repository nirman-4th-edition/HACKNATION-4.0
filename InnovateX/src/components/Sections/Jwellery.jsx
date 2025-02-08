import React from "react";
import "./Jwellery.css"; // Ensure you create and style this CSS file

const jewelleryData = [
  {
    id: 1,
    name: "Laxmi Maharana",
    product: "Silver Tribal Necklace",
    description: "Handcrafted silver necklace with intricate tribal designs, perfect for traditional occasions.",
    image: "https://i0.wp.com/utkalikaodisha.com/wp-content/uploads/2024/07/11-4.jpg?resize=600%2C600&ssl=1",
  },
  {
    id: 2,
    name: "Biswajit Das",
    product: "Bone Earrings",
    description: "Unique bone earrings with tribal motifs, showcasing the rich cultural heritage of Odisha.",
    image: "https://i.etsystatic.com/7428020/r/il/d9ced5/2191451728/il_570xN.2191451728_94px.jpg",
  },
  {
    id: 3,
    name: "Sunita Pradhan",
    product: "Brass Anklets",
    description: "Traditional brass anklets with tribal patterns, ideal for adding a touch of elegance to your attire.",
    image: "https://www.ostm.in/wp-content/uploads/artefact_images/i02_03_IMGP9712.jpg",
  },
  {
    id: 4,
    name: "Rajesh Mohapatra",
    product: "Beaded Tribal Bracelet",
    description: "Colorful beaded bracelet inspired by tribal art, perfect for everyday wear.",
    image: "https://itokri.com/cdn/shop/files/3E9A1013-Copy-Copy.jpg?v=1728043595&width=1445",
  },
  {
    id: 5,
    name: "Anita Sahoo",
    product: "Silver Nose Ring",
    description: "Exquisite silver nose ring with tribal engravings, a symbol of Odisha's craftsmanship.",
    image: "https://i.etsystatic.com/8734070/r/il/feddf2/6040626421/il_570xN.6040626421_hvy3.jpg",
  },
  {
    id: 6,
    name: "Prakash Rout",
    product: "Conch Shell Bangles",
    description: "Handmade conch shell bangles with tribal designs, a unique addition to your jewellery collection.",
    image: "https://5.imimg.com/data5/KC/VS/QB/SELLER-26189953/img-20200602-080012-500x500.jpg",
  },
];

const Jewellery = () => {
  return (
    <div className="jewellery-page">
      <h1 className="page-title">Kanaka ratna - Jewellery of Odisha</h1>
      <div className="jewellery-container">
        {jewelleryData.map((jeweller) => (
          <div className="jewellery-card" key={jeweller.id}>
            <img src={jeweller.image} alt={jeweller.product} className="jewellery-image" />
            <div className="jewellery-details">
              <h3>{jeweller.name}</h3>
              <h4>{jeweller.product}</h4>
              <p>{jeweller.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jewellery;