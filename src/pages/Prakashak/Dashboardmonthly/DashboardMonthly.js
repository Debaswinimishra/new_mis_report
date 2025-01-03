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
  const years = Array.from({ length: 3 }, (_, index) => currentYear - index);

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
              <div style={{ marginTop: "-2%" }}>
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "2%",
                    color: "red",
                    fontFamily: "Congenial SemiBold",
                  }}
                >
                  <i>
                    <u>
                      {" "}
                      Data Updated as on -{" "}
                      {dashboardData[0]?.lastUpdated &&
                        new Date(
                          dashboardData[0]?.lastUpdated
                        ).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}{" "}
                    </u>
                  </i>
                </h2>
              </div>
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
                              <h1>{dashboardData?.new_schools}</h1>
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
                              <h1>{dashboardData?.new_students}</h1>
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
                              <h1>{dashboardData?.new_girls}</h1>
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
                              <h1>{dashboardData?.new_boys}</h1>
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
                              <h1>{dashboardData?.total_active_students}</h1>
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
                              <h1>{dashboardData?.active_students_boys}</h1>
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
                              <h1>{dashboardData?.active_students_girls}</h1>
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
                                      <h2>{dashboardData?.ts_0to1_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData?.ts_0to1_avgTs}</h1>
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
                                      <h2>{dashboardData?.ts_2to15_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData?.ts_2to15_avgTs}</h1>
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
                                      <h2>{dashboardData?.ts_16to30_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData?.ts_16to30_avgTs}</h1>
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
                                      <h2>{dashboardData?.ts_31to45_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData?.ts_31to45_avgTs}</h1>
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
                                      <h2>{dashboardData?.ts_45plus_users}</h2>
                                    </div>
                                    <div
                                      style={{
                                        width: "50%",
                                        fontSize: "0.7rem", // Reduced font size
                                      }}
                                    >
                                      <h1>{dashboardData?.ts_45plus_avgTs}</h1>
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
