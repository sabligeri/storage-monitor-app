import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/auth";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorr] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      navigate('/home');
    } catch (error) {
      setErrorr('Login failed: ' + error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(to right, #F5F3EF 50%, #1E2A38 50%)",
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
        <Box sx={{ flex: 1, bgcolor: "#1E2A38", color: "#F5F3EF", p: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Login
          </Typography>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ mb: 2, input: { color: "#fff" }, label: { color: "#aaa" } }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2, input: { color: "#fff" }, label: { color: "#aaa" } }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Box>

        <Box
          sx={{
            flex: 1,
            bgcolor: "#F5F3EF",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#1E2A38",
          }}
        >
          <Typography variant="h6" mb={2}>Don't have an account?</Typography>
          <Link href="/register" underline="hover" fontWeight="bold" color="#1E2A38">
            Register here
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
