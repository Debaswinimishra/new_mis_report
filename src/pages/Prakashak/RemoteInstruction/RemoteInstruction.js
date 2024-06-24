import React, { useState, useEffect } from "react";
import logo from "../../../Assets/OE60SH0.jpg";
import { TextField } from "@mui/material";
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
import PrakashakAPI from "../../../Environment/PrakashakAPI";
import Box from "@mui/material/Box";
import moment from "moment";
import Graph from "../../../ReusableComponents/Graphs";
import Nodata from "../../../Assets/Nodata.gif";
import DynamicModal from "../../../Components/DynamicModal";

const RemoteInstruction = () => {
  //~-------------------------------------------------------
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];

  //&-------------Filter states---------------
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [remoteInstData, setRemoteInstData] = useState({});
  const [loading, setLoading] = useState();
  const [open, setOpen] = useState(false);
  const [modalContentData, setModalContentData] = useState([]);
  const [modalContentTitle, setModalContentTitle] = useState("");

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedMonth("");
    setSelectedWeek("");
  };

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
      setSelectedWeek(e.target.value ? parseInt(e.target.value) : "");
    }
  };

  useEffect(() => {
    let body = {};
    setLoading(true);
    if (!selectedMonth && !selectedMonth) {
      body = {
        year: selectedYear,
      };
    } else if (!selectedWeek && selectedMonth) {
      body = {
        year: selectedYear,
        month: selectedMonth,
      };
    } else if (selectedMonth && selectedWeek) {
      body = {
        year: selectedYear,
        month: selectedMonth,
        week: selectedWeek,
      };
    } else {
      alert("Please select a month before selecting the week !");
    }
    console.log("body passed------------>", body);
    PrakashakAPI.post(`getRemoteInstReport`, body)
      .then((res) => {
        if (res.status === 200) {
          setRemoteInstData(res.data);
          setLoading(false);
        } else {
          setLoading(false);
          console.log("res status------->", res.status);
        }
      })
      .catch((err) => {
        setLoading(false);
        // alert("No data available");
        console.log(`The error is---> ${err}`);
      });
  }, []);

  const filterButtonClick = () => {
    setRemoteInstData({});
    let body = {};
    setLoading(true);
    if (!selectedMonth && !selectedMonth) {
      body = {
        year: selectedYear,
      };
    } else if (!selectedWeek && selectedMonth) {
      body = {
        year: selectedYear,
        month: selectedMonth,
      };
    } else if (selectedMonth && selectedWeek) {
      body = {
        year: selectedYear,
        month: selectedMonth,
        week: selectedWeek,
      };
    } else {
      alert("Please select a month before selecting the week !");
    }
    console.log("body passed------------>", body);
    PrakashakAPI.post(`getRemoteInstReport`, body)
      .then((res) => {
        if (res.status === 200) {
          setRemoteInstData(res.data);
          setLoading(false);
        } else {
          setLoading(false);
          console.log("res status------->", res.status);
        }
      })
      .catch((err) => {
        setLoading(false);
        // alert("No data available");
        console.log(`The error is---> ${err}`);
      });
  };

  const handleOpen = (contentTitle) => {
    //
    setOpen(true);
    setModalContentData([]);
    setModalContentTitle(contentTitle);
  };

  const handleClose = () => setOpen(false);

  const tableHeaders = [
    "Sl No.",
    "Customer Id",
    "Mobile No.",
    "Class",
    "Board",
    "School",
    "Status",
    "Date",
  ];
  const tableData = [
    {
      customer_id: "C001",
      mobile: "1234567890",
      class: "10",
      board: "CBSE",
      school: "XYZA School",
      status: "Active",
      date: new Date(),
    },
  ];

  const xlData = tableData;
  const fileName = "whatsappChatboat.csv";

  //todo--------------------Console logs--------------------------
  console.log("selectedYear---->", selectedYear);
  console.log("selectedMonth---->", selectedMonth);
  console.log("selectedWeek---->", selectedWeek);
  console.log(
    "remoteInstData-------------------------------->",
    remoteInstData
  );
  console.log("contentTitle--------------------->", modalContentTitle);

  const graphData = {
    labels: ["SMS", "Automated Calls", "IVRs"],
    values1: [
      remoteInstData.total_sms_scheduled,
      remoteInstData.total_calls_made,
      remoteInstData.total_ivrs_calls_made,
    ],
    //   labels: ["SMS", "Automated Calls", "IVRs"],
    //   values1: [remoteInstData.total_sms_scheduled],
    //   values2: [remoteInstData.total_calls_made],
    //   values3: [remoteInstData.total_ivrs_calls_made],
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "4%",
          marginLeft: "60%",
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
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <CircularProgress />
          </Box>
        </div>
      ) : !loading && Object.keys(remoteInstData).length > 0 ? (
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
              <h2>SMS</h2>
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
                onClick={() => handleOpen("Total no. of SMS scheduled")}
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
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Total no. of SMS scheduled</p>
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
                  <h1>{remoteInstData.total_sms_scheduled}</h1>
                </div>
              </div>

              <div
                onClick={() => handleOpen("Total no. of SMS delivered")}
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
                    color: "rgb(214 148 16)",
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Total no. of SMS delivered</p>
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
                  <h1>{remoteInstData.total_sms_delivered}</h1>
                </div>
              </div>

              <div
                onClick={() =>
                  handleOpen("Total no. of SMS scheduled for Maths")
                }
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
                    color: "#6A5ACD",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total no. of SMS scheduled for Maths</p>
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
                  <h1>{remoteInstData.total_sms_scheduled_maths}</h1>
                </div>
              </div>
              <div
                onClick={() =>
                  handleOpen("Total no. of SMS scheduled for Odia")
                }
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
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total no. of SMS scheduled for Odia</p>
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
                  <h1>{remoteInstData.total_sms_scheduled_odia}</h1>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "2%",
              boxShadow: "2px 1px 5px grey",
              padding: "3%",
              width: "95%",
            }}
          >
            <div style={{ marginTop: "-2%" }}>
              <h2>Automated Calls</h2>
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
                onClick={() => handleOpen("Total no. of calls made")}
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
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                    padding: "13px",
                  }}
                >
                  <p>Total no. of calls made</p>
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
                  <h1>{remoteInstData.total_calls_made}</h1>
                </div>
              </div>

              <div
                onClick={() => handleOpen("Total no. of calls received")}
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
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Total no. of calls received</p>
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
                  <h1>{remoteInstData.total_calls_received}</h1>
                </div>
              </div>
              <div
                onClick={() => handleOpen("Total minutes of contents consumed")}
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
                    color: "#6A5ACD",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total minutes of contents consumed</p>
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
                  <h1>{remoteInstData.total_calls_mins}</h1>
                </div>
              </div>
              <div
                onClick={() =>
                  handleOpen("Total no. parents listened to the full content")
                }
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
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total no. parents listened to the full content</p>
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
                  <h1>{remoteInstData.calls_parents_listen_full_content}</h1>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "2%",
              boxShadow: "2px 1px 5px grey",
              padding: "3%",
              width: "95%",
            }}
          >
            <div style={{ marginTop: "-2%" }}>
              <h2>IVR</h2>
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
                onClick={() => handleOpen("Total no. of incoming calls")}
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
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Total no. of incoming calls</p>
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
                  <h1>{remoteInstData.total_ivrs_calls_made}</h1>
                </div>
              </div>

              <div
                onClick={() => handleOpen("Total no. of unique calls")}
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
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                    padding: "10px",
                  }}
                >
                  <p>Total no. of unique calls</p>
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
                  <h1>{remoteInstData.total_unique_ivrs_calls_received}</h1>
                </div>
              </div>

              <div
                onClick={() => handleOpen("Total minutes spent in IVRs")}
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
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total minutes spent in IVRs</p>
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
                  <h1>{remoteInstData.total_ivrs_calls_mins}</h1>
                </div>
              </div>

              <div
                onClick={() =>
                  handleOpen(" Total no. parents listened to maths activity")
                }
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
                    color: "#1e66aa",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total no. parents listened to maths activity</p>
                </div>
                <div
                  style={{
                    height: "50%",
                    backgroundColor: "#1e66aa",
                    borderEndStartRadius: "10px",
                    borderEndEndRadius: "10px",
                    color: "white",
                  }}
                >
                  <h1>{remoteInstData.total_ivrs_calls_maths}</h1>
                </div>
              </div>

              <div
                onClick={() =>
                  handleOpen("Total no. parents listened to odia activity")
                }
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
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total no. parents listened to odia activity</p>
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
                  <h1>{remoteInstData.total_ivrs_calls_odia}</h1>
                </div>
              </div>

              <div
                onClick={() =>
                  handleOpen("Total no. of calls diverted to experts")
                }
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
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total no. of calls diverted to experts</p>
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
                  <h1>{remoteInstData.total_ivrs_calls_diverted_expert}</h1>
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
            modalTitle={modalContentTitle}
            tableHeaders={tableHeaders}
            tableData={tableData}
            xlData={xlData}
            fileName={fileName}
          />
        </div>
      ) : Object.keys(remoteInstData).length === 0 && loading === false ? (
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
      ) : null}
    </div>
  );
};

export default RemoteInstruction;
