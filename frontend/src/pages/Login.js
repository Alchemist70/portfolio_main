import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      if (response.data.user.role !== "admin") {
        setError("Access denied. Admin privileges required.");
        return;
      }
      login(response.data.token, response.data.user);

      // Redirect to the admin dashboard or the page they tried to visit
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 6,
          background: "linear-gradient(120deg, #1976d2 0%, #00bcd4 100%)",
          color: "#fff",
          boxShadow: "0 8px 32px 0 rgba(60, 72, 88, 0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 800, letterSpacing: 1, color: "#fff", mb: 2 }}
        >
          Admin Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", maxWidth: 400 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            sx={{ background: "#fff", borderRadius: 2, mb: 2 }}
            InputLabelProps={{ style: { color: "#1976d2" } }}
            inputProps={{ style: { color: "#1976d2" } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            sx={{ background: "#fff", borderRadius: 2, mb: 3 }}
            InputLabelProps={{ style: { color: "#1976d2" } }}
            inputProps={{ style: { color: "#1976d2" } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "1.1rem",
              background: "linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)",
              py: 1.5,
              boxShadow: "0 2px 8px 0 rgba(33,150,243,0.10)",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
