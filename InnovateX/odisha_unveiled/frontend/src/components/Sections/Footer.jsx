const Footer = ({ background }) => {
    return (
      <section 
        className="section footer-section"
        style={{ backgroundImage: `url(/assets/${background})` }}
      >
        <div className="content">
          <h2>Important Links</h2>
          <div className="links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </section>
    );
  };
  
  export default Footer;