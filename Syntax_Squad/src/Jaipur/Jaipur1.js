import React from "react";
import { Container, Row, Col,} from "reactstrap";
import AgraCarousel from "./JaipurCarousel";
import Activity from"./BookJaipur.js"
import Culture from"./Culture.js"
const Jaipur1= () => (
    <div><div classNmae="PageLayout">
      <h1 style={{ fontFamily: 'Times New Romon' , color: "" ,fontSize:50}}>JAIPUR</h1>
  <div className="subComponent" >
    
    <Container>
      <section>
        <Row sm="8">
          <Col sm="8">
          <h1 style={{ fontFamily: 'Times New Romon' , color: "" ,fontSize:50}}>JAIPUR</h1>
      <AgraCarousel/>
            
          </Col>
          <Col sm="4">
  <h6 align="centre"style={{ fontFamily: 'Patrick Hand SC' , color: "#b13434" }}><br/><br/><br/> Jaipur, the capital of the North Indian State of Rajasthan, is named after its founder Maharaja Jai Singh II (1693-1743). The city is surrounded by hills and dotted with forts. Houses with pink latticed windows line the streets, and look almost magical at sunset. An extremely well planned city, Jaipur was designed by an engineer and scholar Vidyadhar Bhattacharya, in accordance with ancient Hindu treatise on architecture, the Shilpa Shasta (Vastu).<br/><br/>    Jaipur is known as Heritage City because of its rich heritage culture, customs, traditions, fairs and festivals, civilization, and hundreds years old forts and monuments. The glorious architecture of Jaipur the Pink City is renowned across the world. Wonderful Forts and Monuments garland the entire city in a planned manner.<br/> <br/>    Planned by Vidyadhar Bhattacharya, Jaipur holds the distinction of being the first planned city of India. Renowned globally for its coloured gems, the capital city of Rajasthan combines the allure of its ancient history with all the advantages of a metropolis. The bustling modern city is one of the three corners of the golden triangle that includes Delhi, Agra and Jaipur. <br/>
  <br/>
       Jaipur is the capital of India’s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or “Pink City” for its trademark building color. <br/> At the center of its stately street grid (notable in India) stands the opulent, colonnaded City Palace complex. With gardens, courtyards and museums, part of it is still a royal residence.<br/></h6>
             
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

export default Jaipur1;