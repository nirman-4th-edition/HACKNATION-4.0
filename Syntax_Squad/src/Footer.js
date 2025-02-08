import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "./App.css";
import { ReactComponent as Facebook } from "./img/facebook.svg";
import { ReactComponent as Twitter } from "./img/twitter.svg";
import { ReactComponent as Linkedin } from "./img/linkedin.svg";
import { ReactComponent as Instagram } from "./img/instagram.svg";

class Footer extends Component {
  render() {
    return (
      <div className="subComponent-lg" id="footerBody">
        <Container>
          <header className="headerTitle text-center">
           
          </header>
          <footer className="svg-group text-center">
            <Row>
              <Col md="3" xs="6">
                <div className="svg-card-3">
                
                    {/* <Facebook width="50" height="55" strokeWidth="1" /> */}
                    
                    <h5 class="font-weight-bold text-uppercase mt-3 mb-4">Indian Tourism</h5>
                    <p>Explore our rich heritage!</p>
                  
                </div>
              </Col>
              <Col md="3" xs="6">
                <div className="svg-card-3">
                  
                </div>
              </Col>
              <Col md="3" xs="6">
                
              </Col>
              <Col md="3" xs="6">
              
                <div className="svg-card-3 ">
                <h5 class="font-weight-bold text-uppercase mt-3 mb-4 text-warning " >contact us</h5>
                    <p><img src="data:image/png;base64,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" width="20"></img> &nbsp;0202284249/ 98376211</p>
                    <p><img src="data:image/png;base64,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" width="20"></img> &nbsp;govt123@govt.edu</p>
                    <p><Facebook width="50" height="55" strokeWidth="1" /> &nbsp;<Twitter width="55" height="55" strokeWidth="1" /> &nbsp;<Instagram width="55" height="55" strokeWidth="1" /></p>
                    
                </div>
              </Col>
            </Row>
            <hr />
            <br />
            <p>Copyright 2025 - Syntax Squard </p>
          </footer>
        </Container>
      </div>
    );
  }
}

export default Footer;