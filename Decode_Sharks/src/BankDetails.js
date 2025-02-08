import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper, Grid, List, ListItem, ListItemText } from '@mui/material';

const BankDetails = () => {
  const [number, setNumber] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bank-details', {
        params: { number },
      });
      setData(response.data); // Set the response data
    } catch (error) {
      alert('Failed to fetch data');
    }
  };

  // Function to render data in a compact and interactive format
  const renderData = (data) => {
    if (!data) return null;

    const {
      number,
      name,
      payeeType,
      MICR,
      BRANCH,
      ADDRESS,
      STATE,
      CONTACT,
      UPI,
      RTGS,
      CITY,
      CENTRE,
      DISTRICT,
      NEFT,
      IMPS,
      SWIFT,
      ISO3166,
      BANK,
      BANKCODE,
      IFSC,
    } = data;

    return (
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          {/* Number */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="📱 Number"
                  secondary={number}
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

          {/* Payee Type */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="👥 Payee Type"
                  secondary={payeeType}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* MICR */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🔢 MICR"
                  secondary={MICR}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Branch */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🏦 Branch"
                  secondary={BRANCH}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="📍 Address"
                  secondary={ADDRESS}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* State */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🌍 State"
                  secondary={STATE}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Contact */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="📞 Contact"
                  secondary={CONTACT}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* UPI */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="💳 UPI"
                  secondary={UPI ? 'Available ✅' : 'Not Available ❌'}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* RTGS */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🏦 RTGS"
                  secondary={RTGS ? 'Available ✅' : 'Not Available ❌'}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* City */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🏙️ City"
                  secondary={CITY}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Centre */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="📍 Centre"
                  secondary={CENTRE}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* District */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🗺️ District"
                  secondary={DISTRICT}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* NEFT */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="💸 NEFT"
                  secondary={NEFT ? 'Available ✅' : 'Not Available ❌'}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* IMPS */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="💳 IMPS"
                  secondary={IMPS ? 'Available ✅' : 'Not Available ❌'}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* SWIFT */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🌐 SWIFT"
                  secondary={SWIFT}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* ISO3166 */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🌍 ISO3166"
                  secondary={ISO3166}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Bank */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🏦 Bank"
                  secondary={BANK}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Bank Code */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🏦 Bank Code"
                  secondary={BANKCODE}
                  primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                  secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                />
              </ListItem>
            </List>
          </Grid>

          {/* IFSC */}
          <Grid item xs={12}>
            <List dense>
              <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                <ListItemText
                  primary="🏦 IFSC"
                  secondary={IFSC}
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
          Bank Details
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

export default BankDetails;
