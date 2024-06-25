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
    { value: 5, label: "5" },
  ];

  //?----------------Class Array-----------------------
  const classArr = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];

  //&-------------Filter states---------------
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [loading, setLoading] = useState(false);

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
      setSelectedWeek("");
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

  const [data, setData] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    const body = {
      year: selectedYear,
      month: selectedMonth,
      week: selectedWeek,
    };

    console.log("check---------->", selectedYear, selectedMonth, selectedWeek);

    if (selectedYear) {
      Api.post(`getChatbotReport`, body)
        .then((response) => {
          console.log("set=================>", response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err=================>", err);
          setLoading(false);
        });
    } else {
      Api.post(`getChatbotReport`)
        .then((response) => {
          console.log("set=================>", response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err=================>", err);
          setLoading(false);
        });
    }
  };

  const filterButtonClick = () => {
    setLoading(true);
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

  // // Function to handle modal opening
  // // const handleOpen = async (contentTitle) => {
  // //   setModalContentTitle(contentTitle);
  // //   setLoading(true);

  // //   try {
  // //     const response = await Api.get(`getDataFor${contentTitle}`);
  // //     setModalContentData(response.data);
  // //   } catch (error) {
  // //     console.error("Error fetching modal data:", error);
  // //   } finally {
  // //     setLoading(false);
  // //   }
  // // };

  // // // Function to handle modal closing
  // // const handleClose = () => {
  // //   setModalContentTitle("");
  // //   setModalContentData([]);
  // // };

  // const handleClose = () => setOpen(false);
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);

  const fetchDatas = async () => {
    setLoading(true);
    try {
      const body = {
        year: selectedYear,
        month: selectedMonth,
        week: selectedWeek,
      };

      const response = await PrakashakAPI.post(
        "getChatBotActiveUsersReport",
        body
      );

      if (response.status === 200) {
        setDatas(response.data);
      } else {
        console.error(`Error fetching districts: Status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    fetchDatas();
    // setModalContentData([]);
    // setModalContentTitle("");
  };
  const handleClose = () => {
    setOpen(false);
    setnewUserOpen(false);
  };

  const modalTitle = "Your Modal Title";
  const tableHeaders = [
    "Student Name",
    "Class",
    "Gender",
    "Parents Name",
    "School Name",
    "District",
    "Block",
    "Cluster",
    "Contact",
  ];
  const tableData = [
    {
      student_name: datas.student_name,
      class: datas.class,
      gender: datas.gender,
      parents_name: datas.parents_name,
      school_name: datas.school_name,
      district: datas.district,
      block: datas.block,
      cluster: datas.cluster,
      contact: datas.contact,
    },
  ];
  const xlData = tableData;
  const fileName = "ActiveUsersReport.csv";

  const [userOpen, setUserOpen] = useState(false);
  const [userData, setuserData] = useState([]);
  console.log(userData, "response.data.districtsArr");
  const fetchUserData = async () => {
    // setLoading(true);
    try {
      const body = {
        year: selectedYear,
        month: selectedMonth,
        week: selectedWeek,
      };
      console.log("====================================userbody", body);

      const response = await PrakashakAPI.post(
        "getChatBotAllUsersReport",
        body
      );

      if (response.status === 200) {
        setuserData(response.data); // Assuming response structure
        console.table(response.data, "response.data.districtsArr");
      } else {
        console.error(`Error fetching districts: Status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleUserOpen = () => {
    setUserOpen(true);
    fetchUserData();
  };
  const handleUserClose = () => setUserOpen(false);

  const usermodalTitle = "All User ";
  const usertableHeaders = [
    "Student Name",
    "Class",
    "Gender",
    "Parents Name",
    "School Name",
    "District",
    "Block",
    "Cluster",
    "Contact",
  ];
  const usertableData = [
    {
      student_name: datas.student_name,
      class: datas.class,
      gender: datas.gender,
      parents_name: datas.parents_name,
      school_name: datas.school_name,
      district: datas.district,
      block: datas.block,
      cluster: datas.cluster,
      contact: datas.contact,
    },
  ];
  const userxlData = usertableData;
  const userfileName = "Alluser.csv";

  const [newuserOpen, setnewUserOpen] = useState(false);
  const [newuserData, setnewuserData] = useState([]);
  console.log(userData, "response.data.districtsArr");
  const fetchNewuserData = async () => {
    // setLoading(true);
    try {
      const body = {
        year: selectedYear,
        month: selectedMonth,
        week: selectedWeek,
      };
      console.log("====================================userbody", body);

      const response = await PrakashakAPI.post(
        "getChatBotAllUsersReport",
        body
      );

      if (response.status === 200) {
        setuserData(response.data); // Assuming response structure
        console.table(response.data, "response.data.districtsArr");
      } else {
        console.error(`Error fetching districts: Status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading(false);
    }
  };
  const handlenewUserOpen = () => {
    setnewUserOpen(true);
    fetchNewuserData();
  };
  const handlenewUserClose = () => setnewUserOpen(false);

  const newusermodalTitle = "New User ";
  const newusertableHeaders = [
    "Student Name",
    "Class",
    "Gender",
    "Parents Name",
    "School Name",
    "District",
    "Block",
    "Cluster",
    "Contact",
  ];
  const newusertableData = [
    {
      student_name: datas.student_name,
      class: datas.class,
      gender: datas.gender,
      parents_name: datas.parents_name,
      school_name: datas.school_name,
      district: datas.district,
      block: datas.block,
      cluster: datas.cluster,
      contact: datas.contact,
    },
  ];
  const newuserxlData = usertableData;
  const newuserfileName = "Newuser.csv";

  return (
    <div>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-around",
          // width: "25%",
          marginTop: "4%",
          marginLeft: "62%",
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
            <MenuItem value={null}>None</MenuItem>
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
            <MenuItem value={null}>None</MenuItem>
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
      ) : !loading && Object.keys(data).length > 0 ? (
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
                <div
                  className="card"
                  onClick={() => handleUserOpen(" Total No. of Users")}
                  // onClick={handleOpen}
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
                      color: "#CD5C5C",
                      paddingTop: "20px",
                      fontSize: "1.2rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    <p> Total No. of Users</p>
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
                    <h1>{data.chatbot_users}</h1>
                  </div>
                </div>
                <div
                  className="card"
                  // onClick={handleOpen}
                  onClick={() => handlenewUserOpen(" Total No. of New Users")}
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
                      color: "rgb(214 148 16)",
                      paddingTop: "20px",
                      fontSize: "1.2rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    <p> Total No. of New Users</p>
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
                    <h1>{data.chatbot_new_users}</h1>
                  </div>
                </div>
                <div
                  className="card"
                  onClick={() => handleOpen(" Total No. of Active Users")}
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
                      paddingTop: "20px",
                      fontSize: "1.2rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    <p> Total No. of Active Users</p>
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
                    <h1>{data.chatbot_active_users}</h1>
                  </div>
                </div>
                {/* <div
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
                      color: "#2E8B57",
                      paddingTop: "20px",
                      fontSize: "1.1rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    Total No. of Parents completed at least one activity
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
                    <h1>{data.chatbot_users_completed_one_act}</h1>
                  </div>
                </div> */}
                {/* <div
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
                    Total No. of parents completed the full thread
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
                    <h1>{data.chatbot_users_completed_full_thread}</h1>
                  </div>
                </div> */}

                <div
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
                      paddingTop: "20px",
                      fontSize: "1.2rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    Total No. of Minutes Spent
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
                </div>
                <div
                  className="card"
                  // onClick={handleOpen}
                  // onClick={() => handleOpen(" Average Minutes Spent")}
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
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "500px",
              display: "flex",
              justifyContent: "center",
              marginTop: "54px",
              width: "100%",
            }}
          >
            <Graph data={graphData} />
          </div>
          <DynamicModal
            open={open}
            handleClose={handleClose}
            modalTitle={modalTitle}
            tableHeaders={tableHeaders}
            tableData={tableData}
            xlData={xlData}
            fileName={fileName}
          />
          {/* all user modal */}
          <DynamicModal
            open={userOpen}
            handleClose={handleUserClose}
            modalTitle={usermodalTitle}
            tableHeaders={usertableHeaders}
            tableData={usertableData}
            xlData={userxlData}
            fileName={userfileName}
          />
          {/* newuser */}
          <DynamicModal
            open={newuserOpen}
            handleClose={handleClose}
            modalTitle={newusermodalTitle}
            tableHeaders={newusertableHeaders}
            tableData={newusertableData}
            xlData={newuserxlData}
            fileName={newuserfileName}
          />
        </>
      ) : !loading && Object.keys(data).length === 0 ? (
        <img src={Nodata} />
      ) : null}
    </div>
  );
};

export default WhatsappChatbot;
