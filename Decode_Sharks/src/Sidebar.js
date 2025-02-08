import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, IconButton } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  PhoneAndroid as NumberIcon,
  SimCard as SimIcon,
  AccountBalance as BankIcon,
  DirectionsCar as VehicleIcon,
  Payment as UpiIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Number Information', path: '/number-info', icon: <NumberIcon /> },
    { name: 'SIM Owner Details', path: '/sim-owner', icon: <SimIcon /> },
    { name: 'Bank Details', path: '/bank-details', icon: <BankIcon /> },
    { name: 'Vehicle Details', path: '/vehicle-details', icon: <VehicleIcon /> },
    { name: 'UPI Information', path: '/upi-info', icon: <UpiIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 80 : 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCollapsed ? 80 : 240,
          boxSizing: 'border-box',
          background: '#111',
          borderRight: '1px solid #00ff00',
          transition: 'width 0.3s ease',
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" component="div" sx={{ color: '#00ff00', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {!isCollapsed && 'Cybersecurity Investigation'}
        </Typography>
        <IconButton onClick={toggleSidebar} sx={{ color: '#00ff00', mt: 2 }}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path} sx={{ color: '#00ff00' }}>
            <ListItemIcon sx={{ color: '#00ff00' }}>{item.icon}</ListItemIcon>
            {!isCollapsed && <ListItemText primary={item.name} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
