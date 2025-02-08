import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Paper, Grid, List, ListItem, ListItemText } from '@mui/material';

const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehicle-details', {
        params: { vehicle },
      });
      setData(response.data); // Assuming response.data is an object
    } catch (error) {
      alert('Failed to fetch data');
    }
  };

  // Function to render data in a compact and organized format
  const renderData = (data) => {
    if (!data) return null;

    const {
      state_cd,
      state_name,
      off_cd,
      off_name,
      regn_no,
      regn_dt,
      purchase_dt,
      owner_name,
      f_name,
      c_add1,
      c_add2,
      c_add3,
      c_district_name,
      c_state_name,
      c_pincode,
      p_add1,
      p_add2,
      p_add3,
      p_district_name,
      p_state_name,
      p_pincode,
      owner_cd_descr,
      regn_type_descr,
      vh_class_desc,
      chasi_no,
      eng_no,
      maker_name,
      model_name,
      body_type,
      no_cyl,
      hp,
      seat_cap,
      unld_wt,
      ld_wt,
      fuel_descr,
      color,
      manu_mon,
      manu_yr,
      norms_descr,
      wheelbase,
      cubic_cap,
      ac_fitted,
      audio_fitted,
      video_fitted,
      dlr_name,
      dlr_add1,
      dlr_add2,
      dlr_pincode,
      sale_amt,
      regn_upto,
      fit_upto,
      vehType,
      mobile_no,
      email_id,
      voter_id,
      pan_no,
      aadhar_no,
      passport_no,
      ration_card_no,
      vtInsuranceCommonDto,
      latesttaxdetails,
      challan,
    } = data;

    // Function to render a field only if it has a value
    const renderField = (label, value) => {
      if (value !== null && value !== undefined && value !== "") {
        return (
          <ListItem sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
            <ListItemText
              primary={label}
              secondary={value}
              primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
              secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
            />
          </ListItem>
        );
      }
      return null;
    };

    return (
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1}>
          {/* Basic Details */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
              Basic Details
            </Typography>
            <List dense>
              {renderField("Registration Number", regn_no)}
              {renderField("Registration Date", regn_dt)}
              {renderField("Owner Name", owner_name)}
              {renderField("Father's Name", f_name)}
              {renderField("Vehicle Class", vh_class_desc)}
              {renderField("Chassis Number", chasi_no)}
              {renderField("Engine Number", eng_no)}
              {renderField("Maker", maker_name)}
              {renderField("Model", model_name)}
              {renderField("Fuel Type", fuel_descr)}
              {renderField("Color", color)}
              {renderField("Manufacturing Year", manu_yr)}
              {renderField("Registration Upto", regn_upto)}
              {renderField("Fitness Upto", fit_upto)}
            </List>
          </Grid>

          {/* Address Details */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
              Address Details
            </Typography>
            <List dense>
              {renderField(
                "Current Address",
                `${c_add1}, ${c_add2}, ${c_add3}, ${c_district_name}, ${c_state_name}, ${c_pincode}`
              )}
              {renderField(
                "Permanent Address",
                `${p_add1}, ${p_add2}, ${p_add3}, ${p_district_name}, ${p_state_name}, ${p_pincode}`
              )}
            </List>
          </Grid>

          {/* Dealer Details */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
              Dealer Details
            </Typography>
            <List dense>
              {renderField("Dealer Name", dlr_name)}
              {renderField("Dealer Address", `${dlr_add1}, ${dlr_add2}, ${dlr_pincode}`)}
              {renderField("Sale Amount", `₹${sale_amt}`)}
            </List>
          </Grid>

          {/* Owner Identification */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
              Owner Identification
            </Typography>
            <List dense>
              {renderField("Mobile Number", mobile_no)}
              {renderField("Email ID", email_id)}
              {renderField("Voter ID", voter_id)}
              {renderField("PAN Number", pan_no)}
              {renderField("Aadhar Number", aadhar_no)}
              {renderField("Passport Number", passport_no)}
              {renderField("Ration Card Number", ration_card_no)}
            </List>
          </Grid>

          {/* Insurance Details */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
              Insurance Details
            </Typography>
            <List dense>
              {renderField("Policy Number", vtInsuranceCommonDto?.policyNo)}
              {renderField("Insurance From", vtInsuranceCommonDto?.insFrom)}
              {renderField("Insurance Upto", vtInsuranceCommonDto?.insUpto)}
            </List>
          </Grid>

          {/* Tax Details */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
              Tax Details
            </Typography>
            <List dense>
              {renderField("Tax Amount", `₹${latesttaxdetails?.tax_amt}`)}
              {renderField("Tax From", latesttaxdetails?.tax_from)}
              {renderField("Tax Upto", latesttaxdetails?.tax_upto)}
            </List>
          </Grid>

          {/* Challan Details */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ color: '#00ff00', mb: 1 }}>
              Challan Details
            </Typography>
            <List dense>
              {challan.map((item, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #00ff00', padding: '4px 0' }}>
                  <ListItemText
                    primary={`Challan ${index + 1}`}
                    secondary={`Amount: ₹${item.amount}, Status: ${item.status}, Date: ${item.time}, Offence: ${item.offence.join(', ')}`}
                    primaryTypographyProps={{ color: '#00ff00', fontWeight: 'bold', fontSize: '14px' }}
                    secondaryTypographyProps={{ color: '#00ff00', fontSize: '14px' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#00ff00' }}>
          Vehicle Details
        </Typography>
        <Paper elevation={3} sx={{ padding: 3, background: '#111', border: '1px solid #00ff00' }}>
          <TextField
            label="Enter Vehicle Number"
            variant="outlined"
            fullWidth
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
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
            {renderData(data)}
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default VehicleDetails;
