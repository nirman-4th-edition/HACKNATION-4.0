import React, { useReducer} from "react";

import img1 from './AgraImage6.jpg'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import './Ticket.css'
import Table from 'react-bootstrap/Table'

export function Ticket(props) {
 
 const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };
const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      "city": "AGRA",
      "monument": "Taj Mahal",
      "price_adult":"45",
      "price_children":"0",
      "price_abroad":"1050",
      "name": "string",
      "date":"string",
      "emailID":"string",
      "count_adult":"string",
      "count_children":"string",
      "count_abroad":"string",
      "phone":"string",
      "personal_id_no":"string",
      "doc_type":"string"
      }    
  );
  
    return (
      <div>
        <h1>......</h1>
        <h1>Taj Mahal </h1>
        <a href="https://artsandculture.google.com/streetview/taj-mahal/UwGKcX7FFM5U4g?sv_lng=78.04199578168942&sv_lat=27.17376226664116&sv_h=-12.5&sv_p=11&sv_pid=vQAmRxAVGgXXQmPcT8d0cQ&sv_z=1"><h6>View 360!</h6></a>
        <br></br>
           
          <div>
            <Container>
                
            
       <img
       
      className="d-block w-20" 
      src={img1}
      alt="First slide"
      style={{ height: '20rem', margin:'0 auto 0 auto'}}
    />

     
</Container> 

  </div>
<br></br>
  
  <Container className="Shift">
  <Row>
    <Col className="Shift1"><div class="col-md-3 text-center box">
            <ul class="list-unstyled mb-0"  >
            <li><h1>&#8377;</h1>
            <Table  bordered >
  <thead>
    <tr>
      
      <th>Indian Nationals</th>
      <th>Foreign Nationals</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Rs. 45 for Adults</td>
      <td rowSpan={2}>Rs 1050</td>
      
    </tr>
    <tr>
      
      <td>Free for Children below 15 years</td>
      
      
    </tr>
    
  </tbody>
</Table>     
            </li>
            <li><h1><div class="marker"></div></h1>
                    <p> 64, Taj Road, Agra-282001</p>
            </li>

            <li><h1 >	&#9742;</h1>
    
                    <p>0562-2226431</p>
             </li>

            <li><h1>	
&#128231;</h1>
                    <p> <a href="www.tajmahal.gov.in">Visit Website</a></p>
            </li>
            </ul>
        </div></Col>
    <Col ><Form action="/book/" method="post">
  <Form.Group className="mb-3">
    <Form.Label >Enter your Name</Form.Label>
  <Form.Control name="name" onChange={handleInput} placeholder="Eg: Vithika Pungliya" />
    
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label >Enter your Number</Form.Label>
    <Form.Control name="phone" onChange={handleInput} placeholder="Eg: 8484822102" />
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label >Enter your Email</Form.Label>
    <Form.Control name="emailID" onChange={handleInput} placeholder="Eg: xyz@xyz.com" />
    
  </Form.Group>
  <Row>
    <Col>
    
  <div className="App">
      <div className="input-container">
        <div>
          <label>Book your date</label>
          <input type="date" name="date" onChange={handleInput}></input>
          <input type="hidden" name="csrfToken" value="1234567890abcdef"/>
          <input type="hidden" name="city" value="Agra"/>
          <input type="hidden" name="monument" value="Taj Mahal"/>
          <input type="hidden" name="price_adult" value="45"/>
          <input type="hidden" name="price_children" value="0"/>
          <input type="hidden" name="price_abroad" value="1050"/>
        </div>
        
      </div>
      
    </div>
    </Col>
    <Col>Children<br></br>
  <Select
          labelId="demo-simple-select-label"
          name="count_children"
          id="demo-simple-select"
          defaultValue={formInput.name}
          onChange={handleInput}
  >      
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="9">9</MenuItem>
          <MenuItem value="10">10</MenuItem>
          
  </Select></Col>
  <Col>Adults<br></br>
  <Select
          labelId="demo-simple-select-label"
          name="count_adult"
          id="demo-simple-select"
          defaultValue={formInput.name}
          onChange={handleInput}
  >
          
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="9">9</MenuItem>
          <MenuItem value="10">10</MenuItem>
  </Select></Col>
  <Col>Foreigners<br></br>
  <Select
          labelId="demo-simple-select-label"
          name="count_abroad"
          id="demo-simple-select"
          defaultValue={formInput.name}
          onChange={handleInput}
  >       
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="9">9</MenuItem>
          <MenuItem value="10">10</MenuItem>
  </Select></Col>
  
  
   
    
  </Row>
  <br></br>
  <Row>
    <Col> Select Verification Type
    <br></br>
    <Select
          labelId="demo-simple-select-label"
          name="doc_type"
          id="demo-simple-select"
          defaultValue={formInput.name}
          onChange={handleInput}
  >       
          <MenuItem value="Aadhar Card">Adhar Card</MenuItem>
          <MenuItem value="Pan Card">Pan Card</MenuItem>
          <MenuItem value="Passport">Passport</MenuItem>
          
  </Select></Col>
  <Col>
  
  <Form.Group className="mb-3">
    <Form.Label >ID Number</Form.Label>
  <Form.Control name="personal_id_no" onChange={handleInput} placeholder="" />
    
  </Form.Group>

  </Col>
  
    
  </Row>
  
  
  <br></br>
  <br></br>
  
  <Button type="submit">Book Now</Button>
  <br>
  </br>
  <br></br>   
     
        
     
  
</Form></Col>
  </Row>
  
</Container >

  <br></br>
  </div>
          
      
    );
  }

export default Ticket ;