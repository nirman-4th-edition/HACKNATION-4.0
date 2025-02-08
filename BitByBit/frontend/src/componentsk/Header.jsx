import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import headerImg from "../assets/eth6.png";

const tiltAnimation = `
  @keyframes tilt {
    0% { transform: perspective(1000px) rotateY(0deg); }
    25% { transform: perspective(1000px) rotateY(30deg); }
    50% { transform: perspective(1000px) rotateY(0deg); }
    50% { transform: perspective(1000px) rotateY(-30deg); }
    100% { transform: perspective(1000px) rotateY(0deg); }
  }
`;

const RotatingImage = styled('img')`
  width: 80%;
  animation: tilt 5s ease-in-out infinite alternate;
  transform-style: preserve-3d;
  ${tiltAnimation}
`;

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    backgroundColor: "orange",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: "1",
    paddingLeft: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      flex: "2",
      textAlign: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  return (
    <CustomBox component="header">
      <BoxText component="section">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Yatra One",
            fontStyle: "normal",
          }}
        >
          Crypto-Powered Loans for a Better Tomorrow.
        </Typography>

        <Typography
          variant="p"
          component="p"
          sx={{
            py: 3,
            lineHeight: 1.6,
            color: "#fff",
            fontFamily: "Almendra",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: 18,
          }}
        >
          Empowering individuals and small businesses, our Ethereum-based
          microloans platform offers fast, secure, and borderless financial
          support. With smart contracts ensuring transparency and eliminating
          middlemen, borrowers can access funds instantly with minimal fees.
        </Typography>

        <Box>
          <Button
            variant="contained"
            sx={{
              mr: 2,
              px: 4,
              py: 1,
              fontSize: "0.9rem",
              textTransform: "capitalize",
              borderRadius: 0,
              borderColor: "#14192d",
              color: "#fff",
              backgroundColor: "#14192d",
              "&&:hover": {
                backgroundColor: "#343a55",
              },
              "&&:focus": {
                backgroundColor: "#343a55",
              },
            }}
          >
            buy now
          </Button>
          <Button
            component={Link}
            to={"/about"}
            variant="outlined"
            sx={{
              px: 4,
              py: 1,
              fontSize: "0.9rem",
              textTransform: "capitalize",
              borderRadius: 0,
              color: "#fff",
              backgroundColor: "transparent",
              borderColor: "#fff",
              "&&:hover": {
                color: "#343a55",
                borderColor: "#343a55",
              },
              "&&:focus": {
                color: "#343a55",
                borderColor: "#343a55",
              },
            }}
          >
            explore
          </Button>
        </Box>
      </BoxText>

      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            flex: "1",
            paddingTop: "20px",
            alignSelf: "center",
          },
          [theme.breakpoints.up("md")]: {
            flex: "1",
            paddingLeft: "100px",
            alignSelf: "flex-center",
          },
        })}
      >
        <RotatingImage
          src={headerImg}
          alt="headerImg"
        />
      </Box>
    </CustomBox>
  );
};

export default Header;
