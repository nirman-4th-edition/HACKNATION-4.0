import React, { Component } from 'react';
import img1 from './AmberPalace.jpg'
import img2 from './Hawa_Mahal.jpg'
import img3 from './jantar_mantar.jpg'
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
class Hotel_Jaipur extends Component {
  render() {
    return (
      <div>
        <CardGroup>
  <Card>
    <Card.Img variant="top" src={img1} style={{ height: '22rem' }}/>  
    <Card.Body>
     
      <Card.Title><h1>Amber Palace</h1></Card.Title>
      <Card.Text align="centre-justified">
      
      

      
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/AmberPalace">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top"  src={img2} style={{ height: '22rem' }}/> 
    <Card.Body>
      <Card.Title><h1>Hawa Mahal</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/hawamahal">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src={img3} style={{ height: '22rem' }}/>
    <Card.Body>
      <Card.Title><h1>Jantar Mantar</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/jantarmantar">Book your ticket</Button></small> 
    </Card.Footer>
  </Card>
</CardGroup>
          
      </div>
    );
  }
}

export default Hotel_Jaipur;
