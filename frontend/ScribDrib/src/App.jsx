import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import RoomOptions from "./components/roomoptions/roomOptions.jsx";


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
      <Route path="/room-options" element={<RoomOptions />} />
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
