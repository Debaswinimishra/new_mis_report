import React from "react";

const link1 = "https://thinkzone.in/";
const link2 = "https://thinkzone.in/about-us/";
const link3 = "https://thinkzone.in/blog/";

const Links = () => {
  return (
    <footer
      style={{
        backgroundColor: "#fff",
        position: "fixed",
        bottom: 0,
        left: 210,
        right: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center", // Center vertically within the footer
          maxWidth: "1200px", // Adjust this value as needed for responsiveness
          margin: "0 auto", // Center horizontally within the viewport
        }}
      >
        <a
          href={link1}
          target="_blank" // Use "_blank" to open links in a new tab
          rel="noopener noreferrer" // Add security attribute when using target="_blank"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <h4>2023 @Thinkzone</h4>
        </a>
        <div style={{ display: "flex" }}>
          <a
            href={link2}
            style={{
              textDecoration: "none",
              marginRight: "20px",
              color: "#fff",
            }}
          >
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
