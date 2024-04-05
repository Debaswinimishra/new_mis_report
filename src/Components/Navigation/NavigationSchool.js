// import * as React from "react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Popover from "@mui/material/Popover";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

import CastForEducationIcon from "@mui/icons-material/CastForEducation";
const drawerWidth = 240;

function NavigationSchool(props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React
    .useState
    // location.pathname.split("/")[2]
    ();
  const handleDrawerToggle = () => {
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

    // {
    //   text: "Module 8",
    //   link: "module8",
    //   icon: <PeopleAltIcon color="primary" />,
    // },
    // {
    //   text: "module9",
    //   link: "module9",
    //   icon: <CastForEducationIcon sx={{ color: "rgb(63,94,251)" }} />,
    // },

    {
      text: "Log out",
      link: "/",
      icon: <LogoutIcon color="red" />,
    },
  ];

  const handleNavigate = (link) => {
    setActiveLink(link.split("/")[2]);
    if (link === "/") {
      localStorage.clear();
    }
    navigate(link);
  };

  const hangeNavOnchange = (link) => {
    navigate("/home");
  };
  const handleAnganwadiOnchange = (link) => {
    navigate("/anganwadi/dashboard");
  };
  const handleFellowOnchange = (link) => {
    navigate("/fellow/dashboard");
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
          onClick={hangeNavOnchange}
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
          v1.2.4
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
            {pathname.split("/")[2]}
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
            School <ExpandCircleDownIcon />
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
            <MenuItem onClick={handleFellowOnchange}>
              {/* <Logout fontSize="small" /> */}
              <span style={{ marginLeft: "8px" }}>Educators</span>
            </MenuItem>
            <MenuItem onClick={handleAnganwadiOnchange}>
              {/* <Logout fontSize="small" /> */}
              <span style={{ marginLeft: "8px" }}>Anganwadi</span>
            </MenuItem>
          </Popover>
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
          marginTop: "50px",
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

NavigationSchool.propTypes = {
  window: PropTypes.func,
};

export default NavigationSchool;
