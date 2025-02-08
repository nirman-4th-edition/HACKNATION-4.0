import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  Typography,
  styled,
  ListItemButton,
  Button,
  ListItemText,
} from "@mui/material";
import DrawerItem from "./DrawerItem";
import { Link, useNavigate } from "react-router-dom";
import { keyframes } from "@mui/material/styles";

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: "#fff",
  border: "1px solid #fff",
  borderRadius: "15px",
  padding: "10px 15px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    animation: `${shake} 0.3s ease-in-out`,
    boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
    backgroundColor: "transparent",
    border: "2px solid #fff",
  },
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const ListMenu = styled(List)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("ethAddress");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        backgroundColor: "orange",
      }}
      elevation={0}
    >
      <StyledToolbar>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          sx={{
            fontFamily: "Yatra One",
            fontWeight: 400,
            fontStyle: "normal",
            cursor: "pointer",
            textDecoration: "none",
            color: "white",
          }}
        >
          EthGroww
        </Typography>

        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <DrawerItem />
        </Box>

        {/* ✅ Home & About always visible */}
        <ListMenu>
          <ListItem>
            <ListItemButton component={Link} to="/" sx={{ color: "#fff" }}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/about" sx={{ color: "#fff" }}>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>

          {/* ✅ Show different items based on authentication */}
          {isAuthenticated ? (
            <>
              <ListItem>
                <ListItemButton
                  component={Link}
                  to="/feed"
                  sx={{ color: "#fff" }}
                >
                  <ListItemText primary="Feed" />
                </ListItemButton>
              </ListItem>
              <StyledButton component={Link} to="/profile" variant="outlined">
                Profile
              </StyledButton>
              <StyledButton onClick={handleLogout} variant="outlined">
                Logout
              </StyledButton>
            </>
          ) : (
            <StyledButton component={Link} to="/login" variant="outlined">
              Login
            </StyledButton>
          )}
        </ListMenu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
