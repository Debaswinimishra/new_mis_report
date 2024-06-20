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
  const [open, setOpen] = useState(false);
  const [modalContentTitle, setModalContentTitle] = useState("");
  const [modalContentData, setModalContentData] = useState([]);

  // Function to handle modal opening
  // const handleOpen = async (contentTitle) => {
  //   setModalContentTitle(contentTitle);
  //   setLoading(true);

  //   try {
  //     const response = await Api.get(`getDataFor${contentTitle}`);
  //     setModalContentData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching modal data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Function to handle modal closing
  // const handleClose = () => {
  //   setModalContentTitle("");
  //   setModalContentData([]);
  // };
  const handleOpen = () => {
    setOpen(true);
    setModalContentData([]);
    setModalContentTitle("");
  };
  const handleClose = () => setOpen(false);
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
                  onClick={() => handleOpen(" Total No. of Users")}
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
                  onClick={() => handleOpen(" Total No. of New Users")}
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
                  onClick={() => handleOpen(" Total No. of Minutes Spent")}
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
                  onClick={() => handleOpen(" Average Minutes Spent")}
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 1000,
                height: 600,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                overflow: "scroll",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {modalContentData}
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Sl No.</TableCell>
                      <TableCell align="center">Customer Id</TableCell>
                      <TableCell align="center">Mobile No.</TableCell>
                      <TableCell align="center">Class</TableCell>
                      <TableCell align="center">Board</TableCell>
                      <TableCell align="center">School</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.chats &&
                      data.chats.map((chat, index) => (
                        <TableRow key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            {chat.customer_id}
                          </TableCell>
                          <TableCell align="center">{chat.mobile}</TableCell>
                          <TableCell align="center">{chat.class}</TableCell>
                          <TableCell align="center">{chat.board}</TableCell>
                          <TableCell align="center">{chat.school}</TableCell>
                          <TableCell align="center">{chat.status}</TableCell>
                          <TableCell align="center">
                            {moment(chat.date).format("DD/MM/YYYY")}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Modal>
        </>
      ) : !loading && Object.keys(data).length === 0 ? (
        <img src={Nodata} />
      ) : null}
    </div>
  );
};

export default WhatsappChatbot;
