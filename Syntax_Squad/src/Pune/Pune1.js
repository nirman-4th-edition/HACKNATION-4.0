import React from "react";
import { Container, Row, Col,} from "reactstrap";
import PuneCarousel from "./PuneCarousel";
import Activity from"./BookPune.js"
import Culture from"./Culture.js"
const Pune1= () => (
    <div><div classNmae="PageLayout">
      <h1 style={{ fontFamily: 'Times New Romon' , color: "" ,fontSize:50}}>PUNE</h1>
  <div className="subComponent" >
    
    <Container>
      <section>
        <Row sm="8">
          <Col sm="8">
          <h1 style={{ fontFamily: 'Times New Romon' , color: "" ,fontSize:50}}>PUNE</h1>
      <PuneCarousel/>
            
          </Col>
          <Col sm="4">
  <h6 align="centre"style={{ fontFamily: 'Patrick Hand SC' , color: "#b13434" }}><br/><br/><br/>Pune, also called Poona, city, west-central Maharashtra state, western India, at the junction of the Mula and Mutha rivers. Called “Queen of the Deccan,” Pune is the cultural capital of the Maratha peoples. The city first gained importance as the capital of the Bhonsle Marathas in the 17th century. <br/><br/> Pune has long been a major educational and cultural centre; former prime minister Jawaharlal Nehru referred to it as the “Oxford and Cambridge of India.” <br/> <br/>   The city is also known for cultural activities such as classical music, spirituality, theatre, sports and literature.   <br/><br/> The city is easy to navigate and is filled with art and history and has a bustling nightlife. Pune has some of India’s most beautiful and eye-catching architecture. A prominent historical landmark in the city is Shaniwarwada, a majestic fort built in 1732 and the seat of the Peshwas of the Maratha Empire. Another famous landmark is Aga Khan Palace, which was built by Sultan Muhammed Shah Aga Khan III in 1892.   <br/>
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

export default Pune1;