    
// import React, { useState, useEffect } from 'react'
// import CommonSection from '../../shared/CommonSection'
import "../../styles/tour.css"
// import Tourcard from '../../shared/Tourcard'
// // import SearchBar from '../../shared/SearchBar'
// // import Newsletter from '../../shared/Newsletter'
// import { Container, Row, Col } from 'reactstrap'
// import useFetch from '../../hooks/useFetch.js'
// import { BASE_URL } from '../../utils/config.js'

import React from 'react';
// import './styleexplore.css'; 

const destinations = [
  {
    image: "https://t4.ftcdn.net/jpg/03/07/36/71/360_F_307367172_NVUQnGUVvMXmBxKrCJwTPd8gXn5yIcxV.jpg",
    title: "Lingaraja Temple",
    description: "Lingaraja Temple is a Hindu temple dedicated to Shiva and is one of the oldest temples in Bhubaneswar, the capital of the Indian state of Odisha, India. The temple is the most prominent landmark of Bhubaneswar city and one of the major tourist attractions of the state.Shiva's consort and the temple's presiding Goddess, Parvati, is referred to as Annapurna or Girija.The Lingaraja temple is the largest temple in Bhubaneswar.The central tower of the temple is 180 ft (55 m) tall. The temple represents the quintessence of the Kalinga architecture and culminating the medieval stages of the architectural tradition at Bhubaneswar.[5] The temple is believed to be built by the kings from the Somavamsi dynasty, with later additions from the Ganga rulers. The temple is built in the Deula style that has four components namely, vimana (structure containing the sanctum), jagamohana (assembly hall), natamandira (festival hall) and bhoga-mandapa (hall of offerings), each increasing in the height to its predecessor. The temple complex has 108 other shrines and is enclosed by a large compound wall.",
    link: "https://en.wikipedia.org/wiki/Lingaraja_Temple"
  },
  {
    image: "https://www.shutterstock.com/image-photo/parashurameshvara-temple-bhubaneswar-known-hindu-260nw-1145520419.jpg",
    title: "Parashurameshwar Temple",
    description: "Parsurameswara Temple also spelt Parashurameshvara, located in the East Indian city of Bhubaneswar, the capital of Odisha, India, is considered the best preserved specimen of an early Odia Hindu temple dated to the Shailodbhava period between the 7th and 8th centuries CE. The temple is dedicated to the Hindu god Shiva and is one of the oldest existing temples in the state. It is believed to have been built around 650 CE in Nagara style and has all the main features of the pre-10th century Kalinga Architecture style temples. The temple is one among the Parashurameshvara group of temples.",
    link: "https://en.wikipedia.org/wiki/Parsurameswara_Temple"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Muktesvar_Temple.jpg/330px-Muktesvar_Temple.jpg",
    title: "Mukteshwar Temple",
    description: "The Mukteshvara Temple is found to be the earliest work from the Somavamshi period. Most scholars believe the temple is the successor to Parashurameshvara Temple and built earlier to the Brahmeswara Temple (1060 CE). Percy Brown puts the date of construction of the temple to 950 CE. The presence of a torana, which is not part of any other temple in the region, makes this temple unique and some of the representations indicate the builders were starters of a new culture.[4] K.C. Panigrahi places the temple to be built during 966 CE and postulates that the Somavamshi king Yayati I built the temple. He also associates the legend of Kirtivassa to this temple, but the postulation is not accepted as Kirtivasa is associated with Lingaraja, though both were built at the same time for the same deity, Shiva. There is no historic evidence to conclude that Yayati had built the temple",
    link: "https://en.wikipedia.org/wiki/Mukteshvara_Temple,_Bhubaneswar"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ananta_Vasudev.jpg/330px-Ananta_Vasudev.jpg",
    title: "Ananta Vasudeva",
    description: "The 'Ananta Vasudeva Temple' in Bhubaneswar, Odisha, is a 13th-century temple dedicated to Lord Krishna, an incarnation of Lord Vishnu. It is unique because it is one of the few temples in Bhubaneswar dedicated to Vaishnavism, whereas most others are dedicated to Shiva. The temple enshrines images of Krishna, Balarama, and Subhadra, mirroring the famous Jagannath trio of Puri. Built in the Kalinga architectural style, the temple features intricate carvings and sculptures, showcasing the rich craftsmanship of the era. It remains an important site for Krishna worshippers in Odisha.",
    link: "https://en.wikipedia.org/wiki/Ananta_Vasudeva_Temple"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rajarani_Temple_01.jpg/1280px-Rajarani_Temple_01.jpg",
    title: "Rajarani Temple",
    description: "The temple is believed to have been known originally as Indreshvara. It is locally known as a 'love temple' because of the erotic carvings of women and men and couples in the temple. Rajarani Temple is built in the pancharatha style on a raised platform with two structures: a central shrine called the vimana (sanctum) with a bada (curvilinear spire) over its roof rising to a height of 18 m (59 ft), and a viewing hall called jagamohana with a pyramidal roof. The temple was constructed of dull red and yellow sandstone locally called 'Rajarani'. There are no images inside the sanctum, and hence it is not associated with a specific sect of Hinduism but broadly classified as Shaivite based on the niches.",
    link: "https://en.wikipedia.org/wiki/Rajarani_Temple"
  },

  {
    image: "https://kevinstandagephotography.wordpress.com/wp-content/uploads/2020/03/ksp_7842-sky-1.jpg",
    title: "Bhaskareswara Temple",
    description: "Bhaskareswara Temple, located near Brahmeswara Temple on Tankapani Road in Bhubaneswar, is an ancient temple 1 km from Rajarani Temple and 5.5 km from Bhubaneswar Railway Station. Built by the Gangas in the 13th–14th century CE, it is one of Odisha's oldest and most unique temples. The double-storied structure has a distinctive two-tiered bada. Dedicated to Lord Shiva as Bhaskareswara, its sanctum houses a 9-feet tall Shivalingam, visible from both floors and believed to grow over time. The lower floor acts as a platform with doorways on all sides, while both tiers follow the Pancha ratha plan and Panchanga bada elevation. The temple's interior is plain, and its exterior features architectural motifs like Pidha mundi and Khakhara mundi. Parsvadevatas such as Ganesha, Kartikeya, and Parvati adorn the structure. Despite lacking intricate sculptures, its unique architecture and heritage value make it a significant site in Bhubaneswar.",
    link: "https://en.wikipedia.org/wiki/Brahmeswara_Temple"
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Brahmeswar_Temple%2C_Bhubaneswar.JPG/1280px-Brahmeswar_Temple%2C_Bhubaneswar.JPG",
    title: "Brahmeshwar Temple",
    description: "The Brahmeshwara Temple, believed to have been built in the 9th century, is more likely from the 11th century, as suggested by sculptures, carvings, and inscriptions. It was commissioned by Queen Kolavati Devi of the Somavamsi Dynasty, who introduced the Devadasi tradition, where women worshiped the deity through music and dance. Evidence of this tradition is found in inscriptions on the temple premises. The temple also reflects tantric practices, with carvings of Lord Shiva and Chamunda showcasing its association with the tradition. Mahashivaratri is the main festival celebrated here with great devotion, drawing large crowds annually. Other festivals like Kartik Purnima and Diwali are also observed at the temple.",
    link: "https://en.wikipedia.org/wiki/Brahmeswara_Temple"
  },
  {
    image: "https://tse2.mm.bing.net/th?id=OIP.jUDybs5GDoox9wTBZeuphwHaFj&pid=Api&P=0&h=180", 
    title: "Chausathi Jogini Temple",
    description: "This temple is believed to have been built by Queen Hiradevi of the Bhaumakar dynasty in the 9th Century AD. However, with time, the temple had lost its glory before it was discovered and restored by renowned historian Kedarnath Mohapatra in 1953, to its present form.very year in the month of December, the Chausathi Yogini Mahotsav is organized near the temple. Nrutya Prativa, a city-based cultural organization, with support from the Odisha Tourism Department conducts this three-day event, in which classical dance and vocal artists from across the country perform and mesmerize the audience.This temple is believed to have been built by Queen Hiradevi of the Bhaumakar dynasty in the 9th Century AD.However, with time, the temple had lost its glory before it was discovered and restored by renowned historian Kedarnath Mohapatra in 1953, to its present form.",
    link:"https://en.wikipedia.org/wiki/Chausath_Yogini_Temple,_Mitaoli"
  },
  {
    image: "https://www.nativeplanet.com/img/2018/10/mukteshwaratemple-1540383667.jpg", 
    title: "Baitala Deula",
    description: "As per history, the Vaital Deul Temple was commissioned by Queen Tribhuvana Mahadevi, who became the first female ruler of Bhauma Kara dynasty after her husband King Santikara I died. There are many other stories related to the origin of the name of the temple. Some say that the name ‘Vaital’ has been derived from a Sanskrit name ‘Vahitra’, meaning ship. .",
    link: "https://en.wikipedia.org/wiki/Baitala_Deula"
  },
  {
    image: "https://tse3.mm.bing.net/th?id=OIP.rRvv1Ym7RhiB2f08Aco_IAHaEU&pid=Api&P=0&h=180", 
    title: "Konark Sun Temple",
    description: "The name Konark is made of two Sanskrit words: Kona, meaning corner, and arka, meaning sun. The town gets its name from its geographical location which makes it look like the sun rises at an angle. The history of Konark Sun Temple and sun worship goes as far back as the 19th century BC. The Konark Sun Temple, however, was built in the 13th century.",
    link: "https://en.wikipedia.org/wiki/Konark_Sun_Temple"
  },

  {
    image: "https://bhubaneswartourism.in/images/tourist-places/udayagiri-and-khandagiri-caves-bhubaneswar/udayagiri-and-khandagiri-caves-bhubaneswar-india-tourism-history.jpg", // FIX IMAGE PATH
    title: "Udayagiri and Khandagiri Caves",
    description: "The name Konark is made of two Sanskrit words: Kona, meaning corner, and arka, meaning sun. The town gets its name from its geographical location which makes it look like the sun rises at an angle.The history of Konark Sun Temple and sun worship goes as far back as the 19th century BC. The Konark Sun Temple, however, was built in the 13th century.",
    link: "https://en.wikipedia.org/wiki/Udayagiri_and_Khandagiri_caves"
  },
  {
    image: "https://www.holidify.com/images/compressed/5901.jpg", // FIX IMAGE PATH
    title: "Dhauli",
    description: "With the beautiful Daya River lying in the proximity, you have the ancient land of Dhauli that lets you know about the enormous battles that were fought here, the Kalinga War of 261 B.C. Buddhism for which Dhauli is so well known played a crucial role in transforming King Ashoka to a diehard Buddha devotee who eventually followed the preaching of Buddha for the rest of his life.",
    link: "https://en.wikipedia.org/wiki/Dhauli"
  },
  {
    image: "http://4.bp.blogspot.com/-Vkoi31HHR2Q/UcqrEdAjadI/AAAAAAAABt8/ltuKbBD-SqU/s1600/Bhubaneshwar-Aisanyesvara+Siva+Temple-7.jpg", 
    title: "Aisanyesvara Siva Temple",
    description: "Aisanyesvara Siva Temple is a 13th-century Hindu temple dedicated to Shiva located in Bhubaneswar, the capital of Odisha, India. The temple is in the precinct of Municipal Corporation Hospital, Sriram Nagar, Old Town, Bhubaneswar. It is close to the western compound wall of Lingaraj Temple. This is a living temple and with a shrine facing east.",
    link: "https://en.wikipedia.org/wiki/Aisanyesvara_Siva_Temple"
  },
  {
    image: "https://www.hlimg.com/images/things2do/738X538/ttd_20181123131406154295904621021t.jpg", 
    title: "Astasambhu Siva Temple",
    description: "Astasambhu Shiva Temples are a collection of 8 Hindu temples dedicated to Lord Shiva located in Bhubaneswar, the capital of Orissa, India. A small temple is dedicated to Lord Shiva located in Tiadi Sahi of Puri. In local language ‘Asta’ means ‘Eight’ and ‘Sambhu is another name of Lord Shiva.Astasambhu temple houses a cluster of eight Shiva Lingas made of precious stones. Each one of them is of a different color.",
    link: "https://en.wikipedia.org/wiki/Astasambhu_Siva_Temples"
  },
  {
    image: "https://odishatour.in/wp-content/uploads/2022/07/Lakshmaneshwar-Bharateshwar-Shatrughaneshwar-Shiva-Temple-Bhubaneswar-1024x581.jpg",
    title:"Bharateswar Temple", 
    description: "Hailodbhava Dynasty which came like a wave to the eastern part of India built many a temple in its reign. These temples are popular tourist attractions in Odisha for their outstanding representation and also that they have survived till this time. Bharateswar Temple is one such example of their marvelous creations which was built in the 6th century.",
    link: "https://en.wikipedia.org/wiki/Bharateswar_Temple"
  },
  {
    image: "https://www.templepurohit.com/wp-content/uploads/2015/10/211-1024x768.jpg", 
    title: "Bharati Matha Temple",
    description: "It is a temple of the Hindu God Shiva. This is one of the oldest temples in Bhubaneswar. The temple is a Hindu monastery with three stories which was built in the 11th century A.D. It is currently used for living Matha purposes and earlier it was used as a Hindu pilgrimage centre. Bharati Matha Temple is a temple of the Hindu God Siva.",
    link: "https://en.wikipedia.org/wiki/Bharati_Matha_Temple"
  },
  {
    image: "https://1.bp.blogspot.com/-wjiMriN4xZc/XUAwPrT9RxI/AAAAAAAAcQI/9seasXb_cCU6V6KOjgbgA9B0jx77ZRxXQCLcBGAs/s1600/Brihadeshwara.jpg", 
    title: "Bhringeswara Shiva Temple",
    description: "The Bhringesvara Shiva temple is situated on the foothills of Dhauli and the left bank of the river Daya, in the southeastern outskirts of Bhubaneswar in the village Khatuapada. The temple is facing towards west and the presiding deity is a circular yoni pitha with a hole at the center. The temple is made of light grey sand stone. The temple is renovated one from bottom to the top by employing the earlier materials.",
    link: "https://en.wikipedia.org/wiki/Bhringesvara_Siva_Temple"
  },
  {
    image: "https://www.kahajaun.com/wp-content/uploads/2021/06/Brahma-Temple-Pushkar-1024x1012.jpg", 
    title: "Brahma Temple",
    description: "In the very heart of old Bhubaneswar, Bindu Sagar tank is somewhere nobody will need to directions to find. It’s omnipresent, and is the backdrop for a number of ancient temples in the city such as Markandeshwar, Mohini, Ananta Vasudeva, Dwarabasini, Uttaresvara and Asta Shambhu.According to local tradition, Shiva and Parvati settled in Varanasi after their marriage.",
    link: "https://en.wikipedia.org/wiki/Brahma_Temple,_Bindusagar"
  },
  {
    image: "https://i.pinimg.com/736x/ce/cc/05/cecc05fde60c5988272aba62f177196f.jpg",
    title: "Chakreshvari Shiva Temple",
    description: "The Chakreshvari Shiva Temple, Bhubaneswar is a living temple of the Hindus. The temple is dedicated to Lord Shiva and is located in Orissa. The temple can be categorized under Rekha DeulaPidha. This is mainly because of the typical architecture of the temple where a type of flat column rises from the base of the plinth.",
    link: "https://en.wikipedia.org/wiki/Chakreshvari_Siva_Temple"
  },
  {
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEiMArAEwCTyW4AWLzTStbNZ9wctK-XzdjKx_YFRcPeBUeRV57mD92ts1peY38jAOl_eLbAoYfNXAChnHnRYXkytWEqwOtXyOxHfQLV7uf6XBih7R0PlZMBQUaqcPsBKY6PdrjhgikoPXwkmz9_feelPEuZR_mrwYg3qMjB0kSyQO0NDSVa95IRMjtuJ=w640-h568", 
    title: "Champakesvara",
    description: "The temple dates back to 13th century A.D. The temple has a lot of significance in the past as well as today. It was of significance during the Ganga period. Shivaratri, Jalasayi, Rudrabhiseka, Sankranti are observed in this temple. Thread ceremony, birth day and marriage engagements are also carried out here.",
    link: "https://en.wikipedia.org/wiki/Champakesvara_Siva_Temple"
  },
  {
    image: "https://lightuptemples.com/wp-content/uploads/2023/03/IMG_20180306_121221.jpg", 
    title: "Chandrasekhara Mahadeva Temple",
    description: "Chandrasekhara Mahadeva Temple is part of a cluster of temples that includes Chintamanisvara Siva Temple, Gangesvara Siva Temple, and many others. These temples form a rich tapestry of religious and architectural heritage, offering visitors a glimpse into the spiritual and cultural traditions of the region. Each temple has its own unique features and historical significance, making it a fascinating destination for those interested in exploring the diverse religious landscape of the area.",
    link: "https://en.wikipedia.org/wiki/Chandrasekhara_Mahadeva_Temple"
  },
  {
    image: "https://odishatour.in/wp-content/uploads/2022/07/Chintamaniswar-temple-bhubaneswar.jpg?v=1659549889", 
    title: "Chintamaniswar Shiva Temple",
    description: "Chintamaniswar Shiva Temple is a Hindu temple dedicated to Lord Shiva in Bhubaneswar, the capital of Odisha, India. It is at the end of the Chintamaniswar road branching from Cuttack-Puri road near the Old Station Bazar. The temple faces west and the enshrined deity is a Siva lingam with a yonipitha.The temple dates back to the 14th century A.D. According to local legend it was built by the Kesharis (Somavamsis).",
    link: "https://en.wikipedia.org/wiki/Chintamanisvara_Siva_Temple"
  },
  
  {
    image: "https://tse3.mm.bing.net/th?id=OIP.f9fhg-471kmL1cbpptiGjAHaE8&pid=Api&P=0&h=180", 
    title: "Jaleswar Temple",
    description: "Jaleswar temple at Kalarahanga is a 12th century temple built by Eastern Ganga Dynasty of then Kalinga kingdom, the king of chudangagada which was a fort near toady’s Barang went daily to Shree Lingaraja Temple daily for worship once upon a day there was a heavy rain for continuously 3days so the king couldn’t visit the temple.",
    link: "https://en.wikipedia.org/wiki/Jaleswar_Siva_Temple_Precinct"
  },
  {
    image: "https://i.ytimg.com/vi/V5a_LFg0EnY/hqdefault.jpg", // FIX IMAGE PATH
    title: "Devasabha Temple",
    description: "The temple is dated back to 14th century A.D with Rekha deul topology. It is in the southwest corner of Kharakhia Vaidyanatha precinct; 5.00 metres from the southern and western compound wall. The temple is facing east. It stands on a low and square platform measuring 5.50 square metres with a height of 0.60 metres.Devasabha Temple is located in the Kharakhia Vaidyanath temple precinct, Old Town area of Bhubaneswar, Orissa, India.",
    link: "https://en.wikipedia.org/wiki/Devasabha_Temple"
  },
  {
    image: "https://tse4.mm.bing.net/th?id=OIP.vEzy5RIo9HyoL2zQA3Vy6AHaE8&pid=Api&P=0&h=180", // FIX IMAGE PATH
    title: "Lakhesvara Siva Temple",
    description: "Lakhesvara Siva temple (13th century AD.) Location: Lat 20° 14’ 33'N, Long 85° 50’ 17' E, Elev 60 ft. Approach- Lakhesvara Siva temple is located in the right side of the Ganges–Yamuna road, behind the Lingaraja market complex, Old town, Bhubaneswar, Orissa, India. It is situated at a distance of 70 metres north east of Lingaraj temple and at a distance of 10 metres south of Gangesvara and Yamunesvara Siva temple across the road. The temple is facing towards the east.",
    link: "https://en.wikipedia.org/wiki/Lakhesvara_Siva_Temple"
  },
  {
    image: "https://alchetron.com/cdn/pabaneswara-temple-df0897e7-3d87-4db0-9098-f4248f58609-resize-750.jpg", // FIX IMAGE PATH
    title: "Pabaneswara Temple",
    description: "Located just 80m south-east of the wonderful Parasuramesvara Temple in the old city, Pabaneswara Temple (formally known as Daitesvara) was my first experience of just how varied the treatment of ancient temples is in Bhubaneswar.Whilst the nearby Parasuramesvara and Mukteshwar Temples enjoy the attention of many devotees and tourists, the crumbling edifice of Pabaneswara is a sad tale of neglect and I doubt anything will be done to turn the tide now.",
    link: "https://en.wikipedia.org/wiki/Pabaneswara_Temple"
  },
  {
    image: "https://www.templepurohit.com/wp-content/uploads/2015/02/Nageshwar-Temple-Lord-Shiva-Jyotirlinga-1024x768.jpg", // FIX IMAGE PATH
    title: "Nagesvara Temple",
    description: "Located 300m north of Parsurameswara Temple in Bhubaneswar old city, Nagesvara (Nageswar) Temple is set within a small manicured garden next to an ancient tank. This monument also goes by the name of Nabakeswar Temple, it is often referred to as much in the media.Thought to have been built sometime in the 10th century A.D. by the Somavamshi dynasty kings, the temple is plain without any decoration or designs.",
    link: "https://en.wikipedia.org/wiki/Nagesvara_Temple,_Bhubaneswar"
  },
  {
    image: "https://alchetron.com/cdn/purvesvara-siva-temple-a68c75de-0682-4c17-be03-0284e94b59b-resize-750.jpg", // FIX IMAGE PATH
    title: "Purvesvara Siva Temple",
    description: "The temple stands on a high pista decorated with three mouldings measuring 50.80 m in length x 5.75 m in width with 0.92 m in height.On plan, the temple is pancharatha with a square vimana and a frontal porch towards east. The vimana measures 4.65 square metres and porch 0.15 m width.On elevation, temple is in rekha order with usual bada, gandi and mastaka measuring 10.00 m from pabhaga to mastaka.",
    link: "#"
  },
  {
    image: "https://static.toiimg.com/thumb/msid-57514959,width-550,height-433/57514959.jpg", // FIX IMAGE PATH
    title: "Subarnesvara Siva Temple",
    description: "Dedicated to Shiva, the 9th-10th century Subarnajaleswara Temple (also known as Subarnesvara Temple) is located on Kotiteertha Lane heading towards Bindu Sagar Tank on the east (right) side of Lingaraja West Canal.The east-facing temple is planned in a pancharatha style, although what can be seen today is mostly restored from earlier ruins.",
    link: "https://en.wikipedia.org/wiki/Purvesvara_Siva_Temple"
  },
  {
    image: "https://lightuptemples.com/wp-content/uploads/temple/profile_image/bhubaneswar-suka-temple-odisha.jpg", // FIX IMAGE PATH
    title: "Suka Temple",
    description: "Located on the right side of a small alleyway connecting Rath Road with Bindu Sagar in old Bhubaneswar, the temple precinct contains three temples, although the largest structure here is often incorrectly known as Sukasari.The main temple here is in fact Sari Temple, the smaller structure to the south-west is Suka Temple, and the third partially ruined temple, for which the laterite compound wall diverts its course to include, I am unfortunately unable to find a name for. (also known as Rameshwar Deula) was the first site I visited in what turned out to be a somewhat epic tour around the temples and archaeological sites of both Bubaneswar city and the surrounding countryside.Built of sandstone and facing east, architectually the temple is considered at the transitional phase of the Kalinga school of architecture, and is within the rekhadeula category of Kalinga temples.",
    link: "https://en.wikipedia.org/wiki/Suka_Temple"
  },
  {
    image: "https://live.staticflickr.com/4867/46280267074_bc52d88cd6_b.jpg", // FIX IMAGE PATH
    title: "Uttaresvara Siva Temple",
    description: "Uttaresvara Siva Temple is the 12th-century temple which is devoted to Lord Siva. According to the local tradition, this temple is named as Uttaresvara since it is located on the northern embankment of Bindusagar tank and towards the north of Lingaraj temple. The term Uttara means North. Godavari Tank is located inside the temple premises. It is located on the northern embankment of Bindusagar tank.",
    link: "https://en.wikipedia.org/wiki/Uttaresvara_Siva_Temple"
  },
  {
    image: "https://tse4.mm.bing.net/th?id=OIF.FyqtlfpQHuhDtXAeR%2fqNJw&pid=Api&P=0&h=180", 
    title: "Vishnu Temple",
    description: "The Vishnu Temple, Bhubaneswar is a Hindu temple dedicated to Lord Vishnu situated on the eastern embankment of Bindu Sagar at Talabazar, on the right side of the Talabazar road leading from Lingaraj temple to Kedara-Gouri lane in Bhubaneswar, the capital of Odisha, India. The temple faces west and the Sanctum is used for storage purposes.",
    link: "https://en.wikipedia.org/wiki/Vishnu_Temple,_Bhubaneswar"
  },
  {
    image: "https://im.whatshot.in/img/2022/Feb/q18-1631951236-1644295501.jpg?wm=1&w=1200&h=630&cc=1", 
    title:"Yameshwar Temple",
    description: "Located directly opposite Bakresvara Temple in the old city of Bhubaneswar, Yameshwar Temple (also known as Yameswara and Yamesvara) dates to the Ganga period of the 13th century A.D.At many temple sites in India there are often legends of earlier structures once existing, but at Yameshwar we have concrete proof of that being the case.",
    link: "https://en.wikipedia.org/wiki/Yameshwar_Temple"
  },
  {
    image: "https://tse4.mm.bing.net/th?id=OIP.k-0F_7DTtgI1hBMNP0u6XAHaFj&pid=Api&P=0&h=180", 
    title: "Rameshwar Deula",
    description: "Believed to have been built at the start of the Somavamsi dynasty in the early 9th century A.D, Rameshwar Temple (also known as Rameshwar Deula) was the first site I visited in what turned out to be a somewhat epic tour around the temples and archaeological sites of both Bubaneswar city and the surrounding countryside.Built of sandstone and facing east, architectually the temple is considered at the transitional phase of the Kalinga school of architecture, and is within the rekhadeula category of Kalinga temples.",
    link: "https://en.wikipedia.org/wiki/Rameshwar_Deula"
  },


];

const DestinationCard = ({ image, title, description, link }) => {
  return (
    <div className="destination-card">
      <img src={image} alt={title} />
      <div className="destination-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} className="explore-button">Explore</a>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="destinations">
      <h2>Popular Destinations</h2>
      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <DestinationCard key={index} {...destination} />
        ))}
      </div>
    </div>
  );
};

export default App;