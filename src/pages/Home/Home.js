import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
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
import GiteIcon from "@mui/icons-material/Gite";
import SchoolIcon from "@mui/icons-material/School";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { useLocation } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = localStorage.getItem("usertype");
  console.log("userType", userType);

  if (!userType) {
    // Handle the case when userType is not set
    return <Navigate to="/" />;
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const cards = [
    {
      type: "admin",
      name: "Educators",
      icon: <PeopleIcon fontSize="large" />,
      path: "/fellow/dashboard",
    },
    {
      type: "admin",
      name: "School",
      icon: <SchoolIcon fontSize="large" />,
      path: "/school/dashboard",
    },
    {
      type: "admin",
      name: "Anganwadi",
      icon: <GiteIcon fontSize="large" />,
      path: "/anganwadi/dashboard",
    },
    {
      type: "admin",
      name: "Prakashak",
      icon: <AccountBalanceIcon fontSize="large" />,
      path: "/prakashak/dashboard",
    },
    {
      type: "mis",
      name: "Educators",
      icon: <PeopleIcon fontSize="large" />,
      path: "/fellow/dashboard",
    },
    {
      type: "mis",
      name: "School",
      icon: <SchoolIcon fontSize="large" />,
      path: "/school/dashboard",
    },
    {
      type: "mis",
      name: "Anganwadi",
      icon: <GiteIcon fontSize="large" />,
      path: "/anganwadi/dashboard",
    },
    {
      type: "passcode",
      name: "Educators",
      icon: <PeopleIcon fontSize="large" />,
      path: "/fellow/dashboard",
    },
    {
      type: "passcode",
      name: "School",
      icon: <SchoolIcon fontSize="large" />,
      path: "/school/dashboard",
    },
    {
      type: "passcode",
      name: "Anganwadi",
      icon: <GiteIcon fontSize="large" />,
      path: "/anganwadi/dashboard",
    },
    {
      type: "prakashak",
      name: "Prakashak",
      icon: <AccountBalanceIcon fontSize="large" />,
      path: "/prakashak/dashboard",
    },
  ];

  const filteredCards = cards?.filter((card) => card?.type === userType);
  console.log("filteredCards--------->", filteredCards);
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
        localStorage.clear();
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
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleMenuClick}
          sx={{
            position: "absolute",
            top: "1px",
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
              border: "2px solid black",
            }}
          />
        </IconButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {filteredCards?.map((card, index) => (
            <Card
              key={index}
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
                console.log("card", card);
                navigate(card?.path);
                window.location.reload();
              }}
            >
              {card.icon}
              <span style={{ fontSize: "20px" }}>{card.name}</span>
            </Card>
          ))}
        </div>
      </Box>

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
