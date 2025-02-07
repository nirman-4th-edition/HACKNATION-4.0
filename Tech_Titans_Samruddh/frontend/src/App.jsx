import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/SignUp';
import RefreshHandler from './RefreshHandler';
function App() {
  

  return (
    <>
    <RefreshHandler/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  )
}

export default App
