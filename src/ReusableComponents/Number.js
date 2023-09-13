import { Padding } from "@mui/icons-material";
import React from "react";

const Number = ({ Name, count }) => {
  return (
    <div
      style={{
        display: "flex",
        background: "#fff",
        borderRadius: "7px",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 0 15px 15px",
        height: 45,
        gridGap: ".1rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(172px, 1fr))",
      }}
    >
      <h5>{Name}</h5>
      <span style={{ marginLeft: 12 }}> - </span>
      <div>
        <h1
          style={{
            marginLeft: 12,
            background: "rgb(45, 206, 137)",
            color: "white",
            borderRadius: 4,
            padding: 5,
            fontWeight: "bold",
            fontSize: "1.5rem",
            fontFamily: "'Nuosu SIL', serif",
          }}
        >
          {count}
        </h1>
      </div>
    </div>
  );
};

export default Number;
