import React from "react";
import { Box, Stack, styled, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import FooterTitle from "./FooterTitle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Newsletter from "./Newsletter";

const Footer = () => {

  const StyledLink = styled(Link)({
    fontSize: "1rem", // Increased from default
    color: "#414141",
    textDecoration: "none",
    "&:hover": {
      color: "orange",
    },
    fontWeight: 400,
    cursor: "pointer",
  });

  const FooterLink = ({ text }) => {
    return (
      <StyledLink variant="body2">
        {text}
      </StyledLink>
    );
  };
  

  const StackColumn = styled(Stack)(() => ({
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    gap: 12,
    textAlign: "center",
  }));
  
  const BoxRow = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ededed",
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 30,
    },
  }));

  return (
    <BoxRow
      component="footer"
      sx={{
        py: 4,
        px: 2,
        fontSize: "30px",

      }}
    >
      <StackColumn>
        <FooterTitle text={"Contact Us"} />
        <FooterLink text={"Top G Town , IIT Khandagiri"} />
        <FooterLink text={"(123) 456-7890"} />
        <FooterLink text={"info@microloans.com"} />
      </StackColumn>

      <StackColumn>
        <FooterTitle text={"Our Services"} />
        <FooterLink text={"Personal Loans"} />
        <FooterLink text={"Business Loans"} />
        <FooterLink text={"Mortgage Refinancing"} />
        <FooterLink text={"Debt Consolidation"} />
      </StackColumn>

      <StackColumn>
        <FooterTitle text={"Eth-MicroLoans"} />
        <Stack
          direction="row"
          width="70px"
          maxWidth="100%"
          justifyContent="space-between"
        >
          <Link
            href="#"
            variant="body2"
            sx={{
              color: "#414141",
              "&:hover": {
                color: "orange",
                fontSize: "1rem", // Increased from default

              },
            }}
          >
            <InstagramIcon />
          </Link>
          <Link
            href="#"
            variant="body2"
            sx={{
              color: "#414141",
              "&:hover": {
                color: "orange",
                fontSize: "1rem", // Increased from default

              },
            }}
          >
            <FacebookIcon />
          </Link>
        </Stack>
        <Typography variant="caption" component="p">
          &copy; 2025 MicroLoans Inc.
        </Typography>
      </StackColumn>

      <StackColumn>
        <Newsletter />
      </StackColumn>
    </BoxRow>
  );
};

export default Footer;
