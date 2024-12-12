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
  Modal,
  CircularProgress,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";
import PrakashakAPI from "../../../Environment/PrakashakAPI";
import Box from "@mui/material/Box";
import moment from "moment";
import Nodata from "../../../Assets/Nodata.gif";
import DynamicModal from "../../../Components/DynamicModal";

const DashboardMonthly = () => {
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
  ];

  const currentYear = new Date().getFullYear();
  // if 2025 then increase the lengtjh it will show 2024 and 2025
  const years = Array.from({ length: 1 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];
  console.log(currentMonthSelected);

  //&-------------Filter states---------------
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonthSelected.value - 1
    // 9
  );
  const [selectedWeek, setSelectedWeek] = useState(4);
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState();
  const [tableData, setTableData] = useState([]);
  const [modalLoader, setModalLoader] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth("");
    setSelectedWeek("");
  };

  const handleMonthChange = (e) => {
    if (
      e.target.value > currentMonthSelected.value &&
      selectedYear === currentYear
    ) {
      alert("You can't select a month greater than the current month !");
    } else {
      setSelectedWeek(1);
      setSelectedMonth(e.target.value ? e.target.value : "");
    }
  };

  const handleWeekChange = (e) => {
    if (!selectedMonth && e.target.value) {
      alert("Please select a month before selecting a week !");
    } else {
      setSelectedWeek(e.target.value ? parseInt(e.target.value) : "");
    }
  };

  const fetchData = () => {
    setLoading(true);
    const body = {
      year: parseInt(selectedYear),
      month: parseInt(selectedMonth),
      ...(selectedWeek && { week: parseInt(selectedWeek) }),
    };
    console.log("body---------------->", body);

    const filteredData = dataJson.filter((item) => {
      return (
        item.month === parseInt(selectedMonth) &&
        item.week === parseInt(selectedWeek)
      );
    });
    console.log("filteredData--->", filteredData);
    if (filteredData?.length > 0) {
      setDashboardData(filteredData);
      setLoading(false);
    } else {
      setLoading(false);
      setDashboardData([]);
    }

    // PrakashakAPI.post("getDashboardReport", body)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setDashboardData(res.data);
    //     } else {
    //       console.log("status code-----", res.status);
    //     }
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(`The Error is-----> ${err}`);
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterButtonClick = () => {
    setDashboardData([]);
    setLoading(true);
    const body = {
      year: parseInt(selectedYear),
      month: parseInt(selectedMonth),
      ...(selectedWeek && { week: selectedWeek }),
    };
    console.log("body---------------->", body);
    fetchData();
    // PrakashakAPI.post(`getDashboardReport`, body)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setDashboardData(res.data);
    //     } else {
    //       console.log("status code-----", res.status);
    //     }
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(`The Error is-----> ${err}`);
    //     setLoading(false);
    //   });
  };

  const [districsArray, setDistrictArr] = useState([]);
  const [blocksArr, setBlocksArr] = useState([]);

  const [clusterArr, setClusterArr] = useState([]);
  // console.log("clusterArr--->", clusterArr);

  const [schoolArr, setSchoolArr] = useState([]);

  const [studentsArr, setStudentsArr] = useState([]);
  // console.log("studentsArr---->", studentsArr);

  const [smsArr, setSmsArr] = useState([]);
  // console.log("studentsArr---->", smsArr);

  const [callsArr, setCallsArr] = useState([]);
  // console.log("callsArr---->", callsArr);

  const [receivedCallsArr, setReceivedCallsArr] = useState([]);
  // console.log("receivedCallsArr---->", receivedCallsArr);

  const [callsReceivedIvrArr, setCallsReceivedIvrArr] = useState([]);
  // console.log("callsReceivedIvrArr---->", callsReceivedIvrArr);

  const [uniqueCallsIvrArr, setUniqueCallsIvrArr] = useState([]);
  // console.log("uniqueCallsArr---->", uniqueCallsIvrArr);

  const [activeUserChatbotArr, setActiveUserChatbotArr] = useState([]);
  // console.log("activeUserChatbotArr---->", activeUserChatbotArr);

  const [video, setVideo] = useState([]);
  // console.log("video---->", video);

  //todo----------------------Console logs---------------------------
  const [tableDatas, setTableDatas] = useState([]);
  console.log("tableHeaders----->", tableDatas);
  let body;
  const [tableHeaders, setTableHeaders] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const getModalTitle = (type) => {
    switch (type) {
      case "district":
        return "Number of District";
      case "block":
        return "Number of blocks";

      case "clusters":
        return "Number of Clusters";
      case "schools":
        return "Number of Schools";
      case "newSchools":
        return "Total number of New schools";
      case "newStudents":
        return "Total number of New Students";

      case "smartphoneUsers":
        return "Total number of Smartphone users";
      case "girls":
        return "Total Number of new girls";
      case "boys":
        return "Total Number of new Boys";

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
      case "chatbot":
        return "Conversations in Chatbot";
      default:
        return "Data";
    }
  };

  const fetchDatas = async (type) => {
    setModalLoader(true);
    console.log("type--->", type);
    // setLoading(true);
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

      if (type === "district") {
        response = await PrakashakAPI.post("getAllDistricts", body);
        console.log("district response--->", response.data);
        if (response.status === 200) {
          transformedData = response.data.map((district) => ({
            district: district.district,
          }));
          setModalLoader(false);

          setTableHeaders(["District"]);
        }
      } else if (type === "block") {
        response = await PrakashakAPI.post("getAllBlocks", body);
        console.log("block response--->", response.data);
        if (response.status === 200) {
          transformedData = response.data.map((block) => ({
            block: block.block,
          }));
          setModalLoader(false);
          setTableHeaders(["Block"]);
        }
      } else if (type === "clusters") {
        response = await PrakashakAPI.post("getAllClusters", body);
        if (response.status === 200) {
          transformedData = response.data.map((item, index) => ({
            district: item.district,
            block: item.block,
            cluster: item.cluster,
          }));
          setModalLoader(false);
          setTableHeaders(["District", "Block", "Clusters"]);
        }
      } else if (type === "schools") {
        response = await PrakashakAPI.post("getAllSchools", body);
        if (response.status === 200) {
          transformedData = response.data.map((school) => ({
            school_name: school.school_name,
            udise_code: school.udise_code,
          }));
          setModalLoader(false);
          setTableHeaders(["School Name", "UDISE Code"]);
        }
      } else if (type === "students" || type === "girls" || type === "boys") {
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
          setModalLoader(false);
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
          setModalLoader(false);
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
          setModalLoader(false);
        }
      } else if (type === "chatbot") {
        response = await PrakashakAPI.post("getChatBotConvosReport", body);
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
            phone_number: student.phone_number ? student.phone_number : "-",
            buttonClicked: student.buttonClicked ? student.buttonClicked : "-",
            templateName: student.templateName ? student.templateName : "-",
            msgType: student.msgType ? student.msgType : "-",
            status: student.status,
            createdAt: moment(student.createdAt).format("DD-MM-YYYY hh:mm"),
          }));
          setTableHeaders([
            "Student Name",
            "Class",
            "Gender",
            "Parents Name",

            "School Name",
            "District",
            "Block",
            "Cluster",
            "Phone Number",
            "Button Clicked",
            "Template Name",
            "Msg Type",
            "Status",
            "Created on",
          ]);
          setModalLoader(false);
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
            // "Parents Phone Number",
            "School Name",
            "District",
            "Block",
            "Cluster",
            "Phone",
            "Duration",
          ]);
          setModalLoader(false);
        }
      } else if (type === "uniqueIvrs") {
        response = await PrakashakAPI.post("getUniqueIvrsReport", body);
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
          setModalLoader(false);
        }
      } else if (type === "receivedIvrs") {
        response = await PrakashakAPI.post("getReceivedIvrsReport", body);
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
        setModalLoader(false);
      } else if (type === "video") {
        response = await PrakashakAPI.post(
          "getChatBotVideosWatchedReport",
          body
        );
        if (response.status === 200) {
          transformedData = response.data.map((temp) => ({
            templateName: temp.templateName,
          }));

          setTableDatas(transformedData);
          setModalLoader(false);
          setTableHeaders(["TemplateName"]);
        }
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
      setModalLoader(false);
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setLoading(false);
      setModalLoader(false);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (type) => {
    console.log("type------->", type);
    setOpen(true);

    const newModalTitle = getModalTitle(type);
    setModalTitle(newModalTitle);

    fetchDatas(type);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const districtsData = [
    {
      districts: districsArray,
    },
  ];

  const blocksData = [
    {
      blocks: blocksArr,
    },
  ];

  const clustersData = [
    {
      clusters: clusterArr,
    },
  ];

  const schoolsData = [
    {
      schools: schoolArr,
    },
  ];

  const studentsData = [
    {
      students: studentsArr,
    },
  ];

  const xlData = tableDatas;
  // console.log("tableDatas------------>", tableDatas);
  const fileName = "Dashboard.csv";
  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <CircularProgress />
          </Box>
        </div>
      ) : dashboardData && dashboardData?.length === 0 && loading === false ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end", // Aligns content to the right
              alignItems: "center", // Vertically centers the items within the div
              marginRight: "5%", // Adjust as needed to create space from the right edge
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
                {/* <MenuItem value={null}>None</MenuItem> */}
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
                {/* <MenuItem value={null}>None</MenuItem> */}
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
                // marginTop: "1.2%",
                marginLeft: "9px",
              }}
              onClick={filterButtonClick}
            >
              Filter
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "90vh",
            }}
          >
            <img
              src={Nodata}
              alt="No Data"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                marginBottom: "20px",
              }}
            />
          </div>
        </>
      ) : (
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
              justifyContent: "flex-end", // Aligns content to the right
              alignItems: "center", // Vertically centers the items within the div
              marginRight: "5%", // Adjust as needed to create space from the right edge
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
                {/* <MenuItem value={null}>None</MenuItem> */}
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
                {/* <MenuItem value={null}>None</MenuItem> */}
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
                // marginTop: "1.2%",
                marginLeft: "9px",
              }}
              onClick={filterButtonClick}
            >
              Filter
            </Button>
          </div>

          <div>
            {dashboardData?.length > 0 ? (
              <div
                style={{
                  marginTop: "2%",
                  boxShadow: "2px 1px 5px grey",
                  padding: "5%",
                  width: "97%",
                }}
              >
                <h1
                  style={{
                    marginTop: "-2%",
                    color: "#333", // Dark grey color for the text
                    fontFamily: "Congenial SemiBold", // Font family for a clean look
                    fontWeight: "700", // Bolder font weight for emphasis
                    fontSize: "1.8rem", // Larger font size for prominence
                    textAlign: "center", // Center-align the text
                    padding: "10px 0", // Add some padding for spacing
                    borderBottom: "2px solid #000000", // Add a bottom border for separation
                    letterSpacing: "0.5px", // Slight letter spacing for readability
                    textTransform: "capitalize", // Capitalize each word
                  }}
                >
                  New student details
                </h1>
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
                  {dashboardData?.length > 0 ? (
                    dashboardData?.map((dashboardData) => {
                      return (
                        <>
                          <div
                            // onClick={() => handleOpen("newSchools")}
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
                              // cursor: "pointer", // Show hand cursor on hover
                              // position: "relative", // Needed for positioning the "Click here" text
                            }}
                          >
                            <div
                              style={{
                                height: "50%",
                                color: "#6A5ACD",
                                paddingTop: "30px",
                                fontSize: "1.2rem",
                                fontFamily: "Congenial SemiBold",
                                fontWeight: "600",
                              }}
                            >
                              New schools added
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
                              <h1>{dashboardData.new_schools}</h1>
                            </div>
                          </div>

                          <div
                            // onClick={() => handleOpen("newSchools")}
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
                              // cursor: "pointer", // Show hand cursor on hover
                              // position: "relative", // Needed for positioning the "Click here" text
                            }}
                          >
                            <div
                              style={{
                                height: "50%",
                                color: "#6A5ACD",
                                paddingTop: "30px",
                                fontSize: "1.2rem",
                                fontFamily: "Congenial SemiBold",
                                fontWeight: "600",
                              }}
                            >
                              New Anganwadis added
                            </div>
                            <div
                              style={{
                                height: "50%",
                                backgroundColor: "#000080",
                                borderEndStartRadius: "10px",
                                borderEndEndRadius: "10px",
                                color: "white",
                              }}
                            >
                              <h1>0</h1>
                            </div>
                          </div>

                          <div
                            // onClick={() => handleOpen("newStudents")}
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
                              // cursor: "pointer", // Show hand cursor on hover
                              // position: "relative", // Needed for positioning the "Click here" text
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
                              <p>New students</p>
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
                              <h1>{dashboardData.new_students}</h1>
                            </div>
                          </div>

                          <div
                            onClick={() => handleOpen("girls")}
                            style={{
                              width: "255px",
                              height: "180px",
                              marginTop: "1.5%",
                              backgroundColor: "white",
                              borderRadius: "10px",
                              display: "flex",
                              flexDirection: "column",
                              boxShadow: "1px 1px 4px 3px lightGrey",
                              cursor: "pointer", // Show hand cursor on hover
                              position: "relative", // Needed for positioning the "Click here" text
                            }}
                          >
                            <div
                              style={{
                                height: "50%",
                                color: "rgb(153 58 134)",
                                paddingTop: "13px",
                                fontSize: "1.2rem",
                                fontFamily: "Congenial SemiBold",
                                fontWeight: "600",
                              }}
                            >
                              <p>New students (female)</p>
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
                              <h1>{dashboardData.new_girls}</h1>
                            </div>
                          </div>

                          <div
                            onClick={() => handleOpen("boys")}
                            style={{
                              width: "255px",
                              height: "180px",
                              marginTop: "1.5%",
                              backgroundColor: "white",
                              borderRadius: "10px",
                              display: "flex",
                              flexDirection: "column",
                              boxShadow: "1px 1px 4px 3px lightGrey",
                              cursor: "pointer", // Show hand cursor on hover
                              position: "relative", // Needed for positioning the "Click here" text
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
                              <p>New students (male)</p>
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
                              <h1>{dashboardData.new_boys}</h1>
                            </div>
                          </div>

                          <div
                            // onClick={() => handleOpen("boys")}
                            style={{
                              width: "255px",
                              height: "180px",
                              marginTop: "1.5%",
                              backgroundColor: "white",
                              borderRadius: "10px",
                              display: "flex",
                              flexDirection: "column",
                              boxShadow: "1px 1px 4px 3px lightGrey",
                              // cursor: "pointer", // Show hand cursor on hover
                              // position: "relative", // Needed for positioning the "Click here" text
                            }}
                          >
                            <div
                              style={{
                                height: "50%",
                                color: "#708090",
                                paddingTop: "13px",
                                fontSize: "1.2rem",
                                fontFamily: "Congenial SemiBold",
                                fontWeight: "600",
                              }}
                            >
                              <p>Activated students (new)</p>
                            </div>
                            <div
                              style={{
                                height: "50%",
                                backgroundColor: "#708090",
                                borderEndStartRadius: "10px",
                                borderEndEndRadius: "10px",
                                color: "white",
                              }}
                            >
                              <h1>{dashboardData.new_activated_students}</h1>
                            </div>
                          </div>

                          <div
                            // onClick={() => handleOpen("boys")}
                            style={{
                              width: "255px",
                              height: "180px",
                              marginTop: "1.5%",
                              backgroundColor: "white",
                              borderRadius: "10px",
                              display: "flex",
                              flexDirection: "column",
                              boxShadow: "1px 1px 4px 3px lightGrey",
                              // cursor: "pointer", // Show hand cursor on hover
                              // position: "relative", // Needed for positioning the "Click here" text
                            }}
                          >
                            {/* <div
                  style={{
                    position: "absolute",
                    top: "0px", // Adjust to position the text at the top
                    right: "0px", // Adjust to position the text at the right
                    color: "#CD5C5C", // Text color
                    backgroundColor: "white", // Background color to make it stand out
                    padding: "5px 10px", // Padding to add some space inside the border
                    fontSize: "0.7rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                    borderRadius: "5px", // Rounded corners for a smoother look
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for a 3D effect
                    zIndex: "10", // Ensure it stays on top of other elements
                  }}
                >
                  Click Here 👆
                </div> */}

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
                              <p>Total Active students</p>
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
                              <h1>{dashboardData.total_active_students}</h1>
                            </div>
                          </div>
                          <div
                            // onClick={() => handleOpen("newSchools")}
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
                                color: "#000080",
                                paddingTop: "30px",
                                fontSize: "1.2rem",
                                fontFamily: "Congenial SemiBold",
                                fontWeight: "600",
                              }}
                            >
                              Active students (male)
                            </div>
                            <div
                              style={{
                                height: "50%",
                                backgroundColor: "#000080",
                                borderEndStartRadius: "10px",
                                borderEndEndRadius: "10px",
                                color: "white",
                              }}
                            >
                              <h1>{dashboardData.active_students_boys}</h1>
                            </div>
                          </div>
                          <div
                            // onClick={() => handleOpen("newSchools")}
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
                                color: "#008080",
                                paddingTop: "30px",
                                fontSize: "1.2rem",
                                fontFamily: "Congenial SemiBold",
                                fontWeight: "600",
                              }}
                            >
                              Active students (female)
                            </div>
                            <div
                              style={{
                                height: "50%",
                                backgroundColor: "#008080",
                                borderEndStartRadius: "10px",
                                borderEndEndRadius: "10px",
                                color: "white",
                              }}
                            >
                              <h1>{dashboardData.active_students_girls}</h1>
                            </div>
                          </div>

                          <div
                          // style={{
                          //   marginTop: "2%",
                          //   boxShadow: "2px 1px 5px grey",
                          //   padding: "5%",
                          //   width: "97%",
                          // }}
                          >
                            <h1
                              style={{
                                marginTop: "2%",
                                color: "#333", // Dark grey color for the text
                                fontFamily: "Congenial SemiBold", // Font family for a clean look
                                fontWeight: "700", // Bolder font weight for emphasis
                                fontSize: "1.8rem", // Larger font size for prominence
                                textAlign: "center", // Center-align the text
                                padding: "10px 0", // Add some padding for spacing
                                borderBottom: "2px solid #000000", // Add a bottom border for separation
                                letterSpacing: "0.5px", // Slight letter spacing for readability
                                textTransform: "capitalize", // Capitalize each word
                              }}
                            >
                              Time-Spent details
                            </h1>
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
                              <>
                                <div
                                  style={{
                                    width: "255px",
                                    height: "240px", // Increased height to accommodate heading
                                    marginTop: "1.5%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "1px 1px 4px 3px lightGrey",
                                  }}
                                >
                                  {/* Heading */}
                                  <div
                                    style={{
                                      textAlign: "center",
                                      padding: "10px",
                                      color: "#00CED1",
                                      marginTop: "10px",
                                      fontSize: "1.3rem", // Heading font size
                                      fontWeight: "bold",
                                      fontFamily: "Congenial SemiBold",
                                    }}
                                  >
                                    Time Spent 0-1 mins
                                  </div>

                                  {/* User and Avg. Time Spent Section */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "10px",
                                      height: "50%",
                                      color: "#00CED1",
                                      fontSize: "1rem", // Reduced font size
                                      fontFamily: "Congenial SemiBold",
                                      fontWeight: "600",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Users
                                    </div>
                                    {/* Line divider */}
                                    <div
                                      style={{
                                        height: "100%",
                                        borderLeft: "1px solid #00CED1", // Line between elements
                                        margin: "0 5px",
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Avg. Time (in mins)
                                    </div>
                                  </div>

                                  {/* User count and Avg. Time Spent Values */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      alignItems: "center",
                                      backgroundColor: "#00CED1",
                                      borderEndStartRadius: "10px",
                                      borderEndEndRadius: "10px",
                                      color: "white",
                                      padding: "10px",
                                      height: "50%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "1rem", // Reduced font size
                                      }}
                                    >
                                      <h2>{dashboardData.ts_0to1_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData.ts_0to1_avgTs}</h1>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    width: "255px",
                                    height: "240px", // Increased height to accommodate heading
                                    marginTop: "1.5%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "1px 1px 4px 3px lightGrey",
                                  }}
                                >
                                  {/* Heading */}
                                  <div
                                    style={{
                                      textAlign: "center",
                                      padding: "10px",
                                      color: "#CD5C5C",
                                      marginTop: "10px",
                                      fontSize: "1.3rem", // Heading font size
                                      fontWeight: "bold",
                                      fontFamily: "Congenial SemiBold",
                                    }}
                                  >
                                    Time Spent 2-15 mins
                                  </div>

                                  {/* User and Avg. Time Spent Section */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "10px",
                                      height: "50%",
                                      color: "#CD5C5C",
                                      fontSize: "1rem", // Reduced font size
                                      fontFamily: "Congenial SemiBold",
                                      fontWeight: "600",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Users
                                    </div>
                                    {/* Line divider */}
                                    <div
                                      style={{
                                        height: "100%",
                                        borderLeft: "1px solid #CD5C5C", // Line between elements
                                        margin: "0 5px",
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Avg. Time (in mins)
                                    </div>
                                  </div>

                                  {/* User count and Avg. Time Spent Values */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      alignItems: "center",
                                      backgroundColor: "#CD5C5C",
                                      borderEndStartRadius: "10px",
                                      borderEndEndRadius: "10px",
                                      color: "white",
                                      padding: "10px",
                                      height: "50%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "1rem", // Reduced font size
                                      }}
                                    >
                                      <h2>{dashboardData.ts_2to15_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData.ts_2to15_avgTs}</h1>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    width: "255px",
                                    height: "240px", // Increased height to accommodate heading
                                    marginTop: "1.5%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "1px 1px 4px 3px lightGrey",
                                  }}
                                >
                                  {/* Heading */}
                                  <div
                                    style={{
                                      textAlign: "center",
                                      padding: "10px",
                                      color: "#CD5C5C",
                                      marginTop: "10px",
                                      fontSize: "1.3rem", // Heading font size
                                      fontWeight: "bold",
                                      fontFamily: "Congenial SemiBold",
                                    }}
                                  >
                                    Time Spent 16-30 mins
                                  </div>

                                  {/* User and Avg. Time Spent Section */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "10px",
                                      height: "50%",
                                      color: "#CD5C5C",
                                      fontSize: "1rem", // Reduced font size
                                      fontFamily: "Congenial SemiBold",
                                      fontWeight: "600",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Users
                                    </div>
                                    {/* Line divider */}
                                    <div
                                      style={{
                                        height: "100%",
                                        borderLeft: "1px solid #CD5C5C", // Line between elements
                                        margin: "0 5px",
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Avg. Time (in mins)
                                    </div>
                                  </div>

                                  {/* User count and Avg. Time Spent Values */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      alignItems: "center",
                                      backgroundColor: "#CD5C5C",
                                      borderEndStartRadius: "10px",
                                      borderEndEndRadius: "10px",
                                      color: "white",
                                      padding: "10px",
                                      height: "50%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "1rem", // Reduced font size
                                      }}
                                    >
                                      <h2>{dashboardData.ts_16to30_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData.ts_16to30_avgTs}</h1>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    width: "255px",
                                    height: "240px", // Increased height to accommodate heading
                                    marginTop: "1.5%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "1px 1px 4px 3px lightGrey",
                                  }}
                                >
                                  {/* Heading */}
                                  <div
                                    style={{
                                      textAlign: "center",
                                      padding: "10px",
                                      color: "#2E8B57",
                                      marginTop: "10px",
                                      fontSize: "1.3rem", // Heading font size
                                      fontWeight: "bold",
                                      fontFamily: "Congenial SemiBold",
                                    }}
                                  >
                                    Time Spent 31-45 mins
                                  </div>

                                  {/* User and Avg. Time Spent Section */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "10px",
                                      height: "50%",
                                      color: "#2E8B57",
                                      fontSize: "1rem", // Reduced font size
                                      fontFamily: "Congenial SemiBold",
                                      fontWeight: "600",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Users
                                    </div>
                                    {/* Line divider */}
                                    <div
                                      style={{
                                        height: "100%",
                                        borderLeft: "1px solid #2E8B57", // Line between elements
                                        margin: "0 5px",
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Avg. Time (in mins)
                                    </div>
                                  </div>

                                  {/* User count and Avg. Time Spent Values */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      alignItems: "center",
                                      backgroundColor: "#2E8B57",
                                      borderEndStartRadius: "10px",
                                      borderEndEndRadius: "10px",
                                      color: "white",
                                      padding: "10px",
                                      height: "50%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "1rem", // Reduced font size
                                      }}
                                    >
                                      <h2>{dashboardData.ts_31to45_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData.ts_31to45_avgTs}</h1>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    width: "255px",
                                    height: "240px", // Increased height to accommodate heading
                                    marginTop: "1.5%",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    boxShadow: "1px 1px 4px 3px lightGrey",
                                  }}
                                >
                                  {/* Heading */}
                                  <div
                                    style={{
                                      textAlign: "center",
                                      padding: "10px",
                                      color: "#000080",
                                      marginTop: "10px",
                                      fontSize: "1.3rem", // Heading font size
                                      fontWeight: "bold",
                                      fontFamily: "Congenial SemiBold",
                                    }}
                                  >
                                    Time Spent 45+ mins
                                  </div>

                                  {/* User and Avg. Time Spent Section */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "10px",
                                      height: "50%",
                                      color: "#000080",
                                      fontSize: "1rem", // Reduced font size
                                      fontFamily: "Congenial SemiBold",
                                      fontWeight: "600",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Users
                                    </div>
                                    {/* Line divider */}
                                    <div
                                      style={{
                                        height: "100%",
                                        borderLeft: "1px solid #000080", // Line between elements
                                        margin: "0 5px",
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        width: "45%",
                                        textAlign: "center",
                                      }}
                                    >
                                      Avg. Time (in mins)
                                    </div>
                                  </div>

                                  {/* User count and Avg. Time Spent Values */}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      textAlign: "center",
                                      alignItems: "center",
                                      backgroundColor: "#000080",
                                      borderEndStartRadius: "10px",
                                      borderEndEndRadius: "10px",
                                      color: "white",
                                      padding: "10px",
                                      height: "50%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "1rem", // Reduced font size
                                      }}
                                    >
                                      <h2>{dashboardData.ts_45plus_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData.ts_45plus_avgTs}</h1>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "90vh",
                      }}
                    >
                      <img
                        src={Nodata}
                        alt="No Data"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "80vh",
                          marginBottom: "20px",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* <DynamicModal //? commented for now for emergency purpose
            open={open}
            handleClose={handleClose}
            modalTitle={modalTitle}
            tableHeaders={tableHeaders}
            tableData={tableDatas}
            // tableHeaders={tableHeaders}
            // tableData={tableData}
            xlData={xlData}
            fileName={fileName}
            loading={modalLoader}
          /> */}
        </div>
      )}
    </>
  );
};

export default DashboardMonthly;
const dataJson = [
  {
    year: 2024,
    month: 1,
    week: 4,
    new_schools: 49,
    new_students: 1143,
    new_girls: 632,
    new_boys: 511,
    new_activated_students: 665,
    total_active_students: 665,
    active_students_boys: 356,
    active_students_girls: 309,
    ts_0to1_users: 0,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 206,
    ts_2to15_avgTs: 13.5,
    ts_16to30_users: 459,
    ts_16to30_avgTs: 26.5,
    ts_31to45_users: 0,
    ts_31to45_avgTs: 0,
    ts_45plus_users: 0,
    ts_45plus_avgTs: 0,
    lastUpdated: "31-01-2024",
  },
  {
    year: 2024,
    month: 2,
    week: 1,
    new_schools: 62,
    new_students: 3072,
    new_girls: 1498,
    new_boys: 1574,
    new_activated_students: 2148,
    total_active_students: 2511,
    active_students_boys: 1589,
    active_students_girls: 922,
    ts_0to1_users: 302,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 719,
    ts_2to15_avgTs: 11,
    ts_16to30_users: 567,
    ts_16to30_avgTs: 24.5,
    ts_31to45_users: 685,
    ts_31to45_avgTs: 40,
    ts_45plus_users: 540,
    ts_45plus_avgTs: 61,
    lastUpdated: "29-02-2024",
  },
  {
    year: 2024,
    month: 2,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 2515,
    active_students_boys: 1087,
    active_students_girls: 1428,
    ts_0to1_users: 298,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 738,
    ts_2to15_avgTs: 10.5,
    ts_16to30_users: 562,
    ts_16to30_avgTs: 26.5,
    ts_31to45_users: 704,
    ts_31to45_avgTs: 43,
    ts_45plus_users: 511,
    ts_45plus_avgTs: 64,
    lastUpdated: "29-02-2024",
  },
  {
    year: 2024,
    month: 2,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 2522,
    active_students_boys: 1390,
    active_students_girls: 1132,
    ts_0to1_users: 291,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 727,
    ts_2to15_avgTs: 10,
    ts_16to30_users: 572,
    ts_16to30_avgTs: 25,
    ts_31to45_users: 713,
    ts_31to45_avgTs: 39.5,
    ts_45plus_users: 510,
    ts_45plus_avgTs: 58,
    lastUpdated: "29-02-2024",
  },
  {
    year: 2024,
    month: 2,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 2609,
    active_students_boys: 1688,
    active_students_girls: 921,
    ts_0to1_users: 204,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 713,
    ts_2to15_avgTs: 13,
    ts_16to30_users: 601,
    ts_16to30_avgTs: 28,
    ts_31to45_users: 762,
    ts_31to45_avgTs: 37,
    ts_45plus_users: 533,
    ts_45plus_avgTs: 63.5,
    lastUpdated: "29-02-2024",
  },
  {
    year: 2024,
    month: 3,
    week: 1,
    new_schools: 21,
    new_students: 1216,
    new_girls: 630,
    new_boys: 586,
    new_activated_students: 2192,
    total_active_students: 4518,
    active_students_boys: 2890,
    active_students_girls: 1628,
    ts_0to1_users: 487,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 778,
    ts_2to15_avgTs: 14,
    ts_16to30_users: 663,
    ts_16to30_avgTs: 27,
    ts_31to45_users: 1784,
    ts_31to45_avgTs: 43,
    ts_45plus_users: 1293,
    ts_45plus_avgTs: 64.5,
    lastUpdated: "31-03-2024",
  },
  {
    year: 2024,
    month: 3,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 4502,
    active_students_boys: 3320,
    active_students_girls: 1182,
    ts_0to1_users: 503,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 812,
    ts_2to15_avgTs: 13.5,
    ts_16to30_users: 608,
    ts_16to30_avgTs: 25,
    ts_31to45_users: 1791,
    ts_31to45_avgTs: 41,
    ts_45plus_users: 1291,
    ts_45plus_avgTs: 62,
    lastUpdated: "31-03-2024",
  },
  {
    year: 2024,
    month: 3,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 4512,
    active_students_boys: 2059,
    active_students_girls: 2453,
    ts_0to1_users: 493,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 737,
    ts_2to15_avgTs: 13,
    ts_16to30_users: 709,
    ts_16to30_avgTs: 26.5,
    ts_31to45_users: 1782,
    ts_31to45_avgTs: 42.5,
    ts_45plus_users: 1284,
    ts_45plus_avgTs: 67,
    lastUpdated: "31-03-2024",
  },
  {
    year: 2024,
    month: 3,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 4524,
    active_students_boys: 1745,
    active_students_girls: 2779,
    ts_0to1_users: 481,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 709,
    ts_2to15_avgTs: 11,
    ts_16to30_users: 779,
    ts_16to30_avgTs: 27.5,
    ts_31to45_users: 1798,
    ts_31to45_avgTs: 40.5,
    ts_45plus_users: 1238,
    ts_45plus_avgTs: 68.5,
    lastUpdated: "31-03-2024",
  },
  {
    year: 2024,
    month: 4,
    week: 1,
    new_schools: 71,
    new_students: 1548,
    new_girls: 751,
    new_boys: 797,
    new_activated_students: 649,
    total_active_students: 5107,
    active_students_boys: 3001,
    active_students_girls: 2106,
    ts_0to1_users: 547,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 741,
    ts_2to15_avgTs: 14,
    ts_16to30_users: 813,
    ts_16to30_avgTs: 27.5,
    ts_31to45_users: 2181,
    ts_31to45_avgTs: 43,
    ts_45plus_users: 1372,
    ts_45plus_avgTs: 69,
    lastUpdated: "30-04-2024",
  },
  {
    year: 2024,
    month: 4,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 5109,
    active_students_boys: 2779,
    active_students_girls: 2330,
    ts_0to1_users: 545,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 736,
    ts_2to15_avgTs: 13,
    ts_16to30_users: 829,
    ts_16to30_avgTs: 28,
    ts_31to45_users: 2146,
    ts_31to45_avgTs: 42.5,
    ts_45plus_users: 1398,
    ts_45plus_avgTs: 72,
    lastUpdated: "30-04-2024",
  },
  {
    year: 2024,
    month: 4,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 5135,
    active_students_boys: 3210,
    active_students_girls: 1925,
    ts_0to1_users: 519,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 744,
    ts_2to15_avgTs: 11.5,
    ts_16to30_users: 816,
    ts_16to30_avgTs: 27,
    ts_31to45_users: 2161,
    ts_31to45_avgTs: 44,
    ts_45plus_users: 1414,
    ts_45plus_avgTs: 67.5,
    lastUpdated: "30-04-2024",
  },
  {
    year: 2024,
    month: 4,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 5147,
    active_students_boys: 2966,
    active_students_girls: 2181,
    ts_0to1_users: 507,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 720,
    ts_2to15_avgTs: 13,
    ts_16to30_users: 826,
    ts_16to30_avgTs: 26,
    ts_31to45_users: 2199,
    ts_31to45_avgTs: 43.5,
    ts_45plus_users: 1402,
    ts_45plus_avgTs: 68,
    lastUpdated: "30-04-2024",
  },
  {
    year: 2024,
    month: 5,
    week: 1,
    new_schools: 93,
    new_students: 2871,
    new_girls: 1407,
    new_boys: 1464,
    new_activated_students: 3094,
    total_active_students: 8027,
    active_students_boys: 4310,
    active_students_girls: 3717,
    ts_0to1_users: 721,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1197,
    ts_2to15_avgTs: 14.5,
    ts_16to30_users: 1125,
    ts_16to30_avgTs: 28,
    ts_31to45_users: 2579,
    ts_31to45_avgTs: 42,
    ts_45plus_users: 3126,
    ts_45plus_avgTs: 71,
    lastUpdated: "31-05-2024",
  },
  {
    year: 2024,
    month: 5,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 8014,
    active_students_boys: 4344,
    active_students_girls: 3670,
    ts_0to1_users: 734,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1180,
    ts_2to15_avgTs: 14,
    ts_16to30_users: 1186,
    ts_16to30_avgTs: 24,
    ts_31to45_users: 2617,
    ts_31to45_avgTs: 44,
    ts_45plus_users: 3031,
    ts_45plus_avgTs: 70.5,
    lastUpdated: "31-05-2024",
  },
  {
    year: 2024,
    month: 5,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 8029,
    active_students_boys: 4639,
    active_students_girls: 3390,
    ts_0to1_users: 719,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1203,
    ts_2to15_avgTs: 13,
    ts_16to30_users: 1198,
    ts_16to30_avgTs: 27,
    ts_31to45_users: 2581,
    ts_31to45_avgTs: 42.5,
    ts_45plus_users: 3047,
    ts_45plus_avgTs: 67,
    lastUpdated: "31-05-2024",
  },
  {
    year: 2024,
    month: 5,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 8024,
    active_students_boys: 3984,
    active_students_girls: 4040,
    ts_0to1_users: 724,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1194,
    ts_2to15_avgTs: 14,
    ts_16to30_users: 1185,
    ts_16to30_avgTs: 28.5,
    ts_31to45_users: 2579,
    ts_31to45_avgTs: 43,
    ts_45plus_users: 3066,
    ts_45plus_avgTs: 72,
    lastUpdated: "31-05-2024",
  },
  {
    year: 2024,
    month: 6,
    week: 1,
    new_schools: 62,
    new_students: 1174,
    new_girls: 586,
    new_boys: 588,
    new_activated_students: 1346,
    total_active_students: 8996,
    active_students_boys: 4999,
    active_students_girls: 3997,
    ts_0to1_users: 1098,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1095,
    ts_2to15_avgTs: 13,
    ts_16to30_users: 1017,
    ts_16to30_avgTs: 23,
    ts_31to45_users: 3171,
    ts_31to45_avgTs: 39,
    ts_45plus_users: 3713,
    ts_45plus_avgTs: 73,
    lastUpdated: "30-06-2024",
  },
  {
    year: 2024,
    month: 6,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 9003,
    active_students_boys: 4568,
    active_students_girls: 4435,
    ts_0to1_users: 1091,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1121,
    ts_2to15_avgTs: 14,
    ts_16to30_users: 1039,
    ts_16to30_avgTs: 27,
    ts_31to45_users: 3119,
    ts_31to45_avgTs: 36,
    ts_45plus_users: 3724,
    ts_45plus_avgTs: 77,
    lastUpdated: "30-06-2024",
  },
  {
    year: 2024,
    month: 6,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 8991,
    active_students_boys: 4445,
    active_students_girls: 4546,
    ts_0to1_users: 1103,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1114,
    ts_2to15_avgTs: 12,
    ts_16to30_users: 1046,
    ts_16to30_avgTs: 25,
    ts_31to45_users: 3138,
    ts_31to45_avgTs: 41,
    ts_45plus_users: 3693,
    ts_45plus_avgTs: 75,
    lastUpdated: "30-06-2024",
  },
  {
    year: 2024,
    month: 6,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 8998,
    active_students_boys: 4890,
    active_students_girls: 4108,
    ts_0to1_users: 1096,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1117,
    ts_2to15_avgTs: 11,
    ts_16to30_users: 1053,
    ts_16to30_avgTs: 26,
    ts_31to45_users: 3125,
    ts_31to45_avgTs: 38,
    ts_45plus_users: 3703,
    ts_45plus_avgTs: 72,
    lastUpdated: "30-06-2024",
  },
  {
    year: 2024,
    month: 7,
    week: 1,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 8967,
    active_students_boys: 4590,
    active_students_girls: 4377,
    ts_0to1_users: 1127,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 995,
    ts_2to15_avgTs: 11,
    ts_16to30_users: 1172,
    ts_16to30_avgTs: 26,
    ts_31to45_users: 3094,
    ts_31to45_avgTs: 37,
    ts_45plus_users: 3706,
    ts_45plus_avgTs: 75,
    lastUpdated: "31-07-2024",
  },
  {
    year: 2024,
    month: 7,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 8959,
    active_students_boys: 4298,
    active_students_girls: 4661,
    ts_0to1_users: 1135,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 943,
    ts_2to15_avgTs: 13,
    ts_16to30_users: 1179,
    ts_16to30_avgTs: 25,
    ts_31to45_users: 3146,
    ts_31to45_avgTs: 41,
    ts_45plus_users: 3691,
    ts_45plus_avgTs: 72,
    lastUpdated: "31-07-2024",
  },
  {
    year: 2024,
    month: 7,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 8955,
    active_students_boys: 4521,
    active_students_girls: 4434,
    ts_0to1_users: 1139,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1008,
    ts_2to15_avgTs: 10,
    ts_16to30_users: 1153,
    ts_16to30_avgTs: 28,
    ts_31to45_users: 3097,
    ts_31to45_avgTs: 35,
    ts_45plus_users: 3697,
    ts_45plus_avgTs: 70,
    lastUpdated: "31-07-2024",
  },
  {
    year: 2024,
    month: 7,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 8962,
    active_students_boys: 4487,
    active_students_girls: 4475,
    ts_0to1_users: 1132,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1022,
    ts_2to15_avgTs: 15,
    ts_16to30_users: 1176,
    ts_16to30_avgTs: 24,
    ts_31to45_users: 3081,
    ts_31to45_avgTs: 40,
    ts_45plus_users: 3683,
    ts_45plus_avgTs: 78,
    lastUpdated: "31-07-2024",
  },
  {
    year: 2024,
    month: 8,
    week: 1,
    new_schools: 0,
    new_students: 1831,
    new_girls: 933,
    new_boys: 898,
    new_activated_students: 1537,
    total_active_students: 10113,
    active_students_boys: 5096,
    active_students_girls: 4917,
    ts_0to1_users: 1518,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1677,
    ts_2to15_avgTs: 12,
    ts_16to30_users: 1704,
    ts_16to30_avgTs: 22,
    ts_31to45_users: 2557,
    ts_31to45_avgTs: 38,
    ts_45plus_users: 4175,
    ts_45plus_avgTs: 66,
    lastUpdated: "31-08-2024",
  },
  {
    year: 2024,
    month: 8,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 9999,
    active_students_boys: 5089,
    active_students_girls: 4910,
    ts_0to1_users: 1632,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1612,
    ts_2to15_avgTs: 9,
    ts_16to30_users: 1853,
    ts_16to30_avgTs: 18,
    ts_31to45_users: 2821,
    ts_31to45_avgTs: 34,
    ts_45plus_users: 3713,
    ts_45plus_avgTs: 73,
    lastUpdated: "31-08-2024",
  },
  {
    year: 2024,
    month: 8,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 10024,
    active_students_boys: 5105,
    active_students_girls: 4919,
    ts_0to1_users: 1607,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1739,
    ts_2to15_avgTs: 11,
    ts_16to30_users: 1874,
    ts_16to30_avgTs: 24,
    ts_31to45_users: 2738,
    ts_31to45_avgTs: 31,
    ts_45plus_users: 3673,
    ts_45plus_avgTs: 71,
    lastUpdated: "31-08-2024",
  },
  {
    year: 2024,
    month: 8,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 9977,
    active_students_boys: 5064,
    active_students_girls: 4913,
    ts_0to1_users: 1654,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1793,
    ts_2to15_avgTs: 10,
    ts_16to30_users: 1819,
    ts_16to30_avgTs: 26,
    ts_31to45_users: 2835,
    ts_31to45_avgTs: 42,
    ts_45plus_users: 3530,
    ts_45plus_avgTs: 76,
    lastUpdated: "31-08-2024",
  },
  {
    year: 2024,
    month: 9,
    week: 1,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 1537,
    total_active_students: 9847,
    active_students_boys: 4323,
    active_students_girls: 5524,
    ts_0to1_users: 1784,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 639,
    ts_2to15_avgTs: 10,
    ts_16to30_users: 1235,
    ts_16to30_avgTs: 28,
    ts_31to45_users: 1775,
    ts_31to45_avgTs: 40,
    ts_45plus_users: 6198,
    ts_45plus_avgTs: 74,
    lastUpdated: "30-09-2024",
  },
  {
    year: 2024,
    month: 9,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 9830,
    active_students_boys: 5881,
    active_students_girls: 3949,
    ts_0to1_users: 1801,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 611,
    ts_2to15_avgTs: 12,
    ts_16to30_users: 1172,
    ts_16to30_avgTs: 21,
    ts_31to45_users: 2085,
    ts_31to45_avgTs: 36,
    ts_45plus_users: 5962,
    ts_45plus_avgTs: 78,
    lastUpdated: "30-09-2024",
  },
  {
    year: 2024,
    month: 9,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 9825,
    active_students_boys: 5147,
    active_students_girls: 4678,
    ts_0to1_users: 1806,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 724,
    ts_2to15_avgTs: 8,
    ts_16to30_users: 1262,
    ts_16to30_avgTs: 18,
    ts_31to45_users: 1901,
    ts_31to45_avgTs: 43,
    ts_45plus_users: 5938,
    ts_45plus_avgTs: 72,
    lastUpdated: "30-09-2024",
  },
  {
    year: 2024,
    month: 9,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 9838,
    active_students_boys: 5509,
    active_students_girls: 4329,
    ts_0to1_users: 1793,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 697,
    ts_2to15_avgTs: 14,
    ts_16to30_users: 1184,
    ts_16to30_avgTs: 22,
    ts_31to45_users: 1806,
    ts_31to45_avgTs: 38,
    ts_45plus_users: 6151,
    ts_45plus_avgTs: 83,
    lastUpdated: "30-09-2024",
  },
  {
    year: 2024,
    month: 10,
    week: 1,
    new_schools: 21,
    new_students: 1912,
    new_girls: 918,
    new_boys: 994,
    new_activated_students: 1682,
    total_active_students: 11294,
    active_students_boys: 5709,
    active_students_girls: 5585,
    ts_0to1_users: 2019,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 976,
    ts_2to15_avgTs: 9,
    ts_16to30_users: 1030,
    ts_16to30_avgTs: 23,
    ts_31to45_users: 2042,
    ts_31to45_avgTs: 39,
    ts_45plus_users: 7246,
    ts_45plus_avgTs: 61,
    lastUpdated: "31-10-2024",
  },
  {
    year: 2024,
    month: 10,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 11542,
    active_students_boys: 5689,
    active_students_girls: 5853,
    ts_0to1_users: 1771,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 752,
    ts_2to15_avgTs: 13,
    ts_16to30_users: 2414,
    ts_16to30_avgTs: 25,
    ts_31to45_users: 1975,
    ts_31to45_avgTs: 41,
    ts_45plus_users: 6401,
    ts_45plus_avgTs: 84,
    lastUpdated: "31-10-2024",
  },
  {
    year: 2024,
    month: 10,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 11368,
    active_students_boys: 5498,
    active_students_girls: 5870,
    ts_0to1_users: 1945,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 691,
    ts_2to15_avgTs: 17,
    ts_16to30_users: 2197,
    ts_16to30_avgTs: 28,
    ts_31to45_users: 2251,
    ts_31to45_avgTs: 36,
    ts_45plus_users: 6229,
    ts_45plus_avgTs: 87,
    lastUpdated: "31-10-2024",
  },
  {
    year: 2024,
    month: 10,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 12097,
    active_students_boys: 5981,
    active_students_girls: 6116,
    ts_0to1_users: 1216,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 1053,
    ts_2to15_avgTs: 11,
    ts_16to30_users: 1759,
    ts_16to30_avgTs: 26,
    ts_31to45_users: 2168,
    ts_31to45_avgTs: 43,
    ts_45plus_users: 7117,
    ts_45plus_avgTs: 76,
    lastUpdated: "31-10-2024",
  },
  {
    year: 2024,
    month: 11,
    week: 1,
    new_schools: 197,
    new_students: 16012,
    new_girls: 7943,
    new_boys: 8069,
    new_activated_students: 11847,
    total_active_students: 20249,
    active_students_boys: 10089,
    active_students_girls: 10160,
    ts_0to1_users: 4911,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 3134,
    ts_2to15_avgTs: 8,
    ts_16to30_users: 3046,
    ts_16to30_avgTs: 27,
    ts_31to45_users: 4375,
    ts_31to45_avgTs: 42,
    ts_45plus_users: 1428,
    ts_45plus_avgTs: 38.3,
    lastUpdated: "31-11-2024",
  },
  {
    year: 2024,
    month: 11,
    week: 2,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 20482,
    active_students_boys: 9928,
    active_students_girls: 10554,
    ts_0to1_users: 4678,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 2297,
    ts_2to15_avgTs: 12,
    ts_16to30_users: 3253,
    ts_16to30_avgTs: 29,
    ts_31to45_users: 4111,
    ts_31to45_avgTs: 38,
    ts_45plus_users: 1108,
    ts_45plus_avgTs: 33.9,
    lastUpdated: "31-11-2024",
  },
  {
    year: 2024,
    month: 11,
    week: 3,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 20858,
    active_students_boys: 10978,
    active_students_girls: 9880,
    ts_0to1_users: 4302,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 3501,
    ts_2to15_avgTs: 10,
    ts_16to30_users: 2186,
    ts_16to30_avgTs: 24,
    ts_31to45_users: 4209,
    ts_31to45_avgTs: 44,
    ts_45plus_users: 1247,
    ts_45plus_avgTs: 42.6,
    lastUpdated: "31-11-2024",
  },
  {
    year: 2024,
    month: 11,
    week: 4,
    new_schools: 0,
    new_students: 0,
    new_girls: 0,
    new_boys: 0,
    new_activated_students: 0,
    total_active_students: 21151,
    active_students_boys: 10291,
    active_students_girls: 10860,
    ts_0to1_users: 4009,
    ts_0to1_avgTs: 0,
    ts_2to15_users: 3616,
    ts_2to15_avgTs: 13,
    ts_16to30_users: 2686,
    ts_16to30_avgTs: 26,
    ts_31to45_users: 4492,
    ts_31to45_avgTs: 41,
    ts_45plus_users: 1073,
    ts_45plus_avgTs: 42.9,
    lastUpdated: "31-11-2024",
  },
];
