import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import InsightsIcon from "@mui/icons-material/Insights";
import GroupsIcon from "@mui/icons-material/Groups";
import FeedIcon from "@mui/icons-material/Feed";
import Links from "../../ReusableComponents/Links";
import Avatar from "@mui/material/Avatar";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QuizIcon from "@mui/icons-material/Quiz";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import InboxIcon from "@mui/icons-material/MoveToInbox";
const drawerWidth = 240;

function NavigationFellow(props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React
    .useState
    // location.pathname.split("/")[2]
    ();
  const handleDrawerToggle = () => {
    alert();
    setMobileOpen(!mobileOpen);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const listItem = [
    {
      text: "Dashboard",
      link: "dashboard",
      icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "Details C.E",
      link: "details_c.e",
      icon: <PeopleAltIcon sx={{ color: "rgb(63,94,251)" }} />,
    },

    {
      text: "Overall C.E",
      link: "overall_c.e",
      icon: <GroupsIcon sx={{ color: "rgb(0,128,128)" }} />,
    },
    // {
    //   text: "Feedback",
    //   link: "feedback",
    //   icon: <FeedIcon sx={{ color: "#018749" }} />,
    // },
    {
      text: "Training Details C.E",
      link: "training_details_c.e",
      icon: <GroupsIcon sx={{ color: "orange" }} />,
    },
    {
      text: "Assessments C.E",
      link: "assessments_c.e",
      icon: <SchoolIcon sx={{ color: "#F64A8A" }} />,
    },
    {
      text: "Timespent Details C.E",
      link: "timespent_details_c.e",
      icon: <AccessTimeIcon sx={{ color: "rgb(0,128,128)" }} />,
    },
    {
      text: "Overall Timespent C.E",
      link: "overall_timespent_c.e",
      icon: <AccessTimeFilledIcon sx={{ color: "purple" }} />,
    },
    // {
    //   text: "Chatbot Reports",
    //   link: "chatbot_reports",
    //   icon: <CastForEducationIcon sx={{ color: "rgb(0,128,0)" }} />,
    // },
    // {
    //   text: "Training Module",
    //   link: "training_module",
    //   icon: <CategoryIcon sx={{ color: "rgb(75,0,130)" }} />,
    // },
    // {
    //   text: "Student Progress Report",
    //   link: "student_progress_report",
    //   icon: <InsightsIcon sx={{ color: "rgb(128,128,0)" }} />,
    // },
    // {
    //   text: "Online Report",
    //   link: "online_report",
    //   icon: <InsightsIcon sx={{ color: "rgb(128,128,0)" }} />,
    // },
    {
      text: "Log out",
      link: "/",
      icon: <LogoutIcon sx={{ color: "rgb(255,0,0)" }} />,
    },
  ];

  const handleNavigate = (link) => {
    setActiveLink(link.split("/")[2]);
    if (link === "/") {
      localStorage.clear();
    }
    navigate(link);
  };
  const handleNavOnchange = (link) => {
    navigate("/home");
  };
  const handleAnganwadiOnchange = (link) => {
    navigate("/anganwadi/dashboard");
  };
  const handleSchoolOnchange = (link) => {
    navigate("/school/dashboard");
  };

  const drawer = (
    <div>
      <Toolbar>
        <h1
          style={{
            letterSpacing: "2px",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "transparent",
            textAlign: "center",
            WebkitBackgroundClip: "text",
            backgroundImage: "linear-gradient(310deg,#2152ff,#21d4fd)",
            fontFamily: "'Nuosu SIL', serif",
            cursor: "pointer",
          }}
          onClick={handleNavOnchange}
        >
          THINKZONE
        </h1>
        <p
          style={{
            marginTop: "80px",
            marginLeft: "-130px",
            color: "transparent",
            backgroundImage: "linear-gradient(310deg,#2152ff,#21d4fd)",
            fontFamily: "'Nuosu SIL', serif",
            WebkitBackgroundClip: "text",
            fontSize: "1.4rem",
            fontWeight: "bold",
          }}
        >
          v1.2.6
        </p>
      </Toolbar>

      <Divider />
      <List>
        {listItem.map((element, index) => (
          <Link
            to={element.link}
            style={{
              textDecoration: "none",
            }}
          >
            <ListItem
              key={element.text}
              disablePadding
              onClick={() => handleNavigate(element.link)}
              style={{
                background:
                  // activeLink === element.link.split("/")[3]
                  //   ? "rgba(0, 0, 0, 0.1)"
                  "white",
                textDecoration: "none",
              }}
            >
              <ListItemButton>
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText primary={element.text} sx={{ color: "gray" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ justifyContent: "space-evenly", display: "flex" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                textTransform: "uppercase",
                width: "250px",
                alignSelf: "center",
              }}
            >
              {pathname ? pathname?.split("/")[2]?.replace("_", " ") : null}
            </Typography>

            <Button
              onClick={handleMenuClick}
              sx={{
                position: "fixed",
                right: "10px",
                backgroundColor: "#royalblue",
                color: "white",
              }}
            >
              Educators <ExpandCircleDownIcon />
            </Button>
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
              <MenuItem onClick={handleSchoolOnchange}>
                <span style={{ marginLeft: "8px" }}>School</span>
              </MenuItem>
              <MenuItem onClick={handleAnganwadiOnchange}>
                <span style={{ marginLeft: "8px" }}>Anganwadi</span>
              </MenuItem>
            </Popover>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        sx={{
          marginTop: "50px", // Adjust the marginTop as needed
          marginBottom: "60px", // Add marginBottom to create space for the fixed Links component
          width: "100%",
          flex: "1", // Allow the Outlet to take remaining height
        }}
      >
        <Outlet />
      </Box>
      {/* <Box position="fixed" bottom={0} left={0}>
        <Links />
      </Box> */}
    </Box>
  );
}

NavigationFellow.propTypes = {
  window: PropTypes.func,
};

export default NavigationFellow;
