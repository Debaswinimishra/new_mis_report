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
import {
  getManagerWidPasscodes,
  getAllTimespentData,
} from "./TimeSpentReport.Api";
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
import Api from "../../../Environment/Api";
import { ToastContainer, toast } from "react-toastify";

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

const dummyData = [
  {
    manager_name: "John Doe",
    passcode: "pass123",
    username: "johndoe01",
    address: "123 Main St, Cityville",
    phonenumber: "123-456-7890",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "4 hours",
      "Module 3": "5 hours",
      "Module 4": "3.5 hours",
      "Module 5": "2 hours",
    },
  },
  {
    manager_name: "Jane Smith",
    passcode: "pass456",
    username: "janesmith02",
    address: "456 Elm St, Townsville",
    phonenumber: "987-654-3210",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4.5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "5 hours",
    },
  },
  {
    manager_name: "Alice Johnson",
    passcode: "pass789",
    username: "alicejohnson03",
    address: "789 Maple St, Villagetown",
    phonenumber: "555-123-4567",
    gender: "Female",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "4 hours",
    },
  },
  {
    manager_name: "Michael Brown",
    passcode: "pass321",
    username: "michaelbrown04",
    address: "101 Oak St, Citytown",
    phonenumber: "444-555-6666",
    gender: "Male",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4 hours",
      "Module 3": "6 hours",
      "Module 4": "2.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Emily Davis",
    passcode: "pass654",
    username: "emilydavis05",
    address: "202 Pine St, Metropolis",
    phonenumber: "777-888-9999",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "David Wilson",
    passcode: "pass987",
    username: "davidwilson06",
    address: "303 Cedar St, Smallville",
    phonenumber: "222-333-4444",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Laura Martin",
    passcode: "pass159",
    username: "lauramartin07",
    address: "404 Spruce St, Bigcity",
    phonenumber: "333-444-5555",
    gender: "Female",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Chris Lee",
    passcode: "pass852",
    username: "chrislee08",
    address: "505 Birch St, Urbanville",
    phonenumber: "111-222-3333",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Sara Clark",
    passcode: "pass963",
    username: "saraclark09",
    address: "606 Maple St, Seaside",
    phonenumber: "444-555-6666",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4 hours",
      "Module 2": "5 hours",
      "Module 3": "6 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Robert Green",
    passcode: "pass741",
    username: "robertgreen10",
    address: "707 Oak St, Hilltown",
    phonenumber: "555-666-7777",
    gender: "Male",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "Nancy Adams",
    passcode: "pass147",
    username: "nancyadams11",
    address: "808 Pine St, Riverside",
    phonenumber: "666-777-8888",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Thomas Baker",
    passcode: "pass258",
    username: "thomasbaker12",
    address: "909 Cedar St, Lakeside",
    phonenumber: "777-888-9999",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Jessica Hall",
    passcode: "pass369",
    username: "jessicahall13",
    address: "1010 Birch St, Mountainview",
    phonenumber: "888-999-0000",
    gender: "Female",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Paul Scott",
    passcode: "pass1234",
    username: "paulscott14",
    address: "1111 Spruce St, Forestville",
    phonenumber: "999-000-1111",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Karen Lewis",
    passcode: "pass2345",
    username: "karenlewis15",
    address: "1212 Oak St, Meadowtown",
    phonenumber: "000-111-2222",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4 hours",
      "Module 2": "5 hours",
      "Module 3": "6 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Brian Walker",
    passcode: "pass3456",
    username: "brianwalker16",
    address: "1313 Pine St, Seaview",
    phonenumber: "111-222-3333",
    gender: "Male",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "Patricia Harris",
    passcode: "pass4567",
    username: "patriciaharris17",
    address: "1414 Cedar St, Hillview",
    phonenumber: "222-333-4444",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Kevin Young",
    passcode: "pass5678",
    username: "kevinyoung18",
    address: "1515 Birch St, Valleytown",
    phonenumber: "333-444-5555",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Megan King",
    passcode: "pass6789",
    username: "meganking19",
    address: "1616 Maple St, Mountainview",
    phonenumber: "444-555-6666",
    gender: "Female",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Eric Martinez",
    passcode: "pass7890",
    username: "ericmartinez20",
    address: "1717 Spruce St, Urbantown",
    phonenumber: "555-666-7777",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Emma Roberts",
    passcode: "pass8901",
    username: "emmaroberts21",
    address: "1818 Oak St, Metropolis",
    phonenumber: "666-777-8888",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4 hours",
      "Module 2": "5 hours",
      "Module 3": "6 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Daniel Clark",
    passcode: "pass9012",
    username: "danielclark22",
    address: "1919 Pine St, Lakeside",
    phonenumber: "777-888-9999",
    gender: "Male",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "Olivia Johnson",
    passcode: "pass0123",
    username: "oliviajohnson23",
    address: "2020 Cedar St, Villagetown",
    phonenumber: "888-999-0000",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Lucas Wright",
    passcode: "pass1234",
    username: "lucaswright24",
    address: "2121 Birch St, Riverside",
    phonenumber: "999-000-1111",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Sophia Brown",
    passcode: "pass2345",
    username: "sophiabrown25",
    address: "2222 Maple St, Forestville",
    phonenumber: "000-111-2222",
    gender: "Female",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Henry King",
    passcode: "pass3456",
    username: "henryking26",
    address: "2323 Spruce St, Capitalcity",
    phonenumber: "111-222-3333",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Ella Anderson",
    passcode: "pass4567",
    username: "ellaanderson27",
    address: "2424 Oak St, Meadowtown",
    phonenumber: "222-333-4444",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4 hours",
      "Module 2": "5 hours",
      "Module 3": "6 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Ryan Walker",
    passcode: "pass5678",
    username: "ryanwalker28",
    address: "2525 Pine St, Seaview",
    phonenumber: "333-444-5555",
    gender: "Male",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "Grace Lee",
    passcode: "pass6789",
    username: "gracelee29",
    address: "2626 Birch St, Hillview",
    phonenumber: "444-555-6666",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Aaron Harris",
    passcode: "pass7890",
    username: "aaronharris30",
    address: "2727 Maple St, Valleytown",
    phonenumber: "555-666-7777",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Isabella Young",
    passcode: "pass8901",
    username: "isabellayoung31",
    address: "2828 Spruce St, Mountainview",
    phonenumber: "666-777-8888",
    gender: "Female",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Brandon Martinez",
    passcode: "pass9012",
    username: "brandonmartinez32",
    address: "2929 Oak St, Urbantown",
    phonenumber: "777-888-9999",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Ava Roberts",
    passcode: "pass0123",
    username: "avaroberts33",
    address: "3030 Pine St, Metropolis",
    phonenumber: "888-999-0000",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4 hours",
      "Module 2": "5 hours",
      "Module 3": "6 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Joshua Clark",
    passcode: "pass1234",
    username: "joshuaclark34",
    address: "3131 Cedar St, Lakeside",
    phonenumber: "999-000-1111",
    gender: "Male",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "Madison Johnson",
    passcode: "pass2345",
    username: "madisonjohnson35",
    address: "3232 Birch St, Villagetown",
    phonenumber: "000-111-2222",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Tyler Wright",
    passcode: "pass3456",
    username: "tylerwright36",
    address: "3333 Maple St, Riverside",
    phonenumber: "111-222-3333",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Mia Brown",
    passcode: "pass4567",
    username: "miabrown37",
    address: "3434 Spruce St, Forestville",
    phonenumber: "222-333-4444",
    gender: "Female",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Liam King",
    passcode: "pass5678",
    username: "liamking38",
    address: "3535 Oak St, Capitalcity",
    phonenumber: "333-444-5555",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Chloe Anderson",
    passcode: "pass6789",
    username: "chloeanderson39",
    address: "3636 Pine St, Meadowtown",
    phonenumber: "444-555-6666",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4 hours",
      "Module 2": "5 hours",
      "Module 3": "6 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Benjamin Walker",
    passcode: "pass7890",
    username: "benjaminwalker40",
    address: "3737 Birch St, Seaview",
    phonenumber: "555-666-7777",
    gender: "Male",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "Amelia Lee",
    passcode: "pass8901",
    username: "amelialee41",
    address: "3838 Maple St, Hillview",
    phonenumber: "666-777-8888",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Ethan Harris",
    passcode: "pass9012",
    username: "ethanharris42",
    address: "3939 Spruce St, Valleytown",
    phonenumber: "777-888-9999",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Evelyn Young",
    passcode: "pass0123",
    username: "evelynyoung43",
    address: "4040 Oak St, Mountainview",
    phonenumber: "888-999-0000",
    gender: "Female",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Jacob Martinez",
    passcode: "pass1234",
    username: "jacobmartinez44",
    address: "4141 Pine St, Urbantown",
    phonenumber: "999-000-1111",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Aria Roberts",
    passcode: "pass2345",
    username: "ariaroberts45",
    address: "4242 Cedar St, Metropolis",
    phonenumber: "000-111-2222",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4 hours",
      "Module 2": "5 hours",
      "Module 3": "6 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Michael Clark",
    passcode: "pass3456",
    username: "michaelclark46",
    address: "4343 Birch St, Lakeside",
    phonenumber: "111-222-3333",
    gender: "Male",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "Charlotte Johnson",
    passcode: "pass4567",
    username: "charlottejohnson47",
    address: "4444 Maple St, Villagetown",
    phonenumber: "222-333-4444",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "James Wright",
    passcode: "pass5678",
    username: "jameswright48",
    address: "4545 Spruce St, Riverside",
    phonenumber: "333-444-5555",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Scarlett Brown",
    passcode: "pass6789",
    username: "scarlettbrown49",
    address: "4646 Oak St, Forestville",
    phonenumber: "444-555-6666",
    gender: "Female",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Logan King",
    passcode: "pass7890",
    username: "loganking50",
    address: "4747 Pine St, Capitalcity",
    phonenumber: "555-666-7777",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Sofia Anderson",
    passcode: "pass8901",
    username: "sofiaanderson51",
    address: "4848 Birch St, Meadowtown",
    phonenumber: "666-777-8888",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4 hours",
      "Module 2": "5 hours",
      "Module 3": "6 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Luke Walker",
    passcode: "pass9012",
    username: "lukewalker52",
    address: "4949 Maple St, Seaview",
    phonenumber: "777-888-9999",
    gender: "Male",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "Harper Lee",
    passcode: "pass0123",
    username: "harperlee53",
    address: "5050 Spruce St, Hillview",
    phonenumber: "888-999-0000",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Nathan Harris",
    passcode: "pass1234",
    username: "nathanharris54",
    address: "5151 Oak St, Valleytown",
    phonenumber: "999-000-1111",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Eleanor Young",
    passcode: "pass2345",
    username: "eleanoryoung55",
    address: "5252 Cedar St, Mountainview",
    phonenumber: "000-111-2222",
    gender: "Female",
    total_training_module: 15,
    completed_module: "12/15",
    time_spent_training_module: {
      "Module 1": "6 hours",
      "Module 2": "5 hours",
      "Module 3": "7 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Henry Martinez",
    passcode: "pass3456",
    username: "henrymartinez56",
    address: "5353 Maple St, Urbantown",
    phonenumber: "111-222-3333",
    gender: "Male",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Isla Roberts",
    passcode: "pass4567",
    username: "islaroberts57",
    address: "5454 Birch St, Metropolis",
    phonenumber: "222-333-4444",
    gender: "Female",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "4 hours",
      "Module 2": "5 hours",
      "Module 3": "6 hours",
      "Module 4": "3.5 hours",
      "Module 5": "3 hours",
    },
  },
  {
    manager_name: "Samuel Clark",
    passcode: "pass5678",
    username: "samuelclark58",
    address: "5555 Spruce St, Lakeside",
    phonenumber: "333-444-5555",
    gender: "Male",
    total_training_module: 15,
    completed_module: "15/15",
    time_spent_training_module: {
      "Module 1": "6.5 hours",
      "Module 2": "5.5 hours",
      "Module 3": "7 hours",
      "Module 4": "4 hours",
      "Module 5": "3.5 hours",
    },
  },
  {
    manager_name: "Grace Johnson",
    passcode: "pass6789",
    username: "gracejohnson59",
    address: "5656 Oak St, Villagetown",
    phonenumber: "444-555-6666",
    gender: "Female",
    total_training_module: 15,
    completed_module: "14/15",
    time_spent_training_module: {
      "Module 1": "5 hours",
      "Module 2": "4.5 hours",
      "Module 3": "6 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
  {
    manager_name: "Daniel Wright",
    passcode: "pass7890",
    username: "danielwright60",
    address: "5757 Pine St, Riverside",
    phonenumber: "555-666-7777",
    gender: "Male",
    total_training_module: 15,
    completed_module: "13/15",
    time_spent_training_module: {
      "Module 1": "5.5 hours",
      "Module 2": "4 hours",
      "Module 3": "6.5 hours",
      "Module 4": "3 hours",
      "Module 5": "2.5 hours",
    },
  },
];

export function TimeSpentReport() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [managerId, setManagerId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [managerArray, setManagerArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  //*-------------On manager change----------------------
  const handleManagerChange = (event) => {
    setManagerId(event.target.value);
    setPasscode("");
  };

  passcodeArray = managerArray?.filter((item) => {
    return item.managerid === managerId;
  });

  //*---------------On changing the passcode-----------------
  const passcodeChange = (event) => {
    setPasscode(event.target.value);
  };

  //*--------------On filtering the data------------------------
  const filterData = async () => {
    try {
      console.log("filter button clicked");
      //?-----Data coming from tyhe API
      const body = {
        year: selectedYear,
        month: selectedMonth,
        managerid: managerId,
        passcode: passcode,
      };
      const response = await getAllTimespentData(body);
      if (response.payload.status === 200) {
        setFilteredData(res.payload.data); // These are subjected to change according to the entities received from API
      } else if (res.payload.status === 204) {
        toast.info("Sorry, no data found under these filters !");
      } else {
        console.log(
          "Response status received while fetching filtered data----------->",
          response.payload.status
        );
      }
    } catch (error) {
      toast.error(
        `Sorry, something went wrong....Code:${error.response.status}`
      );
      console.error(
        "The error received while fetching filtered data----------------------->",
        error
      );
    }
  };

  //*---------------Page change in the table data-----------
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //*---------------Row change-----------------
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const fileName = "TimeSpent report";

  const xlData = //&-----------------Here it will be changed to filteredData once data is retreived from the API
    dummyData.length > 0 &&
    dummyData.map((x) => {
      const { ...exceptBoth } = x;
      return exceptBoth;
    });

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
            {selectedYear && selectedMonth
              ? managerArray?.map((option, index) => (
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

      {selectedYear && dummyData ? (
        <div className="table">
          <TableContainer
            component={Paper}
            sx={{
              marginTop: 3,
              width: "100%",
              borderRadius: "6px",
              maxHeight: "800px",
            }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sl no.</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Manager Name</TableCell>
                  <TableCell align="center">Passcode</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Phone number</TableCell>
                  <TableCell align="center">Total training modules</TableCell>
                  <TableCell align="center">Completed Modules</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.username}</TableCell>
                      <TableCell align="center">{item.manager_name}</TableCell>
                      <TableCell align="center">{item.passcode}</TableCell>
                      <TableCell align="center">{item.gender}</TableCell>
                      <TableCell align="center">{item.phonenumber}</TableCell>
                      <TableCell align="center">
                        {item.total_training_module}
                      </TableCell>
                      <TableCell align="center">
                        {item.completed_module}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={totalDataLength}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Download csvData={xlData} fileName={fileName} />
          </TableContainer>
        </div>
      ) : null}

      <ToastContainer />
    </Box>
  );
}
