import React from "react";
import "./City.css";
import { h1 } from "framer-motion/client";

const cities = [
    { name: "Bhubaneswar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nGortvs4E97sy6r9B80MhTRQ-JeRAb_Liw&s" },
    { name: "Cuttack", image: "https://s7ap1.scene7.com/is/image/incredibleindia/barabati-fort-cuttack-odisha-attr-about?qlt=82&ts=1726663676960" },
    { name: "Rourkela", image: "https://odishatour.in/wp-content/uploads/2021/03/Hanuman-Vatika-Rourkela-Sundargarh.jpg" },
    { name: "Brahmapur", image: "https://i0.wp.com/www.opindia.com/wp-content/uploads/2022/05/Screenshot-2022-05-19-171315.jpg?ssl=1" },
    { name: "Puri", image: "https://media.istockphoto.com/id/1069137628/photo/top-of-the-jagannath-temple-puri-odisha-india.jpg?s=612x612&w=0&k=20&c=QIj54CAlnD_CKzb1roAVms9f2fdWnqwOb3BMSMvbee4=" },
    { name: "Sambalpur", image: "https://blog.ksom.ac.in/wp-content/uploads/2020/04/hirakud-1024x683.jpg" },
    { name: "Angul", image: "https://odishaheritage.com/wp-content/uploads/2023/09/img02.jpg" },
    { name: "Balasore", image: "https://static.toiimg.com/photo/96028926.cms" },
    { name: "Mayurbhanj", image: "https://mayurbhanj.odisha.gov.in/sites/default/files/styles/medium/public/2023-07/Group%20of%20Elephants.jpg?itok=ZWfV-Ai4" }
];



const City = ({ name, image }) => {
    return (
        <>
            <h1 className="city-heading">Cities Of Odisha</h1>
            <div className="cities-container">
                {cities.map((city, index) => (
                    <div key={index} className="city-card">
                        <img src={city.image} alt={city.name} className="city-image" />
                        <div className="city-overlay">
                            <h2 className="city-name">{city.name}</h2>
                            <a href="#" className="know-more">Know More</a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default City;