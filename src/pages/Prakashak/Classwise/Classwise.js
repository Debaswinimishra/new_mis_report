import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Api from "../Environment/Api";
const Classwise = () => {
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
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

  //&-------------Filter states---------------
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [loading, setLoading] = useState(false);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedWeek("");
    setSelectedMonth(e.target.value);
  };

  const handleWeekChange = (e) => {
    if (!selectedMonth && e.target.value) {
      alert("Please select a month before selecting a week !");
    } else {
      setSelectedWeek(e.target.value);
    }
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

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
      class: selectedClass,
    };

    console.log(
      "check---------->",
      selectedYear,
      selectedMonth,
      selectedWeek,
      selectedClass
    );

    if (selectedYear && selectedMonth && selectedWeek && selectedClass) {
      Api.post(`getClassWiseReport`, body)
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
      Api.post(`getClassWiseReport`)
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
  return (
    <div>
      <style>{`
    .card{}`}</style>
      <div
        style={{
          display: "flex",
          // justifyContent: "space-around",
          // width: "25%",
          marginTop: "4%",
          marginLeft: "48%",
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
          <InputLabel id="usertype-label">Class</InputLabel>
          <Select
            labelId="usertype-label"
            id="usertype-select"
            value={selectedClass}
            onChange={handleClassChange}
            label="Class"
          >
            <MenuItem value={null}>None</MenuItem>
            {classArr.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
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
                  <p> Number of students</p>
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
                  <h1>{data.total_students}</h1>
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
                    color: "rgb(214 148 16)",
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total Time Spent</p>
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
                  <h1>{data.total_timespent}</h1>
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
                    color: "#6A5ACD",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  No. of Parents Spent 2-15 min
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
                  <h1>{data.no_of_parents_spent_2to5mins}</h1>
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
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  No. of Parents Spent 16-30 min
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
                  <h1>{data.no_of_parents_spent_16to30mins}</h1>
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
                    color: "rgb(153 58 134)",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  No. of Parents Spent 31-45 min
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
                  <h1>{data.no_of_parents_spent_31to45mins}</h1>
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
                    color: "#6A5ACD",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  No. of Parents Spent 45+ min
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
                  <h1>{data.no_of_parents_spent_gte45mins}</h1>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "2%",
              boxShadow: "2px 1px 5px grey",
              padding: "3%",
              width: "97%",
            }}
          >
            <h1>Remote Instructions in Brief</h1>
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
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Total No. of Calls received</p>
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
                  <h1>{data.total_calls_received}</h1>
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
                    color: "rgb(153 58 134)",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Average minutes of calls received
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
                  <h1>{data.calls_avg_mins}</h1>
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
                    color: "#CD5C5C",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Total No. of SMS delivered
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
                  <h1>{data.total_sms_received}</h1>
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
                    color: "rgb(214 148 16)",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Average minutes spent in IVRS
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
                  <h1>{data.ivrs_avg_mins}</h1>
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
                    color: "#CD5C5C",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Total No. of calls received in IVRs
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
                  <h1>{data.total_ivrs_calls_received}</h1>
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
                    color: "rgb(214 148 16)",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Unique Calls Received in IVR
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
                  <h1>{data.total_unique_ivrs_calls_received}</h1>
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
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Number of Active Users</p>
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
                  <h1>{data.calls_active_users}</h1>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "2%",
              boxShadow: "2px 1px 5px grey",
              padding: "3%",
              width: "97%",
            }}
          >
            <h1>Chatbot in Brief</h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "center",
                justifyContent: "center",
                width: "100%",
                gap: "2%",
              }}
            >
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
                    color: "#6A5ACD",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Total Conversations in Chatbot
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
                  <h1>{data.total_chatbot_convo}</h1>
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
                    color: "rgb(153 58 134)",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Total No. of Videos Watched
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
                  <h1>{data.total_chatbot_videos}</h1>
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
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Total No. of Assessment Taken
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
                  <h1>{data.total_chatbot_assess_taken}</h1>
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
                    color: "#6A5ACD",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Average minutes spent in WhatsApp
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
                  <h1>{data.chatbot_avg_mins}</h1>
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
                    color: "rgb(214 148 16)",
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Number of Active Users</p>
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
                  <h1>{data.chatbot_active_users}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !loading && Object.keys(data).length === 0 ? (
        <h1>No data Available</h1>
      ) : null}
    </div>
  );
};

export default Classwise;
