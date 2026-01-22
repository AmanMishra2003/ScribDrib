import './App.css'
import { Routes, Route,Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import RoomOptions from "./components/roomoptions/roomOptions.jsx";
import RoomPage from "./components/roomoptions/RoomPage.jsx";
import HistoryPage from "./components/HistoryPage/HistoryPage.jsx";
import PageNotFound from './components/notFoundPage/PageNotFound';
//import HistoryRoomPage from "./components/HistoryPage/HistoryRoomPage.jsx";


// HomePage
import LandingPage from './components/Home/LandingPage';


// Auth Components
import AuthComponent from './components/AuthComponents/AuthComponent'
import Login from './components/AuthComponents/Login'
import Signup from './components/AuthComponents/Signup'



// White Board Demo Component
import Whiteboard from './components/WhiteBoardLibrary/WhiteBoard';

function ProtectRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      {/* Home page */}
     <Route path="/" element={<LandingPage />} />
      <Route path='/demo' element={<Whiteboard/>}/>
      <Route path="/joinRoom" element={<ProtectRoute><RoomOptions /></ProtectRoute>} />
      <Route path="/room/:roomId" element={<ProtectRoute><RoomPage/></ProtectRoute>}/>
      <Route path="/history" element={<ProtectRoute><HistoryPage /></ProtectRoute>}/>
      {/* <Route path="/history/whiteboard" element={<ProtectRoute><WhiteboardHistoryPage /></ProtectRoute>}/> */}
  {/*<Route 
  path="/history/room/:roomId" 
  element={<ProtectRoute><HistoryRoomPage /></ProtectRoute>}
/>*/}
      {/* Auth layout */}
      <Route path='/auth' element={<AuthComponent />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>

      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </>
  )
}

export default App
