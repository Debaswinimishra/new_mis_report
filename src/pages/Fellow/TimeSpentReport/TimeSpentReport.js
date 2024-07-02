import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import Download from "../../../downloads/ExportCsv";
import Select1 from "../../../ReusableComponents/Select1";
import ReusableTextField from "../../../ReusableComponents/ReusableTextField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getManagerWidPasscodes } from "./TimeSpentReport.Api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Loader from "../../../ReusableComponents/Loader";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import Logo from "../../../ReusableComponents/Logo";
import loader from "../../../Assets/R.gif";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5e72e4",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

export function TimeSpentReport() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [managerId, setManagerId] = useState("");
  const [passcodesArray, setPasscodesArray] = useState([]);
  const [passcode, setPasscode] = useState("");
  const [managerArray, setManagerArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  let passcodeArray;

  //*-----------On changing the year---------------------------
  const handleYearChange = async (selectedYear) => {
    setSelectedYear(selectedYear);
    setManagerId("");
    setSelectedMonth("");
    setPasscode("");
    try {
      const response = await getManagerWidPasscodes(selectedYear);
      setManagerArray(response.data.resData);
    } catch (error) {
      console.error(
        "The error while fetching manager array------------------------>",
        error
      );
    }
  };

  //*------------On changing the month--------------------
  const handleMonthChange = async (event) => {
    setSelectedMonth(event.target.value);
    setPasscode("");
    setManagerId("");
  };
  //   console.log("managername------------------->", managerId);

  //*-------------On manager change----------------------
  const handleManagerChange = (event) => {
    setManagerId(event.target.value);
    setPasscode("");
  };

  passcodeArray = managerArray?.filter((item) => {
    return item.managerid === managerId;
  });

  //   console.log("managerArray--------------------->", managerArray);
  console.log(
    "passcodeArray-------------------->",
    passcodeArray[0]?.passcodes
  );

  //*---------------On changing the passcode-----------------
  const passcodeChange = (event) => {
    setPasscode(event.target.value);
  };

  //*--------------On filtering the data------------------------
  const filterData = async () => {
    try {
      console.log("filter button clicked");
    } catch (error) {

    }
  };


  return (
    <Box>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
        }}
      >
        <div
          style={{
            marginTop: "20px",
            padding: "30px 20px",
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          }}
        >
          <Select1 selectedYear={selectedYear} onChange={handleYearChange} />

          <TextField
            id="outlined-select-currency"
            select
            label="Select month"
            defaultValue="none"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <MenuItem value="">None</MenuItem>
            {Array.isArray(monthArr) && selectedYear
              ? monthArr.map((option, index) => (
                  <MenuItem key={index + 1} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              : null}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Select Manager"
            defaultValue="none"
            value={managerId}
            onChange={handleManagerChange}
          >
            <MenuItem value="">None</MenuItem>
            {Array.isArray(managerArray)
              ? managerArray.map((option, index) => (
                  <MenuItem key={index + 1} value={option.managerid}>
                    {option.managername}
                  </MenuItem>
                ))
              : null}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Select Passcode"
            defaultValue="none"
            value={passcode}
            onChange={passcodeChange}
          >
            <MenuItem value="">None</MenuItem>
            {Array.isArray(passcodeArray[0]?.passcodes)
              ? passcodeArray[0]?.passcodes.map((option, index) => (
                  <MenuItem key={index + 1} value={option}>
                    {option}
                  </MenuItem>
                ))
              : null}
          </TextField>

          <Button
            variant="contained"
            onClick={filterData}
            style={{ width: "100%", height: "auto", marginTop: "10px" }}
          >
            Filter
          </Button>
        </div>
      </div>

      <div className="table">
        
      </div>

    </Box>
  );
}
