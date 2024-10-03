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
  const [districts, setDistricts] = useState("");
  const [data, setData] = useState({});
  const [districtArr, setDistrictArr] = useState([]);
  const [blocks, setBlocks] = useState("");
  const [blockArr, setBlockArr] = useState([]);
  const [clusters, setCluseters] = useState("");
  const [clusterArr, setClusterArr] = useState([]);
  const [schools, setSchools] = useState("");
  const [schoolArr, setSchoolArr] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [tableHeaders, setTableHeaders] = useState([
    "student_name",
    "Class",
    "gender",
    "parents_name",
    "parents_phone_number",
    "school_name",
    "district",
    "block",
    "cluster",
  ]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);
  const districtname = localStorage?.getItem("districtname");
  console.log("districtname-------------->", districtname);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth("");
  };

  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState("");
  const handleMonthChange = (e) => {
    if (selectedYear === currentYear && e.target.value > currentMonth + 1) {
      alert("You can't choose a month greater than the current month !");
    } else {
      setSelectedMonth(e.target.value);
    }
  };
  const xlData = tableData;
  const fileName = "SchoolwiseReport.csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("getAllDistricts");
        if (
          response &&
          response?.data &&
          response?.data?.length > 0 &&
          response?.data
        ) {
          console.log("response?.data---------->", response?.data);
          const districts =
            response?.data.length > 0 &&
            response?.data
              .filter(
                (item) =>
                  item?.district.toLowerCase() === districtname.toLowerCase()
              )
              .map((item) => item?.district);

          setDistrictArr(districts);
        } else {
          setDistrictArr([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  // const handleYearChange = (e) => {
  //   setYear(e.target.value);
  // };
  console.log("district array---------->", districtArr);

  const handleDistrictChange = (e) => {
    setDistricts(e.target.value);
    setBlocks("");
    setCluseters("");
    setSchools("");
    // Other logic related to district change
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`getAllBlocksByDistrict/${districts}`);
        if (response?.data && response?.data?.length > 0) {
          const blocks =
            response?.data.length > 0 &&
            response?.data?.map((item) => item?.block);
          console.log("Blocks:", blocks);
          setBlockArr(blocks);
        } else {
          console.log("No blocks found for the given district.");
          setBlockArr([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Blocks:", error);
        setLoading(false);
      }
    };

    // Fetch data only if a district is selected
    if (districts) {
      fetchData();
    }

    return () => {};
  }, [districts]);

  const handleBlockChange = (e) => {
    setBlocks(e.target.value);
    setCluseters("");
    setSchools("");
  };
  useEffect(() => {
    const fetchClusters = async () => {
      try {
        if (blocks) {
          setLoading(true);
          const response = await Api.get(`getAllClustersByBlock/${blocks}`);
          const clusters =
            response?.data?.length > 0 &&
            response?.data?.map((item) => item?.cluster);
          setClusterArr(clusters);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Clusters:", error);
        setClusterArr([]);
        setLoading(false);
      }
    };

    // Fetch data only if a block is selected
    fetchClusters();
  }, [blocks]);

  const handleClusterChange = (e) => {
    setCluseters(e.target.value);
    setSchools("");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (clusters) {
          const response = await Api.get(`getAllSchoolsByCluster/${clusters}`);
          setSchoolArr(response?.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Blocks:", error);
        setLoading(false);
      }
    };

    // Fetch data only if a district is selected
    fetchData();
  }, [clusters]);

  const handleSchoolName = (e) => {
    setSchools(e.target.value);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const body = {
      district: districts,
      block: blocks,
      cluster: clusters,
      school_name: schools.school_name,
      year: selectedYear,
      month: selectedMonth,
    };
    if (districts) {
      Api.post(`getSchoolWiseReport`, body)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err=================>", err);
          // if (err.response.status === 406) {
          //   alert("something went wrong", err.response.status);
          // }
          setLoading(false);
        });
    }
  };

  const filterButtonClick = () => {
    setFiltered(true);
    if (!districts) {
      alert("Please select a district to proceed.");
    } else {
      setLoading(true);
      fetchData();
    }
  };

  const handleOpenModal = async (type, param) => {
    setOpen(true);
    setLoading(true);
    setTableData([]); // Reset table data before fetching new data
    setTableHeaders([]);
    setModalTitle("");
    let body = {
      ...(districts && { district: districts }),
      ...(blocks && { block: blocks }),
      ...(clusters && { cluster: clusters }),
      ...(schools && { school_name: schools?.school_name }),
    };

    if (type === "chatbotConvo") {
      setModalTitle(param);
      try {
        const response = await Api.post("/getChatBotConvosReport", body);
        const transformedData = response.data?.map((student) => ({
          student_name: student.student_name,
          class: student.class,
          gender: student.gender,
          parents_name: student.parents_name,
          school_name: student.school_name,
          district: student.district,
          block: student.block,
          cluster: student.cluster,
          phone_number: student.phone_number || "-",
          buttonClicked: student.buttonClicked || "-",
          templateName: student.templateName || "-",
          msgType: student.msgType || "-",
          status: student.status,
          createdAt: moment(student.createdAt).format("DD-MM-YYYY hh:mm"),
        }));
        setTableData(transformedData);
        setTableHeaders([
          "Student Name",
          "Class",
          "Gender",
          "Parents Name",
          "School Name",
          "District",
          "Block",
          "Cluster",
          "Phone Number",
          "Button Clicked",
          "Template Name",
          "Msg Type",
          "Status",
          "Created on",
        ]);
      } catch (error) {
        console.error("Error fetching chatbot conversations:", error);
      }
    } else if (type === "studentReport") {
      const classNumber = param;
      classNumber
        ? setModalTitle(`Number Of Students in class ${classNumber}`)
        : setModalTitle("Number Of Students");
      body = {
        ...body,
        ...(classNumber && { class: classNumber }),
      };
      try {
        const response = await Api.post("/getAllStudentsReport", body);
        setTableData(response.data);
        setTableHeaders([
          "student_name",
          "Class",
          "gender",
          "parents_name",
          "parents_phone_number",
          "school_name",
          "district",
          "block",
          "cluster",
        ]);
      } catch (error) {
        console.error("Error fetching student report:", error);
      }
    }

    // setModalTitle(newModalTitle);
    setLoading(false);
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
                data: [500, 200],
                backgroundColor: "rgba(54, 162, 235, 0.6)", // Adjust as needed
                borderColor: "rgba(54, 162, 235, 1)", // Adjust as needed
                borderWidth: 2,
                barThickness: 180,
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
            datasets: [
              {
                label: " > 3 hours/month",
                data: [100, 200, 150, 175, 225, 150, 200, 180, 220, 190], // Example data for the first stack up to October
                backgroundColor: "#2f3542",
                borderColor: "#2f3542",
                borderWidth: 1,
              },
              {
                label: "2-3 hours/month",
                data: [80, 120, 100, 140, 130, 110, 90, 100, 130, 120], // Example data for the second stack up to October
                backgroundColor: "#227093",
                borderColor: "#227093",
                borderWidth: 1,
              },
              {
                label: "1-2 hours/month",
                data: [50, 90, 60, 70, 80, 90, 70, 60, 80, 75], // Example data for the third stack up to October
                backgroundColor: "#fd9644",
                borderColor: "#fd9644",
                borderWidth: 1,
              },
              {
                label: "30min-1 hour/month",
                data: [30, 50, 40, 30, 20, 30, 25, 35, 30, 20], // Example data for the fourth stack up to October
                backgroundColor: "#20bf6b", // Yellow
                borderColor: "#20bf6b",
                borderWidth: 1,
              },
              {
                label: "< 30 mins/month",
                data: [20, 40, 30, 25, 15, 30, 20, 30, 25, 30], // Example data for the fifth stack up to October
                backgroundColor: "#fed330",
                borderColor: "#fed330",
                borderWidth: 1,
              },
            ],
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
            scales: {
              x: {
                stacked: true, // Enable stacked bars on x-axis
              },
              y: {
                beginAtZero: true,
                stacked: true, // Enable stacked bars on y-axis
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

  const handleClose = () => setOpen(false);

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
        {/* <SelectYear Year={selectedYear} handleYearChange={handleYearChange} />
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="district-label">Month</InputLabel>
          <Select
            labelId="month-label"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Month"
          >
            {monthArr?.map((month, index) => (
              <MenuItem key={index} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="district-label">District</InputLabel>
          <Select
            labelId="district-label"
            id="district-select"
            value={districts}
            onChange={(e) => handleDistrictChange(e)}
            label="District"
          >
            {districtArr?.map((district, index) => (
              <MenuItem key={index} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="block-label">Block</InputLabel>
          <Select
            labelId="block-label"
            id="block-select"
            value={blocks}
            onChange={handleBlockChange}
            label="Block"
            // disabled={loading || !districts}
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
            value={clusters}
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
            value={schools}
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
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        > */}
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
        {/* </Box> */}
      </div>

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
                <h1>1800</h1>
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
                <h1>1400</h1>
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
                <h1>22%</h1>
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
                <h1>24%</h1>
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
                <h1>30%</h1>
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
                <h1>13%</h1>
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
                <h1>11%</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style={{ width: "75%", marginLeft: "15%" }}>
          <h2>Actve Students</h2>
          <BarGraph blocks={blocks} />
        </div>

        <div>
          {" "}
          <h2>Time-spent</h2>
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
