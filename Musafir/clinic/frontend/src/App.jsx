import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LandingPage from './Pages/LandingPage'
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/Dashboard" element={<HomePage/>} />
        </Routes>
      </div>
      </Router>
  )
}
export default App