import React from "react";
import { useNavigate } from "react-router-dom";

const DemoPage = () => {
  const navigate = useNavigate();

  const navigateToFellows = () => {
    navigate("/home/fellows"); // Navigate to the FellowsRoutes
  };

  const navigateToSchool = () => {
    navigate("/home/school"); // Navigate to the SchoolRoutes
  };
  const navigateToAnganwadi = () => {
    navigate("/home/anganwadi"); 
  };

  return (
    <div style={styles.CenterContainer}>
      <div style={styles.CenteredDiv} onClick={navigateToFellows}>
        Fellow
      </div>
      <div style={styles.CenteredDiv} onClick={navigateToSchool}>
        School
      </div>
      <div style={styles.CenteredDiv} onClick={navigateToAnganwadi}>
        Anganwadi
      </div>
    </div>
  );
};

export default DemoPage;

export const styles = {
  CenterContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Use "100vh" to represent 100% of the viewport height
  },
  CenteredDiv: {
    width: "100px", // Use "100px" instead of "100px;"
    height: "100px", // Use "100px" instead of "100px;"
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    lineHeight: "100px", // Use "100px" instead of "100px;"
    margin: "10px", // Use "10px" instead of "10px;"
  },
};
