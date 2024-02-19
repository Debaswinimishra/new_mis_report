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

  //&-------------Filter states---------------
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

  const filterButtonClick = () => {
    console.log("filter button clicked");
  };

  //todo----------------------Console logs---------------------------
  console.log("selected year------------------->", selectedYear);
  console.log("selected month------------------->", selectedMonth);
  console.log("selected week------------------->", selectedWeek);

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
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of blocks"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of clusters"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of schools"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of new schools"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of new students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Smartphone users"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Total number of girls"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of boys"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
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
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Parents spending 16-30 mins"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Parents spending 31-45 mins"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Parents spending 45+ mins"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
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
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Avg. minutes of calls received"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Numbers of SMS delivered"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Avg. minutes spent on IVRs"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Calls received in IVRs"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Unique calls received in IVRs"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of active users"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
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
            name="No. of conversations in Chatbot"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Total number of videos watched"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of assessments taken"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Avg. minutes spent on WhatsApp"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Total number of active users"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "200px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
