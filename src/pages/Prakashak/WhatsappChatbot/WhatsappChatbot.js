import React from "react";

const WhatsappChatbot = () => {
  const handleFilter = () => {
    // console.log("school--->", e.target.value);
    alert("clicked");
  };
  return (
    <div style={{ marginTop: "5%" }}>
      {/* <div style={{ marginRight: "15%", marginTop: "5%" }}>
        <button
          style={{
            border: "2px solid rgb(65, 105, 225)",
            padding: "1%",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "rgb(65, 105, 225)",
            width: "10rem",
            height: "3rem",
            marginTop: "-3.9%",
            marginRight: "-9%",
          }}
          // value={item.id}
          onClick={() => handleFilter()}
        >
          <h3 style={{ color: "white", marginTop: "-1.9%" }}>Filter</h3>
        </button>
      </div> */}

      {/* <div
        style={{
          // display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#f3f2ff",
            width: "250px",
            height: "120px", // Increased the height to accommodate all child divs
            borderRadius: "10px",
            border: "1px solid #000", // Added a border for better visualization
            margin: "5px", // Added margin for better spacing
          }}
        >
          <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
          <h3>Total No. of Students </h3>
        </div>
      </div> */}

      <h1>This module is under development</h1>
    </div>
  );
};

export default WhatsappChatbot;
