const Plan = ({ background }) => {
    return (
      <section 
        className="section plan-section"
        style={{ backgroundImage: `url(/assets/${background})` }}
      >
        <div className="content">
          <h2>Plan Your Trip</h2>
          <p>Create your perfect itinerary...</p>
        </div>
      </section>
    );
  };
  
  export default Plan;