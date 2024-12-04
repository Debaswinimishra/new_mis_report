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

  const fetchType = "static";
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 1 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];

  console.log("currentMonth--------->", currentMonthSelected);

  //&-------------Filter states---------------
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedYear2, setSelectedYear2] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonthSelected.value - 1
  );
  const [selectedMonth2, setSelectedMonth2] = useState(
    currentMonthSelected.value - 1
  );
  const [selectedWeek, setSelectedWeek] = useState(4);
  const [remoteInstData, setRemoteInstData] = useState([]);
  const [remoteInstData2, setRemoteInstData2] = useState([]);

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
  const handleYearChange2 = (e) => {
    setSelectedYear2(parseInt(e.target.value));
    setSelectedMonth2("");
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

    PrakashakAPI.post(`getRemoteInst/${fetchType}`, body)
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          setRemoteInstData(res.data); //Currently I have done this with dummy
          console.log("remoteInstructionData---------->", res.data);
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

    // const filteredData = dataJson.filter((item) => {
    //   return item.month === selectedMonth && item.week === selectedWeek;
    // });
    // if (filteredData?.length > 0) {
    //   setRemoteInstData(filteredData);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    // }
    // const filteredData2 = dataJson2.filter((item) => {
    //   return item.month === selectedMonth2;
    // });
    // if (filteredData2?.length > 0) {
    //   setRemoteInstData2(filteredData2);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    // }

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
    // const filteredData = dataJson.filter((item) => {
    //   return item.month === selectedMonth && item.week === selectedWeek;
    // });
    // if (filteredData?.length > 0) {
    //   setRemoteInstData(filteredData);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    // }
    PrakashakAPI.post(`getRemoteInstMonthly/${fetchType}`, body)
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          setRemoteInstData2(res.data); //Currently I have done this with dummy
          console.log("setRemoteInstData2---------->", res.data);
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

  const filterButtonClick2 = () => {
    setRemoteInstData2({});
    let body = {};
    setLoading(true);
    setIsFiltered(false);

    if (!selectedMonth && !selectedMonth) {
      body = {
        year: selectedYear2,
      };
    } else if (selectedMonth) {
      body = {
        year: selectedYear2,
        month: selectedMonth2,
      };
    } else if (!selectedMonth2) {
      alert("Please select a month before selecting the week!");
    }

    // const filteredData2 = dataJson2.filter((item) => {
    //   return item.month === selectedMonth2;
    // });
    // if (filteredData2?.length > 0) {
    //   setRemoteInstData2(filteredData2);
    //   setLoading(false);
    // } else {
    //   setLoading(false);
    // }
    PrakashakAPI.post(`getRemoteInst/${fetchType}`, body)
      .then((res) => {
        console.log("response", res);
        if (res.status === 200) {
          setRemoteInstData(res.data); //Currently I have done this with dummy
          console.log("remoteInstructionData---------->", res.data);
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

  console.log("remoteInstData 2----------->", remoteInstData2);

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
          Filter
        </Button>
      </div>
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
                <u>
                  {" "}
                  Data Updated as on -{" "}
                  {remoteInstData[0]?.lastUpdated &&
                    new Date(remoteInstData[0]?.lastUpdated).toLocaleDateString(
                      "en-GB",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}{" "}
                </u>
              </i>
            </h2>
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
                        {selectedMonth2 ? (
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
                              <p>No of registered non-smartphone users</p>
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
                              <h1>{item?.non_smartphone_users}</h1>
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
                            <p>No of registered non-smartphone users(male)</p>
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
                            <h1>{item?.non_smartphone_boys}</h1>
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
                            <p>No of registered non-smartphone users(female)</p>
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
                            <h1>{item?.non_smartphone__girls}</h1>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
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
      ) : !loading && remoteInstData2.length > 0 ? (
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
                  <u>
                    {" "}
                    Data Updated as on -{" "}
                    {remoteInstData2[0]?.lastUpdated &&
                      new Date(
                        remoteInstData2[0]?.lastUpdated
                      ).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}{" "}
                  </u>
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
              {remoteInstData2?.map((item) => {
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
                          <h1>{item.new_non_smartphone_users}</h1>
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
                        <h1>{item.active_non_smartphone_users}</h1>
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
                        <h1>{item.new_activated_non_smartphone_users}</h1>
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
      ) : Object.keys(remoteInstData2).length === 0 && loading === false ? (
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
