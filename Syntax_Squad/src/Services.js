import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "./App.css";

import { ReactComponent as Trending } from "./img/trending-up.svg";
import { ReactComponent as Flag } from "./img/flag.svg";
import { ReactComponent as Monitor } from "./img/monitor.svg";
import { ReactComponent as MapPin } from "./img/map-pin.svg";

class Services extends Component {
  render() {
    return (
      <div className="wrapped-services">
        <div className="subComponent" id="servicesBody">
          <Container>
            <section className="svg-group text-center">
              <Row>
                <Col lg="3" md="6" sm="6">
                  <div className="svg-card-2">
                    <Trending width="50" height="55" strokeWidth="1" />
                    <p>Book </p>
                  </div>
                </Col>
                <Col lg="3" md="6" sm="6">
                  <div className="svg-card-2">
                    <Monitor width="55" height="55" strokeWidth="1" />
                    <p>Show</p>
                  </div>
                </Col>
                <Col lg="3" md="6" sm="6">
                  <div className="svg-card-2">
                    <Flag width="55" height="55" strokeWidth="1" />
                    <p>Scan</p>
                  </div>
                </Col>
                <Col lg="3" md="6" sm="6">
                  <div className="svg-card-2">
                    <MapPin width="55" height="55" strokeWidth="1" />
                    <p>Visit</p>
                  </div>
                </Col>
              </Row>
            </section>
          </Container>
        </div>
      </div>
    );
  }
}

export default Services;
