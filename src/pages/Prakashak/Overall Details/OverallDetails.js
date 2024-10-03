import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Modal,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Api from "../../../Environment/PrakashakAPI";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import Nodata from "../../../Assets/Nodata.gif";
import defaultImage from "../../../Assets/default.jpg";
import Chart from "chart.js/auto";
import DynamicModal from "../../../Components/DynamicModal";
import SelectYear from "../../../ReusableComponents/SelectYear";
import { EightK } from "@mui/icons-material";

const OverallDetails = () => {
  const selectedYear = 2024;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1);

  const handleMonthChange = (e) => {
    if (selectedYear === currentYear && e.target.value > currentMonth + 1) {
      alert("You can't choose a month greater than the current month !");
    } else {
      setSelectedMonth(e.target.value);
    }
  };
  //------------------------------------------------------------------------------
  return (
    <div
      style={{
        marginTop: "2%",
        paddingBottom: "4%",
        marginLeft: "4%",
        alignContent: "flex-start",
        // height: "95vh",
      }}
    >
      <div
        style={{
          boxShadow: "2px 1px 5px grey",
          padding: "3%",
          width: "97%",
          height: "99%",
        }}
      >
        <h1
          style={{
            marginTop: "-2%",
            color: "#333", // Dark grey color for the text
            fontFamily: "Congenial SemiBold", // Font family for a clean look
            fontWeight: "700", // Bolder font weight for emphasis
            fontSize: "1.2rem", // Smaller font size for prominence
            textAlign: "right", // Align the text to the right
            padding: "10px 0", // Add some padding for spacing
            borderBottom: "2px solid #000000", // Add a bottom border for separation
            letterSpacing: "0.5px", // Slight letter spacing for readability
            textTransform: "capitalize", // Capitalize each word
            color: "red",
          }}
        >
          Data Updated as on - 30/09/2024
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            width: "97%",
            gap: "2%",
            // marginLeft: "4%",
          }}
        >
          <div
            // onClick={() => handleOpen("boys")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "rgb(214 148 16)",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Total Blocks</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "rgb(214 148 16)",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>12</h1>
            </div>
          </div>

          <div
            // onClick={() => handleOpen("clusters")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "#6A5ACD",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Total Clusters registered</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "#6A5ACD",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>300</h1>
            </div>
          </div>
          <div
            // onClick={() => handleOpen("schools")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "#2E8B57",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Total registered students (Class 1-5)</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "#2E8B57",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>2400</h1>
            </div>
          </div>
          <div
            // onClick={() => handleOpen("students")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "	#00CED1",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Class 1 students</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "	#00CED1",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>900</h1>
            </div>
          </div>
          <div
            // onClick={() => handleOpen("girls")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "rgb(153 58 134)",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Class 2 students</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "rgb(153 58 134)",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>600</h1>
            </div>
          </div>
          <div
            // onClick={() => handleOpen("boys")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "rgb(214 148 16)",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Class 3 students</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "rgb(214 148 16)",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>500</h1>
            </div>
          </div>
          <div
            // onClick={() => handleOpen("clusters")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "#CD5C5C",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Class 4 students</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "#CD5C5C",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>300</h1>
            </div>
          </div>
          <div
            // onClick={() => handleOpen("clusters")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "#6A5ACD",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Class 5 students</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "#6A5ACD",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>300</h1>
            </div>
          </div>

          <div
            // onClick={() => handleOpen("smartphoneUsers")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              // // paddingTop: "2%",
              // fontFamily: "Arial, sans-serif", // Default font family
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
            }}
          >
            <div
              style={{
                height: "50%",
                color: "#CD5C5C",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p> Registered students (Boys)</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "#CD5C5C",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>1800</h1>
            </div>
          </div>

          <div
            // onClick={() => handleOpen("smartphoneUsers")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
            }}
          >
            <div
              style={{
                height: "50%",
                color: "#6A5ACD",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p> Registered students (Girls)</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "#6A5ACD",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>600</h1>
            </div>
          </div>

          <div
            // onClick={() => handleOpen("clusters")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "#00CED1",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Registered smartphone users</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "#00CED1",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>1600</h1>
            </div>
          </div>

          <div
            // onClick={() => handleOpen("clusters")}
            style={{
              width: "255px",
              height: "180px",
              marginTop: "1.5%",
              backgroundColor: "white",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "1px 1px 4px 3px lightGrey",
              cursor: "pointer", // Show hand cursor on hover
              position: "relative", // Needed for positioning the "Click here" text
            }}
          >
            <div
              style={{
                height: "50%",
                color: "rgb(214 148 16)",
                paddingTop: "13px",
                fontSize: "1.2rem",
                fontFamily: "Congenial SemiBold",
                fontWeight: "600",
              }}
            >
              <p>Registered non-smartphone users</p>
            </div>
            <div
              style={{
                height: "50%",
                backgroundColor: "rgb(214 148 16)",
                borderEndStartRadius: "10px",
                borderEndEndRadius: "10px",
                color: "white",
              }}
            >
              <h1>1600</h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-around",
            // width: "25%",
            marginTop: "4%",
            marginLeft: "60%",
            // width: "30%",
            flexWrap: "wrap",
          }}
        >
          <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
            <InputLabel id="usertype-label">Month</InputLabel>
            <Select
              labelId="usertype-label"
              id="usertype-select"
              value={selectedMonth}
              onChange={handleMonthChange}
              label="Month"
            >
              {monthArr.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            sx={{
              height: "40px",
              width: "120px",
              marginTop: "1.2%",
              marginLeft: "9px",
            }}
            // onClick={filterButtonClick}
          >
            Filter
          </Button>
        </div>

        <div
          style={{
            marginTop: "2%",
            boxShadow: "2px 1px 5px grey",
            padding: "5%",
          }}
        >
          <h1 style={{ marginTop: "-2%" }}>
            <u>Top Performers</u>
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap", // Allow items to wrap for responsiveness
              justifyContent: "space-between", // Separate Top Clusters and Top Schools
              gap: "20px", // Add space between the two sections
            }}
          >
            {/* Top Clusters Section */}
            <div className="clusters" style={{ flex: "1 1 45%" }}>
              {" "}
              {/* Responsive width */}
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  marginBottom: "20px",
                  letterSpacing: "1.5px",
                  // textTransform: "uppercase",
                  fontFamily: "Congenial SemiBold", // Use a custom font like Poppins
                }}
              >
                Top Clusters
              </h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {["1", "2", "3", "4", "5"].map((label, index) => {
                  const colors = [
                    "rgb(214, 148, 16)", // Color 1
                    "rgb(52, 152, 219)", // Color 2
                    "rgb(231, 76, 60)", // Color 3
                    "rgb(46, 204, 113)", // Color 4
                    "rgb(155, 89, 182)", // Color 5
                  ];

                  const clusterNames = [
                    "BAINSIBADI",
                    "BALIHUDA",
                    "BHIMPUR",
                    "BIRARAMACHANDRAPUR",
                    "KADUA",
                  ];

                  return (
                    <div
                      key={index}
                      style={{
                        width: "50%", // Full width for responsiveness
                        height: "auto",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "1px 1px 4px 3px lightGrey",
                        cursor: "pointer",
                        alignSelf: "center",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: colors[index],
                          borderEndStartRadius: "10px",
                          borderEndEndRadius: "10px",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between", // Add space between number and school name
                          padding: "5px", // Add padding for better spacing inside the card
                        }}
                      >
                        <h3 style={{ marginLeft: "8px" }}>{index + 1}.</h3>{" "}
                        <p style={{ position: "absolute", marginLeft: "3%" }}>
                          {clusterNames[index]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Schools Section */}
            <div className="schools" style={{ flex: "1 1 45%" }}>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  marginBottom: "20px",
                  letterSpacing: "1.5px",
                  // textTransform: "uppercase",
                  fontFamily: "Congenial SemiBold", // Use a custom font like Poppins
                }}
              >
                Top Schools
              </h1>

              <div
                style={{
                  display: "flex",
                  // flexWrap: "wrap", // Wrap items to create multiple columns
                  flexDirection: "column",
                  gap: "20px", // Add gap between the cards
                }}
              >
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                  (item, index) => {
                    const colors = [
                      "rgb(214, 148, 16)", // Color 1
                      "rgb(52, 152, 219)", // Color 2
                      "rgb(231, 76, 60)", // Color 3
                      "rgb(46, 204, 113)", // Color 4
                      "rgb(155, 89, 182)", // Color 5
                      "rgb(241, 196, 15)", // Color 6
                      "rgb(230, 126, 34)", // Color 7
                      "rgb(26, 188, 156)", // Color 8
                      "rgb(192, 57, 43)", // Color 9
                      "rgb(52, 73, 94)", // Color 10
                    ];

                    const schoolsArray = [
                      "BISWANATHPUR PS",
                      "BIRAGOBINDPUR NUPS",
                      "BRAHMANANDA PUPS",
                      "NUAGAON PS",
                      "DUGAL UGUPS",
                      "BADAHAT PS",
                      "PATNASAHI PS",
                      "ATHAISH PS",
                      "ANIVANDAR PS",
                      "BASUDEIPUR PS",
                    ];

                    return (
                      <div
                        key={index}
                        style={{
                          width: "50%", // Adjust width to accommodate gap
                          height: "auto",
                          backgroundColor: "white",
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "1px 1px 4px 3px lightGrey",
                          cursor: "pointer",
                          alignSelf: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: colors[index],
                            borderEndStartRadius: "10px",
                            borderEndEndRadius: "10px",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            // justifyContent: "space-between", // Add space between number and school name
                            // padding: "10px", // Add padding for better spacing inside the card
                          }}
                        >
                          <h3 style={{ marginLeft: "15x" }}>{index + 1}.</h3>{" "}
                          <p style={{ marginLeft: "30px" }}>
                            {schoolsArray[index]}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallDetails;

const monthArr = [
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
];
