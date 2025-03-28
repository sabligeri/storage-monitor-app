import { AppBar, Toolbar, IconButton, Box, Button, Tooltip } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import InventoryIcon from "@mui/icons-material/Inventory2";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt-response");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1B1B1B", 
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Tooltip title="Home">
            <Button
              component={RouterLink}
              to="/home"
              sx={{ color: "#E4E4DE", fontWeight: "bold", textTransform: "none" }}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Tooltip>
          <Tooltip title="Storage">
            <Button
              component={RouterLink}
              to="/storagelist"
              sx={{ color: "#E4E4DE", fontWeight: "bold", textTransform: "none" }}
              startIcon={<WarehouseIcon />}
            >
              Storage
            </Button>
          </Tooltip>
          <Tooltip title="Products">
            <Button
              component={RouterLink}
              to="/products"
              sx={{ color: "#E4E4DE", fontWeight: "bold", textTransform: "none" }}
              startIcon={<InventoryIcon />}
            >
              Product
            </Button>
          </Tooltip>
          <Tooltip title="Production">
            <Button
              component={RouterLink}
              to="/production"
              sx={{ color: "#E4E4DE", fontWeight: "bold", textTransform: "none" }}
              startIcon={<PlayCircleIcon />}
            >
              Production
            </Button>
          </Tooltip>
        </Box>

        <Box sx={{ ml: "auto" }}>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout} sx={{ color: "#f6f202" }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
