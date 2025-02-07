const Attractions = ({ background }) => {
    return (
      <section 
        className="section attractions-section"
        style={{ backgroundImage: `url(/assets/${background})` }}
      >
        <div className="content">
          <h2>Attractions</h2>
          <p>Explore the beautiful places...</p>
        </div>
      </section>
    );
  };
  
  export default Attractions;