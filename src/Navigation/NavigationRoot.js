import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import Swal from "sweetalert2";

function NavigationHeader() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("login");
        navigate("/");
      }
    });
    handleClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: "1168px",
        padding: "12px",
        marginLeft: "200px",
        backgroundColor: "#12B0E8",
      }}
    >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          ThinkZone MIS Report
        </Typography>
        <nav style={{ marginRight: "40px" }}>
          <Link to="/">Home</Link>
          <Link to="/fellow">Fellow</Link>
          <Link to="/anganwadi">Anganwadi</Link>
          <Link to="/school">School</Link>
        </nav>
        <Avatar sx={{ backgroundColor: "red", marginLeft: "5px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            // style={{ marginLeft: "5px" }}
            onClick={handleMenuClick}
          >
            U
          </IconButton>
        </Avatar>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleLogout}>
            <Avatar>
              <Logout />
            </Avatar>
            Logout
          </MenuItem>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationHeader;
