import React from 'react'
import SectionLayout from '../SectionLayout';
import './ArtandCraft.css'
function ArtandCraft() {
    return (
        <div>
            <div className="introduction">
                <h1>Art and Crafts</h1>
                <div className="intro-content">
                    <p>Odisha has a rich artistic heritage. Due to the reign of many different rulers in the past, arts and crafts in Odisha underwent many changes giving an artistic diversity today in the forms of traditional handicrafts, painting and carving and even the literature</p>
                </div>
            </div>
            <SectionLayout
                title="Handicrafts"
                imageSrc="https://odishatourism.gov.in/content/dam/tourism/home/discover/attractions/art-and-crafts/stb/STB1.jpg"
                description={[
                    "Odisha is famous for its exquisite handicrafts, which showcase the artistic brilliance and cultural heritage of the state. The most well-known craft is Pattachitra, a traditional scroll painting that depicts mythological stories and intricate designs. Silver filigree work of Cuttack is another remarkable craft, where artisans create delicate jewelry and decorative items from fine silver wires. Stone carving is an ancient craft seen in temples like Konark and Lingaraj, where skilled artisans sculpt magnificent idols and structures. Applique work of Pipili is widely used in temple decorations and colorful umbrellas, featuring intricate patterns and mirror work. Dhokra metal casting, an ancient tribal art, involves crafting figurines and jewelry using the lost-wax technique. Palm leaf engraving is a unique form of manuscript painting where artists etch stories onto dried palm leaves. Terracotta and pottery from Odisha also hold great cultural significance, with artisans creating beautiful clay sculptures and household items. Cane and bamboo crafts from tribal regions showcase eco-friendly artistry in baskets, furniture, and decorative pieces. Coir products, made from coconut husk, include mats, ropes, and handicrafts that are both durable and artistic. The rich handicraft tradition of Odisha not only preserves the legacy of ancient artisans but also supports thousands of skilled craftsmen across the state."]} 
            />
            <SectionLayout
                title="Literature"
                imageSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Odia_books_in_a_library.jpg"
                description={[
                    "Odisha has a rich literary heritage that dates back over a thousand years, deeply influenced by its culture, traditions, and spirituality. The earliest known work in Odia literature is 'Sarala Mahabharata' by Sarala Das, which is considered one of the first regional adaptations of the Mahabharata. The Panchasakha poets—Balarama Das, Jagannath Das, Achyutananda Das, Ananta Das, and Jasobanta Das—contributed significantly to devotional literature, spreading Bhakti traditions through their writings. Upendra Bhanja, one of the greatest poets of Odisha, was known for his ornamental and lyrical poetry, which showcased rich vocabulary and creativity. In the modern era, Fakir Mohan Senapati revolutionized Odia literature by introducing realism in storytelling, with his novel 'Chha Mana Atha Guntha' highlighting social injustices. Radhanath Ray played a vital role in modern Odia poetry, incorporating Western literary influences while preserving traditional themes. Gopabandhu Das, a writer and freedom fighter, used literature as a tool to inspire nationalism and social reform. Notable contemporary authors like Pratibha Ray, Manoj Das, and Sitakant Mahapatra have taken Odia literature to national and global recognition. In 2014, Odia was officially recognized as a Classical Language of India, marking its historical and literary significance. Today, Odia literature continues to evolve, blending classical influences with modern storytelling while preserving its cultural essence."]}
            />
            <SectionLayout
                title="Architecture"
                imageSrc="https://apps.odishatourism.gov.in/Application/uploadDocuments/TravelTrailDoc/Banner20190819_180358.jpg"
                description={[
                    "Odisha is famous for its stunning architecture, especially its Kalinga style of temple design, known for towering spires, intricate carvings, and grand structures. The Konark Sun Temple, shaped like a giant chariot, is a UNESCO World Heritage Site and a masterpiece of ancient craftsmanship. The Jagannath Temple in Puri is another iconic monument, known for its massive structure and spiritual significance. The Lingaraj Temple in Bhubaneswar, dedicated to Lord Shiva, showcases exquisite stone carvings and towering architecture. The Mukteshwar Temple is admired for its beautifully sculpted archway and detailed artwork. Odisha is also home to ancient Buddhist sites like Dhauli, Ratnagiri, and Lalitgiri, featuring stupas and monasteries. The historical Barabati Fort in Cuttack stands as a symbol of Odisha’s rich past. These architectural wonders highlight the state’s glorious heritage and artistic brilliance."]}
            />
        </div>
    )
}

export default ArtandCraft
