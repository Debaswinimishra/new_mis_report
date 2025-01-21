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

const MonthlyPerformance = () => {
  const chartRef = useRef(null);
  const chartRefStack = useRef(null);
  const [loading, setLoading] = useState(false);
  // const [year, setYear] = useState("2024");
  const [data, setData] = useState({});
  const [blocks, setBlocks] = useState("");
  console.log("blocks", blocks);
  const [blockArr, setBlockArr] = useState([]);
  console.log("blockArr", blockArr);
  const [clusters, setCluseters] = useState("");
  const [clusterArr, setClusterArr] = useState([]);
  const [schools, setSchools] = useState("");
  const [schoolArr, setSchoolArr] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [overallDistrictBlock, setOverallDistrictBlock] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedCluster, setSelectedCluster] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");

  const currentYear = new Date().getFullYear();
  const districtname = localStorage?.getItem("districtname");
  console.log("districtname-------------->", districtname);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await Api.get(
  //         `getAllBlocksByDistrict/${districtname}`
  //       );
  //       if (response?.data && response?.data?.length > 0) {
  //         const blocks =
  //           response?.data.length > 0 &&
  //           response?.data?.map((item) => item?.block);
  //         console.log("Blocks:", blocks);
  //         setBlockArr(blocks);
  //       } else {
  //         console.log("No blocks found for the given district.");
  //         setBlockArr([]);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching Blocks:", error);
  //       setLoading(false);
  //     }
  //   };
  //   if (districtname) {
  //     fetchData();
  //   }

  //   return () => {};
  // }, []);

  // const handleBlockChange = async (e) => {
  //   const selectedBlock = e.target.value;
  //   setBlocks(selectedBlock);
  //   setCluseters(""); // Assuming you meant setClusters instead of setCluseters
  //   setSchools("");

  //   const fetchClusters = async (block) => {
  //     try {
  //       if (block) {
  //         setLoading(true);
  //         const response = await Api.get(`getAllClustersByBlock/${block}`);
  //         const clusters =
  //           response?.data?.length > 0 &&
  //           response?.data?.map((item) => item?.cluster);
  //         setClusterArr(clusters || []);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching Clusters:", error);
  //       setClusterArr([]);
  //       setLoading(false);
  //     }
  //   };

  //   // Fetch clusters for the selected block
  //   await fetchClusters(selectedBlock);
  // };

  // const handleClusterChange = async (e) => {
  //   const selectedCluster = e.target.value;
  //   setCluseters(selectedCluster);
  //   setSchools("");

  //   if (selectedCluster) {
  //     try {
  //       setLoading(true);
  //       const response = await Api.get(
  //         `getAllSchoolsByCluster/${selectedCluster}`
  //       );
  //       setSchoolArr(response?.data || []);
  //     } catch (error) {
  //       console.error("Error fetching Schools:", error);
  //       setSchoolArr([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  // const handleSchoolName = (e) => {
  //   setSchools(e.target.value);
  // };

  useEffect(() => {
    const fetchDataDistrict = async () => {
      try {
        const response = await Api.post(`/getDistBlocks/static`);
        if (response.status === 200) {
          setOverallDistrictBlock(response?.data.data);
          console.log("overallDistrictBlock---------->", response?.data.data);

          const allBlocks = response?.data.data
            ?.filter((item) => {
              return item.district === districtname;
            })
            .map((i) => i.block);

          console.log("allBlocks------------>", allBlocks);

          const uniqueBlocks = new Set(allBlocks);
          console.log("object");
          setBlockArr([...uniqueBlocks]);
        } else {
          setDistrictArr([]);
          // toast.warn("Sorry, No data found !");
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
        // toast.error("Sorry, something went wrong! Please try again later!");
      } finally {
        setLoading(false);
        // setLoadingPerformance(false);
      }
    };

    fetchDataDistrict();

    return () => {};
  }, []);

  const handleBlockChange = (e) => {
    setSelectedBlock(e.target.value);
    setSelectedCluster("");
    setSelectedSchool("");
    setSelectedYear(currentYear);
    // setSelectedMonth(currentMonth + 1);
    // setSelectedWeek(1);
    const allClusters = overallDistrictBlock
      ?.filter((item) => {
        return item.district === districtname && item.block === e.target.value;
      })
      .map((i) => i.cluster);
    console.log("allClusters------------>", allClusters);
    const uniqueClusters = new Set(allClusters);
    setClusterArr([...uniqueClusters]);
  };

  const handleClusterChange = (e) => {
    setSelectedCluster(e.target.value);
    setSelectedSchool("");
    setSelectedYear(currentYear);
    // setSelectedMonth(currentMonth + 1);
    // setSelectedWeek(1);
    const allSchools = overallDistrictBlock?.filter((item) => {
      return (
        item.district === districtname &&
        item.block === selectedBlock &&
        item.cluster === e.target.value
      );
    });
    setSchoolArr(allSchools);
  };

  console.log("block selected---------->", selectedBlock);
  console.log("clusetr selected---------->", selectedCluster);
  console.log("school selected---------->", selectedSchool);

  const handleSchoolName = (e) => {
    setSelectedSchool(e.target.value);
    setSelectedYear(currentYear);
    // setSelectedMonth(currentMonth + 1);
    // setSelectedWeek(1);
  };

  const filterButtonClick = () => {
    setFiltered(true);

    setLoading(true);

    const body = {
      district: districtname,
      block: blocks,
      cluster: clusters,
      school_name: schools.school_name,
    };

    Api.post(`getMonthlyPerformance`, body)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((err) => {
        console.error("Error fetching monthly performance:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log("data---------->", data);

  const yearOptions = Array.from(
    { length: 2 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleYearChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedYear(selectedValue);

    const body2 = {
      district: districtname,
      block: blocks,
      cluster: clusters,
      school_name: schools.school_name,
    };

    Api.post(`getMonthlyPerformance`, body2)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((err) => {
        console.error("Error fetching monthly performance:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    const body = {
      district: districtname,
      block: selectedBlock,
      cluster: selectedCluster,
      school_name: selectedSchool.school_name,
      year: selectedValue,
    };

    setLoading(true); // Show loading before making the API call

    Api.post(`getMonthlyPerfTimespent`, body)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching monthly performance:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const BarGraph = ({ blocks }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (chartRef && chartRef.current) {
        const chartContext = chartRef.current.getContext("2d");

        // Destroy existing chart if it exists
        if (window.myBarChart instanceof Chart) {
          window.myBarChart.destroy();
        }

        // Create new bar chart instance
        const chartInstance = new Chart(chartContext, {
          type: "bar",
          data: {
            labels: ["Registered Students", "Active Students"],
            datasets: [
              {
                label: "Number",
                data: [data?.registeredStudents, data?.activeStudents],
                backgroundColor: "rgba(54, 162, 235, 0.6)", // Adjust as needed
                borderColor: "rgba(54, 162, 235, 1)", // Adjust as needed
                borderWidth: 2,
                barThickness: 140,
              },
            ],
          },
          options: {
            layout: {
              padding: {
                top: 20,
                bottom: 40,
                left: 20,
                right: 5,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        // Store chart instance in window object for Bar Graph
        window.myBarChart = chartInstance;
      }
    }, [blocks]);

    return <canvas ref={chartRef} />;
  };

  const StackedBarGraph = ({ blocks }) => {
    const chartRefStack = useRef(null);

    useEffect(() => {
      if (chartRefStack && chartRefStack.current) {
        const chartContext = chartRefStack.current.getContext("2d");

        // Destroy existing chart if it exists
        if (window.myStackedChart instanceof Chart) {
          window.myStackedChart.destroy();
        }

        // Data for each dataset
        const rawData = [
          [20, 40, 30, 25, 15, 30, 20, 30, 25, 30], // "< 30 mins/month"
          [30, 50, 40, 30, 20, 30, 25, 35, 30, 20], // "30min-1 hour/month"
          [50, 90, 60, 70, 80, 90, 70, 60, 80, 75], // "1-2 hours/month"
          [80, 120, 100, 140, 130, 110, 90, 100, 130, 120], // "2-3 hours/month"
          [100, 200, 150, 175, 225, 150, 200, 180, 220, 190], // "> 3 hours/month"
        ];

        // Calculate percentages
        const percentages = rawData.map((dataset) =>
          dataset.map((value, index) => {
            const columnTotal = rawData.reduce((sum, d) => sum + d[index], 0);
            return ((value / columnTotal) * 100).toFixed(2); // Percentage
          })
        );

        // Define datasets with both raw data and calculated percentages
        const datasets = [
          {
            label: "< 30 mins/month",
            data: rawData[0],
            backgroundColor: "#353130",
            borderColor: "#0a0310",
            borderWidth: 1,
          },
          {
            label: "30min-1 hour/month",
            data: rawData[1],
            backgroundColor: "#002D62",
            borderColor: "#0a0310",
            borderWidth: 1,
          },
          {
            label: "1-2 hours/month",
            data: rawData[2],
            backgroundColor: "#008c9e",
            borderColor: "#0a0310",
            borderWidth: 1,
          },
          {
            label: "2-3 hours/month",
            data: rawData[3],
            backgroundColor: "#00b4cc",
            borderColor: "#0a0310",
            borderWidth: 1,
          },
          {
            label: "> 3 hours/month",
            data: rawData[4],
            backgroundColor: "#9fd6d2",
            borderColor: "#0a0310",
            borderWidth: 1,
          },
        ];

        // Create new stacked bar chart instance
        const chartInstance = new Chart(chartContext, {
          type: "bar",
          data: {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets,
          },
          options: {
            layout: {
              padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const datasetIndex = context.datasetIndex;
                    const dataIndex = context.dataIndex;
                    const value = context.raw;
                    const percentage = percentages[datasetIndex][dataIndex];
                    return `${context.dataset.label}: ${value} (${percentage}%)`;
                  },
                },
              },
            },
            scales: {
              x: {
                stacked: true, // Enable stacked bars on x-axis
              },
              y: {
                beginAtZero: true,
                stacked: true, // Enable stacked bars on y-axis
                title: {
                  display: true,
                  text: "Value",
                },
              },
            },
          },
        });

        // Store chart instance in window object for Stacked Bar Graph
        window.myStackedChart = chartInstance;
      }
    }, [blocks]);

    return <canvas ref={chartRefStack} />;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "4%",
          marginLeft: "53%",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="block-label">Block</InputLabel>
          <Select
            labelId="block-label"
            id="block-select"
            value={selectedBlock}
            onChange={handleBlockChange}
            label="Block"
          >
            <MenuItem value="">None</MenuItem>
            {blockArr &&
              blockArr?.map((block, index) => (
                <MenuItem key={index} value={block}>
                  {block}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="cluster-label">Cluster</InputLabel>
          <Select
            labelId="cluster-label"
            id="cluster-select"
            value={selectedCluster}
            onChange={handleClusterChange}
            label="Cluster"
            // disabled={loading || !blocks}
          >
            <MenuItem value="">None</MenuItem>
            {clusterArr?.map((cluster, index) => (
              <MenuItem key={index} value={cluster}>
                {cluster}
              </MenuItem>
            ))}
          </Select>
          {/* {loading && <CircularProgress size={24} />} */}
        </FormControl>

        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="school-label">School</InputLabel>
          <Select
            labelId="school-label"
            id="school-select"
            value={selectedSchool}
            onChange={handleSchoolName}
            label="School"
            // disabled={!clusters}
          >
            <MenuItem value="">None</MenuItem>
            {schoolArr?.map((school, index) => (
              <MenuItem key={index} value={school}>
                {school.school_name}
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
            // marginRight: "5.9%",
            marginLeft: "9px",
          }}
          onClick={filterButtonClick}
        >
          Filter
        </Button>
      </div>
      {Object.keys(data).length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              width: "96%",
              marginLeft: "3%",
              marginBottom: "2%",
              marginTop: "2%",
            }}
          >
            <div
              style={{
                marginTop: "2%",
                boxShadow: "2px 1px 5px grey",
                padding: "3%",
                width: "97%",
              }}
            >
              <h1
                style={{
                  // marginTop: "-2%",
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
                }}
              >
                <div
                  // onClick={() => handleOpenModal("studentReport")}
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
                    <p> Registered students</p>
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
                    <h1>{data.registeredStudents}</h1>
                  </div>
                </div>
                <div
                  // onClick={() => handleOpenModal("studentReport", 1)}
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
                      paddingTop: "28px",
                      fontSize: "1.2rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    Active students
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
                    <h1>{data.activeStudents}</h1>
                  </div>
                </div>
                <div
                  // onClick={() => handleOpenModal("studentReport", 2)}
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
                      paddingTop: "28px",
                      fontSize: "1.1rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    % students spending &gt; 3 hours/month
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
                    <h1>{data.users_gt_3hr}%</h1>
                  </div>
                </div>

                <div
                  // onClick={() => handleOpenModal("studentReport", 3)}
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
                      paddingTop: "28px",
                      fontSize: "1.1rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    % students spending 2-3 hours/month
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
                    <h1>{data.users_2to3hr}%</h1>
                  </div>
                </div>
                <div
                  // onClick={() => handleOpenModal("studentReport", 4)}
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
                      paddingTop: "28px",
                      fontSize: "1.1rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    % students spending 1-2 hours/month
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
                    <h1>{data.users_1to2hr}%</h1>
                  </div>
                </div>
                <div
                  // onClick={() => handleOpenModal("studentReport", 5)}
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
                      paddingTop: "28px",
                      fontSize: "1.1rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    % students spending 30min-1 hour/month
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
                    <h1>{data.users_30min_to_1hr}%</h1>
                  </div>
                </div>

                <div
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
                      color: "#2E8B57",
                      paddingTop: "28px",
                      fontSize: "1.1rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    % students spending &lt; 30 mins/month
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
                    <h1>{data.users_lt_30min}%</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>No Data</h1>
      )}
      <div>
        <div style={{ width: "75%", marginLeft: "15%" }}>
          <h2>Active Students</h2>
          <BarGraph blocks={blocks} />
        </div>

        <div>
          {" "}
          <h2>Time-spent</h2>
          <FormControl
            sx={{ m: 1 }}
            size="small"
            style={{ width: "150px", marginLeft: "80%" }}
          >
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              label="Year"
            >
              <MenuItem value="">None</MenuItem>
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <StackedBarGraph blocks={blocks} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyPerformance;

const monthArr = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
