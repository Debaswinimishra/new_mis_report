import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import GiteIcon from '@mui/icons-material/Gite';
import SchoolIcon from "@mui/icons-material/School";

function Home() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom, #000000, #000000 0%, #0074e4 100%, #0074e4)",
          padding: "16px",
        }}
      >
        {/* <h1
          style={{
            color: "#FFF",
            marginTop: "50px",
            marginBottom: "20px",
            fontSize: "24px",
          }}
        >
          Choose Your Dashboard
        </h1> */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              width: "250px",
              height: "200px",
              textAlign: "center",
              margin: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#FFF",
              justifyContent: "center",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => {
              navigate("/fellow/dashboard");
            }}
          >
            <PeopleIcon
              sx={{
                fontSize: 48,
              }}
            />
            <span style={{ fontSize: "20px" }}>Fellow</span>
          </Card>
          <Card
            sx={{
              width: "250px",
              height: "200px",
              textAlign: "center",
              margin: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#FFF",
              justifyContent: "center",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => {
              navigate("/school/dashboard");
            }}
          >
            <SchoolIcon
              sx={{
                fontSize: 48,
              }}
            />
            <span style={{ fontSize: "20px" }}>School</span>
          </Card>
          <Card
            sx={{
              width: "250px",
              height: "200px",
              textAlign: "center",
              margin: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#FFF",
              justifyContent: "center",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => {
              navigate("/anganwadi/dashboard");
            }}
          >
            <GiteIcon
              sx={{
                fontSize: 48,
              }}
            />
            <span style={{ fontSize: "20px" }}>Anganwadi</span>
          </Card>
        </div>
      </Box>

      <IconButton
        onClick={handleMenuClick}
        sx={{
          position: "absolute",
          top: "2px",
          right: "0px",
          // backgroundColor: "#FFF",
        }}
      >
        <Avatar
          alt="Logo"
          src="https://thinkzone.in/wp-content/uploads/2022/06/Instagram-1-1-1-1-2.png"
          sx={{
            height: "50px",
            width: "50px",
            backgroundColor: "#FFF",
          }}
        />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" />
          <span style={{ marginLeft: "8px" }}>Logout</span>
        </MenuItem>
      </Popover>
    </>
  );
}

export default Home;
