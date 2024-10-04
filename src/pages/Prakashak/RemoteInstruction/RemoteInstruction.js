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
import { Subject } from "@mui/icons-material";

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
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 1 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];

  console.log("currentMonth--------->", currentMonthSelected);

  //&-------------Filter states---------------
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonthSelected.value - 2
  );
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [remoteInstData, setRemoteInstData] = useState([]);
  const [loading, setLoading] = useState();
  const [open, setOpen] = useState(false);
  const [modalContentData, setModalContentData] = useState([]);
  const [modalContentTitle, setModalContentTitle] = useState("");
  const [remoteInstructionType, setRemoteInstructionType] = useState("");
  const [modalLoader, setModalLoader] = useState(false);
  const [isFiltered, setIsFiltered] = useState(true);

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
      setSelectedWeek(1);
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
    const filteredData = dataJson.filter((item) => {
      return item.month === selectedMonth && item.week === selectedWeek;
    });
    if (filteredData?.length > 0) {
      setRemoteInstData(filteredData);
      setLoading(false);
    } else {
      setLoading(false);
    }
    // PrakashakAPI.post(`getRemoteInstReport`, body)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setRemoteInstData(res.data); //Currently I have done this with dummy
    //       console.log("remoteInstructionData---------->", res.data);
    //       setLoading(false);
    //     } else {
    //       setLoading(false);
    //       console.log("res status------->", res.status);
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     // alert("No data available");
    //     console.log(`The error is---> ${err}`);
    //   });
  }, []);

  const filterButtonClick = () => {
    setRemoteInstData({});
    let body = {};
    setLoading(true);
    setIsFiltered(false);

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
    } else if (!selectedMonth) {
      alert("Please select a month before selecting the week!");
    } else if (!selectedWeek) {
      alert("please select a week before proceeding !");
    }

    console.log("body passed------------>", body);
    const filteredData = dataJson.filter((item) => {
      return item.month === selectedMonth && item.week === selectedWeek;
    });
    if (filteredData?.length > 0) {
      setRemoteInstData(filteredData);
      setLoading(false);
    } else {
      setLoading(false);
    }

    // PrakashakAPI.post(`getRemoteInstReport`, body)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setRemoteInstData(res.data);
    //       setLoading(false);
    //       if (body.month) {
    //         setIsFiltered(true);
    //       } else {
    //         setIsFiltered(false);
    //       }
    //     } else {
    //       setLoading(false);
    //       console.log("res status------->", res.status);
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log(`The error is---> ${err}`);
    //   });
  };

  let tableHeaders;

  //!---------------this function handles various api calls which will handle the data retrived through modal popup--------------
  const handleOpen = ({ contentTitle, remoteInstruction }) => {
    console.log("content Title to attach new apis----------->", contentTitle);
    setRemoteInstructionType(remoteInstruction);
    setOpen(true);
    setModalLoader(true);
    setModalContentTitle(contentTitle);
    const body = selectedWeek
      ? {
          year: selectedYear,
          month: selectedMonth,
          week: selectedWeek,
        }
      : !selectedWeek && selectedMonth
      ? {
          year: selectedYear,
          month: selectedMonth,
        }
      : {
          year: selectedYear,
        };

    if (
      remoteInstruction === "sms" &&
      contentTitle === "Total no. of SMS scheduled"
    ) {
      PrakashakAPI.post("getSmsReport", body)
        .then((res) => {
          if (res.status === 200) {
            setModalContentData(res.data);
            setModalLoader(false);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "sms" &&
      contentTitle === "Total no. of SMS delivered"
    ) {
      PrakashakAPI.post("getDeliveredSmsReport", body)
        .then((res) => {
          if (res.status === 200) {
            setModalContentData(res.data);
            setModalLoader(false);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "sms" &&
      contentTitle === "Total no. of SMS scheduled for Maths"
    ) {
      const bodyWithSubject = {
        ...body,
        subject: "maths",
      };

      PrakashakAPI.post("getSmsReport", bodyWithSubject)
        .then((res) => {
          if (res.status === 200) {
            setModalContentData(res.data);
            setModalLoader(false);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "sms" &&
      contentTitle === "Total no. of SMS scheduled for Odia"
    ) {
      const bodyWithSubject = {
        ...body,
        subject: "odia",
      };

      PrakashakAPI.post("getSmsReport", bodyWithSubject)
        .then((res) => {
          if (res.status === 200) {
            setModalContentData(res.data);
            setModalLoader(false);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "auto_calls" &&
      contentTitle !== "Total no. of calls received"
    ) {
      PrakashakAPI.post("getAutoCallsReport", body)
        .then((res) => {
          if (res.status === 200) {
            setModalLoader(false);
            setModalContentData(res.data);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "auto_calls" &&
      contentTitle === "Total no. of calls received"
    ) {
      PrakashakAPI.post("getReceivedAutoCallsReport", body)
        .then((res) => {
          if (res.status === 200) {
            setModalLoader(false);
            setModalContentData(res.data);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "ivrs" &&
      contentTitle === "Total no. of incoming calls"
    ) {
      PrakashakAPI.post("getIvrsReport", body)
        .then((res) => {
          if (res.status === 200) {
            setModalLoader(false);
            setModalContentData(res.data);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "ivrs" &&
      contentTitle == "Total no. of unique calls"
    ) {
      PrakashakAPI.post("getUniqueIvrsReport", body)
        .then((res) => {
          if (res.status === 200) {
            setModalLoader(false);
            setModalContentData(res.data);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "ivrs" &&
      contentTitle == "Total no. of calls diverted to experts"
    ) {
      PrakashakAPI.post("getExpertDivertedIvrsReport", body)
        .then((res) => {
          if (res.status === 200) {
            setModalLoader(false);
            setModalContentData(res.data);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "ivrs" &&
      contentTitle === "Total no. parents listened to maths activity"
    ) {
      const bodyWithSubject = {
        ...body,
        subject: "maths",
      };
      PrakashakAPI.post("getIvrsReport", bodyWithSubject)
        .then((res) => {
          if (res.status === 200) {
            setModalLoader(false);
            setModalContentData(res.data);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    } else if (
      remoteInstruction === "ivrs" &&
      contentTitle === "Total no. parents listened to odia activity"
    ) {
      const bodyWithSubject = {
        ...body,
        subject: "odia",
      };
      PrakashakAPI.post("getIvrsReport", bodyWithSubject)
        .then((res) => {
          if (res.status === 200) {
            setModalLoader(false);
            setModalContentData(res.data);
          } else {
            setModalLoader(false);
            console.log(
              "response status while getting report data--------->",
              res.status
            );
            setModalContentData([]);
          }
        })
        .catch((error) => {
          setModalLoader(false);
          console.error(
            "The error while receiving report data----------->",
            error
          );
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setModalContentData([]);
  };

  tableHeaders =
    remoteInstructionType === "sms"
      ? [
          "Student Name",
          "Parent's name",
          "Class",
          "Mobile No.",
          "Gender",
          "School",
          "District",
          "Block",
          "Status",
          "Duration",
        ]
      : remoteInstructionType === "ivrs" &&
        modalContentTitle !== "Total no. of unique calls"
      ? [
          "Student Name",
          "Class",
          "Gender",
          "Parent's name",
          "School",
          "District",
          "Block",
          "Cluster",
          "Mobile No.",
          "Subject",
          "Status",
          "Duration",
        ]
      : remoteInstructionType === "ivrs" &&
        modalContentTitle === "Total no. of unique calls"
      ? [
          "Student Name",
          "Class",
          "Gender",
          "Parent's name",
          "Mobile No.",
          "School",
          "District",
          "Block",
          "Cluster",
          "Subject",
          "Status",
          "Duration",
        ]
      : [
          "Student Name",
          "Class",
          "Gender",
          "Parent's name",
          "School",
          "District",
          "Block",
          "Cluster",
          "Mobile No.",
          "Status",
          "Duration",
        ];

  const xlData = modalContentData;
  const fileName = "whatsappChatboat.csv";

  //todo--------------------Console logs--------------------------
  // console.log("selectedYear---->", selectedYear);
  // console.log("selectedMonth---->", selectedMonth);
  // console.log("selectedWeek---->", selectedWeek);
  // console.log(
  //   "remoteInstData-------------------------------->",
  //   remoteInstData
  // );
  // console.log("contentTitle--------------------->", modalContentTitle);
  // console.log("modalContentData------------------->", modalContentData);

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

  console.log("remoteInstData--------->", remoteInstData);

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
                <u> Data Updated as on - 31/08/2024</u>
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
                  color: "#00CED1",
                  paddingTop: "20px",
                  fontSize: "1.2rem",
                  fontFamily: "Congenial SemiBold",
                  fontWeight: "600",
                }}
              >
                <p>No. of registered non-smartphone users</p>
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
                  <h1>4394</h1>
                  // <h1>{remoteInstData.total_remote_instructions_users}</h1> // Display data when loaded
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          // marginTop: "4%",
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
            {/* <MenuItem value={null}>None</MenuItem> */}
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
      ) : !loading && remoteInstData.length > 0 ? (
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
              {remoteInstData?.map((item) => {
                return (
                  <>
                    {selectedMonth ? (
                      <div
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
                          <p>No of new registered non-smartphone users</p>
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
                          <h1>{item.new_remote_instructions_users}</h1>
                        </div>
                      </div>
                    ) : null}

                    <div
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
                        <p>No. of active users</p>
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
                        <h1>{item.new_active_students}</h1>
                      </div>
                    </div>

                    {/* {isFiltered ? ( */}
                    <div
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
                          fontSize: "1.2rem",
                          fontFamily: "Congenial SemiBold",
                          fontWeight: "600",
                        }}
                      >
                        <p>No of new activated users</p>
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
                        <h1>{item.new_activated_students}</h1>
                      </div>
                    </div>
                    {/* ) : null} */}

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
                          color: "#008080",
                          paddingTop: "20px",
                          fontSize: "1.2rem",
                          fontFamily: "Congenial SemiBold",
                          fontWeight: "600",
                        }}
                      >
                        <p>Total SMS scheduled</p>
                      </div>
                      <div
                        style={{
                          height: "50%",
                          backgroundColor: "#008080",
                          borderEndStartRadius: "10px",
                          borderEndEndRadius: "10px",
                          color: "white",
                        }}
                      >
                        <h1>{item.total_sms_scheduled}</h1>
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
                          color: "#b9770e",
                          paddingTop: "20px",
                          fontSize: "1.2rem",
                          fontFamily: "Congenial SemiBold",
                          fontWeight: "600",
                        }}
                      >
                        <p>Total SMS delivered</p>
                      </div>
                      <div
                        style={{
                          height: "50%",
                          backgroundColor: "#b9770e",
                          borderEndStartRadius: "10px",
                          borderEndEndRadius: "10px",
                          color: "white",
                        }}
                      >
                        <h1>{item.total_sms_delivered}</h1>
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
                          color: "#512e5f",
                          paddingTop: "20px",
                          fontSize: "1.2rem",
                          fontFamily: "Congenial SemiBold",
                          fontWeight: "600",
                        }}
                      >
                        <p>Calls scheduled</p>
                      </div>
                      <div
                        style={{
                          height: "50%",
                          backgroundColor: "#512e5f",
                          borderEndStartRadius: "10px",
                          borderEndEndRadius: "10px",
                          color: "white",
                        }}
                      >
                        <h1>{item.total_calls_made}</h1>
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
                          color: "#800000",
                          paddingTop: "20px",
                          fontSize: "1.2rem",
                          fontFamily: "Congenial SemiBold",
                          fontWeight: "600",
                        }}
                      >
                        <p>Calls received</p>
                      </div>
                      <div
                        style={{
                          height: "50%",
                          backgroundColor: "#800000",
                          borderEndStartRadius: "10px",
                          borderEndEndRadius: "10px",
                          color: "white",
                        }}
                      >
                        <h1>{item.total_calls_received}</h1>
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
                          color: "#000080",
                          paddingTop: "20px",
                          fontSize: "1.2rem",
                          fontFamily: "Congenial SemiBold",
                          fontWeight: "600",
                        }}
                      >
                        <p>Total mins of content consumed</p>
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
                        <h1>{item.total_calls_mins}</h1>
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
                          color: "#40E0D0",
                          paddingTop: "20px",
                          fontSize: "1.2rem",
                          fontFamily: "Congenial SemiBold",
                          fontWeight: "600",
                        }}
                      >
                        <p>Incoming calls (IVRS)</p>
                      </div>
                      <div
                        style={{
                          height: "50%",
                          backgroundColor: "#40E0D0",
                          borderEndStartRadius: "10px",
                          borderEndEndRadius: "10px",
                          color: "white",
                        }}
                      >
                        <h1>{item.total_ivrs_calls_made}</h1>
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
                          color: "#708090",
                          paddingTop: "20px",
                          fontSize: "1.2rem",
                          fontFamily: "Congenial SemiBold",
                          fontWeight: "600",
                        }}
                      >
                        <p>Total mins spent (IVRS)</p>
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
                        <h1>{item.total_ivrs_calls_mins}</h1>
                      </div>
                    </div> */}
                  </>
                );
              })}
            </div>
          </div>

          {/* <DynamicModal
            open={open}
            handleClose={handleClose}
            modalTitle={modalContentTitle}T
            tableHeaders={tableHeaders}
            tableData={modalContentData}
            xlData={xlData}
            fileName={fileName}
            loading={modalLoader}
          /> */}
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

const dataJson = [
  {
    month: 1,
    week: 3,
    new_remote_instructions_users: 298,
    new_active_students: 0,
    new_activated_students: 112,
    total_sms_scheduled: 224,
    total_sms_delivered: 189,
    total_calls_made: 224,
    total_calls_received: 201,
    total_calls_mins: 120.6,
    total_ivrs_calls_made: 143,
    total_ivrs_calls_mins: 90.09,
  },
  {
    month: 1,
    week: 4,
    new_remote_instructions_users: 98,
    new_active_students: 196,
    new_activated_students: 84,
    total_sms_scheduled: 392,
    total_sms_delivered: 250,
    total_calls_made: 392,
    total_calls_received: 365,
    total_calls_mins: 456.25,
    total_ivrs_calls_made: 126,
    total_ivrs_calls_mins: 66.78,
  },
  {
    month: 2,
    week: 1,
    new_remote_instructions_users: 1342,
    new_active_students: 1060,
    new_activated_students: 524,
    total_sms_scheduled: 1440,
    total_sms_delivered: 1290,
    total_calls_made: 1440,
    total_calls_received: 1320,
    total_calls_mins: 1663.2,
    total_ivrs_calls_made: 637,
    total_ivrs_calls_mins: 337.61,
  },
  {
    month: 2,
    week: 2,
    new_remote_instructions_users: 0,
    new_active_students: 1057,
    new_activated_students: 0,
    total_sms_scheduled: 1440,
    total_sms_delivered: 1265,
    total_calls_made: 1440,
    total_calls_received: 1290,
    total_calls_mins: 1883.4,
    total_ivrs_calls_made: 48,
    total_ivrs_calls_mins: 35.04,
  },
  {
    month: 2,
    week: 3,
    new_remote_instructions_users: 0,
    new_active_students: 1061,
    new_activated_students: 0,
    total_sms_scheduled: 1440,
    total_sms_delivered: 1301,
    total_calls_made: 1440,
    total_calls_received: 1401,
    total_calls_mins: 1625.16,
    total_ivrs_calls_made: 76,
    total_ivrs_calls_mins: 32.68,
  },
  {
    month: 2,
    week: 4,
    new_remote_instructions_users: 0,
    new_active_students: 1045,
    new_activated_students: 0,
    total_sms_scheduled: 1440,
    total_sms_delivered: 1380,
    total_calls_made: 1440,
    total_calls_received: 1415,
    total_calls_mins: 2207.4,
    total_ivrs_calls_made: 28,
    total_ivrs_calls_mins: 12.04,
  },
  {
    month: 3,
    week: 1,
    new_remote_instructions_users: 353,
    new_active_students: 1905,
    new_activated_students: 448,
    total_sms_scheduled: 3236,
    total_sms_delivered: 2950,
    total_calls_made: 3236,
    total_calls_received: 3019,
    total_calls_mins: 3502.04,
    total_ivrs_calls_made: 472,
    total_ivrs_calls_mins: 259.6,
  },
  {
    month: 3,
    week: 2,
    new_remote_instructions_users: 0,
    new_active_students: 1865,
    new_activated_students: 0,
    total_sms_scheduled: 3236,
    total_sms_delivered: 3070,
    total_calls_made: 3236,
    total_calls_received: 3109,
    total_calls_mins: 4228.24,
    total_ivrs_calls_made: 39,
    total_ivrs_calls_mins: 19.5,
  },
  {
    month: 3,
    week: 3,
    new_remote_instructions_users: 0,
    new_active_students: 1884,
    new_activated_students: 0,
    total_sms_scheduled: 3236,
    total_sms_delivered: 3121,
    total_calls_made: 3236,
    total_calls_received: 3135,
    total_calls_mins: 4044.15,
    total_ivrs_calls_made: 54,
    total_ivrs_calls_mins: 17.82,
  },
  {
    month: 3,
    week: 4,
    new_remote_instructions_users: 0,
    new_active_students: 1889,
    new_activated_students: 0,
    total_sms_scheduled: 3236,
    total_sms_delivered: 3001,
    total_calls_made: 3236,
    total_calls_received: 2998,
    total_calls_mins: 3927.38,
    total_ivrs_calls_made: 82,
    total_ivrs_calls_mins: 59.86,
  },
  {
    month: 4,
    week: 1,
    new_remote_instructions_users: 450,
    new_active_students: 1895,
    new_activated_students: 198,
    total_sms_scheduled: 2732,
    total_sms_delivered: 2509,
    total_calls_made: 2732,
    total_calls_received: 2678,
    total_calls_mins: 3186.82,
    total_ivrs_calls_made: 252,
    total_ivrs_calls_mins: 131.04,
  },
  {
    month: 4,
    week: 2,
    new_remote_instructions_users: 0,
    new_active_students: 1901,
    new_activated_students: 0,
    total_sms_scheduled: 2732,
    total_sms_delivered: 2667,
    total_calls_made: 2732,
    total_calls_received: 2578,
    total_calls_mins: 3583.42,
    total_ivrs_calls_made: 67,
    total_ivrs_calls_mins: 32.83,
  },
  {
    month: 4,
    week: 3,
    new_remote_instructions_users: 0,
    new_active_students: 1919,
    new_activated_students: 0,
    total_sms_scheduled: 2732,
    total_sms_delivered: 2512,
    total_calls_made: 2732,
    total_calls_received: 2666,
    total_calls_mins: 3545.78,
    total_ivrs_calls_made: 42,
    total_ivrs_calls_mins: 19.32,
  },
  {
    month: 4,
    week: 4,
    new_remote_instructions_users: 0,
    new_active_students: 1938,
    new_activated_students: 0,
    total_sms_scheduled: 2732,
    total_sms_delivered: 2485,
    total_calls_made: 2732,
    total_calls_received: 2698,
    total_calls_mins: 3777.2,
    total_ivrs_calls_made: 63,
    total_ivrs_calls_mins: 20.79,
  },
  {
    month: 5,
    week: 1,
    new_remote_instructions_users: 919,
    new_active_students: 3589,
    new_activated_students: 1142,
    total_sms_scheduled: 5016,
    total_sms_delivered: 4321,
    total_calls_made: 5016,
    total_calls_received: 4789,
    total_calls_mins: 6896.16,
    total_ivrs_calls_made: 1191,
    total_ivrs_calls_mins: 488.31,
  },
  {
    month: 5,
    week: 2,
    new_remote_instructions_users: 0,
    new_active_students: 3501,
    new_activated_students: 0,
    total_sms_scheduled: 5016,
    total_sms_delivered: 4791,
    total_calls_made: 5016,
    total_calls_received: 4862,
    total_calls_mins: 8242.8,
    total_ivrs_calls_made: 146,
    total_ivrs_calls_mins: 60.88,
  },
  {
    month: 5,
    week: 3,
    new_remote_instructions_users: 0,
    new_active_students: 3568,
    new_activated_students: 0,
    total_sms_scheduled: 5016,
    total_sms_delivered: 4871,
    total_calls_made: 5016,
    total_calls_received: 4855,
    total_calls_mins: 8627.12,
    total_ivrs_calls_made: 95,
    total_ivrs_calls_mins: 38.95,
  },
  {
    month: 5,
    week: 4,
    new_remote_instructions_users: 0,
    new_active_students: 3546,
    new_activated_students: 0,
    total_sms_scheduled: 5016,
    total_sms_delivered: 4834,
    total_calls_made: 5016,
    total_calls_received: 4783,
    total_calls_mins: 8079.86,
    total_ivrs_calls_made: 174,
    total_ivrs_calls_mins: 127.52,
  },
  {
    month: 6,
    week: 1,
    new_remote_instructions_users: 282,
    new_active_students: 3642,
    new_activated_students: 1186,
    total_sms_scheduled: 6118,
    total_sms_delivered: 5329,
    total_calls_made: 6118,
    total_calls_received: 5982,
    total_calls_mins: 9316.04,
    total_ivrs_calls_made: 1402,
    total_ivrs_calls_mins: 572.4,
  },
  {
    month: 6,
    week: 2,
    new_remote_instructions_users: 0,
    new_active_students: 3628,
    new_activated_students: 0,
    total_sms_scheduled: 6118,
    total_sms_delivered: 5891,
    total_calls_made: 6118,
    total_calls_received: 5892,
    total_calls_mins: 10231.4,
    total_ivrs_calls_made: 158,
    total_ivrs_calls_mins: 66.36,
  },
  {
    month: 6,
    week: 3,
    new_remote_instructions_users: 0,
    new_active_students: 3598,
    new_activated_students: 0,
    total_sms_scheduled: 6118,
    total_sms_delivered: 5792,
    total_calls_made: 6118,
    total_calls_received: 5828,
    total_calls_mins: 9986.32,
    total_ivrs_calls_made: 129,
    total_ivrs_calls_mins: 52.89,
  },
  {
    month: 6,
    week: 4,
    new_remote_instructions_users: 0,
    new_active_students: 3617,
    new_activated_students: 0,
    total_sms_scheduled: 6118,
    total_sms_delivered: 5691,
    total_calls_made: 6118,
    total_calls_received: 5769,
    total_calls_mins: 9465.92,
    total_ivrs_calls_made: 92,
    total_ivrs_calls_mins: 63.36,
  },
  {
    month: 7,
    week: 1,
    new_remote_instructions_users: 0,
    new_active_students: 3572,
    new_activated_students: 492,
    total_sms_scheduled: 5284,
    total_sms_delivered: 4711,
    total_calls_made: 5284,
    total_calls_received: 5184,
    total_calls_mins: 7734.7,
    total_ivrs_calls_made: 746,
    total_ivrs_calls_mins: 340.28,
  },
  {
    month: 7,
    week: 2,
    new_remote_instructions_users: 0,
    new_active_students: 3600,
    new_activated_students: 0,
    total_sms_scheduled: 5284,
    total_sms_delivered: 4986,
    total_calls_made: 5284,
    total_calls_received: 5118,
    total_calls_mins: 7986.64,
    total_ivrs_calls_made: 139,
    total_ivrs_calls_mins: 55.58,
  },
  {
    month: 7,
    week: 3,
    new_remote_instructions_users: 0,
    new_active_students: 3598,
    new_activated_students: 0,
    total_sms_scheduled: 5284,
    total_sms_delivered: 4898,
    total_calls_made: 5284,
    total_calls_received: 4964,
    total_calls_mins: 7667.55,
    total_ivrs_calls_made: 121,
    total_ivrs_calls_mins: 45.98,
  },
  {
    month: 7,
    week: 4,
    new_remote_instructions_users: 0,
    new_active_students: 3546,
    new_activated_students: 0,
    total_sms_scheduled: 5284,
    total_sms_delivered: 4789,
    total_calls_made: 5284,
    total_calls_received: 4898,
    total_calls_mins: 7512.83,
    total_ivrs_calls_made: 142,
    total_ivrs_calls_mins: 98.46,
  },
  {
    month: 8,
    week: 1,
    new_remote_instructions_users: 652,
    new_active_students: 3709,
    new_activated_students: 529,
    total_sms_scheduled: 0,
    total_sms_delivered: 0,
    total_calls_made: 0,
    total_calls_received: 0,
    total_calls_mins: 0,
    total_ivrs_calls_made: 0,
    total_ivrs_calls_mins: 0,
  },
  {
    month: 8,
    week: 2,
    new_remote_instructions_users: 0,
    new_active_students: 3617,
    new_activated_students: 0,
    total_sms_scheduled: 0,
    total_sms_delivered: 0,
    total_calls_made: 0,
    total_calls_received: 0,
    total_calls_mins: 0,
    total_ivrs_calls_made: 0,
    total_ivrs_calls_mins: 0,
  },
  {
    month: 8,
    week: 3,
    new_remote_instructions_users: 0,
    new_active_students: 3650,
    new_activated_students: 0,
    total_sms_scheduled: 0,
    total_sms_delivered: 0,
    total_calls_made: 0,
    total_calls_received: 0,
    total_calls_mins: 0,
    total_ivrs_calls_made: 0,
    total_ivrs_calls_mins: 0,
  },
  {
    month: 8,
    week: 4,
    new_remote_instructions_users: 0,
    new_active_students: 3604,
    new_activated_students: 0,
    total_sms_scheduled: 0,
    total_sms_delivered: 0,
    total_calls_made: 0,
    total_calls_received: 0,
    total_calls_mins: 0,
    total_ivrs_calls_made: 0,
    total_ivrs_calls_mins: 0,
  },
];
