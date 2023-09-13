import * as React from "react";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
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
    setMobileOpen(!mobileOpen);
  };

  const listItem = [
    {
      text: "Dashboard",
      link: "module4",
      icon: <DashboardIcon color="secondary" />,
    },

    // {
    //   text: "Module 5",
    //   link: "module5",
    //   icon: <PeopleAltIcon color="primary" />,
    // },
    // {
    //   text: "Module 6",
    //   link: "module6",
    //   icon: <CastForEducationIcon sx={{ color: "rgb(63,94,251)" }} />,
    // },
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
      icon: <LogoutIcon sx={{ color: "red" }} />,
    },
  ];

  const handleNavigate = (link) => {
    setActiveLink(link.split("/")[2]);
    if (link === "/") {
      localStorage.removeItem("login");
    }
    navigate(link);
  };
  const hangeNavOnchange = (link) => {
    navigate("/home");
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
          onClick={hangeNavOnchange}
        >
          THINKZONE
        </h1>
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
              {pathname.split("/")[2]}
            </Typography>

            {/* <Button
              variant="contained"
              onClick={hangeNavOnchange}
              style={{ marginLeft: "850px" }}
            >
              Home
            </Button> */}
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
