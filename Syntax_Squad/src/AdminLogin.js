import React, { useReducer} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

export function AdminLogin(props) {
 
 const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };
const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      
      "username": "string",
      "password":"string"
      }
      
  );
  
  
    return (
      <div>
        <h1>.....</h1>
        <h1>Admin Login</h1>
       <div>
            

  </div>
<br></br>
  
  <Container className="Shift">
  <Row>
    
    <Col ><Form action="/login/" method="post">
  <Form.Group className="mb-3">
    <Form.Label >Enter Username</Form.Label>
  <Form.Control name="username" onChange={handleInput}  />
    
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label >Enter Password</Form.Label>
    <Form.Control type="Password" name="password" onChange={handleInput}  />
  </Form.Group>
  <br></br>
  <br></br>
  <input type="hidden" name="csrfToken" value="1234567890abcdef"/>
  
  <Button type="submit">Sign In</Button>
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



export default AdminLogin ;