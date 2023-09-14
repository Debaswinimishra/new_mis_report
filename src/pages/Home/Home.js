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
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import Swal from "sweetalert2";

function Home() {
  const navigate = useNavigate();

  // const listItem = [
  //   {
  //     text: "Fellows",
  //     link: "/home/fellows",
  //     icon: <PeopleIcon fontSize="large" style={{ color: "#2196F3" }} />,
  //   },
  //   {
  //     text: "School",
  //     link: "/home/school",
  //     icon: <SchoolIcon fontSize="large" style={{ color: "#4CAF50" }} />,
  //   },
  //   {
  //     text: "Anganwadi",
  //     link: "/home/anganwadi",
  //     icon: <QuizIcon fontSize="large" style={{ color: "#FF5722" }} />,
  //   },
  // ];

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
      <div className="background-image">
        <Box
          // backgroundColor="red"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 56px)" // Adjusted to accommodate the AppBar
          marginTop="56px" // Add margin to avoid content being covered by AppBar
        >
          <Card
            // style={{ ...styles.CenteredDiv, backgroundColor: "#3498db" }}
            sx={{
              width: "250px",
              height: "200px",
              textAlign: "center",
              margin: "10px",
              paddingTop: "50px",
              borderRadius: "10px",
              alignContent: "space-between",
            }}
            onClick={() => {
              navigate("/fellow");
            }}
          >
            Fellow
          </Card>
          <Card
            sx={{
              width: "250px",
              height: "200px",
              textAlign: "center",
              margin: "10px",
              paddingTop: "50px",
              borderRadius: "10px",
              alignContent: "space-between",
            }}
            // style={{ ...styles.CenteredDiv, backgroundColor: "#e74c3c" }}
            onClick={() => {
              navigate("/anganwadi");
            }}
          >
            Anganwadi
          </Card>
          <Card
            sx={{
              width: "250px",
              height: "200px",
              textAlign: "center",
              margin: "10px",
              paddingTop: "50px",
              borderRadius: "10px",
              alignContent: "space-between",
            }}
            // style={{ ...styles.CenteredDiv, backgroundColor: "#27ae60" }}
            onClick={() => {
              navigate("/school");
            }}
          >
            School
          </Card>
        </Box>

        <IconButton
          color="inherit"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuClick}
          sx={{
            position: "fixed",
            top: "10px",
            right: "10px",
            backgroundColor: "#FFF",
            borderRadius: "50%",
          }}
        >
          <Avatar
            alt="Logo"
            src="https://thinkzone.in/wp-content/uploads/2022/06/Instagram-1-1-1-1-2.png" // Replace with the actual path to your logo image
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
