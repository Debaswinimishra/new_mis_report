import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";
import Api from "../Environment/Api";
import Box from "@mui/material/Box";
import moment from "moment";

const Dashboard = () => {
  //?---------------Month array---------------------------
  const monthArr = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  //?-----------------Week array--------------------
  const weekArr = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];

  //&-------------Filter states---------------
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(
    parseInt(currentMonthSelected.value)
  );
  const [selectedWeek, setSelectedWeek] = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value ? parseInt(e.target.value) : "");
  };

  const filterButtonClick = () => {
    setLoading(true);
    if (selectedWeek) {
      const body = {
        year: parseInt(selectedYear),
        month: parseInt(selectedMonth),
        week: parseInt(selectedWeek),
      };
      console.log("body------->", body);
      Api.post(`/getDashboardReport`, body)
        .then((res) => {
          setDashboardData(res.data);
          // setTimeout(() => {
          setLoading(false);
          // }, 1000);
        })
        .catch((error) => {
          console.error(`The Error is ---> ${error}`);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    } else {
      const body = {
        year: selectedYear,
        month: selectedMonth,
      };
      console.log("body------->", body);
      Api.post(`/getDashboardReport`, body)
        .then((res) => {
          setDashboardData(res.data);
          // setTimeout(() => {
          setLoading(false);
          // }, 5000);
        })
        .catch((error) => {
          console.error(`The Error is ---> ${error}`);
          // setTimeout(() => {
          setLoading(false);
          // }, 500);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (selectedWeek) {
      const body = {
        year: parseInt(selectedYear),
        month: parseInt(selectedMonth),
        week: parseInt(selectedWeek),
      };
      console.log("body------->", body);
      Api.post(`/getDashboardReport`, body)
        .then((res) => {
          setDashboardData(res.data);
          // setTimeout(() => {
          setLoading(false);
          // }, 1000);
        })
        .catch((error) => {
          console.error(`The Error is ---> ${error}`);
          setDashboardData([]);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    } else {
      const body = {
        year: parseInt(selectedYear),
        month: parseInt(selectedMonth),
      };
      console.log("body------->", body);
      Api.post(`/getDashboardReport`, body)
        .then((res) => {
          setDashboardData(res.data);
          // setTimeout(() => {
          setLoading(false);
          // }, 5000);
        })
        .catch((error) => {
          console.error(`The Error is ---> ${error}`);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
  }, []);

  //todo----------------------Console logs---------------------------
  console.log("selected year------>", selectedYear);
  console.log("selected month------->", selectedMonth);
  console.log("selected week-------->", selectedWeek);
  // console.log("dashboard data---------->", dashboardData);

  return (
    <>
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
      ) : !loading && Object.keys(dashboardData).length > 0 ? (
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
                Number of districts
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
                <h1>{dashboardData.total_districts}</h1>
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
                Number of blocks
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
                <h1>{dashboardData.total_blocks}</h1>
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
                Number of clusters
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
                <h1>{dashboardData.total_clusters}</h1>
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
                Number of schools
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
                <h1>{dashboardData.total_schools}</h1>
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
                Total number of new schools
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
                <h1>{dashboardData.total_new_schools}</h1>
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
                Number of students
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
                <h1>{dashboardData.total_students}</h1>
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
                Number of new students
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
                <h1>{dashboardData.total_new_students}</h1>
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
                Smartphone users
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
                <h1>{dashboardData.total_chatbot_users}</h1>
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
                Number of girls
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
                <h1>{dashboardData.total_girl_students}</h1>
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
                Number of boys
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
                <h1>{dashboardData.total_boy_students}</h1>
              </div>
            </div>
          </div>
          <h3 style={{ marginTop: "1.5%" }}>
            <u>Time-Spent details</u>
          </h3>
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
                No. of parents spending 2-15 mins
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
                <h1>{dashboardData.no_of_parents_spent_2to5mins}</h1>
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
                No. of parents spending 16-30 mins
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
                <h1>{dashboardData.no_of_parents_spent_16to30mins}</h1>
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
                No. of parents spending 31-45 mins
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
                <h1>{dashboardData.no_of_parents_spent_31to45mins}</h1>
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
                No. of parents spending 45+ mins
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
                <h1>{dashboardData.no_of_parents_spent_gte45mins}</h1>
              </div>
            </div>
          </div>

          <h3 style={{ marginTop: "1.5%" }}>
            <u>Remote instructions in brief</u>
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "center",
              width: "97%",
              gap: "2%",
              // marginTop: "-1.5%",
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
                  color: "rgb(153 58 134)",
                  paddingTop: "20px",
                  fontSize: "1.2rem",
                  fontFamily: "Congenial SemiBold",
                  fontWeight: "600",
                }}
              >
                Number of calls received
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
                <h1>{dashboardData.total_calls_received}</h1>
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
                Avg. minutes of calls received
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
                <h1>{dashboardData.calls_avg_mins}</h1>
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
                Numbers of SMS delivered
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
                <h1>{dashboardData.total_sms_received}</h1>
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
                Avg. minutes spent on IVRs
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
                <h1>{dashboardData.ivrs_avg_mins}</h1>
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
                Calls received in IVRs
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
                <h1>{dashboardData.total_ivrs_calls_received}</h1>
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
                Unique calls received in IVRs
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
                <h1>{dashboardData.total_unique_ivrs_calls_received}</h1>
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
                Number of active users
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
                <h1>{dashboardData.calls_active_users}</h1>
              </div>
            </div>
          </div>

          <h3 style={{ marginTop: "1.5%" }}>
            <u>Chatbot in brief</u>
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "center",
              width: "97%",
              gap: "2%",
              // marginTop: "-1.5%",
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
                  paddingTop: "20px",
                  fontSize: "1.2rem",
                  fontFamily: "Congenial SemiBold",
                  fontWeight: "600",
                }}
              >
                Conversations in Chatbot
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
                <h1>{dashboardData.total_chatbot_convo}</h1>
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
                Total number of videos watched
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
                <h1>{dashboardData.total_chatbot_videos}</h1>
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
                Number of assessments taken
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
                <h1>{dashboardData.total_chatbot_assess_taken}</h1>
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
                Avg. minutes spent on WhatsApp
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
                <h1>{dashboardData.chatbot_avg_mins}</h1>
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
                Total number of active users
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
                <h1>{dashboardData.chatbot_active_users}</h1>
              </div>
            </div>
          </div>
        </div>
      ) : !loading && Object.keys(dashboardData).length === 0 ? (
        <h1>No Data Available</h1>
      ) : null}
    </>
  );
};

export default Dashboard;
