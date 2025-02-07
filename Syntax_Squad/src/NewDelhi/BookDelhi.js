import React, { Component } from 'react';
import img1 from "./Humayun.png"
import img2 from "./QutubMinar.png"
import img3 from "./RedFort.png"
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
class Hotel_Delhi extends Component {
  render() {
    return (
      <div>
        <CardGroup>
  <Card>
    <Card.Img variant="top" src={img1} style={{ height: '22rem' }}/>  
    <Card.Body>
     
      <Card.Title><h1>Humayun's Tomb</h1></Card.Title>
      <Card.Text align="centre-justified">
      
      

      
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/HumayunTomb">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top"  src={img2} style={{ height: '22rem' }}/> 
    <Card.Body>
      <Card.Title><h1>Qutub Minar</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/QutubMinar">Book your ticket</Button></small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src={img3} style={{ height: '22rem' }}/>
    <Card.Body>
      <Card.Title><h1>Red Fort</h1></Card.Title>
      
    </Card.Body>
    <Card.Footer>
      <small className="text-muted"><Button href="/react/Redfort">Book your ticket</Button></small> 
    </Card.Footer>
  </Card>
</CardGroup>
          
      </div>
    );
  }
}

export default Hotel_Delhi;
