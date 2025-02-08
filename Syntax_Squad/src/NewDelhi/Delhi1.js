import React from "react";
import { Container, Row, Col,} from "reactstrap";
import AgraCarousel from "./DelhiCarousel";
import Activity from"./BookDelhi.js"
import Culture from"./Culture.js"
const Delhi1= () => (
    <div><div classNmae="PageLayout">
      <h1 style={{ fontFamily: 'Times New Romon' , color: "" ,fontSize:50}}>NEW DELHI</h1>
  <div className="subComponent" >
    
    <Container>
      <section>
        <Row sm="8">
          <Col sm="8">
          <h1 style={{ fontFamily: 'Times New Romon' , color: "" ,fontSize:50}}>NEW DELHI</h1>
      <AgraCarousel/>
            
          </Col>
          <Col sm="4">
  <h6 align="centre"style={{ fontFamily: 'Patrick Hand SC' , color: "#b13434" }}><br/><br/><br/> A symbol of the country’s rich past and thriving present, Delhi is a city where ancient and modern blend seamlessly together. It is a place that not only touches your pulse but even fastens it to a frenetic speed. Home to millions of dreams, the city takes on unprecedented responsibilities of realizing dreams bringing people closer and inspiring their thoughts. <br/><br/>  Delhi showcases an ancient culture and a rapidly modernising country. Dotted with monuments there is much to discover here. The seat of many powerful empires in the past, its long history can be traced in its many carefully-preserved monuments, ancient forts and tombs.   <br/> <br/>       All this is combined with the best features of a modern city such as a metro system, bustling markets and fabulous eating places. The past and the present meld seamlessly together, making centuries-old monuments a part of the city’s daily life. Delhi is very much a history’s child. The story of the city is as old as the epic Mahabharata, when the town was known as Indraprastha, where Pandavas used to live. Over the centuries, eight more cities came alive adjacent to Indraprastha: Lal Kot, Siri, Dinpanah, Quila Rai Pithora, Ferozabad, Jahanpanah, Tughlakabad and Shahjahanabad. Many empires rose to the heights of their power and were destroyed here. Among the prominent dynasties which made Delhi their capital were the Tughlaqs, the Khiljis and the Mughals.<br/><br/> No visit to Delhi is complete without an experience of its famed specialties such as its delicious curries, barbecued tikkas and kebabs. It is also a shoppers’ haven, whether you want to pick up some rich, woven silks, handicrafts, or ethnic cushions for your home. For cuisine of different Indian states and an array of Indian art and craft there are three Dilli Haats in Delhi at INA, Pitampura and the brand new Dilli Haat at Janakpuri.<br/>
              </h6>
             
          </Col>
        </Row>
      </section>
      </Container>
      <br/>
      <br/>
      <div className="Activities"><h1>PURCHASE TICKETS</h1>
      <Activity/>
<br/>
</div>

<div className="Activities"><h1>CULTURE</h1>

      <Culture/>
      
<br/>
</div>

    
    
  </div>
  
    </div>
    
    </div>
);

export default Delhi1;