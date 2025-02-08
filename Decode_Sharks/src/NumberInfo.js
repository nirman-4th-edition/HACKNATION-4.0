import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper, Grid, List, ListItem, ListItemText } from '@mui/material';

const NumberInfo = () => {
  const [number, setNumber] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/number-info', {
        params: { number },
      });
      setData(response.data); // Assuming response.data is an array of objects
    } catch (error) {
      alert('Failed to fetch data');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#00ff00' }}>
          Number Information
        </Typography>
        <Paper elevation={3} sx={{ padding: 3, background: '#111', border: '1px solid #00ff00' }}>
          <TextField
            label="Enter Number"
            variant="outlined"
            fullWidth
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            sx={{ mb: 2, input: { color: '#00ff00' }, label: { color: '#00ff00' } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={fetchData}
            sx={{ background: '#00ff00', color: '#000' }}
          >
            Fetch Data
          </Button>
        </Paper>
        {data && (
          <Paper elevation={3} sx={{ padding: 3, mt: 4, background: '#111', border: '1px solid #00ff00' }}>
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#00ff00' }}>
              Result
            </Typography>
            {data.map((item, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ color: '#00ff00', mb: 2 }}>
                  Record {index + 1}
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(item).map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={key}>
                      <List>
                        <ListItem sx={{ borderBottom: '1px solid #00ff00' }}>
                          <ListItemText
                            primary={key.toUpperCase()}
                            secondary={value}
                            primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold' }}
                            secondaryTypographyProps={{ color: '#00ff00' }}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default NumberInfo;
