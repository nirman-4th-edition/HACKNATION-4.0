const { getRouter } = require('../mediasoup-config');

let rooms = {}; // Stores room details

const createRoom = async (roomId) => {
  if (!rooms[roomId]) {
    const router = await getRouter();
    rooms[roomId] = {
      router,
      peers: {},
      transports: [],
      producers: [],
      consumers: [],
    };
  }
  return rooms[roomId];
};

const getRoom = (roomId) => {
  return rooms[roomId] || null;
};

const removeRoom = (roomId) => {
  if (rooms[roomId]) {
    rooms[roomId].transports.forEach((t) => t.close());
    rooms[roomId].producers.forEach((p) => p.close());
    rooms[roomId].consumers.forEach((c) => c.close());
    delete rooms[roomId];
  }
};

module.exports = { createRoom, getRoom, removeRoom };
