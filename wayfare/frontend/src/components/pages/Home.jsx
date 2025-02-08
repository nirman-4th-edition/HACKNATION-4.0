import React from 'react'
import { useEffect, useRef } from "react";


import  "../../styles/home.css"
import {Container, Row, Col} from 'reactstrap'
import heroImg from "../../assets/images/hero-img01.jpg"
import heroImg02 from '../../assets/images/hero-img02.jpg'
import heroVideo  from '../../assets/images/hero-video.mp4'
import experienceImg from '../../assets/images/trip.png'
import SearchBar from '../../shared/SearchBar'
import ServiceList from '../../services/ServiceList'
import MasonryImagesGallery from '../Image-gallery/MasonryImagesGallery'
import Testimonials from '../Testimonial/Testimonials'



const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.log("Autoplay failed:", error));
    }
  }, []);  return  <>
    <div class="backG">
    <section>
      
      <Container>
        <Row>
          <Col lg='6'>
            <div className="hero__content">
               <h1>Welcome to Tirthasathi!!<br></br><span className="highlight">अतिथिदेवो भव!</span></h1>
               <p>Life is a divine path—each step a blessing. Aim high, but walk with grace, embracing every moment. The journey itself is the reward. Welcome, and may peace guide your way.</p>
            </div>
          </Col>
            <Col lg='2'>
              <div className='hero__img-box'>
               <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg='2'>
              <div className='hero__img-box mt-4'>
              <video ref={videoRef} src={heroVideo} controls autoPlay muted />
              </div>
            </Col>
            <Col lg='2'>
              <div className='hero__img-box mt-5'>
               <img src={heroImg02} alt="" />
              </div>
            </Col>
          
        </Row>
      </Container>
    </section>
         <section>
          <Container>
            <Row>
              <Col lg="3">
                <h5 className="services__subtitle">
                  What we Serve
                </h5>
                <h2 className="services__title">
                  We offer Best Services
                </h2>
              </Col>
              <ServiceList />
            </Row>
          </Container>
         </section>
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <SearchBar />  
          </Col>
        </Row>
      </Container>
    </section>

          <section>
            <Container>
              <Row>
                <Col lg='6'>
                  <div className="experience__content">
                    <h5 className="services__subtitle">
                    Experience
                </h5>
                    <h2>
                      With our all experience <br/> we will serve you.
                    </h2>
                    <p>
                    Pilgrimage leaves you in awe, and turns your heart into a story of devotion.
                    <br/>
                    We travel, some of us forever, to seek other states, other lives, other souls.
                    </p>
                  </div>
                  <div className="counter__wrapper d-flex align-items-center gap-5">
                    <div className="counter__box">
                      <span>0</span>
                      <h6>Successful Trips!</h6>
                    </div>
                    <div className="counter__box">
                      <span>0</span>
                      <h6>Regular Clients</h6>
                    </div>
                    <div className="counter__box">
                      <span>0</span>
                      <h6>Months of Experience!</h6>
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="experience__img">
                    <img src={experienceImg} alt="" />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
           <section>
            <Container>
              <Row>
                <Col lg='12'>
                  <h5 className="services__subtitle">
                    Gallery
                </h5>
                  <h2 className="gallery__title">
                    Visit our customers Tour Gallery!
                  </h2>
                </Col>
                <Col lg='12'>
                 <MasonryImagesGallery  ku/>
                </Col>
              </Row>
            </Container>
           </section>
           <section>
            <Container>
              <Row>
                <Col lg='12'>
                  <h5 className="services__subtitle">
                    Customer's Love
                </h5>
                  <h2 className="testimonial__title">What our Customer's say about us?</h2>
                </Col>
                <Col lg='12'>
                  <Testimonials />
                </Col>
              </Row>
            </Container>
           </section>
           </div>



  </>
}


export default Home
