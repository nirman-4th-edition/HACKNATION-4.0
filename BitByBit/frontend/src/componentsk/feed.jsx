import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TimerIcon from "@mui/icons-material/Timer";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AddIcon from "@mui/icons-material/Add";

const Feed = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // 🔹 Fetch Loans from Backend
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/feed/loans");

        if (!response.ok) {
          throw new Error("Failed to fetch loan data");
        }

        const data = await response.json();

        // Format response to match frontend needs
        const formattedLoans = data.data.map((loan, index) => ({
          id: `LOAN-2024-${String(index + 1).padStart(3, "0")}`,
          loanId: loan.loanId,
          amount: loan.loanAmount,
          creditScore: loan.creditScore || "Not Available",
          duration: loan.time,
          purpose: "General Loan", // Adjust if API provides purpose
          avatar: "/path-to-avatar.jpg",
          funded: false, // Adjust based on API response
        }));

        setLoanRequests(formattedLoans);
      } catch (err) {
        console.error("Error fetching loans:", err);
        setError("Error fetching loan data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // 🔹 Fund Loan Function
  const handleConfirmFunding = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setSnackbar({
          open: true,
          message: "User not authenticated!",
          severity: "error",
        });
        return;
      }

      if (!selectedLoan) {
        setSnackbar({
          open: true,
          message: "No loan selected for funding!",
          severity: "error",
        });
        return;
      }

      const payload = {
        loanId: selectedLoan.loanId,
        amount: selectedLoan.amount,
      };

      const response = await fetch(
        `http://localhost:5000/api/v1/feed/fund-loan/${selectedLoan.loanId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fund loan");
      }

      setLoanRequests((prev) =>
        prev.map((loan) =>
          loan.loanId === selectedLoan.loanId ? { ...loan, funded: true } : loan
        )
      );

      setOpenDialog(false);
      setSnackbar({
        open: true,
        message: "Loan funded successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error funding loan:", error);
      setSnackbar({
        open: true,
        message: "Failed to fund loan",
        severity: "error",
      });
    }
  };

  if (loading) return <p>Loading loan data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Loan Requests Grid */}
      <Grid container spacing={3} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {loanRequests.map((loan) => (
          <Grid item xs={12} sm={6} md={4} key={loan.id}>
            <Card
              sx={{
                margin: "10px",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Avatar src={loan.avatar} sx={{ marginRight: 2 }} />
                  <Box>
                    <Typography variant="h6">Loan {loan.loanId}</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <AccountBalanceIcon
                    sx={{ marginRight: 1, color: "#007bff" }}
                  />
                  <Typography>${loan.amount.toLocaleString()}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <CreditScoreIcon sx={{ marginRight: 1, color: "#28a745" }} />
                  <Typography>Credit Score: {loan.creditScore}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <TimerIcon sx={{ marginRight: 1, color: "#dc3545" }} />
                  <Typography>{loan.duration} months</Typography>
                </Box>

                <Chip
                  label={loan.purpose}
                  color="primary"
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />

                {loan.funded ? (
                  <Chip
                    label="Funded"
                    color="success"
                    sx={{ width: "100%", marginBottom: 2 }}
                  />
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setSelectedLoan(loan) || setOpenDialog(true)}
                  >
                    Fund Loan
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Fund Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Funding</DialogTitle>
        <DialogContent>
          {selectedLoan && (
            <Box>
              <Typography>
                <strong>Loan ID:</strong> {selectedLoan.loanId}
              </Typography>
              <Typography>
                <strong>Amount:</strong> ${selectedLoan.amount.toLocaleString()}
              </Typography>
              <Typography>
                <strong>Duration:</strong> {selectedLoan.duration} months
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmFunding}>
            Confirm Funding
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Feed;
