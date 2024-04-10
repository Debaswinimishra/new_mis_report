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
import Box from "@mui/material/Box";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatbotReports = () => {
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];

  //&------------States for my used filters--------------------
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [obtainedData, setObtainedData] = useState([]);

  //*------------For changing the year field--------------------
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth("");
  };

  //*-----------For changing the month field-------------------
  const handleMonthChange = (e) => {
    if (
      e.target.value > currentMonthSelected.value &&
      selectedYear === currentYear
    ) {
      toast.error("You can't select a month greater than the current month !", {
        style: {
          borderRadius: "100px",
          backgroundColor: "darkgrey",
          color: "white",
        },
      });
    } else {
      setSelectedMonth(e.target.value ? e.target.value : "");
    }
  };

  //*-----------------On filter button press---------------------
  const handleFilterData = () => {
    toast.success("Filter button clicked 😊", {
      style: {
        borderRadius: "30px",
        backgroundColor: "darkgrey",
        color: "white",
      },
    });
  };

  //todo-----------------------Console logs-------------------

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "4%",
          marginLeft: "2%",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "200px" }}>
          <InputLabel id="usertype-label">Year</InputLabel>
          <Select
            labelId="usertype-label"
            id="usertype-select"
            value={selectedYear}
            onChange={handleYearChange}
            label="Year"
            style={{ padding: "4px" }}
          >
            {years.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "200px" }}>
          <InputLabel id="usertype-label">Month</InputLabel>
          <Select
            labelId="usertype-label"
            id="usertype-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Month"
            style={{ padding: "4px" }}
          >
            <MenuItem value={null}>None</MenuItem>
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
            width: "200px",
            marginTop: "0.5%",
            padding: "25px",
          }}
          onClick={handleFilterData}
        >
          Filter
        </Button>
      </div>
      <hr />

      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "14px",
          marginTop: "2%",
        }}
      >
        <div
          style={{
            height: "170px",
            width: "250px",
            backgroundColor: "#baade6",
            borderRadius: "10px",
            border: "1px solid grey",
            boxShadow: "0px 2px 0px",
          }}
        >
          <p style={{ fontWeight: "600" }}>Total No. of Users</p>
        </div>{" "}
        <div
          style={{
            height: "170px",
            width: "250px",
            backgroundColor: "#baade6",
            borderRadius: "10px",
            border: "1px solid grey",
            boxShadow: "0px 2px 0px",
          }}
        >
          <p style={{ fontWeight: "600" }}>Total No. of Users</p>
        </div>{" "}
        <div
          style={{
            height: "170px",
            width: "250px",
            backgroundColor: "#baade6",
            borderRadius: "10px",
            border: "1px solid grey",
            boxShadow: "0px 2px 0px",
          }}
        >
          <p style={{ fontWeight: "600" }}>Total No. of Users</p>
        </div>{" "}
        <div
          style={{
            height: "170px",
            width: "250px",
            backgroundColor: "#baade6",
            borderRadius: "10px",
            border: "1px solid grey",
            boxShadow: "0px 2px 0px",
          }}
        >
          <p style={{ fontWeight: "600" }}>Total No. of Users</p>
        </div>
      </div>

      <u>
        {" "}
        <h1>Interactions</h1>
      </u>

      <div
        style={{
          width: "95%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "14px",
          marginTop: "2%",
        }}
      >
        <div
          style={{
            height: "170px",
            width: "250px",
            backgroundColor: "#baade6",
            borderRadius: "10px",
            border: "1px solid grey",
            boxShadow: "0px 2px 0px",
          }}
        >
          <p style={{ fontWeight: "600" }}>Total No. of Users</p>
        </div>{" "}
        <div
          style={{
            height: "170px",
            width: "250px",
            backgroundColor: "#baade6",
            borderRadius: "10px",
            border: "1px solid grey",
            boxShadow: "0px 2px 0px",
          }}
        >
          <p style={{ fontWeight: "600" }}>Total No. of Users</p>
        </div>{" "}
        <div
          style={{
            height: "170px",
            width: "250px",
            backgroundColor: "#baade6",
            borderRadius: "10px",
            border: "1px solid grey",
            boxShadow: "0px 2px 0px",
          }}
        >
          <p style={{ fontWeight: "600" }}>Total No. of Users</p>
        </div>{" "}
        <div
          style={{
            height: "170px",
            width: "250px",
            backgroundColor: "#baade6",
            borderRadius: "10px",
            border: "1px solid grey",
            boxShadow: "0px 2px 0px",
          }}
        >
          <p style={{ fontWeight: "600" }}>Total No. of Users</p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ChatbotReports;
