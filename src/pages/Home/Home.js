import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>{/* <Profile /> */}</Toolbar>
        </AppBar>
      </Box>
      <div style={{ display: "flex" }}>
        <div>
          <button
            onClick={() => {
              navigate("/fellow");
            }}
          >
            Fellow
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/anganwadi");
            }}
          >
            Anganwadi
          </button>
        </div>
        <div>
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
