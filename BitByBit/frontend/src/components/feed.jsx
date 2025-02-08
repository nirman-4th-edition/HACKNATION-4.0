import React, { useState } from "react";
import { TextField, MenuItem, InputAdornment, Snackbar, Alert } from "@mui/material";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TimerIcon from "@mui/icons-material/Timer";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AddIcon from "@mui/icons-material/Add";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "10px",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
}));

const AddLoanButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px",
  padding: "12px 24px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  },
}));

const Feed = () => {
  const [loanRequests, setLoanRequests] = useState([
    {
      id: "LOAN-2024-001",
      user: "Alice Smith",
      loanId: "#2024001",
      amount: 5000,
      creditScore: 750,
      duration: 12,
      purpose: "Business Expansion",
      avatar: "/path-to-avatar.jpg",
      funded: false,
    },
    {
      id: "LOAN-2024-002",
      user: "Bob Johnson",
      loanId: "#2024002",
      amount: 7500,
      creditScore: 780,
      duration: 18,
      purpose: "Equipment Purchase",
      avatar: "/path-to-avatar.jpg",
      funded: false,
    },
    {
      id: "LOAN-2024-003",
      user: "Carol Davis",
      loanId: "#2024003",
      amount: 3000,
      creditScore: 720,
      duration: 6,
      purpose: "Working Capital",
      avatar: "/path-to-avatar.jpg",
      funded: false,
    },
  ]);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [newLoan, setNewLoan] = useState({
    amount: "",
    duration: "",
    purpose: "",
    creditScore: "750", // Default credit score
  });

  const generateLoanId = () => {
    const nextId = loanRequests.length + 1;
    return {
      id: `LOAN-2024-${String(nextId).padStart(3, "0")}`,
      loanId: `#2024${String(nextId).padStart(3, "0")}`,
    };
  };

  const handleCreateRequest = () => {
    const { id, loanId } = generateLoanId();
    const newRequest = {
      ...newLoan,
      id,
      loanId,
      user: "Current User", // Replace with actual user data
      avatar: "/path-to-avatar.jpg",
      amount: Number(newLoan.amount),
      creditScore: Number(newLoan.creditScore),
    };

    setLoanRequests((prev) => [...prev, newRequest]);
    setNewLoan({
      amount: "",
      duration: "",
      purpose: "",
      creditScore: "750",
    });
    handleAddClose();
    setSnackbar({
      open: true,
      message: "Loan request created successfully!",
      severity: "success",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLoan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddLoan = () => {
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
    setNewLoan({
      amount: "",
      duration: "",
      purpose: "",
      creditScore: "750",
    });
  };

  const handleFundClick = (loan) => {
    setSelectedLoan(loan);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    setLoanRequests(prev => 
      prev.map(loan => 
        loan.id === selectedLoan.id ? { ...loan, funded: true } : loan
      )
    );
    setOpenDialog(false);
    setSelectedLoan(null);
    setSnackbar({
      open: true,
      message: "Loan funded successfully!",
      severity: "success",
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedLoan(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const isFormValid = () => {
    return (
      newLoan.amount > 0 &&
      newLoan.duration &&
      newLoan.purpose &&
      newLoan.creditScore >= 300 &&
      newLoan.creditScore <= 850
    );
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Yatra One",
            color: "#333",
          }}
        >
          Loan Requests
        </Typography>
        <AddLoanButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddLoan}
          sx={{
            backgroundColor: "#28a745",
            "&:hover": {
              backgroundColor: "#218838",
            },
          }}
        >
          Add Loan Request
        </AddLoanButton>
      </Box>

      {/* Loan Requests Grid */}
      <Grid container spacing={3} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        {loanRequests.map((request) => (
          <Grid item xs={12} sm={6} md={4} key={request.id}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                  <Avatar src={request.avatar} sx={{ marginRight: 2 }} />
                  <Box>
                    <Typography variant="h6">Loan {request.loanId}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      by {request.user}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                  <AccountBalanceIcon sx={{ marginRight: 1, color: "#007bff" }} />
                  <Typography>${request.amount.toLocaleString()}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                  <CreditScoreIcon sx={{ marginRight: 1, color: "#28a745" }} />
                  <Typography>Credit Score: {request.creditScore}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                  <TimerIcon sx={{ marginRight: 1, color: "#dc3545" }} />
                  <Typography>{request.duration} months</Typography>
                </Box>

                <Chip
                  label={request.purpose}
                  color="primary"
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />
                {request.funded && (
  <Chip
    label="Funded"
    color="success"
    sx={{ 
      width: '100%', 
      marginBottom: 2,
      backgroundColor: '#28a745',
      color: 'white'
    }}
  />
)}

<Button
  variant="contained"
  fullWidth
  onClick={() => handleFundClick(request)}
  disabled={request.funded}
  sx={{
    backgroundColor: request.funded ? "#6c757d" : "#007bff",
    "&:hover": { 
      backgroundColor: request.funded ? "#6c757d" : "#0056b3" 
    },
  }}
>
  {request.funded ? "Funded" : "Fund Now"}
</Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Add Loan Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleAddClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            padding: 2,
            maxWidth: "500px",
            width: "100%",
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: "Yatra One", color: "#333" }}>
          Create New Loan Request
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              name="amount"
              label="Loan Amount"
              type="number"
              value={newLoan.amount}
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />

            <TextField
              name="duration"
              label="Loan Duration"
              select
              value={newLoan.duration}
              onChange={handleInputChange}
              fullWidth
            >
              <MenuItem value={3}>3 months</MenuItem>
              <MenuItem value={6}>6 months</MenuItem>
              <MenuItem value={12}>12 months</MenuItem>
              <MenuItem value={18}>18 months</MenuItem>
              <MenuItem value={24}>24 months</MenuItem>
            </TextField>

            <TextField
              name="purpose"
              label="Loan Purpose"
              select
              value={newLoan.purpose}
              onChange={handleInputChange}
              fullWidth
            >
              <MenuItem value="Business Expansion">Business Expansion</MenuItem>
              <MenuItem value="Equipment Purchase">Equipment Purchase</MenuItem>
              <MenuItem value="Working Capital">Working Capital</MenuItem>
              <MenuItem value="Inventory">Inventory</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={handleAddClose}
            sx={{
              color: "text.secondary",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateRequest}
            disabled={!isFormValid()}
            sx={{
              backgroundColor: "#28a745",
              "&:hover": { backgroundColor: "#218838" },
            }}
          >
            Create Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Fund Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            padding: 2,
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle sx={{ fontFamily: "Yatra One", color: "#333" }}>
          Confirm Funding
        </DialogTitle>
        <DialogContent>
          {selectedLoan && (
            <Box sx={{ my: 2 }}>
              <Typography variant="h6" gutterBottom>
                Loan Details:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography>
                  <strong>Loan ID:</strong> {selectedLoan.loanId}
                </Typography>
                <Typography>
                  <strong>Amount:</strong> ${selectedLoan.amount.toLocaleString()}
                </Typography>
                <Typography>
                  <strong>Duration:</strong> {selectedLoan.duration} months
                </Typography>
                <Typography>
                  <strong>Borrower:</strong> {selectedLoan.user}
                </Typography>
                <Typography>
                  <strong>Purpose:</strong> {selectedLoan.purpose}
                </Typography>
              </Box>
              <Typography sx={{ mt: 2, color: "text.secondary" }}>
                Are you sure you want to fund this loan?
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              color: "text.secondary",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
          >
            Confirm Funding
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Feed;