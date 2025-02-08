import React, { useState } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Grid 
} from '@mui/material';

const UpiInfo = () => {
  const [upi, setUpi] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/upi-info', {
        params: { upi },
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
      upi_id,
      name,
      bank_details,
    } = data;

    const {
      ADDRESS,
      BANK,
      BANKCODE,
      BRANCH,
      CENTRE,
      CITY,
      CONTACT,
      DISTRICT,
      IFSC,
      IMPS,
      ISO3166,
      MICR,
      NEFT,
      RTGS,
      STATE,
      SWIFT,
      UPI,
    } = bank_details || {};

    // Function to render a field
    const renderField = (label, value, emoji = "") => {
      return (
        <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
          <ListItemText
            primary={`${emoji} ${label}`}
            secondary={value === null ? 'None' : value}
            primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
            secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
          />
        </ListItem>
      );
    };

    return (
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          {/* UPI ID */}
          <Grid item xs={12}>
            <List dense>
              {renderField("UPI ID", upi_id, "📱")}
            </List>
          </Grid>

          {/* Name */}
          <Grid item xs={12}>
            <List dense>
              {renderField("Name", name, "👤")}
            </List>
          </Grid>

          {/* Bank Details */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
              Bank Details
            </Typography>
            <List dense>
              {renderField("Bank", BANK, "🏦")}
              {renderField("Branch", BRANCH, "🏛️")}
              {renderField("Address", ADDRESS, "📍")}
              {renderField("City", CITY, "🏙️")}
              {renderField("District", DISTRICT, "🗺️")}
              {renderField("State", STATE, "🌍")}
              {renderField("Centre", CENTRE, "📍")}
              {renderField("Contact", CONTACT, "📞")}
              {renderField("IFSC", IFSC, "🔠")}
              {renderField("MICR", MICR, "🔢")}
              {renderField("ISO3166", ISO3166, "🌍")}
              {renderField("Bank Code", BANKCODE, "🏦")}
            </List>
          </Grid>

          {/* Payment Services */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
              Payment Services
            </Typography>
            <List dense>
              {renderField("UPI", UPI ? "Available ✅" : "Not Available ❌", "💳")}
              {renderField("RTGS", RTGS ? "Available ✅" : "Not Available ❌", "🏦")}
              {renderField("NEFT", NEFT ? "Available ✅" : "Not Available ❌", "💸")}
              {renderField("IMPS", IMPS ? "Available ✅" : "Not Available ❌", "💳")}
              {renderField("SWIFT", SWIFT, "🌐")}
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
          UPI Information
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, background: '#111', border: '1px solid #00ff00' }}>
          <TextField
            label="Enter UPI ID"
            variant="outlined"
            fullWidth
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
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

export default UpiInfo;
