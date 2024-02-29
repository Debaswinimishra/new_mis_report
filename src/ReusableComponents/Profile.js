import React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import image from "../Assets/R.png";
import Swal from "sweetalert2";
import { useMediaQuery } from "@mui/material";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    Swal.fire({
      title: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
      }
    });
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size={isSmallScreen ? "small" : "medium"}
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: isSmallScreen ? 32 : 42,
                height: isSmallScreen ? 32 : 42,
                backgroundColor: "#fff",
              }}
            >
              <img
                src={image}
                width={isSmallScreen ? 25 : 35}
                height={isSmallScreen ? 25 : 35}
                alt="Profile"
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </div>

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
        <MenuItem onClick={handleNavigate}>
          <Logout fontSize="small" />
          <span style={{ marginLeft: "8px" }}>Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
}
