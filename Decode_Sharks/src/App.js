import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Login from './Login';
import Dashboard from './Dashboard';
import NumberInfo from './NumberInfo';
import SimOwner from './SimOwner';
import BankDetails from './BankDetails';
import VehicleDetails from './VehicleDetails';
import UpiInfo from './UpiInfo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{
          background: 'linear-gradient(to bottom, #000, #111)',
          minHeight: '100vh',
          color: '#00ff00',
        }}
      >
        {isLoggedIn ? (
          <>
            <Navbar onLogout={handleLogout} />
            <Box sx={{ display: 'flex' }}>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/number-info" element={<NumberInfo />} />
                  <Route path="/sim-owner" element={<SimOwner />} />
                  <Route path="/bank-details" element={<BankDetails />} />
                  <Route path="/vehicle-details" element={<VehicleDetails />} />
                  <Route path="/upi-info" element={<UpiInfo />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </Box>
            </Box>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </Box>
    </Router>
  );
}

export default App;
