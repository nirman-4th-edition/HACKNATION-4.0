import React from "react";
import SectionLayout from "../SectionLayout";
import './Culture.css'
function Culture() {
    return (
        <div>
            <div className="introduction">
                <h1>Cultural heritage</h1>
                <div className="intro-content">
                    <p>Ruled by various kings and dynasties, Odisha has acquired many a traditions in its wake. Thus Odisha can best be defined through its racial and cultural amalgamation that lives through its heritage.</p>
                </div>

            </div>

            <SectionLayout
                title="Music and Dance"
                imageSrc="https://s7ap1.scene7.com/is/image/incredibleindia/odissi-dance-bhubaneshwar-odisha-blog-art-hero?qlt=82&ts=1726663504182"
                description={[
                    "Odisha is renowned for its rich and diverse dance and music traditions, deeply rooted in its cultural and spiritual heritage. The most famous dance form, Odissi, is one of the oldest classical dances of India, dating back over 2,000 years. Known for its graceful movements, sculpturesque poses, and expressive storytelling, Odissi is closely associated with the temples of Odisha, particularly the Jagannath Temple in Puri.","Apart from Odissi, the state has several vibrant folk dance forms, such as Gotipua (performed by young boys dressed as female dancers), Sambalpuri, Chhau, Ghumura, and Dhanu Jatra. These folk dances depict mythological stories, nature, and warrior traditions.","Music in Odisha is equally rich, blending classical, folk, and devotional elements. Odissi music, with its distinctive ragas and talas, is recognized as a classical music form of India. It is deeply connected to Jagannath culture, with devotional songs (Bhajans) dedicated to Lord Jagannath.","Folk music like Dalkhai, Kendra, and Pala narrates epics and local legends, often performed during festivals and social gatherings. Traditional instruments such as the Mardala (percussion), Veena (string instrument), and Flute add a unique rhythm and melody to Odisha’s musical heritage.","From the rhythmic beats of Odissi dance to the soulful tunes of tribal and folk music, Odisha's dance and music traditions continue to enchant audiences worldwide, preserving the essence of its cultural identity. "]} 
            />
            <SectionLayout
                title="Festivals"
                imageSrc="https://c.ndtvimg.com/2024-07/qrfq0ui_rath-yatra_625x300_07_July_24.jpeg"
                description={["Odisha is a land of grand festivals that reflect its deep cultural and spiritual heritage. These celebrations bring people together in joy, devotion, and tradition.","Rath Yatra, held in Puri, is Odisha’s most famous festival. Giant chariots carry Lord Jagannath, Balabhadra, and Subhadra through the streets, with millions of devotees pulling the ropes for blessings. Another major festival is Durga Puja, celebrated with grandeur, especially in Cuttack, known for its stunning silver filigree (Chandi Medha) idols and processions. Devotees worship Goddess Durga with rituals, dance, and music.","Raja Parba is a unique festival that celebrates Mother Earth’s menstruation cycle, symbolizing fertility and renewal. Women enjoy swings, feasts, and folk dances, marking the arrival of the monsoon. Similarly, Dola Purnima is Odisha’s version of Holi, where Lord Krishna’s idol is carried in a decorated palanquin, and people engage in joyous festivities.","Nuakhai is one of the most significant festivals in Western Odisha, where families prepare special rice dishes from freshly harvested crops and seek blessings from elders. Bali Jatra, held in Cuttack, commemorates Odisha’s ancient maritime trade with Indonesia and Sri Lanka. People light boat-shaped lanterns, enjoy cultural performances, and visit the grand fair.","Chaitra Parba is the biggest tribal festival in Mayurbhanj and Keonjhar, showcasing the famous Chhau dance, a traditional masked dance depicting mythological stories. Another unique celebration is Magha Saptami, where devotees gather at Chandrabhaga Beach near the Konark Sun Temple to take a holy dip at sunrise, seeking blessings from the Sun God.","Makara Sankranti marks the harvest season, and people celebrate by preparing Makara Chaula, a dish made from newly harvested rice. The festival is also marked by kite flying and joyous gatherings. Odisha’s festivals are a blend of faith, tradition, and celebration, making them an integral part of the state’s rich cultural heritage."]}
            />
        </div>
    );
}

export default Culture;
