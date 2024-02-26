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
              // justifyContent: "center",
              width: "100%",
              gap: "2%",
              // marginLeft: "4%",
            }}
          >
            <Card
              name="Number of districts"
              number={dashboardData.total_districts}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of blocks"
              number={dashboardData.total_blocks}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of clusters"
              number={dashboardData.total_clusters}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of schools"
              number={dashboardData.total_schools}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of new schools"
              number={dashboardData.total_new_schools}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of students"
              number={dashboardData.total_students}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of new students"
              number={dashboardData.total_new_students}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Smartphone users"
              number={dashboardData.total_chatbot_users}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of girls"
              number={dashboardData.total_girl_students}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of boys"
              number={dashboardData.total_boy_students}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
          </div>
          <h3 style={{ marginTop: "1.5%" }}>
            <u>Time-Spent details</u>
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              // justifyContent: "center",
              width: "100%",
              gap: "2%",
              // marginTop: "-2%",
            }}
          >
            <Card
              name="Parents spending 2-15 mins"
              number={dashboardData.no_of_parents_spent_2to5mins}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Parents spending 16-30 mins"
              number={dashboardData.no_of_parents_spent_16to30mins}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Parents spending 31-45 mins"
              number={dashboardData.no_of_parents_spent_31to45mins}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Parents spending 45+ mins"
              number={dashboardData.no_of_parents_spent_gte45mins}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
          </div>

          <h3 style={{ marginTop: "1.5%" }}>
            <u>Remote instructions in brief</u>
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              // justifyContent: "center",
              width: "100%",
              gap: "2%",
              // marginTop: "-1.5%",
            }}
          >
            <Card
              name="Number of calls received"
              number={dashboardData.total_calls_received}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Avg. minutes of calls received"
              number={dashboardData.calls_avg_mins}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Numbers of SMS delivered"
              number={dashboardData.total_sms_received}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Avg. minutes spent on IVRs"
              number={dashboardData.ivrs_avg_mins}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Calls received in IVRs"
              number={dashboardData.total_ivrs_calls_received}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Unique calls received in IVRs"
              number={dashboardData.total_unique_ivrs_calls_received}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of active users"
              number={dashboardData.calls_active_users}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
          </div>

          <h3 style={{ marginTop: "1.5%" }}>
            <u>Chatbot in brief</u>
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "center",
              // justifyContent: "center",
              width: "100%",
              gap: "2%",
              // marginTop: "-1.5%",
            }}
          >
            <Card
              name="Conversations in Chatbot"
              number={dashboardData.total_chatbot_convo}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Total number of videos watched"
              number={dashboardData.total_chatbot_videos}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Number of assessments taken"
              number={dashboardData.total_chatbot_assess_taken}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Avg. minutes spent on WhatsApp"
              number={dashboardData.chatbot_avg_mins}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
            <Card
              name="Total number of active users"
              number={dashboardData.chatbot_active_users}
              Icon={PeopleIcon}
              style={{
                width: "240px",
                height: "130px",
                marginTop: "1.5%",
                backgroundColor: "#F5F5F5",
                paddingTop: "2%",
              }}
            />
          </div>
        </div>
      ) : !loading && Object.keys(dashboardData).length === 0 ? (
        <h1>No Data Available</h1>
      ) : null}
    </>
  );
};

export default Dashboard;
