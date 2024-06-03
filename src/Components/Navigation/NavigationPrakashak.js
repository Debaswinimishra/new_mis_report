// import * as React from "react";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Dashboard from "../../Pages/Prakashak/Dashboard/Dashboard";
import RemoteInstruction from "../../Pages/Prakashak/RemoteInstruction/RemoteInstruction";
import WhatsappChatbot from "../../Pages/Prakashak/WhatsappChatbot/WhatsappChatbot";
import Schoolwise from "../../Pages/Prakashak/Schoolwise/Schoolwise";
import Classwise from "../../Pages/Prakashak/Classwise/Classwise";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { Version, networkStatus } from "../../Environment/PrakashakAPI";

function NavigationPrakashak(props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState("dashboard");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); //For changing the respective tab
  const [anchorEl, setAnchorEl] = useState(null);

  const usertype = localStorage.getItem("usertype");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (usertype === "prakashak") {
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
    } else {
      navigate("/home");
    }
    handleClose();
  };

  const handleTabChange = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  useEffect(() => {
    console.log("location.pathname------------->", location.pathname);
    if (
      location.pathname === "/prakashak" ||
      location.pathname === "/prakashak/"
    ) {
      navigate("/prakashak/dashboard", { replace: true });
    } else {
      setActiveLink(location.pathname);
    }
  }, [location.pathname, navigate]);

  const listItem = [
    {
      text: "Overall Dashboard",
      link: "prakashak/dashboard",
      id: 0,
      //   icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "Remote Instructions",
      link: "prakashak/remote_instructions",
      id: 1,
      //   icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "Whatsapp Chatbot",
      link: "prakashak/whatsapp_chatbot",
      id: 2,
      //   icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "School-wise",
      link: "prakashak/school_wise",
      id: 3,
      //   icon: <DashboardIcon color="secondary" />,
    },
    {
      text: "Class-wise",
      link: "prakashak/class_wise",
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
  // console.log("selectedTabIndex----------------------->", selectedTabIndex);
  console.log("activeLink------------------------------->", activeLink);
  console.log("pathname--------------------.", pathname);
  // console.log("pathname length------------->", pathname.split("/").length);
  // console.log("usertype----------------------->", usertype);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "#FDF5E6",
      }}
    >
      <div
        // position="fixed"
        style={{
          backgroundColor: "#F5F5F5",
          padding: "1%",
          color: "black",
          // alignItems: "flex-start",
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            textAlign: "start",
          }}
        >
          <b>PRAKASHAK</b>
          <sub>
            v{Version.version}({networkStatus})
          </sub>
        </div>
        <div
          style={{ alignSelf: "flex-start", textAlign: "start", marginTop: 6 }}
        >
          <i>
            Parents' Remote Assistance and Knowledge Support for the Holistic
            Advancement of Kids
          </i>
        </div>
        <div>
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
            <span style={{ marginLeft: "18px", fontSize: 18 }}>v1.2.6</span>
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" />
              {usertype === "prakashak" ? (
                <span style={{ marginLeft: "8px" }}>Logout</span>
              ) : usertype === "admin" ? (
                <span style={{ marginLeft: "8px" }}>Back</span>
              ) : null}
            </MenuItem>
          </Popover>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {listItem.map((item, index) => (
          <div
            style={{
              // border: "2px solid black",
              padding: "1%",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor:
                item.link.split("/")[1] === pathname.split("/")[2]
                  ? "rgb(90 81 221)"
                  : "white",
              width: "200px",
              height: "60px",
              marginTop: "1.5%",
              boxShadow: "2px 3px 6px  grey",
            }}
            value={item.id}
            onClick={() => handleTabChange(`/${item.link}`)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 5,
              }}
            >
              <span
                style={{
                  color:
                    item.link.split("/")[1] === pathname.split("/")[2]
                      ? "white"
                      : "black",
                  fontFamily: "Congenial SemiBold",
                  fontSize: 19,
                  fontWeight: "500",
                }}
              >
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div>
        {activeLink === "/prakashak/dashboard" ? (
          <Dashboard />
        ) : activeLink === "/prakashak/remote_instructions" ? (
          <RemoteInstruction />
        ) : activeLink === "/prakashak/whatsapp_chatbot" ? (
          <WhatsappChatbot />
        ) : activeLink === "/prakashak/school_wise" ? (
          <Schoolwise />
        ) : activeLink === "/prakashak/class_wise" ? (
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
