import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Loader = () => {
  return (
    <div style={loaderStyle}>
      <CircularProgress size={80} thickness={5} />
      <Typography variant="h6" color="textSecondary" style={textStyle}>
        We are working on it Please wait...
      </Typography>
    </div>
  );
};

const loaderStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const textStyle = {
  marginTop: "10px",
};

export default Loader;
