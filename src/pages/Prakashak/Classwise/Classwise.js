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
import Api from "../Environment/Api";
const Classwise = () => {
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
  const [selectedMonth, setSelectedMonth] = useState(monthArr[0].value);
  const [selectedWeek, setSelectedWeek] = useState("");

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const [data, setData] = useState({});

  const fetchData = () => {
    Api.post(`getClassWiseReport`)
      .then((response) => {
        // console.log("set=================>", response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log("err=================>", err);
      });
  };

  const filterButtonClick = () => {
    // alert("filter button clicked");
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
            {weekArr.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
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
            {classArr.map((item, index) => (
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
      <div
        style={{
          // display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          width: "96%",
          marginLeft: "3%",
          marginBottom: "2%",
        }}
      >
        <Card
          name="Number of students"
          number={data.total_students}
          Icon={PeopleIcon}
          style={{
            width: "208px",
            height: "190px",
            paddingTop: "2%",
            paddingBottom: "3%",

            marginTop: "1.5%",
            backgroundColor: "#F5F5F5",
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            // justifyContent: "space-evenly",
            width: "100%",
            gap: "2%",
          }}
        >
          <Card
            name="Total Time Spent"
            number={data.total_timespent}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of Parents Spent 2-15 min"
            number={data.no_of_parents_spent_2to5mins}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Number of Parents Spent 16-30 min"
            number={data.no_of_parents_spent_16to30mins}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Number of Parents Spent 31-45 min"
            number={data.no_of_parents_spent_31to45mins}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Number of Parents Spent 45+ min"
            number={data.no_of_parents_spent_gte45mins}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
        </div>
        <h1>Remote Instructions in Brief</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            // justifyContent: "space-evenly",
            width: "100%",
            gap: "2%",
          }}
        >
          <Card
            name="Total No. of Calls received"
            number={data.total_calls_received}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Average minutes of calls received"
            number={data.calls_avg_mins}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Total No. of SMS delivered"
            number={data.total_sms_received}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Average minutes spent in IVRS"
            number={data.ivrs_avg_mins}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Total No. of calls received in IVRs"
            number={data.total_ivrs_calls_received}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Total No. of Unique Calls Received in IVR"
            number={data.total_unique_ivrs_calls_received}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of Active Users"
            number={data.calls_active_users}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
        </div>
        <h1>Chatbot in Brief</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            // justifyContent: "space-evenly",
            width: "100%",
            gap: "2%",
          }}
        >
          <Card
            name="Total No. of Conversations in Chatbot"
            number={data.total_chatbot_convo}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Total No. of Videos Watched"
            number={data.total_chatbot_videos}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Total No. of Assessment Taken"
            number={data.total_chatbot_assess_taken}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Average minutes spent in WhatsApp"
            number={data.chatbot_avg_mins}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of Active Users"
            number={data.chatbot_active_users}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "190px",
              paddingTop: "2%",
              paddingBottom: "3%",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Classwise;
