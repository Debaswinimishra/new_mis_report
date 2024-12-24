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
  LinearProgress,
} from "@mui/material";
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Api from "../../../Environment/PrakashakAPI";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import defaultImage from "../../../Assets/default.jpg";
import Chart from "chart.js/auto";
import DynamicModal from "../../../Components/DynamicModal";
import SelectYear from "../../../ReusableComponents/SelectYear";
import { EightK } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllDashboardData, getPerformance } from "./OverallDetailsApi";
import Nodata from "../../../Assets/Nodata.gif";

const OverallDetails = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const districtname = localStorage?.getItem("districtname");
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1);
  const [dashboardData, setDashboardData] = useState([]);
  const [topPerformerClusters, setTopPerformerClusters] = useState([]);
  const [topPerformerSchools, setTopPerformerSchools] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [topPerformerLoading, setTopPerformerLoading] = useState(false);
  const [lowPerformersSchools, setLowPerformersSchools] = useState([]);
  const [lowPerformersClusters, setLowPerformersClusters] = useState([]);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedMonth("");
  };

  const handleMonthChange = (e) => {
    if (selectedYear === currentYear && e.target.value > currentMonth + 1) {
      alert("You can't choose a month greater than the current month !");
    } else {
      setSelectedMonth(e.target.value);
    }
  };

  const catchPerformanceErrors = (error) => {
    console.error("The error received while fetching performance=---->", error);
    setTimeout(() => {
      setTopPerformerLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setDashboardLoading(true);
    setTopPerformerLoading(true);
    getAllDashboardData(districtname)
      .then((res) => {
        if (res.status === 200) {
          setDashboardData(res.data);
          setTimeout(() => {
            setDashboardLoading(false);
          }, 1000);
        } else {
          console.log("status code found:", res.status);
          setTimeout(() => {
            setDashboardLoading(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("The error while getting dashboard data------>", error);
        setTimeout(() => {
          setDashboardLoading(false);
        }, 1000);
      });
    if (selectedMonth) {
      //^----Top clusters-----------
      const top_clusters_body = {
        district: districtname,
        year: selectedYear,
        month: selectedMonth,
        prefKey: "top_clusters",
      };
      getPerformance(top_clusters_body)
        .then((res) => {
          if (res.status === 200) {
            setTopPerformerClusters(res?.data.top_clusters);
            setTimeout(() => {
              setTopPerformerLoading(false);
            }, 1000);
          } else {
            console.log("status code found:", res.status);
            setTimeout(() => {
              setTopPerformerLoading(false);
            }, 1000);
          }
        })
        .catch((error) => {
          catchPerformanceErrors(error);
        });
      //^-------Top schools----------
      const top_schools_body = {
        district: districtname,
        year: selectedYear,
        month: selectedMonth,
        prefKey: "top_schools",
      };
      getPerformance(top_schools_body)
        .then((res) => {
          if (res.status === 200) {
            setTopPerformerSchools(res?.data.top_schools);
            setTimeout(() => {
              setTopPerformerLoading(false);
            }, 1000);
          } else {
            console.log("status code found:", res.status);
            setTimeout(() => {
              setTopPerformerLoading(false);
            }, 1000);
          }
        })
        .catch((error) => {
          catchPerformanceErrors(error);
        });

      //^-----Low schools-------
      const low_schools_body = {
        district: districtname,
        year: selectedYear,
        month: selectedMonth,
        prefKey: "low_schools",
      };

      getPerformance(low_schools_body)
        .then((res) => {
          if (res.status === 200) {
            setLowPerformersSchools(res?.data.low_schools);
            setTimeout(() => {
              setTopPerformerLoading(false);
            }, 1000);
          } else {
            console.log("status code found:", res.status);
            setTimeout(() => {
              setTopPerformerLoading(false);
            }, 1000);
          }
        })
        .catch((error) => catchPerformanceErrors(error));

      //^------Low clusters--------
      const low_clusters_body = {
        district: districtname,
        year: selectedYear,
        month: selectedMonth,
        prefKey: "low_clusters",
      };

      getPerformance(low_clusters_body)
        .then((res) => {
          if (res.status === 200) {
            setLowPerformersClusters(res.data.low_clusters);
          } else {
            console.log("response--------->", res.status);
          }
        })
        .catch((error) => catchPerformanceErrors(error));
    }
  }, []);

  const filterButtonClick = async () => {
    if (!selectedYear) {
      toast.error("Please select a year");
      return;
    }

    if (!selectedMonth) {
      toast.error("Please select a month");
      return;
    }

    try {
      setTopPerformerLoading(true);

      // Top Clusters
      const top_clusters_body = {
        district: districtname,
        year: selectedYear,
        month: selectedMonth,
        prefKey: "top_clusters",
      };
      getPerformance(top_clusters_body)
        .then((res) => {
          if (res.status === 200) {
            setTopPerformerClusters(res?.data.top_clusters);
          } else {
            console.log("status code found:", res.status);
          }
          setTimeout(() => {
            setTopPerformerLoading(false);
          }, 1000);
        })
        .catch((error) => catchPerformanceErrors(error));

      // Top Schools
      const top_schools_body = {
        district: districtname,
        year: selectedYear,
        month: selectedMonth,
        prefKey: "top_schools",
      };
      getPerformance(top_schools_body)
        .then((res) => {
          if (res.status === 200) {
            setTopPerformerSchools(res?.data.top_schools);
          } else {
            console.log("status code found:", res.status);
          }
          setTimeout(() => {
            setTopPerformerLoading(false);
          }, 1000);
        })
        .catch((error) => catchPerformanceErrors(error));

      // Low Schools
      const low_schools_body = {
        district: districtname,
        year: selectedYear,
        month: selectedMonth,
        prefKey: "low_schools",
      };
      getPerformance(low_schools_body)
        .then((res) => {
          if (res.status === 200) {
            setLowPerformersSchools(res?.data.top_schools);
          } else {
            console.log("status code found:", res.status);
          }
          setTimeout(() => {
            setTopPerformerLoading(false);
          }, 1000);
        })
        .catch((error) => catchPerformanceErrors(error));

      // Low Clusters
      const low_clusters_body = {
        district: districtname,
        year: selectedYear,
        month: selectedMonth,
        prefKey: "low_clusters",
      };
      getPerformance(low_clusters_body)
        .then((res) => {
          if (res.status === 200) {
            setLowPerformersClusters(res.data);
          } else {
            console.log("response--------->", res.status);
          }
          setTimeout(() => {
            setTopPerformerLoading(false);
          }, 1000);
        })
        .catch((error) => catchPerformanceErrors(error));
    } catch (error) {
      console.error("Error while fetching performance data:", error);
      toast.error("Failed to fetch data. Please try again.");
      setTopPerformerLoading(false);
    }
  };

  console.log("Top performers clusters---------->", topPerformerClusters);
  console.log("Top performers schools---------->", topPerformerSchools);
  console.log("Low performers clusters---------->", lowPerformersClusters);
  console.log("low performers schools---------->", lowPerformersSchools);

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
      {
        dashboardLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box>
              <CircularProgress />
            </Box>
          </div>
        ) : !dashboardLoading && dashboardData?.length > 0 ? (
          <div>
            {dashboardData?.map((item, index) => (
              <>
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
                    Data Updated as on -{" "}
                    {moment(item?.lastUpdated).format("DD/MM/YYYY")}
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
                        <h1>{item?.total_blocks}</h1>
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
                        <h1>{item?.total_clusters}</h1>
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
                        <h1>{item?.total_students}</h1>
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
                        <h1>{item?.class1_students}</h1>
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
                        <h1>{item?.class2_students}</h1>
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
                        <h1>{item?.class3_students}</h1>
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
                        <h1>{item?.class4_students}</h1>
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
                        <h1>{item?.class5_students}</h1>
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
                        <h1>{item?.total_boys}</h1>
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
                        <h1>{item?.total_girls}</h1>
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
                        <h1>{item?.smartphone_users}</h1>
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
                        <h1>{item?.non_smartphone_users}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        ) : !dashboardLoading && dashboardData.length === 0 ? (
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
              src={Nodata}
              alt="No Data"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                marginBottom: "20px",
              }}
            />
          </div>
        ) : null //Here null will be replaced with no data
      }

      {topPerformerLoading ? (
        <Box sx={{ width: "100%", marginTop: "20%" }}>
          <LinearProgress />
        </Box>
      ) : //  (!topPerformerLoading && topPerformerClusters) ||
      //   (!topPerformerLoading && topPerformerSchools)
      !topPerformerLoading ? (
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
              <InputLabel id="usertype-label">Year</InputLabel>
              <Select
                labelId="usertype-label"
                id="usertype-select"
                value={selectedYear}
                onChange={handleYearChange}
                label="Year"
              >
                {years.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              onClick={filterButtonClick}
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
              {/*//^ Top Clusters Section */}
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
                {topPerformerClusters && topPerformerClusters?.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {topPerformerClusters.map((label, index) => {
                      const colors = [
                        "rgb(214, 148, 16)", // Color 1
                        "rgb(52, 152, 219)", // Color 2
                        "rgb(231, 76, 60)", // Color 3
                        "rgb(46, 204, 113)", // Color 4
                        "rgb(155, 89, 182)", // Color 5
                      ];

                      return (
                        <div
                          key={index}
                          style={{
                            width: "53%",
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
                              // justifyContent: "space-evenly", // Add space between number and school name
                              padding: "5px", // Add padding for better spacing inside the card
                            }}
                          >
                            <h3 style={{ marginLeft: "8px" }}>{index + 1}.</h3>{" "}
                            <p style={{ marginLeft: "15px" }}>
                              {topPerformerClusters[index]?.cluster}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
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
                      src={Nodata}
                      alt="No Data"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* //^ Top Schools Section */}
              <div className="schools" style={{ flex: "1 1 45%" }}>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    color: "#2c3e50",
                    marginBottom: "20px",
                    letterSpacing: "1.5px",
                    fontFamily: "Congenial SemiBold",
                  }}
                >
                  Top Schools
                </h1>

                {topPerformerSchools && topPerformerSchools.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {topPerformerSchools.map((item, index) => {
                      const colors = [
                        "rgb(214, 148, 16)",
                        "rgb(52, 152, 219)",
                        "rgb(231, 76, 60)",
                        "rgb(46, 204, 113)",
                        "rgb(155, 89, 182)",
                        "rgb(241, 196, 15)",
                        "rgb(230, 126, 34)",
                        "rgb(26, 188, 156)",
                        "rgb(192, 57, 43)",
                        "rgb(52, 73, 94)",
                      ];

                      return (
                        <div
                          key={index}
                          style={{
                            width: "53%",
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
                            }}
                          >
                            <h3 style={{ marginLeft: "8px" }}>{index + 1}.</h3>
                            <p style={{ marginLeft: "15px" }}>
                              {item.school_name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
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
                      src={Nodata}
                      alt="No Data"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "2%",
              boxShadow: "2px 1px 5px grey",
              padding: "5%",
            }}
          >
            <h1 style={{ marginTop: "-2%" }}>
              <u>Least Performers</u>
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
              {/*//^ Least Clusters Section */}
              <div className="clusters" style={{ flex: "1 1 45%" }}>
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
                  Clusters
                </h1>
                {lowPerformersClusters && lowPerformersClusters?.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {lowPerformersClusters.map((label, index) => {
                      const colors = [
                        "rgb(214, 148, 16)", // Color 1
                        "rgb(52, 152, 219)", // Color 2
                        "rgb(231, 76, 60)", // Color 3
                        "rgb(46, 204, 113)", // Color 4
                        "rgb(155, 89, 182)", // Color 5
                      ];

                      return (
                        <div
                          key={index}
                          style={{
                            width: "53%",
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
                              padding: "5px", // Add padding for better spacing inside the card
                            }}
                          >
                            <h3 style={{ marginLeft: "8px" }}>{index + 1}.</h3>{" "}
                            <p
                              style={{
                                // position: "absolute",
                                marginLeft: "15px",
                              }}
                            >
                              {lowPerformersClusters[index].cluster}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
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
                      src={Nodata}
                      alt="No Data"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* //^ Least Schools Section */}
              <div className="schools" style={{ flex: "1 1 45%" }}>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "1.7rem",
                    fontWeight: "bold",
                    color: "#2c3e50",
                    marginBottom: "20px",
                    letterSpacing: "1.5px",
                    fontFamily: "Congenial SemiBold",
                  }}
                >
                  Schools
                </h1>

                {lowPerformersSchools && lowPerformersSchools.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {lowPerformersSchools.map((item, index) => {
                      const colors = [
                        "rgb(214, 148, 16)",
                        "rgb(52, 152, 219)",
                        "rgb(231, 76, 60)",
                        "rgb(46, 204, 113)",
                        "rgb(155, 89, 182)",
                        "rgb(241, 196, 15)",
                        "rgb(230, 126, 34)",
                        "rgb(26, 188, 156)",
                        "rgb(192, 57, 43)",
                        "rgb(52, 73, 94)",
                      ];

                      return (
                        <div
                          key={index}
                          style={{
                            minWidth: "50%",
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
                            }}
                          >
                            <h3 style={{ marginLeft: "8px" }}>{index + 1}.</h3>
                            <p style={{ marginLeft: "15px" }}>
                              {item.school_name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
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
                      src={Nodata}
                      alt="No Data"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        marginBottom: "20px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {}
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

const dummySchoolNames = [
  "Green Valley High School",
  "Bright Future Academy",
  "Riverdale Public School",
  "Harmony International School",
  "Sunrise Elementary School",
];

const dummyClusterNames = ["Sarankul", "Suando", "Barabati", "Sukal", "Ranpur"];
