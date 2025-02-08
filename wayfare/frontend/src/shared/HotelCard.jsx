

// Define a reusable HotelCard component
const HotelCard = ({ hotel }) => {
  const { name, address, rating, price_level } = hotel;

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '10px',
      }}
    >
      <h3 style={{ fontSize: '18px', margin: '0 0 10px' }}>{name}</h3>
      <p style={{ fontSize: '14px', color: '#555' }}>
        <strong>Address:</strong> {address}
      </p>
      <p style={{ fontSize: '14px', color: '#555' }}>
        <strong>Rating:</strong> {rating} ⭐
      </p>
      <p style={{ fontSize: '14px', color: '#555' }}>
        <strong>Price Level:</strong> {price_level}
      </p>
    </div>
  );
};

export default HotelCard;
