import React from "react";
import { useNavigate } from "react-router-dom";

const DemoPage = () => {
  const navigate = useNavigate();

  const navigateToFellows = () => {
    navigate("/home/fellows"); // Navigate to the FellowsRoutes
  };

  const navigateToSchool = () => {
    navigate("/home/school"); // Navigate to the SchoolRoutes
  };

  return (
    <div style={styles.CenterContainer}>
      <div style={styles.CenteredDiv} onClick={navigateToFellows}>
        Fellow
      </div>
      <div style={styles.CenteredDiv} onClick={navigateToSchool}>
        School
      </div>
      <div style={styles.CenteredDiv}>Anganwadi</div>
    </div>
  );
};

export default DemoPage;

export const styles = {
  CenterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Use "100vh" to represent 100% of the viewport height
  },
  CenteredDiv: {
    width: "100px", // Use "100px" instead of "100px;"
    height: "100px", // Use "100px" instead of "100px;"
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    lineHeight: "100px", // Use "100px" instead of "100px;"
    margin: "10px", // Use "10px" instead of "10px;"
  },
};
// import React, { useState } from "react";
// import PeopleIcon from "@mui/icons-material/People";
// import SchoolIcon from "@mui/icons-material/School";
// import QuizIcon from "@mui/icons-material/Quiz";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import { Link, useNavigate } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Popover from "@mui/material/Popover";
// import MenuItem from "@mui/material/MenuItem";
// import Avatar from "@mui/material/Avatar";
// import Logout from "@mui/icons-material/Logout";
// import Swal from "sweetalert2";

// function DemoPage() {
//   const navigate = useNavigate();

//   const listItem = [
//     {
//       text: "Fellows",
//       link: "/home/fellows",
//       icon: <PeopleIcon fontSize="large" style={{ color: "#2196F3" }} />,
//     },
//     {
//       text: "School",
//       link: "/home/school",
//       icon: <SchoolIcon fontSize="large" style={{ color: "#4CAF50" }} />,
//     },
//     {
//       text: "Anganwadi",
//       link: "/home/anganwadi",
//       icon: <QuizIcon fontSize="large" style={{ color: "#FF5722" }} />,
//     },
//   ];

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Do you want to log out?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("login");
//         navigate("/");
//       }
//     });
//     handleClose();
//   };

//   return (
//     <>
//       <div className="background-image">
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           height="calc(100vh - 56px)" // Adjusted to accommodate the AppBar
//           marginTop="56px" // Add margin to avoid content being covered by AppBar
//         >
//           {listItem?.map((element, index) => (
//             <Link
//               to={element.link}
//               key={index}
//               style={{
//                 textDecoration: "none",
//               }}
//             >
//               <Card
//                 sx={{
//                   width: "250px",
//                   height: "200px",
//                   textAlign: "center",
//                   margin: "10px",
//                   paddingTop: "50px",
//                   borderRadius: "10px",
//                   alignContent: "space-between",
//                 }}
//               >
//                 <CardContent>
//                   {element.icon}
//                   <Typography variant="h6" color="text.primary" gutterBottom>
//                     {element.text}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </Box>
//       </div>
//       <IconButton
//         color="inherit"
//         aria-label="menu"
//         aria-controls="menu-appbar"
//         aria-haspopup="true"
//         onClick={handleMenuClick}
//         sx={{
//           position: "fixed",
//           top: "10px",
//           right: "10px",
//           backgroundColor: "#FFF",
//           borderRadius: "50%",
//         }}
//       >
//         <Avatar
//           alt="Logo"
//           src="https://thinkzone.in/wp-content/uploads/2022/06/Instagram-1-1-1-1-2.png" // Replace with the actual path to your logo image
//         />
//       </IconButton>
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MenuItem onClick={handleLogout}>
//           {" "}
//           <Logout fontSize="small" />
//           <span style={{ marginLeft: "8px" }}>Logout</span>
//         </MenuItem>
//       </Popover>
//     </>
//   );
// }

// export default DemoPage;
