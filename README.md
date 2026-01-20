# ScribDrib - Real-Time Collaborative Whiteboard

## Project Overview

**ScribDrib** is a real-time collaborative whiteboard application designed for team coordination and visual brainstorming. Built for DevJam 2026, it enables multiple users to work simultaneously on shared boards with live synchronization.

### Team Information
- **Team Name:** CodeJam
- **Team Leader:** Aman Mishra (AmanMishra2003)
- **Members:** 
  - Ayush Pratap Singh (ayush09-15)
  - Suraj Kumar Gupta (suraj3722)

---

## Technology Stack

### Frontend
- **Framework:** React 19.2.0
- **UI Styling:** Tailwind CSS 4.1.18
- **Canvas Library:** Fabric.js 7.1.0
- **Routing:** React Router DOM 7.12.0
- **Real-time Communication:** Socket.IO Client 4.8.3
- **HTTP Client:** Axios 1.13.2
- **Animations:** GSAP 3.14.2
- **Icons:** Lucide React
- **Notifications:** React Toastify

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.2.1
- **Database:** MongoDB (Mongoose 9.1.3)
- **Real-time Engine:** Socket.IO 4.8.3
- **Authentication:** JWT (jsonwebtoken 9.0.3)
- **Password Security:** Bcrypt.js 3.0.3

---

## Current Features (Implemented)

### 1. User Authentication System ✅
- **User Registration:** Secure signup with password hashing
- **User Login:** JWT-based authentication
- **Session Management:** Token-based authorization
- **Protected Routes:** Access control for authenticated users
- **Local Storage Integration:** Persistent user sessions

**Files:**
- `backend/Router/authRouter.js` - Authentication routes
- `backend/models/authModel.js` - User schema with password hashing
- `frontend/src/components/AuthComponents/` - Login/Signup UI

---

### 2. Real-Time Room System ✅
- **Create Room:** Host can create collaborative rooms with unique IDs
- **Join Room:** Users can join existing rooms via room ID
- **Room ID Generation:** UUID-based 8-character unique identifiers
- **Socket Authentication:** Token verification for WebSocket connections
- **Room Lifecycle Management:**
  - Active room tracking
  - User presence tracking
  - Host-based room closure
  - Automatic cleanup on host disconnect

**Files:**
- `backend/index.js` - Socket.IO server setup
- `backend/models/roomModel.js` - Room schema
- `frontend/src/components/roomoptions/` - Room creation/joining UI

---

### 3. Advanced Whiteboard Features ✅

#### Drawing Tools
- **Select Tool:** Object selection and manipulation
- **Pen Tool:** Freehand drawing with customizable stroke
- **Shape Tools:**
  - Rectangle
  - Circle
  - Line
- **Text Tool:** Editable text annotations
- **Eraser Tool:** Object removal

#### Customization Options
- **Stroke Color Picker:** Full color spectrum
- **Fill Color Picker:** Transparent or solid fills
- **Stroke Width:** Adjustable from 1-20px
- **Dynamic Properties:** Real-time property updates for selected objects

#### Canvas Operations
- **Undo/Redo:** Full history management (50 states)
- **Delete Objects:** Remove selected elements
- **Duplicate:** Clone selected objects

**Files:**
- `frontend/src/components/WhiteBoardLibrary/WhiteBoard.jsx` - Complete whiteboard implementation

---

### 4. UI/UX Features ✅
- **Dark Theme:** Modern dark mode interface
- **Loading Indicators:** Visual feedback for async operations
- **Toast Notifications:** User action confirmations
- **Professional Forms:** Validation and error handling

**Files:**
- `frontend/src/components/AuthComponents/auth.css` - Custom styled auth pages
- `frontend/src/index.css` - Global Tailwind configuration

---

### 5. API Architecture ✅
- **RESTful Endpoints:**
  - `POST /auth/signup` - User registration
  - `POST /auth/login` - User authentication
- **WebSocket Events:**
  - `createRoom` - Room creation
  - `joinRoom` - Join existing room
  - `disconnect` - User disconnect handling
- **Axios Interceptors:**
  - Automatic token injection
  - Unauthorized request handling

**Files:**
- `frontend/src/API/axios.js` - Configured Axios instance
- `backend/middleware/socketAuth.js` - Socket authentication middleware

---

## Planned Features (Roadmap)

### Real-Time Synchronization 🔄
**Priority:** HIGH

- **Canvas State Sync:** Broadcast drawing operations to all room participants
- **Cursor Tracking:** Show other users' cursor positions
- **Active User Indicators:** Display who's currently drawing
- **Presence System:** Real-time user join/leave notifications

**Technical Approach:**
```javascript
// Event structure
socket.emit('canvas:draw', {
  roomId,
  action: 'object:added',
  object: fabricObject.toJSON()
});
```

---

### Permission System 👥
**Priority:** MEDIUM

- **Role-Based Access:**
  - Host: Full control
  - Editor: Can draw and edit
  - Viewer: Read-only access
- **Individual Permissions:** Toggle draw access per user
- **Lock Objects:** Prevent modification of specific elements
- **Permission UI:** Visual indicators for user roles

**Database Update:**
```javascript
users: [{
  userId: ObjectId,
  role: String, // 'host' | 'editor' | 'viewer'
  permissions: {
    canDraw: Boolean,
    canDelete: Boolean,
    canExport: Boolean
  }
}]
```

---

## Project Structure

```
ScribDrib/
├── backend/
│   ├── Router/
│   │   ├── authRouter.js      # Authentication routes
│   │   └── homeRouter.js      # Home routes
│   ├── models/
│   │   ├── authModel.js       # User schema
│   │   └── roomModel.js       # Room schema
│   ├── middleware/
│   │   ├── authorization.js   # HTTP auth middleware
│   │   └── socketAuth.js      # WebSocket auth
│   └── index.js               # Server entry point
│
├── frontend/ScribDrib/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthComponents/   # Login/Signup
│   │   │   ├── Home/             # Landing page
│   │   │   ├── roomoptions/      # Room create/join
│   │   │   ├── WhiteBoardLibrary/# Canvas implementation
│   │   │   └── ui/               # Reusable components
│   │   ├── API/
│   │   │   └── axios.js          # API client
│   │   ├── Socket/
│   │   │   └── ws.js             # Socket.IO client
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   └── public/
│
└── package.json
```

---

## Installation & Setup

### Prerequisites
- Node.js >= 20.0.0
- MongoDB installed and running
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
DATABASEURL=mongodb://localhost:27017/scribdrib
JWTSECRET=your_secret_key_here
```

Start server:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend/ScribDrib
npm install
npm run dev
```

Application runs on:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## Contact & Support

**Team CodeJam**
- Aman Mishra: aman.2025ca012@mnnit.ac.in
- Ayush Pratap Singh: ayush.2025ca027@mnnit.ac.in
- Suraj Kumar Gupta: suraj.2025ca100@mnnit.ac.in

---

## Acknowledgments

- **Fabric.js** - Canvas manipulation library
- **Socket.IO** - Real-time communication
- **Tailwind CSS** - Utility-first styling
- **MongoDB** - Document database
- **React** - UI framework

---

**Last Updated:** January 20, 2026  
**Version:** 1.0.0-beta  
**Status:** In Active Development
