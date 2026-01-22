import { useEffect, useState } from "react";
import { ArrowLeft, Play, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./HistoryPage.css";

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([
      {
        id: 1,
        roomName: "Design Brainstorm",
        createdBy: "Ayush",
        date: "10 Jan 2026",
      },
      {
        id: 2,
        roomName: "Math Whiteboard",
        createdBy: "Aman",
        date: "08 Jan 2026",
      },
      {
        id: 3,
        roomName: "System Design",
        createdBy: "Ayush",
        date: "05 Jan 2026",
      },
    ]);
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleOpenRoom = (roomId) => {
    console.log("Open room:", roomId);
  };

  return (
    <div className="history-page-wrapper">
      <div className="history-container">
        
        {/* MAIN CONTAINER */}
        <div className="history-content-box">

          {/* Back Button */}
          <button onClick={handleBackToHome} className="history-back-button">
            <ArrowLeft size={22} />
            <span>Back to Home</span>
          </button>

          {/* Page Title */}
          <div className="history-header">
            <h1 className="history-title">History</h1>
            <p className="history-subtitle">View and manage your whiteboard sessions</p>
          </div>

          {/* History Cards */}
          <div className="history-cards-container">
            {history.map((room) => (
              <div key={room.id} className="history-card">
                
                {/* Room Name */}
                <h2 className="history-room-name">{room.roomName}</h2>

                {/* Bottom Row */}
                <div className="history-bottom-row">
                  
                  {/* Created By */}
                  <div className="history-info-box">
                    <User size={18} className="history-icon-user" />
                    <div className="history-info-content">
                      <span className="history-info-label">Created by:</span>
                      <span className="history-info-value">{room.createdBy}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="history-info-box">
                    <Calendar size={18} className="history-icon-calendar" />
                    <div className="history-info-content">
                      <span className="history-info-label">Date:</span>
                      <span className="history-info-value date">{room.date}</span>
                    </div>
                  </div>

                  {/* Open Button */}
                  <button
                    onClick={() => handleOpenRoom(room.id)}
                    className="history-open-button"
                  >
                    <Play size={20} fill="white" />
                    <span>Open</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}