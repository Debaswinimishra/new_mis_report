import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CustomCard = ({ name, number, Icon, style }) => {
  return (
    <Card variant="outlined" style={{ ...cardStyle, ...style }}>
      <CardContent>
        <Typography variant="h6" component="div" style={titleStyle}>
          {name}
        </Typography>
        <Typography variant="h5" component="div" style={numberStyle}>
          {number}
        </Typography>
      </CardContent>
    </Card>
  );
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "20px",
  textAlign: "center",
  border: "2px solid #eee",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  fontFamily: "sans-serif",
  boxSizing: "border-box",
};

const titleStyle = {
  fontSize: "20px",
  marginBottom: "10px",
  textAlign: "center",
};

const numberStyle = {
  fontSize: "2rem",
  color: "#4169e1", // Adjust the color as needed
  fontWeight: "bold",
  textAlign: "center",
};

export default CustomCard;
