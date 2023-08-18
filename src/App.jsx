import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Views/Home/Home'
import Form from './Views/Form/Form'
import Login from './Views/Login/Login'
import './App.css'
import SingUp from './Views/SingUp/SingUp'
import Update from './Views/Update/Update'
import NavBar from './Components/NavBar/NavBar'
import { useLocation } from 'react-router-dom'


function App() {
  const location = useLocation();

  return (

    <div>

      {location.pathname !== '/' && location.pathname !== '/SingUp' && <NavBar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/singUp' element={<SingUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form/:id' element={<Form />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/*' element={<Navigate to="/home" />} />
      </Routes>

    </div>

  )
}

export default App
