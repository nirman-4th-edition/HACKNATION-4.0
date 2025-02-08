import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  styled,
  Snackbar,
  Alert,
} from "@mui/material";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const glowEffect = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 123, 255, 0.8); }
  100% { box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); }
`;

const SidebarContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  right: 0,
  top: 55,
  width: "280px",
  height: "100vh",
  backgroundColor: "#ffffff",
  boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.1)",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 1000,
  animation: `${fadeIn} 0.5s ease-out`,
  "&:hover": {
    boxShadow: "-8px 0 20px rgba(0, 0, 0, 0.15)",
  },
  transition: "box-shadow 0.3s ease",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  top: 0,
  width: "100px",
  height: "100px",
  marginBottom: "1.5rem",
  border: "4px solid #007bff",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.15)",
    animation: `${glowEffect} 2s infinite`,
  },
}));

const InfoContainer = styled(Box)({
  width: "100%",
  marginBottom: "1rem",
  padding: "1rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
});

const InfoLabel = styled(Typography)({
  color: "#666",
  fontSize: "0.9rem",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "1px",
  flex: "0 0 40%", // This ensures the label takes up fixed space
});

const InfoValue = styled(Typography)({
  color: "#333",
  fontWeight: 600,
  fontSize: "1.1rem",
  wordBreak: "break-all",
  lineHeight: 1.4,
  flex: "0 0 60%", // This ensures the value takes up the remaining space
  textAlign: "right",
  "&:hover": {
    color: "#007bff",
  },
  transition: "color 0.3s ease",
});

const EthAddress = styled(Typography)({
  backgroundColor: "#e9ecef",
  padding: "0.5rem",
  borderRadius: "5px",
  fontSize: "0.9rem",
  fontFamily: "monospace",
  cursor: "pointer",
  flex: "0 0 60%",
  textAlign: "right",
  "&:hover": {
    backgroundColor: "#dee2e6",
  },
  "&:active": {
    backgroundColor: "#ced4da",
  },
  transition: "all 0.3s ease",
});

const ProfileDashBoard = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const userData = {
    name: "Harsh Raj",
    ethAddress: "0xf618434380708302905395b62f886e409dd21d39",
    location: "Odisha, India",
    avatarUrl: "/path/to/avatar.jpg",
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userData.ethAddress);
      setSnackbar({
        open: true,
        message: "Address copied to clipboard!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to copy address",
        severity: "error",
      });
      console.error("Failed to copy address:", err);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SidebarContainer>
      <ProfileAvatar src={userData.avatarUrl} alt={userData.name}>
        {userData.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </ProfileAvatar>

      <InfoContainer>
        <InfoLabel>Name</InfoLabel>
        <InfoValue>{userData.name}</InfoValue>
      </InfoContainer>

      <InfoContainer>
        <InfoLabel>Ethereum Address</InfoLabel>
        <EthAddress onClick={handleCopyAddress}>
          {`${userData.ethAddress.slice(0, 6)}...${userData.ethAddress.slice(
            -4
          )}`}
        </EthAddress>
      </InfoContainer>

      <InfoContainer>
        <InfoLabel>Location</InfoLabel>
        <InfoValue>{userData.location}</InfoValue>
      </InfoContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SidebarContainer>
  );
};

export default ProfileDashBoard;
