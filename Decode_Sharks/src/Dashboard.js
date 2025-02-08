import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', Investigations: 4000 },
  { name: 'Feb', Investigations: 3000 },
  { name: 'Mar', Investigations: 2000 },
  { name: 'Apr', Investigations: 2780 },
  { name: 'May', Investigations: 1890 },
  { name: 'Jun', Investigations: 2390 },
];

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4, fontWeight: 'bold', color: '#00ff00' }}>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ background: '#111', border: '1px solid #00ff00' }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#00ff00' }}>
                Investigations Overview
              </Typography>
              <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Investigations" fill="#00ff00" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ background: '#111', border: '1px solid #00ff00' }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: '#00ff00' }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#00ff00' }}>
                    Total Investigations
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#00ff00' }}>
                    12,345
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#00ff00' }}>
                    Active Cases
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#00ff00' }}>
                    567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#00ff00' }}>
                    Resolved Cases
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#00ff00' }}>
                    11,778
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
