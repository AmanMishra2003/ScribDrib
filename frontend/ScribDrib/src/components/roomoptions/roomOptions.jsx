
const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #0f172a, #020817)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#f8fafc",
    fontSize: "38px",
    marginBottom: "40px",
  },
  container: {
    display: "flex",
    gap: "70px",
  },
  box: {
    background: "#020817",
    padding: "50px",
    borderRadius: "22px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
    transition: "0.3s",
  },
  glowLeft: {
    boxShadow: "0 0 40px rgba(56,189,248,0.3)",
  },
  glowRight: {
    boxShadow: "0 0 40px rgba(167,139,250,0.3)",
  },
  input: {
    width: "100%",
    padding: "14px",
    margin: "20px 0",
    borderRadius: "10px",
    border: "2px solid #334155",
    background: "#020817",
    color: "#f8fafc",
  },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#38bdf8,#6366f1)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
  secondaryBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#a78bfa,#ec4899)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
};
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../Socket/ws";
import { toast } from "react-toastify";

function RoomOptions() {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  // Cleanup socket listeners
//  useEffect(() => {
//   socket.on("connect_error", (err) => {
//     console.log("Socket error:", err.message);

//     if (
//       err.message.includes("token") ||
//       err.message.includes("Authentication")
//     ) {
//       toast.error("Session expired. Please login again.");
//       socket.disconnect();
//       navigate("/auth/login");
//     }
//   });

//   return () => {
//     socket.off("connect_error");
//   };
// }, [navigate]);

  // ================= CREATE ROOM =================
  const handleCreate = () => {
    if (!roomName.trim()) return toast.warning("Enter room name");

    if (!socket.connected) socket.connect();

    socket.emit("createRoom", { roomName });

    socket.once("roomCreated", ({ roomId }) => {
      navigate(`/room/${roomId}`);
    });

    socket.once("error", (msg) => {
      console.log(msg);
      alert(msg);
    });
  };

  // ================= JOIN ROOM =================
  const handleJoin = () => {
    if (!roomId.trim()) return toast.warning("Enter room ID");

    if (!socket.connected) socket.connect();

    socket.emit("joinRoom", { roomId });

    socket.once("roomJoined", ({ roomId,  }) => {
      // console.log("Joined Room:", { roomId, users });
      navigate(`/room/${roomId}`);
    });

    socket.once("error", (msg) => {
      toast.error(msg);
      console.log(msg);
      alert(msg);
    });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Start a Session 🚀</h1>

      <div style={styles.container}>
        <div style={{ ...styles.box, ...styles.glowLeft }}>
          <h2>Create Room</h2>
          <input
            style={styles.input}
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button style={styles.primaryBtn} onClick={handleCreate}>
            Create
          </button>
        </div>

        <div style={{ ...styles.box, ...styles.glowRight }}>
          <h2>Join Room</h2>
          <input
            style={styles.input}
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button style={styles.secondaryBtn} onClick={handleJoin}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomOptions;
