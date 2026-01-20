import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../../Socket/ws";
import { toast } from "react-toastify";
import Whiteboard from "../WhiteBoardLibrary/WhiteBoard";

function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("members");
  const [micOn, setMicOn] = useState(true);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit("joinRoom", { roomId });

    socket.on("roomJoined", ({ roomName, users }) => {
      toast.success(`Joined room: ${roomName}`);
      setMembers(users); // ✅ initial members
    });

    socket.on("userJoined", ({ userId, name }) => {
      setMembers((prev) => {
        if (prev.some((u) => u.userId === userId)) return prev;
        return [...prev, { userId, name }];
      });
      toast.info(`${name} joined the room`);
    });

    socket.on("user-left", ({ userId, name }) => {
      setMembers((prev) => prev.filter((m) => m.userId !== userId));
      toast.info(`${name} left the room`);
    });

    socket.on("room-closed", () => {
      toast.error("Host left. Room closed.");
      navigate("/");
    });

    return () => {
      socket.off("roomJoined");
      socket.off("userJoined");
      socket.off("user-left");
      socket.off("room-closed");
    };
  }, [roomId, navigate]);

  return (
    <div style={styles.page}>
      {/* LEFT – WHITEBOARD */}
      <div style={styles.boardArea}>
        <div style={styles.roomHeader}>
          <div style={styles.roomIdBox}>
            <span style={styles.roomText}>Room ID: {roomId}</span>
            <button
              style={styles.copyIcon}
              onClick={() => {
                navigator.clipboard.writeText(roomId);
                toast.success("Copied to clipboard");
              }}
            >
              📋
            </button>
          </div>

          <div style={styles.headerActions}>
            <button
              style={micOn ? styles.voiceBtn : styles.voiceBtnOff}
              onClick={() => setMicOn(!micOn)}
            >
              <MicIcon isOn={micOn} />
            </button>

            <button style={styles.leaveBtn} onClick={() => navigate("/")}>
              Leave
            </button>
          </div>
        </div>

        <Whiteboard roomId={roomId} />
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.rightPanel}>
        <div style={styles.tabs}>
          <button
            style={activeTab === "members" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
          <button
            style={activeTab === "chat" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("chat")}
          >
            ChatBox
          </button>
          <button
            style={activeTab === "image" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("image")}
          >
            Image Generation
          </button>
        </div>

        <div style={styles.tabContent}>
          {activeTab === "members" && <Members members={members} />}
          {activeTab === "chat" && <ChatBox />}
          {activeTab === "image" && <ImageGenerator />}
        </div>
      </div>
    </div>
  );
}

export default RoomPage;

//////////////// COMPONENTS //////////////////

function MicIcon({ isOn }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ fontSize: "16px" }}>🎙️</span>
      {!isOn && <span style={styles.micSlash}>/</span>}
    </span>
  );
}

function Members({ members }) {
  if (!members || members.length === 0) {
    return (
      <p style={{ opacity: 0.6, fontSize: "13px" }}>
        No members in room
      </p>
    );
  }

  return (
    <div>
      {members.map((m) => (
        <div key={m.userId} style={memberStyles.row}>
          <span>{m.name}</span>

          <div style={memberStyles.actions}>
            <button style={styles.voiceBtn} title="Mic">
              🎙️
            </button>

            <button style={styles.drawBtn} title="Draw permission">
              ✏️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "You",
        text: input,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={chatStyles.wrapper}>
      <div style={chatStyles.messages}>
        {messages.map((m) => (
          <div key={m.id} style={chatStyles.messageCard}>
            <div style={chatStyles.userName}>{m.user}</div>
            <div style={chatStyles.messageText}>{m.text}</div>
            <div style={chatStyles.time}>{m.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={chatStyles.inputBox}>
        <input
          style={chatStyles.input}
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button style={chatStyles.sendBtn} onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
}

function ImageGenerator() {
  return <div>Image Generator UI Here</div>;
}

//////////////// STYLES //////////////////

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
    padding: "10px 14px",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
  },

  roomIdBox: { display: "flex", alignItems: "center", gap: "6px" },
  roomText: { fontWeight: "600" },

  copyIcon: {
    border: "1px solid rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "6px",
    padding: "3px 6px",
    cursor: "pointer",
  },

  headerActions: { display: "flex", gap: "8px" },

  voiceBtn: {
    border: "1px solid rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },

  voiceBtnOff: {
    border: "1px solid rgba(255,0,0,0.6)",
    background: "rgba(255,0,0,0.15)",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },

  drawBtn: {
    border: "1px solid rgba(255,255,255,0.4)",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
  },

  micSlash: {
    position: "absolute",
    top: "-2px",
    left: "6px",
    color: "red",
    fontWeight: "800",
    fontSize: "18px",
  },

  leaveBtn: {
    background: "linear-gradient(135deg,#ef4444,#dc2626)",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    color: "white",
    cursor: "pointer",
  },

  rightPanel: {
    width: "340px",
    margin: "10px",
    border: "1.5px solid rgba(255,255,255,0.25)",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 20px)",
    overflow: "hidden",
  },

  tabs: {
    display: "flex",
    gap: "6px",
    padding: "10px",
  },

  tab: {
    flex: 1,
    padding: "8px",
    background: "#020817",
    borderRadius: "8px",
    border: "1px solid #0c0d0dff",
    cursor: "pointer",
  },

  activeTab: {
    flex: 1,
    padding: "8px",
    background: "#ebeff1ff",
    color: "#020817",
    borderRadius: "8px",
    fontWeight: "600",
  },

  tabContent: {
    flex: 1,
    padding: "12px",
    overflow: "hidden",
  },
};

const chatStyles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  messageCard: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    padding: "8px 10px 18px 10px",
    position: "relative",
  },

  userName: { fontWeight: "600", fontSize: "13px" },
  messageText: { marginBottom: "6px" },

  time: {
    fontSize: "11px",
    color: "#9ca3af",
    position: "absolute",
    bottom: "4px",
    right: "8px",
  },

  inputBox: {
    display: "flex",
    gap: "6px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    paddingTop: "5px",
    flexShrink: 0,
  },

  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
  },

  sendBtn: {
    padding: "8px 12px",
    background: "#2563eb",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};

const memberStyles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },
};
