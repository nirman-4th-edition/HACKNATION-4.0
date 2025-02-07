import React, { Component } from 'react';
import img1 from "./chowmahalla_palace.jpg";
import img2 from "./Golconda_palace.jpg";
import img3 from "./falaknuma_palace.jpg"
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
class Hotel_Hyderabad extends Component {
  render() {
    return (
      <div>
        <CardGroup>
  <Card>
    <Card.Img variant="top" src={img1} style={{ height: '22rem' }}/>  
    <Card.Body>
     
      <Card.Title><h1>Chowmahalla Palace</h1></Card.Title>
      <Card.Text align="centre-justified">
      
      

      
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/chowmahalla">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top"  src={img2} style={{ height: '22rem' }}/> 
    <Card.Body>
      <Card.Title><h1>Golconda Palace</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/Golconda">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src={img3} style={{ height: '22rem' }}/>
    <Card.Body>
      <Card.Title><h1>Falaknuma Palace</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/falaknuma">Book your ticket</Button></small> 
    </Card.Footer>
  </Card>
</CardGroup>
          
      </div>
    );
  }
}

export default Hotel_Hyderabad;
