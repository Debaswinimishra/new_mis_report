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
  const [selectedMonth, setSelectedMonth] = useState(
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
  console.log("data--->", data);

  useEffect(() => {
    fetchData();
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

  const filterButtonClick = () => {
    setLoading(true);
    setShow(true);
    fetchData();
  };

  const graphData = {
    labels: data.graphData?.classData,
    values1: data.graphData?.numberData,
    //   labels: ["SMS", "Automated Calls", "IVRs"],
    //   values1: [remoteInstData.total_sms_scheduled],
    //   values2: [remoteInstData.total_calls_made],
    //   values3: [remoteInstData.total_ivrs_calls_made],
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
                <u> Data Updated as on - 30/09/2024</u>
              </i>
            </h2>
          </div>
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
              className="card"
              // onClick={() => handleOpen("Total No. of Users")}
              style={{
                width: "255px",
                height: "180px",
                marginTop: "1.5%",
                backgroundColor: "white",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "1px 1px 4px 3px lightGrey",
                // cursor: "pointer", // Show hand cursor on hover
                // position: "relative", // Needed for positioning the "Click here" text
              }}
            >
              {/* <div
                style={{
                  position: "absolute",
                  top: "0px", // Adjust to position the text at the top
                  right: "0px", // Adjust to position the text at the right
                  color: "#00CED1", // Text color
                  backgroundColor: "white", // Background color to make it stand out
                  padding: "5px 10px", // Padding to add some space inside the border
                  fontSize: "0.7rem",
                  fontFamily: "Congenial SemiBold",
                  fontWeight: "600",
                  borderRadius: "5px", // Rounded corners for a smoother look
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for a 3D effect
                  zIndex: "10", // Ensure it stays on top of other elements
                }}
              >
                Click Here 👆
              </div> */}
              <div
                style={{
                  height: "50%",
                  color: "#00CED1",
                  paddingTop: "20px",
                  fontSize: "1.2rem",
                  fontFamily: "Congenial SemiBold",
                  fontWeight: "600",
                }}
              >
                <p>No. of registered smartphone users</p>
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
                {loading ? (
                  <CircularProgress
                    style={{ color: "white", marginTop: "20px" }}
                  /> // Display CircularProgress when loading
                ) : (
                  // <h1>{data.chatbot_users}</h1>
                  <h1>8461</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-around",
          // width: "25%",
          marginTop: "4%",
          marginLeft: "55%",
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
                            <h1>{data.chatbot_new_users}</h1>
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
                          <h1>{data.chatbot_active_users}</h1>
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
                            <h1>{data.new_activated_students}</h1>
                          </div>
                        </div>
                      ) : null}

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

const dataJson = [
  {
    month: 1,
    week: 4,
    chatbot_new_users: 747,
    chatbot_active_users: 469,
    new_activated_students: 469,
    total_chatbot_mins: 1938,
  },
  {
    month: 2,
    week: 1,
    chatbot_new_users: 1730,
    chatbot_active_users: 1451,
    new_activated_students: 1624,
    total_chatbot_mins: 15028,
  },
  {
    month: 2,
    week: 2,
    chatbot_new_users: 0,
    chatbot_active_users: 1458,
    new_activated_students: 0,
    total_chatbot_mins: 18209,
  },
  {
    month: 2,
    week: 3,
    chatbot_new_users: 0,
    chatbot_active_users: 1461,
    new_activated_students: 0,
    total_chatbot_mins: 19813,
  },
  {
    month: 2,
    week: 4,
    chatbot_new_users: 0,
    chatbot_active_users: 1564,
    new_activated_students: 0,
    total_chatbot_mins: 31351,
  },
  {
    month: 3,
    week: 1,
    chatbot_new_users: 863,
    chatbot_active_users: 2613,
    new_activated_students: 1744,
    total_chatbot_mins: 44306,
  },
  {
    month: 3,
    week: 2,
    chatbot_new_users: 0,
    chatbot_active_users: 2637,
    new_activated_students: 0,
    total_chatbot_mins: 31650,
  },
  {
    month: 3,
    week: 3,
    chatbot_new_users: 0,
    chatbot_active_users: 2628,
    new_activated_students: 0,
    total_chatbot_mins: 48134,
  },
  {
    month: 3,
    week: 4,
    chatbot_new_users: 0,
    chatbot_active_users: 2635,
    new_activated_students: 0,
    total_chatbot_mins: 39360,
  },
  {
    month: 4,
    week: 1,
    chatbot_new_users: 1098,
    chatbot_active_users: 3212,
    new_activated_students: 451,
    total_chatbot_mins: 32249,
  },
  {
    month: 4,
    week: 2,
    chatbot_new_users: 0,
    chatbot_active_users: 3208,
    new_activated_students: 0,
    total_chatbot_mins: 24351,
  },
  {
    month: 4,
    week: 3,
    chatbot_new_users: 0,
    chatbot_active_users: 3216,
    new_activated_students: 0,
    total_chatbot_mins: 33243,
  },
  {
    month: 4,
    week: 4,
    chatbot_new_users: 0,
    chatbot_active_users: 3209,
    new_activated_students: 0,
    total_chatbot_mins: 65819,
  },
  {
    month: 5,
    week: 1,
    chatbot_new_users: 1952,
    chatbot_active_users: 4438,
    new_activated_students: 1952,
    total_chatbot_mins: 79781,
  },
  {
    month: 5,
    week: 2,
    chatbot_new_users: 0,
    chatbot_active_users: 4513,
    new_activated_students: 0,
    total_chatbot_mins: 71786,
  },
  {
    month: 5,
    week: 3,
    chatbot_new_users: 0,
    chatbot_active_users: 4514,
    new_activated_students: 0,
    total_chatbot_mins: 61906,
  },
  {
    month: 5,
    week: 4,
    chatbot_new_users: 0,
    chatbot_active_users: 4603,
    new_activated_students: 0,
    total_chatbot_mins: 84803,
  },
  {
    month: 6,
    week: 1,
    chatbot_new_users: 892,
    chatbot_active_users: 5400,
    new_activated_students: 892,
    total_chatbot_mins: 60938,
  },
  {
    month: 6,
    week: 2,
    chatbot_new_users: 0,
    chatbot_active_users: 5008,
    new_activated_students: 0,
    total_chatbot_mins: 72819,
  },
  {
    month: 6,
    week: 3,
    chatbot_new_users: 0,
    chatbot_active_users: 5135,
    new_activated_students: 0,
    total_chatbot_mins: 76560,
  },
  {
    month: 6,
    week: 4,
    chatbot_new_users: 0,
    chatbot_active_users: 5140,
    new_activated_students: 0,
    total_chatbot_mins: 61726,
  },
  {
    month: 7,
    week: 1,
    chatbot_new_users: 0,
    chatbot_active_users: 5565,
    new_activated_students: 0,
    total_chatbot_mins: 73781,
  },
  {
    month: 7,
    week: 2,
    chatbot_new_users: 0,
    chatbot_active_users: 5747,
    new_activated_students: 0,
    total_chatbot_mins: 82588,
  },
  {
    month: 7,
    week: 3,
    chatbot_new_users: 0,
    chatbot_active_users: 5686,
    new_activated_students: 0,
    total_chatbot_mins: 97066,
  },
  {
    month: 7,
    week: 4,
    chatbot_new_users: 0,
    chatbot_active_users: 5672,
    new_activated_students: 0,
    total_chatbot_mins: 93456,
  },
  {
    month: 8,
    week: 1,
    chatbot_new_users: 1179,
    chatbot_active_users: 6404,
    new_activated_students: 1008,
    total_chatbot_mins: 0,
  },
  {
    month: 8,
    week: 2,
    chatbot_new_users: 0,
    chatbot_active_users: 6382,
    new_activated_students: 0,
    total_chatbot_mins: 0,
  },
  {
    month: 8,
    week: 3,
    chatbot_new_users: 0,
    chatbot_active_users: 6374,
    new_activated_students: 0,
    total_chatbot_mins: 0,
  },
  {
    month: 8,
    week: 4,
    chatbot_new_users: 0,
    chatbot_active_users: 6373,
    new_activated_students: 0,
    total_chatbot_mins: 0,
  },
  {
    month: 9,
    week: 1,
    chatbot_new_users: 0,
    chatbot_active_users: 6478,
    new_activated_students: 0,
    total_chatbot_mins: 0,
  },
  {
    month: 9,
    week: 2,
    chatbot_new_users: 0,
    chatbot_active_users: 6579,
    new_activated_students: 0,
    total_chatbot_mins: 0,
  },
  {
    month: 9,
    week: 3,
    chatbot_new_users: 0,
    chatbot_active_users: 6641,
    new_activated_students: 0,
    total_chatbot_mins: 0,
  },
  {
    month: 9,
    week: 4,
    chatbot_new_users: 0,
    chatbot_active_users: 6698,
    new_activated_students: 0,
    total_chatbot_mins: 0,
  },
];
