
import './App.css'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'

//HomePage
import HomePage from './components/Home/HomePage'
//Auth Components
import AuthComponent from './components/AuthComponents/AuthComponent'
import Login from './components/AuthComponents/Login'
import Signup from './components/AuthComponents/Signup'


function App() {

  return (
    // create Browsing Routers 
    <BrowserRouter>

      {/* all routes inside Routes tag */}
      <Routes>
        <Route path='/' element={<HomePage/>} /> {/* home page */}

        {/* auth Path */}
        <Route path='/auth' element={<AuthComponent/>}> {/* auth component have outlet for login and signup page */}
            <Route path='login' element={<Login/>} /> {/* login page */}
            <Route path='signup' element={<Signup/>} /> {/* signup page */}
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
