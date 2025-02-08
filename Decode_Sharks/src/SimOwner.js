import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper, Grid, List, ListItem, ListItemText } from '@mui/material';

const SimOwner = () => {
  const [number, setNumber] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sim-owner', {
        params: { number },
      });
      setData(response.data); // Set the response data
    } catch (error) {
      alert('Failed to fetch data');
    }
  };

  // Function to render data in a compact table-like format
  const renderData = (data) => {
    if (!data) return null;

    const { num, name, status, carrier, balance, other } = data;

    return (
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          {/* Number */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="📱 Number"
                  secondary={num}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Name */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="👤 Name"
                  secondary={name}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="✅ Status"
                  secondary={status}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Carrier */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="📶 Carrier"
                  secondary={carrier}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Balance */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="💰 Balance"
                  secondary={balance || 'N/A'}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Other Details */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🔍 Other Details"
                  secondary={
                    <Box>
                      {Object.entries(other).map(([key, value]) => (
                        <Box key={key} sx={{ mt: 0.5 }}>
                          <Typography variant="body2" sx={{ color: '#00ff00', fontSize: '14px' }}>
                            <strong>{key}:</strong> {value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  }
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      {/* Adjust the top margin (mt) to ensure visibility below the navigation bar */}
      <Box sx={{ mt: 8 }}> {/* Increased mt to 8 (64px) to push content down */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#00ff00', fontSize: '24px', mb: 2 }}>
          SIM Owner Details
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, background: '#111', border: '1px solid #00ff00' }}>
          <TextField
            label="Enter Number"
            variant="outlined"
            fullWidth
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            sx={{ mb: 1, input: { color: '#00ff00', fontSize: '14px' }, label: { color: '#00ff00', fontSize: '14px' } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={fetchData}
            sx={{ background: '#00ff00', color: '#000', fontSize: '14px', padding: '6px 12px' }}
          >
            Fetch Data
          </Button>
        </Paper>
        {data && (
          <Paper elevation={3} sx={{ padding: 2, mt: 2, background: '#111', border: '1px solid #00ff00' }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#00ff00', fontSize: '18px', mb: 1 }}>
              Result
            </Typography>
            {renderData(data)}
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default SimOwner;
