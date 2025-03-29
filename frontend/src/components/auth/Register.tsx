import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/fetches/auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorr] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ username, password });
      navigate('/login');
    } catch (error) {
      setErrorr('Registration failed: ' + error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh)",
        background: "linear-gradient(to right, #1E2A38 50%, #F5F3EF 50%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "90%",
          maxWidth: 700,
          borderRadius: 2,
          boxShadow: 6,
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: 1, bgcolor: "#F5F3EF", color: "#1E2A38", p: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Register
          </Typography>
          <form onSubmit={handleRegistration} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
        </Box>

        <Box
          sx={{
            flex: 1,
            bgcolor: "#1E2A38",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#F5F3EF",
          }}
        >
          <Typography variant="h6" mb={2}>Already have an account?</Typography>
          <Link href="/login" underline="hover" fontWeight="bold" color="#F5F3EF">
            Login here
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
