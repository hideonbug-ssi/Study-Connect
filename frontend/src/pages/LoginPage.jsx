import React, { useState } from "react";
import {
  Box,
  Container,
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
import { styled } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

const StyledActions = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const instance = axios.create({
    withCredentials: true,
  });

  const navigate = useNavigate();
  const navigateToNotes = (userId) => {
    navigate(`/notes/${userId}`);
  };

  const handleSignIn = () => {
    if (!validateForm()) {
      console.log("Must enter email and password");
      return;
    }
    instance
      .post("http://localhost:4000/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success === true) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.user.id);
          console.log("login success");
          navigateToNotes(localStorage.getItem("userId"));
        } else {
          console.log("fail");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateForm = () => {
    return email !== "" && password !== "";
  };

  return (
    <StyledContainer maxWidth="xs">
      <StyledPaper>
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" gutterBottom>
            Sign in
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            to continue to Study Connect
          </Typography>
        </Box>

        <StyledForm>
          <StyledTextField
            label="Email"
            type="email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <FormControl variant="outlined" fullWidth sx={{ marginBottom: "1rem" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <StyledActions container>
            <Grid item>
              <Button
                component={Link}
                to="/signup"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Create account
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignIn}
                sx={{ textTransform: "none" }}
              >
                Sign in
              </Button>
            </Grid>
          </StyledActions>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
}

export default LoginPage;
