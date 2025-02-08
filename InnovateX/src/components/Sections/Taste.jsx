import React from "react";
import "./Taste.css";

const Taste = () => {
  const sections = [
    {
      title: "Food of the Masses",
      items: [
        {
          title: "Dalma",
          description:
            "Dalma is essentially dal (lentil) cooked with vegetables and spices. A staple in Odia cuisine, it is enjoyed with rice and complements various side dishes.",
          image:
            "https://www.ruchifoodline.com/recipes//cdn/recipes/traditional-odia-dalma.jpg",
        },
        {
          title: "Pakhala",
          description:
            "Pakhala is fermented rice soaked in water and often served with fried or boiled vegetables and fish. It is a cooling dish popular in Odisha during summers.",
          image:
            "https://static.s123-cdn-static-c.com/uploads/2101965/2000_5e741e821a9ee.jpg",
        },
        {
            title: "Santula",
            description:
              "Santula is a traditional Odia dish from Odisha, India. It's a flavorful vegetable stew made with a mix of vegetables, spices, and herbs.",
            image:
              "https://i0.wp.com/myfooddiaries.com/wp-content/uploads/2019/06/2018-08-01-21-16-57-e1561449754496.jpg?resize=437%2C328&ssl=1",
          },
      ],
    },
    {
      title: "Pitha - The Festive Delight",
      items: [
        {
          title: "Chakuli Pitha",
          description:
            "Chakuli Pitha is a soft and thin rice-based pancake, often enjoyed with dal or chutney. It is a common breakfast dish in Odisha.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/d/d5/Chuda_chakuli_pitha.jpg",
        },
        {
          title: "Poda Pitha",
          description:
            "Poda Pitha is a slow-cooked cake made of fermented rice, coconut, and jaggery. It is a must-have during the Raja festival in Odisha.",
          image:
            "https://img-global.cpcdn.com/recipes/b78be578ad1a6bb0/680x482cq70/biri-poda-pitha-recipe-main-photo.jpg",
        },
        {
          title: "Kakara Pitha",
          description:
            "The fried sweet fritter prepared with semolina, grated coconut and cardamom is another popular variant of the Pitha.",
          image:
            "https://www.sangitaskitchen.in/wp-content/uploads/2014/10/Suji-Kakara.jpg",
        },
        {
            title: "Chandrakanti Pitha",
            description:
              "Chandrakanti Pitha is a deep-fried, golden-brown delicacy made from lentil paste and jaggery, offering a crispy and mildly sweet taste.",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Mugakanti%2CChandrakanti.jpg/1200px-Mugakanti%2CChandrakanti.jpg",
          },
          {
            title: "Manda Pitha",
            description:
              "Manda Pitha is a steamed rice dumpling filled with coconut and jaggery, commonly prepared during festivals like Durga Puja and Manabasa Gurubar in Odisha.",
            image:
              "https://mdashf.org/wp-content/uploads/2015/10/manda.jpg",
          },
          {
            title: "Arisa Pitha",
            description:
              "Arisa Pitha is a traditional rice-based sweet, fried to a crisp perfection with jaggery, often enjoyed during special occasions and festive celebrations.",
            image:
              "https://odishatour.in/wp-content/uploads/2024/02/Arisha-Pitha-Recipe.jpg?v=1707234082",
          },
      ],
    },
    {
      title: "Sweets of Odisha",
      items: [
        {
          title: "Chhena Poda",
          description:
            "Chhena Poda is a unique burnt cheesecake-like sweet made of chhena (cottage cheese), sugar, and cardamom, baked until golden brown.",
          image:
            "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/payal-jain41523004616_thumb.jpeg",
        },
        {
          title: "Rasagola",
          description:
            "Odia Rasagola is a spongy, syrupy dessert made of chhena. It has been a traditional sweet of Odisha for centuries and is offered to Lord Jagannath.",
          image:
            "https://shreelaxmisweets.in/wp-content/uploads/2023/06/rasgulla-back.jpg",
        },
        {
            title: "Rasabali",
            description:
              "Rasabali is a traditional Odia sweet dish and a part of Chhapan Bhog offered to Shri Baladevajew, elder brother of Lord Jagannath Puri, Odisha.",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx6tOwMx_srt5zFeNuio-0DsSpWKaUTIjQyw&s",
          },
          {
            title: "Chhena Gaja",
            description:
              "Renowned for its rich taste, delightful texture, and cultural significance, chhena gaja is made from chhena, sugar, and sooji, along with ingredients such as cardamom and saffron.",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqR45o2n3tUKHANmij4tRy5E6b9bzlLddXoQ&s",
          },
      ],
    },
  ];

  return (
    <div>
      <div className="introduction">
        <h1>Taste of Odisha</h1>
        <div className="intro-content">
          <p>
          Odia love food, owing the importance of it in the religious culture of the state.Odia cuisine is very simple yet delicious, prepared in little or no oil which gives out the flavors of the spices that are sparingly used themselves.The spread is vast and is very easy on the palate. Odia love food, owing the importance of it in the religious culture of the state.Odia cuisine is very simple yet delicious, prepared in little or no oil which gives out the flavors of the spices that are sparingly used themselves.The spread is vast and is very easy on the palate.
          </p>
        </div>
        <img src="https://www.odishalifestyle.com/wp-content/uploads/2023/12/Experience-the-Divine-Euphoria-of-Mahaprasad-A-Sacrosanct-Culinary-Delight-scaled.jpg" alt="Mahaprasad image" className="intro-image" />
      </div>
      <div className="taste-container">
        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="taste-heading">{section.title}</h2>
            {section.items.map((item, idx) => (
              <div className="food-item" key={idx}>
                <div className="food-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <img className="food-image" src={item.image} alt={item.title} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Taste;
