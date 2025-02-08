let peers = {}; // Stores all connected peers

const addPeer = (socketId, roomId) => {
  if (!peers[socketId]) {
    peers[socketId] = { socketId, roomId, transports: [], producers: [], consumers: [] };
  }
  return peers[socketId];
};

const getPeer = (socketId) => {
  return peers[socketId] || null;
};

const removePeer = (socketId) => {
  if (peers[socketId]) {
    peers[socketId].transports.forEach((t) => t.close());
    peers[socketId].producers.forEach((p) => p.close());
    peers[socketId].consumers.forEach((c) => c.close());
    delete peers[socketId];
  }
};

module.exports = { addPeer, getPeer, removePeer };
