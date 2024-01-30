// import * as React from "react";
import React, { useState, useEffect } from "react";
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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dashboard from "../../Pages/Prakashak/Dashboard/Dashboard";
import RemoteInstruction from "../../Pages/Prakashak/RemoteInstruction/RemoteInstruction";
import WhatsappChatbot from "../../Pages/Prakashak/WhatsappChatbot/WhatsappChatbot";
import Schoolwise from "../../Pages/Prakashak/Schoolwise/Schoolwise";
import Classwise from "../../Pages/Prakashak/Classwise/Classwise";

function NavigationPrakashak(props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); //For changing the respective tab

  const handleNavigate = (link) => {
    setActiveLink(link.split("/")[2]);
    if (link === "/") {
      localStorage.removeItem("login");
    }
    navigate(link);
  };

  const handleTabChange = (item) => {
    console.log(`tabIndex- ${item.id} and navigation link-${item.link}`);
    setSelectedTabIndex(item.id);
    navigate(item.link);
  };

  const listItem = [
    {
      text: "Overall Dashboard",
      link: "dashboard",
      id: 0,
      //   icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "Remote Instructions",
      link: "remote_instructions",
      id: 1,
      //   icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "Whatsapp Chatbot",
      link: "whatsapp_chatbot",
      id: 2,
      //   icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "School-wise",
      link: "school_wise",
      id: 3,
      //   icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "Class-wise",
      link: "class_wise",
      id: 4,
      //   icon: <DashboardIcon color="secondary" />,
    },

    // {
    //   text: "Log out",
    //   link: "/",
    //   icon: <LogoutIcon color="red" />,
    // },
  ];

  const hangeNavOnchange = (link) => {
    navigate("/home");
  };

  //todo---------------------Console logs---------------------------
  console.log("selectedTabIndex----------------------->", selectedTabIndex);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "#F5F5F5",
          padding: "1%",
          color: "black",
        }}
      >
        <div style={{ alignSelf: "flex-start" }}>
          <b>PRAKASHAK</b>
        </div>
        <div style={{ alignSelf: "flex-start" }}>
          <i>
            Parents' Remote Assistance and Knowledge Support for the Holistic
            Advancement of Kids
          </i>
        </div>
      </AppBar>
      <div
        style={{
          // position: "absolute",
          marginTop: "7%",
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {listItem.map((item, index) => (
          <div
            style={{
              border: "2px solid black",
              padding: "1%",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor:
                item.id === selectedTabIndex ? "#E8E8E8" : "white",
            }}
            value={item.id}
            onClick={() => handleTabChange(item)}
          >
            {item.text}
          </div>
        ))}
      </div>
      <div>
        {selectedTabIndex === 0 ? (
          <Dashboard />
        ) : selectedTabIndex === 1 ? (
          <RemoteInstruction />
        ) : selectedTabIndex === 2 ? (
          <WhatsappChatbot />
        ) : selectedTabIndex === 3 ? (
          <Schoolwise />
        ) : selectedTabIndex === 4 ? (
          <Classwise />
        ) : null}
      </div>
    </Box>
  );
}

NavigationPrakashak.propTypes = {
  window: PropTypes.func,
};

export default NavigationPrakashak;
