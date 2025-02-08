import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: '#111',
        height: '64px', // Set a fixed height
      }}
    >
      <Toolbar sx={{ minHeight: '64px' }}> {/* Adjust toolbar height */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#00ff00', fontSize: '1.25rem' }}>
          CyberCrime Investigation Tool By Decode Shark
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard" sx={{ color: '#00ff00', fontSize: '0.875rem' }}>
          Dashboard
        </Button>
        <Button color="inherit" onClick={onLogout} sx={{ color: '#00ff00', fontSize: '0.875rem' }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
