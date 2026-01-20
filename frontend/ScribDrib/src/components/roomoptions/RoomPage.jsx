import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../../Socket/ws";
import { toast } from "react-toastify";
import Whiteboard from "../WhiteBoardLibrary/WhiteBoard";

function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("members");
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit("join-room", { roomId });

    socket.on("room-joined", ({ roomName }) => toast.success(`Joined room: ${roomName}`));
    socket.on("user-joined", ({ name }) => toast.info(`${name} joined the room`));
    socket.on("user-left", ({ name }) => toast.info(`${name} left the room`));
    socket.on("room-closed", () => {
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

  return (
    <div style={styles.page}>
      <div style={styles.boardArea}>
        <div style={styles.roomHeader}>
          <div style={styles.roomIdBox}>
            <span style={styles.roomText}>Room ID: {roomId}</span>
            <button
              style={styles.copyIcon}
              title="Copy Room ID"
              onClick={() => {
                navigator.clipboard.writeText(roomId)
                toast.success('Copy to Clipboard');
              }}
            >
              copy
            </button>
          </div>

          <div style={styles.headerActions}>
            <button
              style={micOn ? styles.voiceBtn : styles.voiceBtnOff}
              onClick={() => setMicOn(!micOn)}
            >
              <span style={styles.micWrapper}>
                <span style={styles.micIcon}>🎙️</span>
                {!micOn && <span style={styles.micSlash}>/</span>}
              </span>
            </button>

            <button style={styles.leaveBtn} onClick={() => navigate("/")}>
              Leave
            </button>
          </div>
        </div>

        <Whiteboard/>

        {/* <div style={styles.boardBody}>
          <h2>Whiteboard Area</h2>
          <div style={styles.boardToolbar}>
            <button style={styles.drawBtn}>🖊️</button>
          </div>
        </div> */}
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.tabs}>
          <button style={activeTab === "members" ? styles.activeTab : styles.tab} onClick={() => setActiveTab("members")}>
            Members
          </button>
          <button style={activeTab === "chat" ? styles.activeTab : styles.tab} onClick={() => setActiveTab("chat")}>
            ChatBox
          </button>
          <button style={activeTab === "image" ? styles.activeTab : styles.tab} onClick={() => setActiveTab("image")}>
            Image Generation
          </button>
        </div>

        <div style={styles.tabContent}>
          {activeTab === "members" && <Members />}
          {activeTab === "chat" && <ChatBox />}
          {activeTab === "image" && <ImageGenerator />}
        </div>
      </div>
    </div>
  );
}

export default RoomPage;

//  COMPONENTS 
function Members() {
  return <div>Room Members Here</div>;
}
function ChatBox() {
  return <div>Chat Messages Here</div>;
}
function ImageGenerator() {
  return <div>Image Generator UI Here</div>;
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020817",
    color: "#f8fafc",
    display: "flex",
  },

  boardArea: {
    flex: 1,
    margin: "10px",
    border: "1.5px solid rgba(255,255,255,0.25)",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  roomHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.03)",
  },

  roomIdBox: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  roomText: { color: "#e5e7eb", fontWeight: "600" },

  copyIcon: {
    border: "1px solid rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.05)",
    color: "#e5e7eb",
    cursor: "pointer",
    fontSize: "13px",
    padding: "3px 6px",
    borderRadius: "6px",
    boxShadow: "0 0 6px rgba(255,255,255,0.25)",
  },

  headerActions: { display: "flex", gap: "8px" },

  voiceBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    cursor: "pointer",
  },

  voiceBtnOff: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid rgba(255,0,0,0.6)",
    background: "rgba(255,0,0,0.15)",
    color: "white",
    cursor: "pointer",
  },

  micWrapper: { position: "relative", display: "inline-block" },
  micIcon: { fontSize: "16px" },
  micSlash: {
    position: "absolute",
    top: "-2px",
    left: "6px",
    color: "red",
    fontWeight: "800",
    fontSize: "18px",
  },

  leaveBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  rightPanel: {
    width: "340px",
    margin: "10px",
    border: "1.5px solid rgba(255,255,255,0.25)",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  tabs: {
    display: "flex",
    gap: "6px",
    padding: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.25)",
  },

  tab: {
    flex: 1,
    padding: "8px",
    background: "#020817",
    color: "#94a3b8",
    border: "1px solid #0c0d0dff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
  },

  activeTab: {
    flex: 1,
    padding: "8px",
    background: "#ebeff1ff",
    color: "#020817",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "13px",
  },

  tabContent: {
    flex: 1,
    padding: "12px",
    overflowY: "auto",
  },
};
