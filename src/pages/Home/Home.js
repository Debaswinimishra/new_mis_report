import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Profile from "../../ReusableComponents/Profile";
import image from "../../Assets/R.png";
import { Avatar } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <AppBar>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Avatar
              sx={{
                width: 42,
                height: 42,
                backgroundColor: "#fff",
              }}
            >
              <img src={image} width={35} height={35} alt="Profile" />
            </Avatar>
            <div>
              <Profile />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={styles.CenterContainer}>
        <div style={styles.CenteredDiv}>
          <button
            onClick={() => {
              navigate("/fellow");
            }}
          >
            Fellow
          </button>
        </div>
        <div style={styles.CenteredDiv}>
          <button
            onClick={() => {
              navigate("/anganwadi");
            }}
          >
            Anganwadi
          </button>
        </div>
        <div style={styles.CenteredDiv}>
          {" "}
          <button
            onClick={() => {
              navigate("/school");
            }}
          >
            School
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

export const styles = {
  CenterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  CenteredDiv: {
    width: "100px",
    height: "100px",
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    lineHeight: "100px",
    margin: "10px",
  },
};
