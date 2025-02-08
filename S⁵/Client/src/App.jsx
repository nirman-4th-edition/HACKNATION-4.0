import React, { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import AuthPage from './pages/AuthPage'
import { SignUpPage } from './pages/SignUpPage'
import LandingPage from './pages/LandingPage'
import DollarScene from './pages/DollarScene'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Questionnaire from './pages/Questionnaire'
const App = () => {
  useEffect(()=>{
      const lenis = new Lenis();
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
  })
  return (
    <>
      {/* <AuthPage/> */}
      {/* <Questionnaire/> */}
      {/* <LandingPage/> */}
      <Dashboard/>
    </>
  )
}

export default App