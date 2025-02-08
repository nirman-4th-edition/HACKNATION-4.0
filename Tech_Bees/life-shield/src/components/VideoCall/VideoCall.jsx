import { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../service/peer.js";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import { toast } from "react-hot-toast";

const Video = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const navigate = useNavigate();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  useEffect(() => {
    socket.emit("room:join", { room: roomId });
  }, []);

  const handleUserJoined = useCallback(
    ({ id }) => {
      console.log(`User ${id} joined room: ${roomId}`);
      setRemoteSocketId(id);
    },
    [roomId]
  );

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);

    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call from ${from}`);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (!myStream) return;
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log(`Call Accepted by ${from}`);
      sendStreams();
    },
    [sendStreams]
  );

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const [remoteStream] = ev.streams;
      console.log("Received Remote Stream");
      setRemoteStream(remoteStream);
    });
  }, []);

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncoming,
    handleNegoNeedFinal,
  ]);

  // Toggle Video
  const toggleVideo = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoOn;
      });
      setIsVideoOn((prev) => !prev);
    }
  };

  // Toggle Audio (Mute / Unmute)
  const toggleAudio = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !isAudioOn;
      });
      setIsAudioOn((prev) => !prev);
    }
  };

  // Disconnect and redirect to home
  const handleDisconnect = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop()); // Stop all media tracks
    }
    socket.emit("room:leave", { room: roomId });
    toast.success("Thank you for using our service!");
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <h1>Room: {roomId}</h1>
      <h4>{remoteSocketId ? "Connected to a user" : "No one in room"}</h4>

      <div style={styles.controls}>
        {remoteSocketId && (
          <button style={styles.button} onClick={handleCallUser}>
            📞 Call User
          </button>
        )}
        {myStream && (
          <button style={styles.button} onClick={sendStreams}>
            📡 Send Stream
          </button>
        )}
        {myStream && (
          <>
            <button style={styles.button} onClick={toggleVideo}>
              {isVideoOn ? "📷 Turn Video Off" : "📸 Turn Video On"}
            </button>
            <button style={styles.button} onClick={toggleAudio}>
              {isAudioOn ? "🔊 Mute" : "🔇 Unmute"}
            </button>
            <button style={styles.disconnectButton} onClick={handleDisconnect}>
              ❌ Disconnect
            </button>
          </>
        )}
      </div>

      <div style={styles.videoContainer}>
        {myStream && (
          <div style={styles.videoBox}>
            <h2>My Stream</h2>
            <ReactPlayer
              playing
              muted={!isAudioOn}
              height="200px"
              width="300px"
              url={myStream}
            />
          </div>
        )}
        {remoteStream && (
          <div style={styles.videoBox}>
            <h2>Remote Stream</h2>
            <ReactPlayer
              playing
              muted
              height="200px"
              width="300px"
              url={remoteStream}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  controls: {
    marginBottom: "20px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
  },
  disconnectButton: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#dc3545",
    color: "white",
  },
};

export default Video;
