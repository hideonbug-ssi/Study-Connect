import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Axios from "axios";

const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await Axios.post("http://localhost:4000/auth/register", {
          firstName,
          lastName,
          email,
          password,
        });

        if (response.data.success) {
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("token", response.data.token);
          navigateToLogIn(response.data.userId);
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          alert(errors.join("\n"));
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const navigateToLogIn = () => {
    navigate("/");
  };

  const validateForm = () => {
    if (firstName !== "" && lastName !== "" && email !== "" && password !== "") {
      return true;
    }
    return false;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding="1rem"
      boxSizing="border-box"
      textAlign="center"
    >
      <Paper sx={{ width: "100%", maxWidth: "448px", padding: "2rem" }}>
        <Box mb={3}>
          <Typography variant="h5" gutterBottom>
            Create your Study Connect Account
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "1rem", marginTop: "1rem" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Grid container justifyContent="space-between" sx={{ marginBottom: "1rem" }}>
            <Grid item>
              <Button
                component={Link}
                to="/"
                color="primary"
                sx={{ textTransform: "none", marginTop: "1rem" }}
              >
                Sign in instead
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ textTransform: "none", marginTop: "1rem" }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateAccountPage;
