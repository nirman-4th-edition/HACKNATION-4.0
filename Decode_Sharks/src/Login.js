import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      if (response.data.success) {
        onLogin(); // Trigger login state update
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            textAlign: 'center',
            background: '#111',
            border: '1px solid #00ff00',
            animation: 'fadeIn 1s ease-in',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#00ff00' }}>
            <TypeAnimation
              sequence={[
                'CyberCrime Investigation Tool',
                1000,
                'Access Restricted',
                1000,
                'Login to Proceed',
                1000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ input: { color: '#00ff00' }, label: { color: '#00ff00' } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ input: { color: '#00ff00' }, label: { color: '#00ff00' } }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 3, background: '#00ff00', color: '#000' }}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
