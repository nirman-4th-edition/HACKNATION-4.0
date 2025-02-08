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
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TimelineIcon from "@mui/icons-material/Timeline";
import { CircularProgress, Divider } from "@mui/material";

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
  flex: "0 0 50%",
  textAlign: "right",
  "&:hover": {
    backgroundColor: "#dee2e6",
  },
  "&:active": {
    backgroundColor: "#ced4da",
  },
  transition: "all 0.3s ease",
});

const ScoreContainer = styled(Box)({
  width: "100%",
  padding: ".5rem",
  backgroundColor: "#f8f9fa",
  borderRadius: "10px",
  marginBottom: ".1rem",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
});

const StatContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  marginTop: ".5rem",
  gap: "1rem",
});

const StatBox = styled(Box)({
  flex: 1,
  padding: "1rem",
  backgroundColor: "#fff",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
  },
});

const ProfileDashBoard = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const userData = {
    name: "Abhilash Mishra",
    ethAddress: "0xf618434380708302905395b62f886e409dd21d39",
    location: "Odisha , India",
    avatarUrl: "/path/to/avatar.jpg",
    creditScore: 750,
    totalLoans: 5,
    activeLoans: 2,
    successRate: 90,
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
        <InfoLabel>Eth. Address</InfoLabel>
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

      <Divider sx={{ width: "100%", my: 1 }} />

      <ScoreContainer>
        <CreditScoreIcon sx={{ fontSize: 40, color: "#008bff", mb: 1 }} />
        <Typography variant="h5" gutterBottom>
          Credit Score
        </Typography>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={(userData.creditScore / 850) * 100}
            size={50}
            thickness={3}
            sx={{ color: userData.creditScore > 700 ? "#28a745" : "#dc3545" }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" component="div" color="text.secondary">
              {userData.creditScore}
            </Typography>
          </Box>
        </Box>
      </ScoreContainer>

      <StatContainer>
        <StatBox>
          <AccountBalanceIcon sx={{ color: "#007bff", mb: 1 }} />
          <Typography variant="h6">{userData.totalLoans}</Typography>
          <Typography variant="body2" color="text.secondary">
            Total Loans
          </Typography>
        </StatBox>

        <StatBox>
          <TimelineIcon sx={{ color: "#28a745", mb: 1 }} />
          <Typography variant="h6">{userData.activeLoans}</Typography>
          <Typography variant="body2" color="text.secondary">
            Active Loans
          </Typography>
        </StatBox>

        <StatBox>
          <CreditScoreIcon sx={{ color: "#dc3545", mb: 1 }} />
          <Typography variant="h6">{userData.successRate}%</Typography>
          <Typography variant="body2" color="text.secondary">
            Success Rate
          </Typography>
        </StatBox>
      </StatContainer>

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
