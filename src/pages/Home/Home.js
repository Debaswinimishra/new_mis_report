// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <div style={styles.CenterContainer}>
//         <div
//           style={{ ...styles.CenteredDiv, backgroundColor: "#3498db" }}
//           onClick={() => {
//             navigate("/fellow");
//           }}
//         >
//           Fellow
//         </div>
//         <div
//           style={{ ...styles.CenteredDiv, backgroundColor: "#e74c3c" }}
//           onClick={() => {
//             navigate("/anganwadi");
//           }}
//         >
//           Anganwadi
//         </div>
//         <div
//           style={{ ...styles.CenteredDiv, backgroundColor: "#27ae60" }}
//           onClick={() => {
//             navigate("/school");
//           }}
//         >
//           School
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

// export const styles = {
//   CenterContainer: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//   },
//   CenteredDiv: {
//     width: "200px",
//     height: "60px",
//     backgroundColor: "#3498db",
//     color: "#fff",
//     textAlign: "center",
//     lineHeight: "60px",
//     margin: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//     transition: "background-color 0.3s ease-in-out",
//   },
// };

import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
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
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 56px)",
            marginTop: "56px",
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
              background: "linear-gradient(to bottom, #ff6b6b, #f0a881)",
              justifyContent: "center", // Center content vertically
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
              background: "linear-gradient(to bottom, #ff6b6b, #f0a881)",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", // Center content vertically
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
              background: "linear-gradient(to bottom, #ff6b6b, #f0a881)",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", // Center content vertically
            }}
            onClick={() => {
              navigate("/anganwadi/dashboard");
            }}
          >
            <QuizIcon
              sx={{
                fontSize: 48,
              }}
            />
            <span style={{ fontSize: "20px" }}>Anganwadi</span>
          </Card>
        </Box>

        <IconButton
          // color="inherit"
          // aria-label="menu"
          // aria-controls="menu-appbar"
          // aria-haspopup="true"
          onClick={handleMenuClick}
          sx={{
            position: "fixed",
            top: "10px",
            right: "10px",
            backgroundColor: "#FFF",
            // borderRadius: "10%",
          }}
        >
          <Avatar
            alt="Logo"
            src="https://thinkzone.in/wp-content/uploads/2022/06/Instagram-1-1-1-1-2.png"
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
            {" "}
            <Logout fontSize="small" />
            <span style={{ marginLeft: "8px" }}>Logout</span>
          </MenuItem>
        </Popover>
      </div>
    </>
  );
}

export default Home;
