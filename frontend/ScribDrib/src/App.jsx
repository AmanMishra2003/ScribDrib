import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import RoomOptions from "./components/roomoptions/roomOptions.jsx";
import RoomPage from "./components/roomoptions/RoomPage.jsx";


// HomePage
import HomePage from './components/Home/HomePage'

// Auth Components
import AuthComponent from './components/AuthComponents/AuthComponent'
import Login from './components/AuthComponents/Login'
import Signup from './components/AuthComponents/Signup'



// White Board Demo Component
import Whiteboard from './components/WhiteBoardLibrary/WhiteBoard';

function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      {/* Home page */}
      <Route path='/' element={<HomePage />} />
      <Route path='/demo' element={<Whiteboard/>}/>
      <Route path="/joinRoom" element={<RoomOptions />} />
      <Route path="/room/:roomId" element={<RoomPage/>}/>
      {/* Auth layout */}
      <Route path='/auth' element={<AuthComponent />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        {/*Room Options*/}
      </Route>
    </Routes>
    </>
  )
}

export default App
