import React from "react";
import logo from "../../../Assets/OE60SH0.jpg";

const RemoteInstruction = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <img
        src={logo}
        alt="Under development"
        style={{ maxWidth: "100%", maxHeight: "80vh", marginBottom: "20px" }}
      />
      {/* <h4>This module is under development</h4> */}
    </div>
  );
};

export default RemoteInstruction;
