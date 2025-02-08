const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mediasoup = require('mediasoup');
const { createRoom, getRoom, removeRoom } = require('./rooms/roomManager');
const { addPeer, getPeer, removePeer } = require('./peers/peerManager');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// Serve static frontend files
app.use(express.static('public'));

io.on('connection', async (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('joinRoom', async ({ username, roomId }) => {
    console.log(`${username} (${socket.id}) joined room: ${roomId}`);

    let room = await createRoom(roomId);
    addPeer(socket.id, roomId);

    socket.join(roomId);
    io.to(roomId).emit('newParticipant', { id: socket.id });

    socket.emit('roomJoined', { roomId, username });
  });

  socket.on('requestStream', ({ from, to }) => {
    console.log(`Stream request from ${from} to ${to}`);
    io.to(to).emit('receiveStream', { from, streamId: from });
  });

  socket.on('leaveRoom', async ({ id }) => {
    let peer = getPeer(id);
    if (peer) {
      socket.leave(peer.roomId);
      removePeer(id);
      io.to(peer.roomId).emit('participantLeft', id);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    let peer = getPeer(socket.id);
    if (peer) {
      io.to(peer.roomId).emit('participantLeft', socket.id);
      removePeer(socket.id);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
