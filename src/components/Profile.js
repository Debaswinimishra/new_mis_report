import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import image from "../Assets/R.png";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const logout = "http://localhost:3000";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    Swal.fire({
      title: "Do you exit ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Exit",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("login");
      } else if (result.isDenied) {
      }
    });
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginLeft: "800px",
        }}
      >
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: "42px",
                height: 42,
                color: "#fff",
                background: "#fff",
              }}
            >
              <img
                // src="https://th.bing.com/th/id/R.7ab7ffd6535f7df24a1bba57977927a3?rik=7Iy8ftpgY%2fBUPw&riu=http%3a%2f%2fwww.alterbeat.com%2fuploads%2f7%2f0%2f6%2f4%2f70641135%2fthinkzone-logo_7_orig.png&ehk=S3PCOXxbWQ9GVYIn55aFmdrJDVFcZZrfentJTCNZsXg%3d&risl=&pid=ImgRaw&r=0"
                src={image}
                width="35"
                height="35"
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "hidden",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
          <Avatar /> My account
          </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
          <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleNavigate}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <h4>Logout</h4>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
