import React from "react";
import "./Art.css"; // Ensure you create and style this CSS file

const artsData = [
  {
    id: 1,
    name: "Sudhakar Behera",
    art: "Pattachitra Painting",
    description: "A traditional cloth-based scroll painting that depicts mythological stories with intricate details.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRenU0tL_PtoKiyJPQP-1m_0lBgoVp8CEnPIw&s",
  },
  {
    id: 2,
    name: "Anjali Das",
    art: "Palm Leaf Engraving",
    description: "A unique art form where stories are engraved on dried palm leaves, preserving heritage and culture.",
    image: "https://i.pinimg.com/736x/1e/55/66/1e556685f3fb524633116960cdd4608b.jpg",
  },
  {
    id: 3,
    name: "Manoj Nayak",
    art: "Dhokra Metal Art",
    description: "A lost-wax metal casting technique that creates stunning tribal and folk figurines.",
    image: "https://housenama.com/cdn/shop/articles/the-art-of-dhokra-handmadeinindia-housenama.jpg?v=1720862777",
  },
  {
    id: 4,
    name: "Priya Mohanty",
    art: "Stone Carving",
    description: "An ancient art that transforms stones into exquisite sculptures and temple architecture.",
    image: "https://images.pexels.com/photos/27023255/pexels-photo-27023255/free-photo-of-temple.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    name: "Ramesh Patra",
    art: "Applique Work",
    description: "A fabric art where intricate patterns are stitched to create decorative wall hangings and canopies.",
    image: "https://www.shutterstock.com/image-vector/pipili-chandua-design-odisha-600nw-2139367581.jpg",
  },
  {
    id: 6,
    name: "Sneha Rath",
    art: "Silver Filigree",
    description: "A delicate jewelry-making craft where fine silver threads are shaped into artistic designs.",
    image: "https://3.imimg.com/data3/SQ/BB/MY-3848939/silver-filigree-odissi-dance-ornaments-500x500.jpg",
  },
];

const Arts = () => {
  return (
    <div className="arts-page">
      <h1 className="page-title">Kala Utkala - Art of Odisha</h1>
      <div className="arts-container">
        {artsData.map((artist) => (
          <div className="art-card" key={artist.id}>
            <img src={artist.image} alt={artist.art} className="art-image" />
            <div className="art-details">
              <h3>{artist.name}</h3> {/* Fixed the typo here */}
              <h4>{artist.art}</h4>
              <p>{artist.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Arts;