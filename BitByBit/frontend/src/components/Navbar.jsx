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

const StyledLoginButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(3),
  color: "#fff",
  border: "1px solid #fff",
  borderRadius: "15px",
  padding: "12px",
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

const itemList = [
  { text: "Home", to: "/" },
  { text: "About", to: "/about" },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("ethAddress");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{ backgroundColor: "orange" }}
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

        <ListMenu>
          {itemList.map((item) => (
            <ListItem key={item.text}>
              <ListItemButton
                component={Link}
                to={item.to}
                sx={{
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#343a55",
                    position: "relative",
                  },
                  "&:hover::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 5,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: "#343a55",
                  },
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}

          {isLoggedIn && (
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
              <ListItem>
                <ListItemButton
                  component={Link}
                  to="/profile"
                  sx={{ color: "#fff" }}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
            </>
          )}

          {isLoggedIn ? (
            <StyledLoginButton onClick={handleLogout}>Logout</StyledLoginButton>
          ) : (
            <StyledLoginButton component={Link} to="/login">
              Login
            </StyledLoginButton>
          )}
        </ListMenu>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
