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

  const fetchType = "static";
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

  const fetchData = (isFilter = false) => {
    setLoading(true);

    const body = {
      year: parseInt(selectedYear),
      month: parseInt(selectedMonth),
      ...(selectedWeek && { week: parseInt(selectedWeek) }),
    };

    console.log("body---------------->", body);

    PrakashakAPI.post(`getDashboardMonthly/${fetchType}`, body)
      .then((res) => {
        if (res.status === 200) {
          setDashboardData(res.data);
        } else {
          console.log("status code-----", res.status);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(`The Error is-----> ${err}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterButtonClick = () => {
    setDashboardData([]);
    fetchData(true);
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
                {dashboardData?.length > 0
                  ? dashboardData?.map((dashboardData) => {
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
                            {/* <div
                  style={{
                    position: "absolute",
                    top: "0px", // Adjust to position the text at the top
                    right: "0px", // Adjust to position the text at the right
                    color: "#6A5ACD", // Text color
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
                              <h1>{dashboardData?.total_new_schools}</h1>
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
                              <h1>{dashboardData?.total_new_students}</h1>
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
                              <h1>{dashboardData?.total_girl_students}</h1>
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
                              <h1>{dashboardData?.total_boy_students}</h1>
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
                              <h1>{dashboardData?.new_activated_students}</h1>
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
                              <h1>{dashboardData?.new_active_students}</h1>
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
                              <h1>{dashboardData?.active_students_boy}</h1>
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
                              <h1>{dashboardData?.active_students_girl}</h1>
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
                                      <h2>
                                        {
                                          dashboardData?.no_of_parents_spent_0to1mins
                                        }
                                      </h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData?.avg_tS_0to1mins}</h1>
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
                                      <h2>
                                        {
                                          dashboardData?.no_of_parents_spent_2to5mins
                                        }
                                      </h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData?.avg_tS_2to5mins}</h1>
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
                                      <h2>
                                        {
                                          dashboardData?.no_of_parents_spent_16to30mins
                                        }
                                      </h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>
                                        {dashboardData?.avg_tS_16to30mins}
                                      </h1>
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
                                      <h2>
                                        {
                                          dashboardData?.no_of_parents_spent_31to45mins
                                        }
                                      </h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>
                                        {dashboardData?.avg_tS_31to45mins}
                                      </h1>
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
                                      <h2>
                                        {
                                          dashboardData?.no_of_parents_spent_gte45mins
                                        }
                                      </h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData?.avg_tS_gte45mins}</h1>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
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
    month: 1,
    week: 3,
    active_students_girl: 0,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 0,
    active_students_boy: 0,
    no_of_parents_spent_0to1mins: 0,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 0,
    avg_tS_2to5mins: 0,
    no_of_parents_spent_16to30mins: 0,
    avg_tS_16to30mins: 0,
    no_of_parents_spent_31to45mins: 0,
    avg_tS_31to45mins: 0,
    no_of_parents_spent_gte45mins: 0,
    avg_tS_gte45mins: 0,
  },
  {
    month: 1,
    week: 4,
    active_students_girl: 309,
    total_new_schools: 49,
    total_new_students: 1143,
    total_girl_students: 511,
    total_boy_students: 632,
    new_activated_students: 665,
    new_active_students: 665,
    active_students_boy: 356,
    no_of_parents_spent_0to1mins: 0,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 206,
    avg_tS_2to5mins: 13.5,
    no_of_parents_spent_16to30mins: 459,
    avg_tS_16to30mins: 26.5,
    no_of_parents_spent_31to45mins: 0,
    avg_tS_31to45mins: 0,
    no_of_parents_spent_gte45mins: 0,
    avg_tS_gte45mins: 0,
  },
  {
    month: 2,
    week: 1,
    active_students_girl: 922,
    total_new_schools: 62,
    total_new_students: 3072,
    total_girl_students: 1574,
    total_boy_students: 1498,
    new_activated_students: 2148,
    new_active_students: 2511,
    active_students_boy: 1589,
    no_of_parents_spent_0to1mins: 302,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 719,
    avg_tS_2to5mins: 11,
    no_of_parents_spent_16to30mins: 567,
    avg_tS_16to30mins: 24.5,
    no_of_parents_spent_31to45mins: 685,
    avg_tS_31to45mins: 40,
    no_of_parents_spent_gte45mins: 540,
    avg_tS_gte45mins: 61,
  },
  {
    month: 2,
    week: 2,
    active_students_girl: 1428,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 2515,
    active_students_boy: 1087,
    no_of_parents_spent_0to1mins: 298,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 738,
    avg_tS_2to5mins: 10.5,
    no_of_parents_spent_16to30mins: 562,
    avg_tS_16to30mins: 26.5,
    no_of_parents_spent_31to45mins: 704,
    avg_tS_31to45mins: 43,
    no_of_parents_spent_gte45mins: 511,
    avg_tS_gte45mins: 64,
  },
  {
    month: 2,
    week: 3,
    active_students_girl: 1132,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 2522,
    active_students_boy: 1390,
    no_of_parents_spent_0to1mins: 291,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 727,
    avg_tS_2to5mins: 10,
    no_of_parents_spent_16to30mins: 572,
    avg_tS_16to30mins: 25,
    no_of_parents_spent_31to45mins: 713,
    avg_tS_31to45mins: 39.5,
    no_of_parents_spent_gte45mins: 510,
    avg_tS_gte45mins: 58,
  },
  {
    month: 2,
    week: 4,
    active_students_girl: 921,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 2609,
    active_students_boy: 1688,
    no_of_parents_spent_0to1mins: 204,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 713,
    avg_tS_2to5mins: 13,
    no_of_parents_spent_16to30mins: 601,
    avg_tS_16to30mins: 28,
    no_of_parents_spent_31to45mins: 762,
    avg_tS_31to45mins: 37,
    no_of_parents_spent_gte45mins: 533,
    avg_tS_gte45mins: 63.5,
  },
  {
    month: 3,
    week: 1,
    active_students_girl: 1628,
    total_new_schools: 21,
    total_new_students: 1216,
    total_girl_students: 586,
    total_boy_students: 630,
    new_activated_students: 2192,
    new_active_students: 4518,
    active_students_boy: 2890,
    no_of_parents_spent_0to1mins: 487,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 778,
    avg_tS_2to5mins: 14,
    no_of_parents_spent_16to30mins: 663,
    avg_tS_16to30mins: 27,
    no_of_parents_spent_31to45mins: 1784,
    avg_tS_31to45mins: 43,
    no_of_parents_spent_gte45mins: 1293,
    avg_tS_gte45mins: 64.5,
  },
  {
    month: 3,
    week: 2,
    active_students_girl: 1182,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 4502,
    active_students_boy: 3320,
    no_of_parents_spent_0to1mins: 503,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 812,
    avg_tS_2to5mins: 13.5,
    no_of_parents_spent_16to30mins: 608,
    avg_tS_16to30mins: 25,
    no_of_parents_spent_31to45mins: 1791,
    avg_tS_31to45mins: 41,
    no_of_parents_spent_gte45mins: 1291,
    avg_tS_gte45mins: 62,
  },
  {
    month: 3,
    week: 3,
    active_students_girl: 2453,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 4512,
    active_students_boy: 2059,
    no_of_parents_spent_0to1mins: 493,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 737,
    avg_tS_2to5mins: 13,
    no_of_parents_spent_16to30mins: 709,
    avg_tS_16to30mins: 26.5,
    no_of_parents_spent_31to45mins: 1782,
    avg_tS_31to45mins: 42.5,
    no_of_parents_spent_gte45mins: 1284,
    avg_tS_gte45mins: 67,
  },
  {
    month: 3,
    week: 4,
    active_students_girl: 2779,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 4524,
    active_students_boy: 1745,
    no_of_parents_spent_0to1mins: 481,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 709,
    avg_tS_2to5mins: 11,
    no_of_parents_spent_16to30mins: 779,
    avg_tS_16to30mins: 27.5,
    no_of_parents_spent_31to45mins: 1798,
    avg_tS_31to45mins: 40.5,
    no_of_parents_spent_gte45mins: 1238,
    avg_tS_gte45mins: 68.5,
  },
  {
    month: 4,
    week: 1,
    active_students_girl: 2106,
    total_new_schools: 71,
    total_new_students: 1548,
    total_girl_students: 797,
    total_boy_students: 751,
    new_activated_students: 649,
    new_active_students: 5107,
    active_students_boy: 3001,
    no_of_parents_spent_0to1mins: 547,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 741,
    avg_tS_2to5mins: 14,
    no_of_parents_spent_16to30mins: 813,
    avg_tS_16to30mins: 27.5,
    no_of_parents_spent_31to45mins: 2181,
    avg_tS_31to45mins: 43,
    no_of_parents_spent_gte45mins: 1372,
    avg_tS_gte45mins: 69,
  },
  {
    month: 4,
    week: 2,
    active_students_girl: 2330,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 5109,
    active_students_boy: 2779,
    no_of_parents_spent_0to1mins: 545,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 736,
    avg_tS_2to5mins: 13,
    no_of_parents_spent_16to30mins: 829,
    avg_tS_16to30mins: 28,
    no_of_parents_spent_31to45mins: 2146,
    avg_tS_31to45mins: 42.5,
    no_of_parents_spent_gte45mins: 1398,
    avg_tS_gte45mins: 72,
  },
  {
    month: 4,
    week: 3,
    active_students_girl: 1925,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 5135,
    active_students_boy: 3210,
    no_of_parents_spent_0to1mins: 519,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 744,
    avg_tS_2to5mins: 11.5,
    no_of_parents_spent_16to30mins: 816,
    avg_tS_16to30mins: 27,
    no_of_parents_spent_31to45mins: 2161,
    avg_tS_31to45mins: 44,
    no_of_parents_spent_gte45mins: 1414,
    avg_tS_gte45mins: 67.5,
  },
  {
    month: 4,
    week: 4,
    active_students_girl: 2181,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 5147,
    active_students_boy: 2966,
    no_of_parents_spent_0to1mins: 507,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 720,
    avg_tS_2to5mins: 13,
    no_of_parents_spent_16to30mins: 826,
    avg_tS_16to30mins: 26,
    no_of_parents_spent_31to45mins: 2199,
    avg_tS_31to45mins: 43.5,
    no_of_parents_spent_gte45mins: 1402,
    avg_tS_gte45mins: 68,
  },
  {
    month: 5,
    week: 1,
    active_students_girl: 3717,
    total_new_schools: 93,
    total_new_students: 2871,
    total_girl_students: 1464,
    total_boy_students: 1407,
    new_activated_students: 3094,
    new_active_students: 8027,
    active_students_boy: 4310,
    no_of_parents_spent_0to1mins: 721,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1197,
    avg_tS_2to5mins: 14.5,
    no_of_parents_spent_16to30mins: 1125,
    avg_tS_16to30mins: 28,
    no_of_parents_spent_31to45mins: 2579,
    avg_tS_31to45mins: 42,
    no_of_parents_spent_gte45mins: 3126,
    avg_tS_gte45mins: 71,
  },
  {
    month: 5,
    week: 2,
    active_students_girl: 3670,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 8014,
    active_students_boy: 4344,
    no_of_parents_spent_0to1mins: 734,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1180,
    avg_tS_2to5mins: 14,
    no_of_parents_spent_16to30mins: 1186,
    avg_tS_16to30mins: 24,
    no_of_parents_spent_31to45mins: 2617,
    avg_tS_31to45mins: 44,
    no_of_parents_spent_gte45mins: 3031,
    avg_tS_gte45mins: 70.5,
  },
  {
    month: 5,
    week: 3,
    active_students_girl: 3390,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 8029,
    active_students_boy: 4639,
    no_of_parents_spent_0to1mins: 719,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1203,
    avg_tS_2to5mins: 13,
    no_of_parents_spent_16to30mins: 1198,
    avg_tS_16to30mins: 27,
    no_of_parents_spent_31to45mins: 2581,
    avg_tS_31to45mins: 42.5,
    no_of_parents_spent_gte45mins: 3047,
    avg_tS_gte45mins: 67,
  },
  {
    month: 5,
    week: 4,
    active_students_girl: 4040,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 8024,
    active_students_boy: 3984,
    no_of_parents_spent_0to1mins: 724,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1194,
    avg_tS_2to5mins: 14,
    no_of_parents_spent_16to30mins: 1185,
    avg_tS_16to30mins: 28.5,
    no_of_parents_spent_31to45mins: 2579,
    avg_tS_31to45mins: 43,
    no_of_parents_spent_gte45mins: 3066,
    avg_tS_gte45mins: 72,
  },
  {
    month: 6,
    week: 1,
    active_students_girl: 3997,
    total_new_schools: 62,
    total_new_students: 1174,
    total_girl_students: 588,
    total_boy_students: 586,
    new_activated_students: 1346,
    new_active_students: 8996,
    active_students_boy: 4999,
    no_of_parents_spent_0to1mins: 1098,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1095,
    avg_tS_2to5mins: 13,
    no_of_parents_spent_16to30mins: 1017,
    avg_tS_16to30mins: 23,
    no_of_parents_spent_31to45mins: 3171,
    avg_tS_31to45mins: 39,
    no_of_parents_spent_gte45mins: 3713,
    avg_tS_gte45mins: 73,
  },
  {
    month: 6,
    week: 2,
    active_students_girl: 4435,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 9003,
    active_students_boy: 4568,
    no_of_parents_spent_0to1mins: 1091,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1121,
    avg_tS_2to5mins: 14,
    no_of_parents_spent_16to30mins: 1039,
    avg_tS_16to30mins: 27,
    no_of_parents_spent_31to45mins: 3119,
    avg_tS_31to45mins: 36,
    no_of_parents_spent_gte45mins: 3724,
    avg_tS_gte45mins: 77,
  },
  {
    month: 6,
    week: 3,
    active_students_girl: 4546,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 8991,
    active_students_boy: 4445,
    no_of_parents_spent_0to1mins: 1103,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1114,
    avg_tS_2to5mins: 12,
    no_of_parents_spent_16to30mins: 1046,
    avg_tS_16to30mins: 25,
    no_of_parents_spent_31to45mins: 3138,
    avg_tS_31to45mins: 41,
    no_of_parents_spent_gte45mins: 3693,
    avg_tS_gte45mins: 75,
  },
  {
    month: 6,
    week: 4,
    active_students_girl: 4108,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 8998,
    active_students_boy: 4890,
    no_of_parents_spent_0to1mins: 1096,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1117,
    avg_tS_2to5mins: 11,
    no_of_parents_spent_16to30mins: 1053,
    avg_tS_16to30mins: 26,
    no_of_parents_spent_31to45mins: 3125,
    avg_tS_31to45mins: 38,
    no_of_parents_spent_gte45mins: 3703,
    avg_tS_gte45mins: 72,
  },
  {
    month: 7,
    week: 1,
    active_students_girl: 4377,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 8967,
    active_students_boy: 4590,
    no_of_parents_spent_0to1mins: 1127,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 995,
    avg_tS_2to5mins: 11,
    no_of_parents_spent_16to30mins: 1172,
    avg_tS_16to30mins: 26,
    no_of_parents_spent_31to45mins: 3094,
    avg_tS_31to45mins: 37,
    no_of_parents_spent_gte45mins: 3706,
    avg_tS_gte45mins: 75,
  },
  {
    month: 7,
    week: 2,
    active_students_girl: 4661,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 8959,
    active_students_boy: 4298,
    no_of_parents_spent_0to1mins: 1135,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 943,
    avg_tS_2to5mins: 13,
    no_of_parents_spent_16to30mins: 1179,
    avg_tS_16to30mins: 25,
    no_of_parents_spent_31to45mins: 3146,
    avg_tS_31to45mins: 41,
    no_of_parents_spent_gte45mins: 3691,
    avg_tS_gte45mins: 72,
  },
  {
    month: 7,
    week: 3,
    active_students_girl: 4434,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 8955,
    active_students_boy: 4521,
    no_of_parents_spent_0to1mins: 1139,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1008,
    avg_tS_2to5mins: 10,
    no_of_parents_spent_16to30mins: 1153,
    avg_tS_16to30mins: 28,
    no_of_parents_spent_31to45mins: 3097,
    avg_tS_31to45mins: 35,
    no_of_parents_spent_gte45mins: 3697,
    avg_tS_gte45mins: 70,
  },
  {
    month: 7,
    week: 4,
    active_students_girl: 4475,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 8962,
    active_students_boy: 4487,
    no_of_parents_spent_0to1mins: 1132,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1022,
    avg_tS_2to5mins: 15,
    no_of_parents_spent_16to30mins: 1176,
    avg_tS_16to30mins: 24,
    no_of_parents_spent_31to45mins: 3081,
    avg_tS_31to45mins: 40,
    no_of_parents_spent_gte45mins: 3683,
    avg_tS_gte45mins: 78,
  },
  {
    month: 8,
    week: 1,
    active_students_girl: 4917,
    total_new_schools: 0,
    total_new_students: 1831,
    total_girl_students: 898,
    total_boy_students: 933,
    new_activated_students: 1537,
    new_active_students: 10113,
    active_students_boy: 5096,
    no_of_parents_spent_0to1mins: 1518,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1677,
    avg_tS_2to5mins: 12,
    no_of_parents_spent_16to30mins: 1704,
    avg_tS_16to30mins: 22,
    no_of_parents_spent_31to45mins: 2557,
    avg_tS_31to45mins: 38,
    no_of_parents_spent_gte45mins: 4175,
    avg_tS_gte45mins: 66,
  },
  {
    month: 8,
    week: 2,
    active_students_girl: 4910,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 9999,
    active_students_boy: 5089,
    no_of_parents_spent_0to1mins: 1632,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1612,
    avg_tS_2to5mins: 9,
    no_of_parents_spent_16to30mins: 1853,
    avg_tS_16to30mins: 18,
    no_of_parents_spent_31to45mins: 2821,
    avg_tS_31to45mins: 34,
    no_of_parents_spent_gte45mins: 3713,
    avg_tS_gte45mins: 73,
  },
  {
    month: 8,
    week: 3,
    active_students_girl: 4919,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 10024,
    active_students_boy: 5105,
    no_of_parents_spent_0to1mins: 1607,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1739,
    avg_tS_2to5mins: 11,
    no_of_parents_spent_16to30mins: 1874,
    avg_tS_16to30mins: 24,
    no_of_parents_spent_31to45mins: 2738,
    avg_tS_31to45mins: 31,
    no_of_parents_spent_gte45mins: 3673,
    avg_tS_gte45mins: 71,
  },
  {
    month: 8,
    week: 4,
    active_students_girl: 4913,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 9977,
    active_students_boy: 5064,
    no_of_parents_spent_0to1mins: 1654,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 1793,
    avg_tS_2to5mins: 10,
    no_of_parents_spent_16to30mins: 1819,
    avg_tS_16to30mins: 26,
    no_of_parents_spent_31to45mins: 2835,
    avg_tS_31to45mins: 42,
    no_of_parents_spent_gte45mins: 3530,
    avg_tS_gte45mins: 76,
  },
  {
    month: 9,
    week: 1,
    active_students_girl: 5524,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 9847,
    active_students_boy: 4323,
    no_of_parents_spent_0to1mins: 1784,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 639,
    avg_tS_2to5mins: 10,
    no_of_parents_spent_16to30mins: 1235,
    avg_tS_16to30mins: 28,
    no_of_parents_spent_31to45mins: 1775,
    avg_tS_31to45mins: 40,
    no_of_parents_spent_gte45mins: 6198,
    avg_tS_gte45mins: 74,
  },
  {
    month: 9,
    week: 2,
    active_students_girl: 3949,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 9830,
    active_students_boy: 5881,
    no_of_parents_spent_0to1mins: 1801,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 611,
    avg_tS_2to5mins: 12,
    no_of_parents_spent_16to30mins: 1172,
    avg_tS_16to30mins: 21,
    no_of_parents_spent_31to45mins: 2085,
    avg_tS_31to45mins: 36,
    no_of_parents_spent_gte45mins: 5962,
    avg_tS_gte45mins: 78,
  },
  {
    month: 9,
    week: 3,
    active_students_girl: 4678,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 9825,
    active_students_boy: 5147,
    no_of_parents_spent_0to1mins: 1806,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 724,
    avg_tS_2to5mins: 8,
    no_of_parents_spent_16to30mins: 1262,
    avg_tS_16to30mins: 18,
    no_of_parents_spent_31to45mins: 1901,
    avg_tS_31to45mins: 43,
    no_of_parents_spent_gte45mins: 5938,
    avg_tS_gte45mins: 72,
  },
  {
    month: 9,
    week: 4,
    active_students_girl: 4329,
    total_new_schools: 0,
    total_new_students: 0,
    total_girl_students: 0,
    total_boy_students: 0,
    new_activated_students: 0,
    new_active_students: 9838,
    active_students_boy: 5509,
    no_of_parents_spent_0to1mins: 1793,
    avg_tS_0to1mins: 0,
    no_of_parents_spent_2to5mins: 697,
    avg_tS_2to5mins: 14,
    no_of_parents_spent_16to30mins: 1184,
    avg_tS_16to30mins: 22,
    no_of_parents_spent_31to45mins: 1806,
    avg_tS_31to45mins: 38,
    no_of_parents_spent_gte45mins: 6151,
    avg_tS_gte45mins: 83,
  },
];
