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
  Modal,
  CircularProgress,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import PrakashakAPI from "../../../Environment/PrakashakAPI";
import moment from "moment";
import DynamicModal from "../../../Components/DynamicModal";
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
    { value: 5, label: "5" },
  ];

  //?----------------Class Array-----------------------
  const classArr = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];

  //&-------------Filter states---------------
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState();

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth("");
    setSelectedWeek("");
    setSelectedClass("");
  };

  const handleMonthChange = (e) => {
    if (
      e.target.value > currentMonthSelected.value &&
      selectedYear === currentYear
    ) {
      alert("You can't select a month greater than the current month !");
    } else {
      setSelectedWeek("");
      setSelectedMonth(e.target.value);
    }
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
    setSelectedMonth("");
    setSelectedWeek("");
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

    if (selectedYear) {
      PrakashakAPI.post(`getClassWiseReport`, body)
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
      PrakashakAPI.post(`getClassWiseReport`)
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

  const [open, setOpen] = useState(false);
  const [modalContentTitle, setModalContentTitle] = useState("");
  const [modalContentData, setModalContentData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [tableDatas, setTableDatas] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  const getModalTitle = (type) => {
    switch (type) {
      case "students":
        return "Number of Students";
      case "calls":
        return "Total No. of Calls Received";
      case "sms":
        return "Total No. of SMS Delivered";
      case "receivedIvrs":
        return "Total No. of Calls Received in IVRs";
      case "uniqueIvrs":
        return "Unique Calls Received in IVR";
      case "video":
        return "Total No. of Videos Watched";
      case "chatbotActive":
        return "Number of Active Users";
      case "chatbot conversations":
        return "Total Conversations in Chatbot";
      default:
        return "Data";
    }
  };

  const fetchNewuserData = async (type) => {
    console.log("type--->", type);
    setLoading(true);
    try {
      let body = {
        year: selectedYear,
        month: selectedMonth ? parseInt(selectedMonth) : undefined,
        week: selectedWeek ? parseInt(selectedWeek) : undefined,
      };

      let response;
      let transformedData = [];

      if (type === "girls") {
        body.gender = "female";
      } else if (type === "boys") {
        body.gender = "male";
      }
      //districts data

      if (type === "students") {
        response = await PrakashakAPI.post("getAllStudentsReport", body);
        console.log("students---->", response);
        if (response.status === 200) {
          transformedData = response.data.map((student) => ({
            student_name: student.student_name,
            class: student.class,
            gender: student.gender,
            parents_name: student.parents_name,
            parents_phone_number: student.parents_phone_number,
            school_name: student.school_name,
            district: student.district,
            block: student.block,
            cluster: student.cluster,
          }));
          setTableHeaders([
            "Student Name",
            "Class",
            "Gender",
            "Parents Name",
            "Parents Phone Number",
            "School Name",
            "District",
            "Block",
            "Cluster",
          ]);
        }
      } else if (type === "sms") {
        response = await PrakashakAPI.post("getDeliveredSmsReport", body);
        if (response.status === 200) {
          setTableDatas(response.data);
          setTableHeaders(["SMS"]);
        }
      } else if (type === "calls") {
        response = await PrakashakAPI.post("getReceivedAutoCallsReport", body);
        if (response.status === 200) {
          transformedData = response.data.map((student) => ({
            student_name: student.student_name,
            class: student.class,
            gender: student.gender,
            parents_name: student.parents_name,
            // parents_phone_number: student.parents_phone_number,
            school_name: student.school_name,
            district: student.district,
            block: student.block,
            cluster: student.cluster,
            phone_number: student.phone_number,
            duration: student.duration,
          }));
          setTableHeaders([
            "Student Name",
            "Class",
            "Gender",
            "Parents Name",
            // "Parents Phone Number",
            "School Name",
            "District",
            "Block",
            "Cluster",
            "Phone",
            "Duration",
          ]);
        }
      } else if (type === "receivedAutocalls") {
        response = await PrakashakAPI.post("getReceivedAutoCallsReport", body);
        if (response.status === 200) {
          transformedData = response.data.map((student) => ({
            student_name: student.student_name,
            class: student.class,
            gender: student.gender,
            parents_name: student.parents_name,
            parents_phone_number: student.parents_phone_number,
            school_name: student.school_name,
            district: student.district,
            block: student.block,
            cluster: student.cluster,
            phone_number: student.phone_number,
            duration: student.duration,
          }));
          setTableHeaders([
            "Student Name",
            "Class",
            "Gender",
            "Parents Name",
            "Parents Phone Number",
            "School Name",
            "District",
            "Block",
            "Cluster",
            "Phone",
            "Duration",
          ]);
        }
      } else if (type === "uniqueIvrs") {
        response = await PrakashakAPI.post("getUniqueIvrsReport", body);
        if (response.status === 200) {
          transformedData = response.data.map((student) => ({
            student_name: student.student_name,
            class: student.class,
            gender: student.gender,
            parents_name: student.parents_name,
            parents_phone_number: student.parents_phone_number,
            school_name: student.school_name,
            district: student.district,
            block: student.block,
            cluster: student.cluster,
            phone_number: student.phone_number,
            duration: student.duration,
          }));
          setTableHeaders([
            "Student Name",
            "Class",
            "Gender",
            "Parents Name",
            "Parents Phone Number",
            "School Name",
            "District",
            "Block",
            "Cluster",
            "Phone",
            "Duration",
          ]);
        }
      } else if (type === "receivedIvrs") {
        response = await PrakashakAPI.post("getReceivedIvrsReport", body);
        transformedData = response.data.map((student) => ({
          student_name: student.student_name,
          class: student.class,
          gender: student.gender,
          parents_name: student.parents_name,
          parents_phone_number: student.parents_phone_number,
          school_name: student.school_name,
          district: student.district,
          block: student.block,
          cluster: student.cluster,
          phone_number: student.phone_number,
          duration: student.duration,
        }));
        setTableHeaders([
          "Student Name",
          "Class",
          "Gender",
          "Parents Name",
          "Parents Phone Number",
          "School Name",
          "District",
          "Block",
          "Cluster",
          "Phone",
          "Duration",
        ]);
      } else if (type === "video") {
        response = await PrakashakAPI.post(
          "getChatBotVideosWatchedReport",
          body
        );
        if (response.status === 200) {
          transformedData = response.data.map((student) => ({
            templateName: student.templateName,
          }));

          setTableHeaders(["Video"]);

          setTableHeaders(["Video"]);
        }
      } else if (type === "chatbot conversations") {
        response = await PrakashakAPI.post("getChatBotConvosReport", body);
        transformedData = response.data.map((student) => ({
          student_name: student.student_name,
          class: student.class,
          gender: student.gender,
          parents_name: student.parents_name,
          // parents_phone_number: student.parents_phone_number,
          school_name: student.school_name,
          district: student.district,
          block: student.block,
          cluster: student.cluster,
          // phone_number: student.phone_number,
          // duration: student.duration,
        }));
        setTableHeaders([
          "Student Name",
          "Class",
          "Gender",
          "Parents Name",
          // "Parents Phone Number",
          "School Name",
          "District",
          "Block",
          "Cluster",
          // "Phone",
          // "Duration",
        ]);
      } else if (type === "chatbotActive") {
        response = await PrakashakAPI.post("getChatBotActiveUsersReport", body);
        if (response.status === 200) {
          transformedData = response.data.map((student) => ({
            student_name: student.student_name,
            class: student.class,
            gender: student.gender,
            parents_name: student.parents_name,
            // parents_phone_number: student.parents_phone_number,
            school_name: student.school_name,
            district: student.district,
            block: student.block,
            cluster: student.cluster,
            phone_number: student.contact,
            // duration: student.duration,
          }));
          setTableHeaders([
            "Student Name",
            "Class",
            "Gender",
            "Parents Name",
            // "Parents Phone Number",
            "School Name",
            "District",
            "Block",
            "Cluster",
            "Phone",
            // "Duration",
          ]);
        }
      }

      setTableDatas(transformedData);
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = async (type) => {
    setOpen(true);
    console.log("type---->", type);

    // Set the modal title based on type
    const newModalTitle = getModalTitle(type);
    setModalTitle(newModalTitle);

    fetchNewuserData(type); //
  };

  const handleClose = () => setOpen(false);
  const xlData = tableDatas;
  const fileName = "StudentReport.csv";
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
          marginLeft: "53%",
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
                onClick={() => handleOpen("students")}
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
                // onClick={() => handleOpen(" ")}
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
                  No. of Parents Spent 0-1 mins
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
                  <h1>{data.no_of_parents_spent_0to1mins}</h1>
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
                  No. of Parents Spent 2-15 mins
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
                  No. of Parents Spent 16-30 mins
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
                  No. of Parents Spent 31-45 mins
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
                  No. of Parents Spent 45+ mins
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
                onClick={() => handleOpen("calls")}
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
                // onClick={() => handleOpen("sms")}
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
                onClick={() => handleOpen("receivedIvrs")}
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
                onClick={() => handleOpen("uniqueIvrs")}
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
                onClick={() => handleOpen("chatbot conversations")}
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
                onClick={() => handleOpen("video")}
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
                onClick={() => handleOpen("chatbotActive")}
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
      ) : loading === false && Object.keys(data).length === 0 ? (
        <h1>No data Available</h1>
      ) : null}

      <DynamicModal
        open={open}
        loading={loading}
        handleClose={handleClose}
        modalTitle={modalTitle}
        tableHeaders={tableHeaders}
        tableData={tableDatas}
        // tableHeaders={tableHeaders}
        // tableData={tableData}
        xlData={xlData}
        fileName={fileName}
      />
    </div>
  );
};

export default Classwise;
