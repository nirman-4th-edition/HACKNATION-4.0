const socket = io();
let localStream;
let peers = {}; // Stores all connected peers

document.getElementById('join-button').addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const roomId = document.getElementById('room-id').value;

  if (username && roomId) {
    socket.emit('joinRoom', { username, roomId });

    document.getElementById('join-screen').style.display = 'none';
    document.getElementById('controls').style.display = 'block';
    document.getElementById('participant-view').style.display = 'block';

    try {
      localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      addParticipantVideo(socket.id, localStream, true); // Show own video
      socket.emit('newParticipant', { id: socket.id, roomId });

    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Could not access your camera and microphone. Please check permissions.');
    }
  } else {
    alert('Please enter your name and room ID.');
  }
});

// Handle new participants
socket.on('newParticipant', async ({ id }) => {
  if (!peers[id]) {
    peers[id] = { id };
    // Request stream from the new participant
    socket.emit('requestStream', { from: socket.id, to: id });
  }
});

// Handle stream requests
socket.on('receiveStream', ({ from, streamId }) => {
  if (!peers[from]) {
    peers[from] = { id: from };
  }
  // Display video from the other peer
  addParticipantVideo(from, streamId, false);
});

// Listen for participant leaving
socket.on('participantLeft', (id) => {
  removeParticipantVideo(id);
  delete peers[id];
});

// Mute/unmute audio
document.getElementById('mute-button').addEventListener('click', () => {
  let audioTrack = localStream.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;
  document.getElementById('mute-button').textContent = audioTrack.enabled ? 'Mute' : 'Unmute';
});

// Start/stop video
document.getElementById('video-button').addEventListener('click', () => {
  let videoTrack = localStream.getVideoTracks()[0];
  videoTrack.enabled = !videoTrack.enabled;
  document.getElementById('video-button').textContent = videoTrack.enabled ? 'Stop Video' : 'Start Video';
});

// Leave room
document.getElementById('leave-button').addEventListener('click', () => {
  socket.emit('leaveRoom', { id: socket.id });
  localStream.getTracks().forEach(track => track.stop());
  socket.disconnect();

  document.getElementById('join-screen').style.display = 'block';
  document.getElementById('controls').style.display = 'none';
  document.getElementById('participant-view').style.display = 'none';
  document.getElementById('participant-view').innerHTML = '';
});

// Add video element
const addParticipantVideo = (id, stream, isLocal) => {
  let videoElement = document.createElement('video');
  videoElement.id = id;
  videoElement.srcObject = isLocal ? stream : null;
  videoElement.autoplay = true;
  document.getElementById('participant-view').appendChild(videoElement);
};

// Remove video element
const removeParticipantVideo = (id) => {
  let videoElement = document.getElementById(id);
  if (videoElement) {
    videoElement.remove();
  }
};
