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

const weekArr = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

const PrakashakFilters = () => {
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

  //todo--------------Console logs-------------------
  console.log("selected year------------------->", selectedYear);
  console.log("selected month------------------->", selectedMonth);
  console.log("selected week------------------->", selectedWeek);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "25%",
        marginTop: "4%",
        marginLeft: "70%",
        // flexWrap: "wrap",
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
    </div>
  );
};

export default PrakashakFilters;
