import React from "react";

const link1 = "https://thinkzone.in/";
const link2 = "https://thinkzone.in/about-us/";
const link3 = "https://thinkzone.in/blog/";

const Links = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        // backgroundColor: "#333", // Change the background color as needed
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
         <a href={link1} target="none" style={{ textDecoration: "none", color: "#fff" }}>
          <h4>2023 @Thinkzone</h4>
        </a>
        <div style={{ display: "flex" }}>
      
          <a href={link2} style={{ textDecoration: "none", marginRight: 50, color: "#fff" }}>
            <h4>About us</h4>
          </a>
          <a href={link3} style={{ textDecoration: "none", color: "#fff" }}>
            <h4>Blog</h4>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Links;
