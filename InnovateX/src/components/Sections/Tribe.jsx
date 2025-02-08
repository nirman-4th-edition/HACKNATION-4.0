import React from "react";
import "./Tribe.css";

const tribes = [
  {
    name: "Bonda",
    description:
      "The Bonda tribe, one of Odisha’s most ancient and isolated communities, resides in the Malkangiri district. They are known for their unique clothing, where women wear heavy bead necklaces and minimal attire. Their language, 'Remo,' belongs to the Austroasiatic family. The Bondas practice shifting cultivation and depend on forest resources for their livelihood. They follow a matriarchal society where women play a significant role in decision-making.",
    imageUrl: "https://thespace.ink/wp-content/uploads/2023/10/A-scaled-1.jpg",
  },
  {
    name: "Gond",
    description:
      "he Gond tribe is one of the largest tribal groups in India, with a significant population in Odisha. They are renowned for their vibrant folklore, myths, and traditional art, especially Gond paintings. The Gonds follow Hinduism but also worship nature, spirits, and ancestors. Their social structure includes clan-based living, with strong cultural traditions passed down generations. They celebrate festivals like Keslapur Jatra with music, dance, and rituals.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQjyVca9m7jUGWNieXbz_W2HIBCTgS5qkFFg&s",
  },
  {
    name: "Santhals",
    description:
      "Santhals are among the most culturally rich tribes in Odisha, primarily inhabiting the Mayurbhanj and Keonjhar districts. They have a deep connection with nature and rely on agriculture and forest resources. Santhali dance and music, accompanied by traditional instruments like the 'Tumdak' and 'Tamak' are an integral part of their identity. The Santhals have their own script, 'Ol Chiki,' which preserves their linguistic heritage. They celebrate the Sohrai festival, marking their gratitude for nature and livestock.",
    imageUrl:
      "https://d18x2uyjeekruj.cloudfront.net/wp-content/uploads/2022/06/sntl.jpg",
  },
  {
    name: "Kutia Khond",
    description:
      "Kutia Kondhs are a sub-group of the larger Kondh community, primarily found in the Kandhamal district. They are known for their distinct body tattooing practices, symbolizing cultural identity and social status. The tribe follows animistic beliefs, worshiping nature and spirits through elaborate rituals. Their traditional houses are made of bamboo and mud, blending with their forest surroundings. Kutia Kondhs practice sustainable agriculture, growing millets, pulses, and medicinal plants.",
    imageUrl:
      "https://uploads-ssl.webflow.com/6035572bd61c394bbb3084aa/6035572bd61c39285630894a_YEWLUH777bC-9Yh3_xZUS4hl6t54Z9BvSUzjPtFVwL2x2DzJjvxpaGcYaXR7mdLmsB78OsWAhGCiQrpCHZ84GWOaIySVNxY4fMJckKe2maF076XL_KXEnyZUO2kZUPlgZnumTiz5.jpeg",
  },
  {
    name: "Kharias",
    description:
      "The Kharias are a forest-dwelling tribe found in Sundargarh and Mayurbhanj districts of Odisha. They depend on collecting forest produce, hunting, and minor agricultural activities for survival. The tribe speaks the Kharia language, which belongs to the Austroasiatic family. Animism is deeply embedded in their religious beliefs, and they worship nature, spirits, and ancestors. Their vibrant dance and music traditions reflect their rich cultural heritage and social unity.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Kharia_Tribal_ladies.jpg/800px-Kharia_Tribal_ladies.jpg",
  },
];

const Tribe = () => {
  return (
    <div className="tribe-list">
      <div className="tribe-intro">
        <h1>Tribes of Odisha</h1>
        <p className="tribe-para">Odisha is home to more than 60 indigenous tribes, each with its unique culture, traditions, and lifestyle. These tribes primarily reside in forested and hilly regions, relying on agriculture, hunting, and forest produce for their livelihood. Many tribal communities, such as the Santhals, Gonds, and Bondas, have preserved their traditional dance, music, and festivals over centuries. Tribal art, including intricate handicrafts, body tattooing, and vibrant paintings, reflects their deep connection with nature. Despite modernization, Odisha’s tribes continue to uphold their rich heritage, contributing to the state's diverse cultural landscape.</p>
      </div>

      {tribes.map((tribe, index) => (
        <div key={index} className="tribe-item">
          <img src={tribe.imageUrl} alt={tribe.name} className="tribe-image" />
          <div className="tribe-info">
            <h2>{tribe.name}</h2>
            <p>{tribe.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tribe;
