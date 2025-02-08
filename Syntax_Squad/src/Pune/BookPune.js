import React, { Component } from 'react';
import img1 from './agakhan.jpg'
import img2 from './shaniwarWada.jpg'
import img3 from './RajaDinkarKelkarMuseum.jpg'
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
class Hotel_Pune extends Component {
  render() {
    return (
      <div>
        <CardGroup>
  <Card>
    <Card.Img variant="top" src={img1} style={{ height: '22rem' }}/>  
    <Card.Body>
     
      <Card.Title><h1>Aga Khan Palace</h1></Card.Title>
      <Card.Text align="centre-justified">

      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/ticketAgakhan">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top"  src={img2} style={{ height: '22rem' }}/> 
    <Card.Body>
      <Card.Title><h1>Raja Dinkar Kelkar Museum</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/ticketKelkar">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src={img3} style={{ height: '22rem' }}/>
    <Card.Body>
      <Card.Title><h1>Shaniwar Wada</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/Shaniwar">Book your ticket</Button></small> 
    </Card.Footer>
  </Card>
</CardGroup>
          
      </div>
    );
  }
}

export default Hotel_Pune;
