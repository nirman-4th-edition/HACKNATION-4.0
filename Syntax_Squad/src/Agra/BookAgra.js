import React, { Component } from 'react';
import img1 from './AgraImage1.jpg'
import img2 from './AgraImage6.jpg'
import img3 from './AgraImage2.jpg'
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
class Hotel_Agra extends Component {
  render() {
    return (
      <div>
        <CardGroup>
  <Card>
    <Card.Img variant="top" src={img1} style={{ height: '22rem' }}/>  
    <Card.Body>
     
      <Card.Title><h1>Fatehpur Sikri</h1></Card.Title>
      <Card.Text align="centre-justified">
      
      

      
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/fatepursikri">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top"  src={img2} style={{ height: '22rem' }}/> 
    <Card.Body>
      <Card.Title><h1>Taj Mahal</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/ticketTaj">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src={img3} style={{ height: '22rem' }}/>
    <Card.Body>
      <Card.Title><h1>Agra Fort</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/agrafort">Book your ticket</Button></small> 
    </Card.Footer>
  </Card>
</CardGroup>
          
      </div>
    );
  }
}

export default Hotel_Agra;
