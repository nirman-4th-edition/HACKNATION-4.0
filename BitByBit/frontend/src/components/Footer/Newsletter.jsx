import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container, styled } from "@mui/material";
import { keyframes } from "@mui/system";
import { IoMailOutline } from "react-icons/io5";


const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  background: "gray",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  color: "#ffffff",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.1)",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    zIndex: 1,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: theme.spacing(1),
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
    "&.Mui-focused": {
      transform: "scale(1.02)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  fontFamily:'Yatra One'
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: "orange",
  color: "#ffffff",
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(1),
  fontWeight: 600,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    animation: `${pulse} 1s infinite`,
    backgroundColor:'white',
    color:'orange',
    transform: "translateY(-2px)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  },
}));

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Subscribe for Exclusive Updates!
          </Typography>
          
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column" },
            gap:2 ,
            width: "100%",
          }}
        >
          <StyledTextField
            fullWidth
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <IoMailOutline
                  style={{ marginRight: "8px", color: "#666" }}
                  size={20}
                />
              ),
            }}
            aria-label="Email subscription input"
          />
          <AnimatedButton
            type="submit"
            variant="contained"
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              whiteSpace: "nowrap",
            }}
          >
            Subscribe Now
          </AnimatedButton>
        </Box>

        {isSubmitted && (
          <Typography
            sx={{
              color: "#4CAF50",
              bgcolor: "rgba(255, 255, 255, 0.9)",
              p: 2,
              borderRadius: 1,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Thank you for subscribing! Welcome aboard! 🎉
          </Typography>
        )}
      </Box>
    </StyledContainer>
  );
};

export default Newsletter;
