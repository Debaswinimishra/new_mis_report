import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
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
