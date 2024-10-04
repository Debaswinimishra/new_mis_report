import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import { Version, networkStatus } from "../../Environment/PrakashakAPI";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";

function NavigationPrakashak(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const districtname = localStorage.getItem("districtname");
  const [activeLink, setActiveLink] = useState("");
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

  const handleNavigateHome = () => {
    navigate("/home");
  };

  const handleTabChange = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  // Use useLayoutEffect for synchronous navigation before the component renders
  useLayoutEffect(() => {
    // If the current pathname is "/prakashak", navigate based on districtname
    if (location.pathname === "/prakashak") {
      if (districtname) {
        // Navigate to overall_details if districtname is present
        navigate("/prakashak/overall_details", { replace: true });
        setActiveLink("/prakashak/overall_details");
      } else {
        // Navigate to dashboard if districtname is not found
        navigate("/prakashak/dashboard", { replace: true });
        setActiveLink("/prakashak/dashboard");
      }
    } else {
      // Update the activeLink based on the current location pathname
      setActiveLink(location.pathname);
    }
  }, [location.pathname, navigate, districtname]);

  const listItem =
    !districtname && (usertype === "admin" || usertype === "prakashak")
      ? [
          { text: "Overall Dashboard", link: "/prakashak/dashboard", id: 0 },
          {
            text: "Dashboard Monthly",
            link: "/prakashak/dashboard_monthly",
            id: 1,
          },
          {
            text: "Remote Instructions",
            link: "/prakashak/remote_instructions",
            id: 2,
          },
          // {
          //   text: "Overall Details",
          //   link: "/prakashak/overall_details",
          //   id: 3,
          // },
          // {
          //   text: "Monthly Performance",
          //   link: "/prakashak/monthly_performance",
          //   id: 4,
          // },
          {
            text: "Whatsapp Chatbot",
            link: "/prakashak/whatsapp_chatbot",
            id: 5,
          },
          { text: "School-wise", link: "/prakashak/school_wise", id: 6 },
          {
            text: "School-wise Performance",
            link: "/prakashak/school_wise_performance",
            id: 7,
          },
          {
            text: "Retention Metrics",
            link: "/prakashak/retention_metrics",
            id: 8,
          },
        ]
      : districtname && (usertype === "admin" || usertype === "prakashak")
      ? [
          {
            text: "Overall Details",
            link: "/prakashak/overall_details",
            id: 3,
          },
          {
            text: "Monthly Performance",
            link: "/prakashak/monthly_performance",
            id: 4,
          },
        ]
      : null;

  return (
    <Box
      sx={{
        flexDirection: "column",
        backgroundColor: "white",
        minHeight: "100vh",
        width: "100%",
        padding: "0 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "#E8E8E8",
          padding: "1%",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <IconButton
          sx={{
            position: "relative",
            top: 0,
            right: 0,
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
        <div
          style={{
            flex: 1,
            textAlign: "start",
            margin: "auto",
            width: "100%",
            cursor: "pointer",
            marginTop: "10px",
            marginLeft: "10px",
          }}
          // onClick={handleNavigateHome}
        >
          <b>PRAKASHAK</b>
          <sub>
            v{Version.version} ({networkStatus})
          </sub>
          <div
            style={{
              flex: 1,
              textAlign: "start",
              marginTop: 6,
              fontStyle: "italic",
              width: "90%",
            }}
          >
            Parents' Remote Assistance and Knowledge Support for the Holistic
            Advancement of Kids
          </div>
          <div onClick={handleNavigateHome}>
            <HomeTwoToneIcon />
          </div>
        </div>
      </div>
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
        <span style={{ marginLeft: "18px", fontSize: 18 }}>
          v{Version.version}
        </span>
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" />
          {usertype === "prakashak" ? (
            <span style={{ marginLeft: "8px" }}>Logout</span>
          ) : usertype === "admin" ? (
            <span style={{ marginLeft: "8px" }}>Back</span>
          ) : null}
        </MenuItem>
      </Popover>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "10px 0",
        }}
      >
        {listItem.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "1%",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor:
                item.link.split("/")[2] === location.pathname.split("/")[2]
                  ? "rgb(90 81 221)"
                  : "white",
              width: "200px",
              height: "60px",
              margin: "1.5%",
              boxShadow: "2px 3px 6px grey",
              textAlign: "center",
            }}
            onClick={() => handleTabChange(`${item.link}`)}
          >
            <span
              style={{
                color:
                  item.link.split("/")[2] === location.pathname.split("/")[2]
                    ? "white"
                    : "black",
                fontFamily: "Congenial SemiBold",
                fontSize: 19,
                fontWeight: "bolder",
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ margin: "1% 3%" }}>
        <Outlet />
      </div>
    </Box>
  );
}

NavigationPrakashak.propTypes = {
  window: PropTypes.func,
};

export default NavigationPrakashak;
