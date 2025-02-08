import React from 'react'
import './footer.css'
import { Container, Row , Col, ListGroup , ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/horizon.png'


const quick__links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/tours',
    display: 'Explore',
  },
];

const quick__links2 = [
  {
    path: '/tours',
    display: 'Explore',
  },
  {
    path: '/login',
    display: 'Login',
  },
  {
    path: '/register',
    display: 'Register',
  },
];

const Footer = () => {

  const year=new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
              <div className='logo'>
                <img src={logo} alt="" />
                <p>Life is a sacred journey—seek the divine, but take each step with reverence. It's the small moments that make the path whole.</p>
              </div>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {
                quick__links.map((item,index) => (
                  <ListGroupItem key={index} className="ps-0 border-0">
                   <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                )) }
            </ListGroup>
          </Col>
          <Col lg='3'>
          <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {
                quick__links2.map((item,index) => (
                  <ListGroupItem key={index} className="ps-0 border-0">
                   <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                )) }
            </ListGroup>
          </Col>
          <Col lg='3'>
          <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">
                 <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                 <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i class="ri-map-pin-line"></i></span>
                  Address:
                 </h6>
                 <p className="mb-0">Bhubaneswar</p>
                 </ListGroupItem>
                 <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                 <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i class="ri-mail-line"></i></span>
                  Email:
                 </h6>
                 <p className="mb-0">WaYfare@gmail.com</p>
                 </ListGroupItem>
                 <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                 <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i class="ri-phone-fill"></i></span>
                  Phone:
                 </h6>
                 <p className="mb-0">+91 84580 04035</p>
                 </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg='12' className='text-center pt-5'>
            <p className='copyright'>Copyright {year} , Design and Developed by Wayfare Team.
             All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
