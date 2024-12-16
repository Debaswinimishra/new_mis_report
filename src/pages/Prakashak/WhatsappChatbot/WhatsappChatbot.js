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
import Nodata from "../../../Assets/Nodata.gif";
import Chart from "chart.js/auto";
import Graph from "../../../ReusableComponents/Graphs";
import moment from "moment";
import DynamicModal from "../../../Components/DynamicModal";
const WhatsappChatbot = () => {
  const chartRef = useRef(null);
  //?---------------Month array---------------------------
  //?---------------Month array---------------------------
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

  //?-----------------Week array--------------------
  const weekArr = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  //?----------------Class Array-----------------------
  const classArr = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 1 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];

  //&-------------Filter states---------------
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedYear2, setSelectedYear2] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonthSelected.value - 1
  );
  const [selectedMonth2, setSelectedMonth2] = useState(
    currentMonthSelected.value - 1
  );
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [isFiltered, setIsFiltered] = useState(true);

  console.log("isFiltered----------->", isFiltered);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth("");
    setSelectedWeek("");
  };
  const handleYearChange2 = (e) => {
    setSelectedYear2(parseInt(e.target.value));
    setSelectedMonth2("");
  };
  // const handleMonthChange = (e) => {
  //   setSelectedWeek("");
  //   setSelectedMonth(e.target.value);
  // };
  const handleMonthChange = (e) => {
    if (
      e.target.value > currentMonthSelected.value &&
      selectedYear === currentYear
    ) {
      alert("You can't select a month greater than the current month !");
    } else {
      setSelectedWeek(1);
      setSelectedMonth(e.target.value ? e.target.value : "");
    }
  };
  const handleMonthChange2 = (e) => {
    if (
      e.target.value > currentMonthSelected.value &&
      selectedYear2 === currentYear
    ) {
      alert("You can't select a month greater than the current month !");
    } else {
      // setSelectedWeek(1);
      setSelectedMonth2(e.target.value ? e.target.value : "");
    }
  };

  const handleWeekChange = (e) => {
    if (!selectedMonth && e.target.value) {
      alert("Please select a month before selecting a week !");
    } else {
      setSelectedWeek(e.target.value);
    }
  };
  // const handleClassChange = (e) => {
  //   setSelectedClass(e.target.value);
  // };

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  console.log("selectedMonth2--->", selectedMonth2);

  console.log("data2------->", data2);

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const fetchData = () => {
    //
    setLoading(true);
    const body = {
      year: selectedYear,
      month: selectedMonth,
      week: selectedWeek,
    };

    const filteredData = dataJson.filter((item) => {
      return item.month === selectedMonth && item.week === selectedWeek;
    });

    if (selectedYear) {
      if (filteredData.length > 0) {
        setData(filteredData);
      } else {
        console.log("No matching data found");
        setData([]);
      }
      setIsFiltered(true);
    } else {
      setData(dataJson);
      setIsFiltered(false);
    }
    setLoading(false);
  };

  const fetchData2 = () => {
    setLoading(true);
    const body = {
      year: selectedYear2,
      month: selectedMonth2,
    };

    const filteredData2 = dataJson2.filter((item) => {
      return item.month === selectedMonth2;
    });

    if (selectedYear2) {
      if (filteredData2.length > 0) {
        setData2(filteredData2);
      } else {
        console.log("No matching data found");
        setData2([]);
      }
      setIsFiltered(true);
    } else {
      setData2(dataJson2);
      setIsFiltered(false);
    }
    setLoading(false);
  };

  const filterButtonClick = () => {
    setLoading(true);
    setShow(true);
    fetchData();
  };

  const filterButtonClick2 = () => {
    setLoading(true);
    setShow(true);
    fetchData2();
  };

  const graphData = {
    labels: data.graphData?.classData,
    values1: data.graphData?.numberData,
  };

  const classData = data.graphData?.classData;
  const numberData = data.graphData?.numberData;
  // console.log(
  //   "====================================class Array",
  //   data.graphData.classData
  // );

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartContext = chartRef.current.getContext("2d");
      let chartInstance = null; // Initialize chartInstance variable

      // Destroy existing chart if it exists
      if (window.myChart instanceof Chart) {
        window.myChart.destroy();
      }

      // Create new chart instance
      chartInstance = new Chart(chartContext, {
        type: "bar",
        data: {
          labels: classData,
          datasets: [
            {
              label: "Number",
              data: numberData,
              backgroundColor: "rgba(54, 162, 235, 0.6)", // Adjust as needed
              borderColor: "rgba(54, 162, 235, 1)", // Adjust as needed
              borderWidth: 1,
              barThickness: 70,
            },
          ],
        },
        options: {
          layout: {
            padding: {
              alignContent: "center",
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
              width: 10,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Store chart instance in window object
      window.myChart = chartInstance;
    }
  }, [classData, numberData]);
  // const [open, setOpen] = useState(false);
  // const [modalContentTitle, setModalContentTitle] = useState("");
  // const [modalContentData, setModalContentData] = useState([]);

  const [open, setOpen] = useState(false);

  const [tableData, setTableData] = useState([]);

  const fetchNewuserData = async () => {
    try {
      const body = {
        year: selectedYear,
      };

      const response = await Api.post("getChatBotAllUsersReport", body);

      if (response.status === 200) {
        setTableData(response.data);
        setModalLoader(false);
      } else {
        console.error(`Error fetching districts: Status ${response.status}`);
        setModalLoader(false);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
      setModalLoader(false);
    }
  };

  const [modalContentTitle, setModalContentTitle] = useState("");
  const handleOpen = async (title) => {
    setModalContentTitle(title);
    setModalLoader(true);
    setOpen(true);
    await fetchNewuserData();
  };

  const handleClose = () => setOpen(false);

  const modalTitle = "Alluser";
  const tableHeaders = [
    "Student Name",
    "Class",
    "Gender",
    "Parents Phone Number",
    // "Parents Name",
    "School Name",
    "District",
    "Block",
    "Cluster",
  ];
  const xlData = tableData;
  const fileName = "Alluser.csv";

  // New User---------------------------------------------

  const [newuserModal, setNewuserModal] = useState(false);

  const [newusertableData, setNewuserTableData] = useState([]);

  const fetchNewuserDatas = async () => {
    try {
      const body = {
        year: selectedYear,
        month: selectedMonth,
        week: selectedWeek,
      };

      const response = await Api.post("getChatBotAllUsersReport", body);

      if (response.status === 200) {
        setNewuserTableData(response.data);
      } else {
        console.error(`Error fetching districts: Status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlenewOpen = async () => {
    setNewuserModal(true);
    await fetchNewuserDatas();
  };

  const handlenewClose = () => setNewuserModal(false);

  const modalTitles = "NewUser";
  const newtableHeaders = [
    "Student Name",
    "Class",
    "Gender",
    "Parents Name",
    "Parents Phone Number",
    "School Name",
    "District",
    "Block",
    // "Cluster",
  ];
  const xlDatas = newusertableData;
  const fileNames = "NewUser.csv";
  // ------------------------ Active User --------------------------------------

  const [activeuserModal, setactiveuserModal] = useState(false);

  const [activeusertableData, setactiveuserTableData] = useState([]);

  const fetchactiveuserDatas = async () => {
    setModalLoader(true);

    try {
      const body = {
        year: selectedYear,
        month: selectedMonth,
        week: selectedWeek,
      };

      const response = await Api.post("getChatBotActiveUsersReport", body);

      if (response.status === 200) {
        setModalLoader(false);
        setactiveuserTableData(response.data);
      } else {
        console.error(`Error fetching districts: Status ${response.status}`);
        setModalLoader(false);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
      setModalLoader(false);
    }
  };

  const handleactiveOpen = async (item) => {
    setModalContentTitle(item);
    setactiveuserModal(true);
    await fetchactiveuserDatas();
  };

  const handleactiveClose = () => setactiveuserModal(false);

  const modalTitless = "activeUser";
  const activetableHeaders = [
    "Student Name",
    "Class",
    "Gender",
    "Parents Name",
    // "Parents Phone Number",
    "School Name",
    "District",
    "Block",
    "Cluster",
    "Parents Phone Number",
  ];
  const xlDatass = activeusertableData;
  const fileNamess = "NewUser.csv";

  return (
    <div>
      <div
        style={{
          display: "flex",
          // marginTop: "4%",
          marginLeft: "69%",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="usertype-label">Year</InputLabel>
          <Select
            labelId="usertype-label"
            id="usertype-select"
            value={selectedYear2}
            onChange={handleYearChange2}
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
            value={selectedMonth2}
            onChange={handleMonthChange2}
            label="Month"
          >
            {/* <MenuItem value={null}>None</MenuItem> */}
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
          }}
          onClick={filterButtonClick2}
        >
          Filter Month
        </Button>
      </div>
      {data2?.length > 0 ? (
        <div
          style={{
            marginTop: "2%",
            paddingBottom: "4%",
            marginLeft: "4%",
            alignContent: "flex-start",
          }}
        >
          <div
            style={{
              marginTop: "2%",
              boxShadow: "2px 1px 5px grey",
              padding: "3%",
              width: "95%",
            }}
          >
            <div style={{ marginTop: "-2%" }}>
              <h2
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "2%",
                  color: "red",
                  fontFamily: "Congenial SemiBold",
                }}
              >
                <i>
                  <u> Data Updated as on - 30/11/2024</u>
                </i>
              </h2>
            </div>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5%",
                }}
              >
                <Box>
                  <CircularProgress />
                </Box>
              </div>
            ) : !loading && data2?.length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "95%",
                    marginLeft: "2.2%",
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
                      {data2?.map((data) => {
                        return (
                          <>
                            {isFiltered ? (
                              <div
                                className="card"
                                // onClick={() => handleOpen("Total No. of New Users")}
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
                                    color: "#000080",
                                    paddingTop: "20px",
                                    fontSize: "1.2rem",
                                    fontFamily: "Congenial SemiBold",
                                    fontWeight: "600",
                                  }}
                                >
                                  <p>No of registered smartphone users</p>
                                </div>
                                <div
                                  style={{
                                    height: "50%",
                                    backgroundColor: "#000080",
                                    borderEndStartRadius: "10px",
                                    borderEndEndRadius: "10px",
                                    color: "white",
                                  }}
                                >
                                  <h1>{data.smartphone_users}</h1>
                                </div>
                              </div>
                            ) : null}
                            <div
                              className="card"
                              // onClick={() => handleactiveOpen("Total No. of Active Users")}
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
                                  color: "rgb(102 52 91)",
                                  paddingTop: "20px",
                                  fontSize: "1.2rem",
                                  fontFamily: "Congenial SemiBold",
                                  fontWeight: "600",
                                }}
                              >
                                <p>No of registered smartphone users(males)</p>
                              </div>
                              <div
                                style={{
                                  height: "50%",
                                  backgroundColor: "rgb(102 52 91)",
                                  borderEndStartRadius: "10px",
                                  borderEndEndRadius: "10px",
                                  color: "white",
                                }}
                              >
                                <h1>{data.smartphone_boys}</h1>
                              </div>
                            </div>
                            {isFiltered ? (
                              <div
                                className="card"
                                // onClick={() => handleactiveOpen("Total No. of Active Users")}
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
                                    color: "#708090",
                                    paddingTop: "20px",
                                    fontSize: "1.2rem",
                                    fontFamily: "Congenial SemiBold",
                                    fontWeight: "600",
                                  }}
                                >
                                  <p>
                                    No of registered smartphone users(female)
                                  </p>
                                </div>
                                <div
                                  style={{
                                    height: "50%",
                                    backgroundColor: "#708090",
                                    borderEndStartRadius: "10px",
                                    borderEndEndRadius: "10px",
                                    color: "white",
                                  }}
                                >
                                  <h1>{data.smartphone__girls}</h1>
                                </div>
                              </div>
                            ) : null}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : !loading && Object.keys(data2).length === 0 ? (
              <img src={Nodata} />
            ) : null}
          </div>
        </div>
      ) : (
        <img src={Nodata} />
      )}
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
            {/* <MenuItem value={""}>None</MenuItem> */}
            {monthArr.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="usertype-label">Week</InputLabel>
          <Select
            labelId="usertype-label"
            id="usertype-select"
            value={selectedWeek}
            onChange={handleWeekChange}
            label="Month"
          >
            {/* <MenuItem value={null}>None</MenuItem> */}
            {weekArr.map((item, index) => (
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

      {/* ---------------------------- content --------------------- */}
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
        >
          <Box>
            <CircularProgress />
          </Box>
        </div>
      ) : !loading && data?.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              width: "95%",
              marginLeft: "2.2%",
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
                {data?.map((data) => {
                  return (
                    <>
                      {isFiltered ? (
                        <div
                          className="card"
                          // onClick={() => handleOpen("Total No. of New Users")}
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
                              color: "#000080",
                              paddingTop: "20px",
                              fontSize: "1.2rem",
                              fontFamily: "Congenial SemiBold",
                              fontWeight: "600",
                            }}
                          >
                            <p>No of new registered smartphone users</p>
                          </div>
                          <div
                            style={{
                              height: "50%",
                              backgroundColor: "#000080",
                              borderEndStartRadius: "10px",
                              borderEndEndRadius: "10px",
                              color: "white",
                            }}
                          >
                            <h1>{data.new_smartphone_users}</h1>
                          </div>
                        </div>
                      ) : null}
                      <div
                        className="card"
                        // onClick={() => handleactiveOpen("Total No. of Active Users")}
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
                            color: "rgb(102 52 91)",
                            paddingTop: "20px",
                            fontSize: "1.2rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                          }}
                        >
                          <p>No of Active Users</p>
                        </div>
                        <div
                          style={{
                            height: "50%",
                            backgroundColor: "rgb(102 52 91)",
                            borderEndStartRadius: "10px",
                            borderEndEndRadius: "10px",
                            color: "white",
                          }}
                        >
                          <h1>{data.active_smartphone_users}</h1>
                        </div>
                      </div>
                      {isFiltered ? (
                        <div
                          className="card"
                          // onClick={() => handleactiveOpen("Total No. of Active Users")}
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
                              color: "#708090",
                              paddingTop: "20px",
                              fontSize: "1.2rem",
                              fontFamily: "Congenial SemiBold",
                              fontWeight: "600",
                            }}
                          >
                            <p>No of new Activated Users</p>
                          </div>
                          <div
                            style={{
                              height: "50%",
                              backgroundColor: "#708090",
                              borderEndStartRadius: "10px",
                              borderEndEndRadius: "10px",
                              color: "white",
                            }}
                          >
                            <h1>{data.new_activated_smartphone_users}</h1>
                          </div>
                        </div>
                      ) : null}

                      <div
                      // style={{
                      //   marginTop: "2%",
                      //   boxShadow: "2px 1px 5px grey",
                      //   padding: "5%",
                      //   width: "97%",
                      // }}
                      >
                        <h1
                          style={{
                            marginTop: "2%",
                            color: "#333", // Dark grey color for the text
                            fontFamily: "Congenial SemiBold", // Font family for a clean look
                            fontWeight: "700", // Bolder font weight for emphasis
                            fontSize: "1.8rem", // Larger font size for prominence
                            textAlign: "center", // Center-align the text
                            padding: "10px 0", // Add some padding for spacing
                            borderBottom: "2px solid #000000", // Add a bottom border for separation
                            letterSpacing: "0.5px", // Slight letter spacing for readability
                            textTransform: "capitalize", // Capitalize each word
                          }}
                        >
                          Time-Spent details
                        </h1>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignContent: "center",
                            justifyContent: "center",
                            width: "97%",
                            gap: "2%",
                            // marginTop: "-2%",
                          }}
                        >
                          <>
                            <div
                              style={{
                                width: "255px",
                                height: "240px", // Increased height to accommodate heading
                                marginTop: "1.5%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "1px 1px 4px 3px lightGrey",
                              }}
                            >
                              {/* Heading */}
                              <div
                                style={{
                                  textAlign: "center",
                                  padding: "10px",
                                  color: "#00CED1",
                                  marginTop: "10px",
                                  fontSize: "1.3rem", // Heading font size
                                  fontWeight: "bold",
                                  fontFamily: "Congenial SemiBold",
                                }}
                              >
                                Time Spent 0-1 mins
                              </div>

                              {/* User and Avg. Time Spent Section */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px",
                                  height: "50%",
                                  color: "#00CED1",
                                  fontSize: "1rem", // Reduced font size
                                  fontFamily: "Congenial SemiBold",
                                  fontWeight: "600",
                                }}
                              >
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Users
                                </div>
                                {/* Line divider */}
                                <div
                                  style={{
                                    height: "100%",
                                    borderLeft: "1px solid #00CED1", // Line between elements
                                    margin: "0 5px",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Avg. Time (in mins)
                                </div>
                              </div>

                              {/* User count and Avg. Time Spent Values */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  alignItems: "center",
                                  backgroundColor: "#00CED1",
                                  borderEndStartRadius: "10px",
                                  borderEndEndRadius: "10px",
                                  color: "white",
                                  padding: "10px",
                                  height: "50%",
                                }}
                              >
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "1rem", // Reduced font size
                                  }}
                                >
                                  <h2>{data.ts_0to1_users}</h2>
                                </div>
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "0.7rem", // Reduced font size
                                  }}
                                >
                                  <h1>{data.ts_0to1_avgTs}</h1>
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                width: "255px",
                                height: "240px", // Increased height to accommodate heading
                                marginTop: "1.5%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "1px 1px 4px 3px lightGrey",
                              }}
                            >
                              {/* Heading */}
                              <div
                                style={{
                                  textAlign: "center",
                                  padding: "10px",
                                  color: "#CD5C5C",
                                  marginTop: "10px",
                                  fontSize: "1.3rem", // Heading font size
                                  fontWeight: "bold",
                                  fontFamily: "Congenial SemiBold",
                                }}
                              >
                                Time Spent 2-15 mins
                              </div>

                              {/* User and Avg. Time Spent Section */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px",
                                  height: "50%",
                                  color: "#CD5C5C",
                                  fontSize: "1rem", // Reduced font size
                                  fontFamily: "Congenial SemiBold",
                                  fontWeight: "600",
                                }}
                              >
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Users
                                </div>
                                {/* Line divider */}
                                <div
                                  style={{
                                    height: "100%",
                                    borderLeft: "1px solid #CD5C5C", // Line between elements
                                    margin: "0 5px",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Avg. Time (in mins)
                                </div>
                              </div>

                              {/* User count and Avg. Time Spent Values */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  alignItems: "center",
                                  backgroundColor: "#CD5C5C",
                                  borderEndStartRadius: "10px",
                                  borderEndEndRadius: "10px",
                                  color: "white",
                                  padding: "10px",
                                  height: "50%",
                                }}
                              >
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "1rem", // Reduced font size
                                  }}
                                >
                                  <h2>{data.ts_2to15_users}</h2>
                                </div>
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "0.7rem", // Reduced font size
                                  }}
                                >
                                  <h1>{data.ts_2to15_avgTs}</h1>
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                width: "255px",
                                height: "240px", // Increased height to accommodate heading
                                marginTop: "1.5%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "1px 1px 4px 3px lightGrey",
                              }}
                            >
                              {/* Heading */}
                              <div
                                style={{
                                  textAlign: "center",
                                  padding: "10px",
                                  color: "#CD5C5C",
                                  marginTop: "10px",
                                  fontSize: "1.3rem", // Heading font size
                                  fontWeight: "bold",
                                  fontFamily: "Congenial SemiBold",
                                }}
                              >
                                Time Spent 16-30 mins
                              </div>

                              {/* User and Avg. Time Spent Section */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px",
                                  height: "50%",
                                  color: "#CD5C5C",
                                  fontSize: "1rem", // Reduced font size
                                  fontFamily: "Congenial SemiBold",
                                  fontWeight: "600",
                                }}
                              >
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Users
                                </div>
                                {/* Line divider */}
                                <div
                                  style={{
                                    height: "100%",
                                    borderLeft: "1px solid #CD5C5C", // Line between elements
                                    margin: "0 5px",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Avg. Time (in mins)
                                </div>
                              </div>

                              {/* User count and Avg. Time Spent Values */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  alignItems: "center",
                                  backgroundColor: "#CD5C5C",
                                  borderEndStartRadius: "10px",
                                  borderEndEndRadius: "10px",
                                  color: "white",
                                  padding: "10px",
                                  height: "50%",
                                }}
                              >
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "1rem", // Reduced font size
                                  }}
                                >
                                  <h2>{data.ts_16to30_users}</h2>
                                </div>
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "0.7rem", // Reduced font size
                                  }}
                                >
                                  <h1>{data.ts_16to30_avgTs}</h1>
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                width: "255px",
                                height: "240px", // Increased height to accommodate heading
                                marginTop: "1.5%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "1px 1px 4px 3px lightGrey",
                              }}
                            >
                              {/* Heading */}
                              <div
                                style={{
                                  textAlign: "center",
                                  padding: "10px",
                                  color: "#2E8B57",
                                  marginTop: "10px",
                                  fontSize: "1.3rem", // Heading font size
                                  fontWeight: "bold",
                                  fontFamily: "Congenial SemiBold",
                                }}
                              >
                                Time Spent 31-45 mins
                              </div>

                              {/* User and Avg. Time Spent Section */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px",
                                  height: "50%",
                                  color: "#2E8B57",
                                  fontSize: "1rem", // Reduced font size
                                  fontFamily: "Congenial SemiBold",
                                  fontWeight: "600",
                                }}
                              >
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Users
                                </div>
                                {/* Line divider */}
                                <div
                                  style={{
                                    height: "100%",
                                    borderLeft: "1px solid #2E8B57", // Line between elements
                                    margin: "0 5px",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Avg. Time (in mins)
                                </div>
                              </div>

                              {/* User count and Avg. Time Spent Values */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  alignItems: "center",
                                  backgroundColor: "#2E8B57",
                                  borderEndStartRadius: "10px",
                                  borderEndEndRadius: "10px",
                                  color: "white",
                                  padding: "10px",
                                  height: "50%",
                                }}
                              >
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "1rem", // Reduced font size
                                  }}
                                >
                                  <h2>{data.ts_31to45_users}</h2>
                                </div>
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "0.7rem", // Reduced font size
                                  }}
                                >
                                  <h1>{data.ts_31to45_avgTs}</h1>
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                width: "255px",
                                height: "240px", // Increased height to accommodate heading
                                marginTop: "1.5%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: "1px 1px 4px 3px lightGrey",
                              }}
                            >
                              {/* Heading */}
                              <div
                                style={{
                                  textAlign: "center",
                                  padding: "10px",
                                  color: "#000080",
                                  marginTop: "10px",
                                  fontSize: "1.3rem", // Heading font size
                                  fontWeight: "bold",
                                  fontFamily: "Congenial SemiBold",
                                }}
                              >
                                Time Spent 45+ mins
                              </div>

                              {/* User and Avg. Time Spent Section */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px",
                                  height: "50%",
                                  color: "#000080",
                                  fontSize: "1rem", // Reduced font size
                                  fontFamily: "Congenial SemiBold",
                                  fontWeight: "600",
                                }}
                              >
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Users
                                </div>
                                {/* Line divider */}
                                <div
                                  style={{
                                    height: "100%",
                                    borderLeft: "1px solid #000080", // Line between elements
                                    margin: "0 5px",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                >
                                  Avg. Time (in mins)
                                </div>
                              </div>

                              {/* User count and Avg. Time Spent Values */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  textAlign: "center",
                                  alignItems: "center",
                                  backgroundColor: "#000080",
                                  borderEndStartRadius: "10px",
                                  borderEndEndRadius: "10px",
                                  color: "white",
                                  padding: "10px",
                                  height: "50%",
                                }}
                              >
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "1rem", // Reduced font size
                                  }}
                                >
                                  <h2>{data.ts_45plus_users}</h2>
                                </div>
                                <div
                                  style={{
                                    width: "50%",
                                    fontSize: "0.7rem", // Reduced font size
                                  }}
                                >
                                  <h1>{data.ts_45plus_avgTs}</h1>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>

                      {/* <div
                        className="card"
                        // onClick={() => handleOpen(" Total No. of Minutes Spent")}
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
                            paddingTop: "30px",
                            fontSize: "1.2rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                          }}
                        >
                          Total mins of content consumed
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
                          <h1>{data.total_chatbot_mins}</h1>
                        </div>
                      </div> */}
                      {/* <div
                        className="card"
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
                            color: "rgb(153 58 134)",
                            paddingTop: "20px",
                            fontSize: "1.2rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                          }}
                        >
                          <p> Average Minutes Spent</p>
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
                          <h1>{data.chatbot_avg_mins}</h1>
                        </div>
                      </div> */}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* <div
            style={{
              height: "500px",
              display: "flex",
              justifyContent: "center",
              marginTop: "54px",
              width: "100%",
            }}
          >
            <Graph data={graphData} />
          </div> */}
          {/* <DynamicModal  //? commented for now for emergency purpose
            open={open}
            loading={modalLoader}
            handleClose={handleClose}
            modalTitle={modalContentTitle}
            tableHeaders={tableHeaders}
            tableData={tableData}
            xlData={xlData}
            fileName={fileName}
          />
          <DynamicModal //? commented for now for emergency purpose
            open={newuserModal}
            loading={modalLoader}
            handleClose={handlenewClose}
            modalTitle={modalContentTitle}
            tableHeaders={newtableHeaders}
            tableData={newusertableData}
            xlData={xlDatas}
            fileName={fileNames}
          />
          <DynamicModal //? commented for now for emergency purpose
            open={activeuserModal}
            loading={modalLoader}
            handleClose={handleactiveClose}
            modalTitle={modalContentTitle}
            tableHeaders={activetableHeaders}
            tableData={activeusertableData}
            xlData={xlDatass}
            fileName={fileNamess}
          /> */}
        </>
      ) : !loading && Object.keys(data).length === 0 ? (
        <img src={Nodata} />
      ) : null}
    </div>
  );
};

export default WhatsappChatbot;

const dataJson2 = [
  {
    year: 2024,
    month: 1,
    smartphone_users: 469,
    smartphone_boys: 231,
    smartphone__girls: 238,
    lastUpdated: '"31-01-2024"',
  },
  {
    year: 2024,
    month: 2,
    smartphone_users: 2021,
    smartphone_boys: 1002,
    smartphone__girls: 1019,
    lastUpdated: "29-02-2024",
  },
  {
    year: 2024,
    month: 3,
    smartphone_users: 3474,
    smartphone_boys: 1728,
    smartphone__girls: 1746,
    lastUpdated: "31-03-2024",
  },
  {
    year: 2024,
    month: 4,
    smartphone_users: 3933,
    smartphone_boys: 1960,
    smartphone__girls: 1973,
    lastUpdated: "30-04-2024",
  },
  {
    year: 2024,
    month: 5,
    smartphone_users: 5698,
    smartphone_boys: 2845,
    smartphone__girls: 2853,
    lastUpdated: "31-05-2025",
  },
  {
    year: 2024,
    month: 6,
    smartphone_users: 6458,
    smartphone_boys: 3232,
    smartphone__girls: 3226,
    lastUpdated: "30-06-2024",
  },
  {
    year: 2024,
    month: 7,
    smartphone_users: 6347,
    smartphone_boys: 3181,
    smartphone__girls: 3193,
    lastUpdated: "31-07-2024",
  },
  {
    year: 2024,
    month: 8,
    smartphone_users: 7192,
    smartphone_boys: 3598,
    smartphone__girls: 3595,
    lastUpdated: "31-08-2024",
  },
  {
    year: 2024,
    month: 9,
    smartphone_users: 7085,
    smartphone_boys: 3536,
    smartphone__girls: 3549,
    lastUpdated: "30-09-2024",
  },
  {
    year: 2024,
    month: 10,
    smartphone_users: 8702,
    smartphone_boys: 4380,
    smartphone__girls: 4322,
    lastUpdated: "31-10-2024",
  },
  {
    year: 2024,
    month: 11,
    smartphone_users: 16604,
    smartphone_boys: 8721,
    smartphone__girls: 7883,
    lastUpdated: "31-11-2024",
  },
];

const dataJson = [
  {
    year: 2024,
    month: 1,
    week: 4,
    new_smartphone_users: 747,
    new_activated_smartphone_users: 469,
    active_smartphone_users: 469,
    lastUpdated: "31-01-2024",
  },
  {
    year: 2024,
    month: 2,
    week: 1,
    new_smartphone_users: 1342,
    new_activated_smartphone_users: 1624,
    active_smartphone_users: 1975,
    lastUpdated: "29-02-2024",
  },
  {
    year: 2024,
    month: 2,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 2000,
    lastUpdated: "29-02-2024",
  },
  {
    year: 2024,
    month: 2,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 2012,
    lastUpdated: "29-02-2024",
  },
  {
    year: 2024,
    month: 2,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 2018,
    lastUpdated: "29-02-2024",
  },
  {
    year: 2024,
    month: 3,
    week: 1,
    new_smartphone_users: 863,
    new_activated_smartphone_users: 1744,
    active_smartphone_users: 3469,
    lastUpdated: "31-03-2024",
  },
  {
    year: 2024,
    month: 3,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 3428,
    lastUpdated: "31-03-2024",
  },
  {
    year: 2024,
    month: 3,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 3466,
    lastUpdated: "31-03-2024",
  },
  {
    year: 2024,
    month: 3,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 3424,
    lastUpdated: "31-03-2024",
  },
  {
    year: 2024,
    month: 4,
    week: 1,
    new_smartphone_users: 1098,
    new_activated_smartphone_users: 451,
    active_smartphone_users: 3927,
    lastUpdated: "30-04-2024",
  },
  {
    year: 2024,
    month: 4,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 3871,
    lastUpdated: "30-04-2024",
  },
  {
    year: 2024,
    month: 4,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 3890,
    lastUpdated: "30-04-2024",
  },
  {
    year: 2024,
    month: 4,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 3908,
    lastUpdated: "30-04-2024",
  },
  {
    year: 2024,
    month: 5,
    week: 1,
    new_smartphone_users: 1952,
    new_activated_smartphone_users: 1952,
    active_smartphone_users: 5647,
    lastUpdated: "31-05-2025",
  },
  {
    year: 2024,
    month: 5,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 5679,
    lastUpdated: "31-05-2025",
  },
  {
    year: 2024,
    month: 5,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 5696,
    lastUpdated: "31-05-2025",
  },
  {
    year: 2024,
    month: 5,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 5631,
    lastUpdated: "31-05-2025",
  },
  {
    year: 2024,
    month: 6,
    week: 1,
    new_smartphone_users: 892,
    new_activated_smartphone_users: 892,
    active_smartphone_users: 6203,
    lastUpdated: "30-06-2024",
  },
  {
    year: 2024,
    month: 6,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6448,
    lastUpdated: "30-06-2024",
  },
  {
    year: 2024,
    month: 6,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6421,
    lastUpdated: "30-06-2024",
  },
  {
    year: 2024,
    month: 6,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6185,
    lastUpdated: "30-06-2024",
  },
  {
    year: 2024,
    month: 7,
    week: 1,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6267,
    lastUpdated: "31-07-2024",
  },
  {
    year: 2024,
    month: 7,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6340,
    lastUpdated: "31-07-2024",
  },
  {
    year: 2024,
    month: 7,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6226,
    lastUpdated: "31-07-2024",
  },
  {
    year: 2024,
    month: 7,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6370,
    lastUpdated: "31-07-2024",
  },
  {
    year: 2024,
    month: 8,
    week: 1,
    new_smartphone_users: 1179,
    new_activated_smartphone_users: 1008,
    active_smartphone_users: 7047,
    lastUpdated: "31-08-2024",
  },
  {
    year: 2024,
    month: 8,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6991,
    lastUpdated: "31-08-2024",
  },
  {
    year: 2024,
    month: 8,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 7189,
    lastUpdated: "31-08-2024",
  },
  {
    year: 2024,
    month: 8,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6923,
    lastUpdated: "31-08-2024",
  },
  {
    year: 2024,
    month: 9,
    week: 1,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6901,
    lastUpdated: "30-09-2024",
  },
  {
    year: 2024,
    month: 9,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 7079,
    lastUpdated: "30-09-2024",
  },
  {
    year: 2024,
    month: 9,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6824,
    lastUpdated: "30-09-2024",
  },
  {
    year: 2024,
    month: 9,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 6948,
    lastUpdated: "30-09-2024",
  },
  {
    year: 2024,
    month: 10,
    week: 1,
    new_smartphone_users: 1297,
    new_activated_smartphone_users: 1178,
    active_smartphone_users: 7835,
    lastUpdated: "31-10-2024",
  },
  {
    year: 2024,
    month: 10,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 7969,
    lastUpdated: "31-10-2024",
  },
  {
    year: 2024,
    month: 10,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 7804,
    lastUpdated: "31-10-2024",
  },
  {
    year: 2024,
    month: 10,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 8611,
    lastUpdated: "31-10-2024",
  },
  {
    year: 2024,
    month: 11,
    week: 1,
    new_smartphone_users: 10248,
    new_activated_smartphone_users: 8316,
    active_smartphone_users: 14566,
    lastUpdated: "31-11-2024",
  },
  {
    year: 2024,
    month: 11,
    week: 2,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 14726,
    lastUpdated: "31-11-2024",
  },
  {
    year: 2024,
    month: 11,
    week: 3,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 15252,
    lastUpdated: "31-11-2024",
  },
  {
    year: 2024,
    month: 11,
    week: 4,
    new_smartphone_users: 0,
    new_activated_smartphone_users: 0,
    active_smartphone_users: 16533,
    lastUpdated: "31-11-2024",
  },
];
