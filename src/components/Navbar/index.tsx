import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Project
        </Typography>
        <Button color="inherit" onClick={() => navigate("/connections")}>
          Connections
        </Button>
        <Button color="inherit" onClick={() => navigate("/contacts")}>
          Contacts
        </Button>
        <Button color="inherit" onClick={() => navigate("/broadcast")}>
          Broadcast
        </Button>
        <Button color="inherit" onClick={() => navigate("/messages")}>
          Messages
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
