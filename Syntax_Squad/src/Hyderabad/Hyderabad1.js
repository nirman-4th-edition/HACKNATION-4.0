import React from "react";
import { Container, Row, Col,} from "reactstrap";
import HyderabadCarousel from "./HyderabadCarousel";
import Activity from"./BookHyderabad.js"
import Culture from"./Culture.js"
const Hyderabad1= () => (
    <div><div classNmae="PageLayout">
      <h1 style={{ fontFamily: 'Times New Romon' , color: "" ,fontSize:50}}>Hyderabad</h1>
  <div className="subComponent" >
    
    <Container>
      <section>
        <Row sm="8">
          <Col sm="8">
          <h1 style={{ fontFamily: 'Times New Romon' , color: "" ,fontSize:50}}>Hyderabad</h1>
      <HyderabadCarousel/>
            
          </Col>
          <Col sm="4">
  <h6 align="centre"style={{ fontFamily: 'Patrick Hand SC' , color: "#b13434" }}><br/><br/><br/> The City of Pearls, Hyderabad, is home to historic marvels such as the Birla Temple, Charminar, Golkonda Fort, and Salar Jung Museum.

It is among the most diverse, harmonious, and vibrant cities in India with people from all walks of life celebrating togetherness through culture, cuisine, and festivals.<br/>
        <br/>
       Hyderabad is the capital of southern India's Telangana state. <br/>
 A major center for the technology industry, it's home to many upscale restaurants and shops. <br/>
Its historic sites include Golconda Fort, a former diamond-trading center that was once the Qutb Shahi dynastic capital. <br/>
The Charminar, a 16th-century mosque whose 4 arches support towering minarets, is an old city landmark near the long-standing Laad Bazaar<br/>
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

export default Hyderabad1;