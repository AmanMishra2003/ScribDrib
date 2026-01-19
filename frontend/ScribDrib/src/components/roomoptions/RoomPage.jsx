import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../../Socket/ws";
import { toast } from "react-toastify";

function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // ---------------- JOIN ROOM ----------------
  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit("join-room", { roomId });

    socket.on("room-joined", ({ roomName, users }) => {
      toast.success(`Joined room: ${roomName}`);
      console.log("Users:", users);
    });

    socket.on("user-joined", ({ name }) => {
    //   console.log(`${name} joined the room`);
    toast.info(`${name} joined the room`);
    });

    socket.on("user-left", ({ name }) => {
      console.log(`${name} left the room`);
      toast.info(`${name} left the room`);
    });

    socket.on("room-closed", () => {
    //   alert("Host left. Room closed.");
      toast.error("Host left. Room closed.");
      navigate("/");
    });

    return () => {
      socket.off("room-joined");
      socket.off("user-joined");
      socket.off("user-left");
      socket.off("room-closed");
    };
  }, [roomId, navigate]);

  // ---------------- LEAVE ROOM ----------------
  const leaveRoom = () => {
    socket.emit("leave-room", { roomId });

    socket.disconnect(); // optional but recommended
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Room: {roomId}</h1>

      <button style={styles.leaveBtn} onClick={leaveRoom}>
        Leave Room 🚪
      </button>
    </div>
  );
}

export default RoomPage;

// ---------------- STYLES ----------------
const styles = {
  page: {
    minHeight: "100vh",
    background: "#020817",
    color: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "40px",
  },
  leaveBtn: {
    padding: "14px 24px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    cursor: "pointer",
  },
};
