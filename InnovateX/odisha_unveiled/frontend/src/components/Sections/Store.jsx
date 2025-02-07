const Store = ({ background }) => {
    return (
      <section 
        className="section store-section"
        style={{ backgroundImage: `url(/assets/${background})` }}
      >
        <div className="content">
          <h2>Store</h2>
          <p>Shop for souvenirs and more...</p>
        </div>
      </section>
    );
  };
  
  export default Store;