import './App.css'
import { Routes, Route } from 'react-router-dom'

// HomePage
import HomePage from './components/Home/HomePage'

// Auth Components
import AuthComponent from './components/AuthComponents/AuthComponent'
import Login from './components/AuthComponents/Login'
import Signup from './components/AuthComponents/Signup'

function App() {
  return (
    <Routes>
      {/* Home page */}
      <Route path='/' element={<HomePage />} />

      {/* Auth layout */}
      <Route path='/auth' element={<AuthComponent />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default App
