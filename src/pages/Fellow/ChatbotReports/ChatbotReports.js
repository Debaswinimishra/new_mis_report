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
import Nodata from "../../../Assets/Nodata.gif";
import Loader from "../../../ReusableComponents/Loader";
import PrakashakAPI from "../../../Environment/PrakashakAPI";

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
  const [loading, setLoading] = useState(null);

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
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      setSelectedMonth(e.target.value ? e.target.value : "");
    }
  };

  //*-----------------On filter button press---------------------
  const handleFilterData = () => {
    setLoading(true);
    if (!selectedMonth) {
      setLoading(false);
      toast.error("Please select a month !", {
        style: {
          borderRadius: "100px",
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      const body = {
        year: selectedYear,
        month: selectedMonth,
      };
      console.log("body sent---------->", body);
      PrakashakAPI.post("getChatbotReportMonthWise", body)
        .then((res) => {
          if (res.status === 200) {
            setObtainedData(res.data);
            setLoading(false);
          } else {
            console.log("status got------>", res.status);
            toast.error("No data found !", {
              style: {
                borderRadius: "100px",
                backgroundColor: "black",
                color: "white",
              },
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("The error in filter--------->", error);
          toast.error("Data couldn't be fetched !", {
            style: {
              borderRadius: "100px",
              backgroundColor: "black",
              color: "white",
            },
          });
          setLoading(false);
        });
    }
  };

  //todo-----------------------Console logs-------------------
  // console.log("selected month---------->", selectedMonth);
  console.log("obtainedData------------>", obtainedData);

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

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : loading === false && Object.keys(obtainedData).length > 0 ? (
        <div>
          <div
            style={{
              width: "95%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "14px",
              marginTop: "2%",
              marginLeft: "2%",
            }}
          >
            <div
              style={{
                height: "210px",
                width: "265px",
                // backgroundColor: "rgb(68 202 242)",
                borderRadius: "10px",
                // border: "1px solid grey",
                boxShadow: "0px 3px 5px 2px lightgrey",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  paddingTop: "20px",
                  fontSize: "19px",
                }}
              >
                Total No. of Users
              </p>
              <h1 style={{ color: "#0066b2" }}>
                {obtainedData?.totalUsers ? obtainedData?.totalUsers : 0}
              </h1>
            </div>{" "}
            <div
              style={{
                height: "210px",
                width: "265px",
                // backgroundColor: "rgb(68 202 242)",
                borderRadius: "10px",
                // border: "1px solid grey",
                boxShadow: "0px 3px 5px 2px lightgrey",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  paddingTop: "20px",
                  fontSize: "19px",
                }}
              >
                Total no. of active users
              </p>
              <h1 style={{ color: "#0066b2" }}>
                {obtainedData?.activeUsers ? obtainedData?.activeUsers : 0}
              </h1>
            </div>{" "}
            <div
              style={{
                height: "210px",
                width: "265px",
                // backgroundColor: "rgb(68 202 242)",
                borderRadius: "10px",
                // border: "1px solid grey",
                boxShadow: "0px 3px 5px 2px lightgrey",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  paddingTop: "20px",
                  fontSize: "19px",
                }}
              >
                Monthly new users
              </p>
              <h1 style={{ color: "#0066b2" }}>
                {obtainedData?.monthlyUsers ? obtainedData?.monthlyUsers : 0}
              </h1>
            </div>{" "}
            <div
              style={{
                height: "210px",
                width: "265px",
                // backgroundColor: "rgb(68 202 242)",
                borderRadius: "10px",
                // border: "1px solid grey",
                boxShadow: "0px 3px 5px 2px lightgrey",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  paddingTop: "20px",
                  fontSize: "19px",
                }}
              >
                Monthly active users
              </p>
              <h1 style={{ color: "#0066b2" }}>
                {obtainedData?.monthlyActiveUsers
                  ? obtainedData?.monthlyActiveUsers
                  : 0}
              </h1>
            </div>{" "}
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
              marginLeft: "2%",
            }}
          >
            <div
              style={{
                height: "210px",
                width: "265px",
                // backgroundColor: "rgb(68 202 242)",
                borderRadius: "10px",
                // border: "1px solid grey",
                boxShadow: "0px 3px 5px 2px lightgrey",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  paddingTop: "20px",
                  fontSize: "19px",
                }}
              >
                Chatbot Interactions
              </p>
              <h1 style={{ color: "#0066b2" }}>
                {" "}
                {obtainedData?.totalConvos ? obtainedData?.totalConvos : 0}
              </h1>
            </div>{" "}
            <div
              style={{
                height: "210px",
                width: "265px",
                // backgroundColor: "rgb(68 202 242)",
                borderRadius: "10px",
                // border: "1px solid grey",
                boxShadow: "0px 3px 5px 2px lightgrey",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  paddingTop: "20px",
                  fontSize: "19px",
                }}
              >
                No. of feedback received
              </p>
              <h1 style={{ color: "#0066b2" }}>
                {" "}
                {obtainedData?.nonTriggerResponses
                  ? obtainedData?.nonTriggerResponses
                  : 0}
              </h1>
            </div>{" "}
            <div
              style={{
                height: "210px",
                width: "265px",
                // backgroundColor: "rgb(68 202 242)",
                borderRadius: "10px",
                // border: "1px solid grey",
                boxShadow: "0px 3px 5px 2px lightgrey",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  paddingTop: "-20px",
                  fontSize: "18px",
                }}
              >
                Avg. session duration in minutes for triggers
              </p>
              <h1 style={{ color: "#0066b2" }}>
                {" "}
                {obtainedData?.triggerAvgDuration
                  ? obtainedData?.triggerAvgDuration
                  : 0}
              </h1>
            </div>{" "}
            <div
              style={{
                height: "210px",
                width: "265px",
                // backgroundColor: "rgb(68 202 242)",
                borderRadius: "10px",
                // border: "1px solid grey",
                boxShadow: "0px 3px 5px 2px lightgrey",
              }}
            >
              <p
                style={{
                  fontWeight: "600",
                  paddingTop: "-27px",
                  fontSize: "18px",
                }}
              >
                Avg. session duration in minutes for push messages
              </p>
              <h1 style={{ color: "#0066b2" }}>
                {" "}
                {obtainedData?.messagingAvgDuration
                  ? obtainedData?.messagingAvgDuration
                  : 0}
              </h1>
            </div>{" "}
          </div>
        </div>
      ) : loading === false && Object.keys(obtainedData).length === 0 ? (
        <img src={Nodata} />
      ) : null}

      <ToastContainer />
    </div>
  );
};

export default ChatbotReports;
