import * as React from "react";
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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { Avatar, colors, createTheme } from "@mui/material";
const drawerWidth = 240;
import image from "../../Assets/R.png";
import Profile from "../../ReusableComponents/Profile";
import { useTheme } from "styled-components";

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
    setMobileOpen(!mobileOpen);
  };

  const theme = createTheme();

  const listItem = [
    {
      text: "Dashboard",
      link: "module4",
      icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "Common Monthly Quiz",
      link: "commonmonthlyquiz",
      icon: <CastForEducationIcon sx={{ color: "rgb(63,94,251)" }} />,
    },
    {
      text: "Community Educator",
      link: "communityeducator",
      icon: <PeopleAltIcon color="primary" />,
    },
    {
      text: "Training Module",
      link: "newtraining",
      icon: <CastForEducationIcon color="secondary" />,
    },

    {
      text: "Log out",
      link: "/",
      icon: <LogoutIcon color="secondary" />,
    },
  ];

  const handleNavigate = (link) => {
    if (link === "/") {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("login");
          navigate("/");
        }
      });
    }
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
          }}
        >
          THINKZONE
        </h1>
      </Toolbar>

      <Divider />
      <List>
        {listItem.map((element, index) => (
          <Link to={element.link}>
            <ListItem
              key={element.text}
              disablePadding
              onClick={() => handleNavigate(element.link)}
              sx={{
                color: "grey",
                "&:hover": {
                  color: "black",
                  fontSize: 17,
                },
              }}
            >
              <ListItemButton>
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText primary={element.text} />
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
          padding: "7px",
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
              width: "300px",
              alignSelf: "flex-start",
              // marginLeft: "-400px",
            }}
          >
            {pathname.split("/")[2]}
          </Typography>

          {/* <Profile /> */}
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

NavigationFellow.propTypes = {
  window: PropTypes.func,
};

export default NavigationFellow;
