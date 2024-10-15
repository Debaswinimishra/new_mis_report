import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import Chart from "chart.js/auto";
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

const Dashboard = () => {
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

  //&-------------Filter states---------------
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState();
  const [tableData, setTableData] = useState([]);
  const [modalLoader, setModalLoader] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [smartphone, setSmartphone] = useState("total");

  const handleUserChange = (e) => {
    setSmartphone(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    if (
      e.target.value > currentMonthSelected.value &&
      selectedYear === currentYear
    ) {
      alert("You can't select a month greater than the current month !");
    } else {
      setSelectedWeek("");
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

  const filterButtonClick = () => {
    setDashboardData([]);
    setLoading(true);
    if (!selectedMonth && !selectedWeek) {
      const body = {
        year: parseInt(selectedYear),
      };
      console.log("body---------------->", body);
      PrakashakAPI.post(`getDashboardReport`, body)
        .then((res) => {
          if (res.status === 200) {
            setDashboardData(res.data);
            setLoading(false);
          } else {
            setLoading(false);
            console.log("status code-----", res.status);
          }
        })
        .catch((err) => {
          console.log(`The Error is-----> ${err}`);
          setLoading(false);
        });
    } else if (selectedMonth && !selectedWeek) {
      const body = {
        year: parseInt(selectedYear),
        month: parseInt(selectedMonth),
      };
      console.log("body---------------->", body);
      PrakashakAPI.post(`getDashboardReport`, body)
        .then((res) => {
          if (res.status === 200) {
            setDashboardData(res.data);
            setLoading(false);
          } else {
            setLoading(false);
            console.log("status code-----", res.status);
          }
        })
        .catch((err) => {
          console.log(`The Error is-----> ${err}`);
          setLoading(false);
        });
    } else {
      const body = {
        year: parseInt(selectedYear),
        month: parseInt(selectedMonth),
        week: selectedWeek,
      };
      console.log("body---------------->", body);
      PrakashakAPI.post(`getDashboardReport`, body)
        .then((res) => {
          if (res.status === 200) {
            setDashboardData(res.data);
            setLoading(false);
          } else {
            setLoading(false);
            console.log("status code-----", res.status);
          }
        })
        .catch((err) => {
          console.log(`The Error is-----> ${err}`);
          setLoading(false);
        });
    }
  };
  const [districsArray, setDistrictArr] = useState([]);
  const [blocksArr, setBlocksArr] = useState([]);

  const [clusterArr, setClusterArr] = useState([]);
  // console.log("clusterArr--->", clusterArr);

  const [schoolArr, setSchoolArr] = useState([]);

  const [studentsArr, setStudentsArr] = useState([]);
  // console.log("studentsArr---->", studentsArr);

  const [smsArr, setSmsArr] = useState([]);
  console.log("studentsArr---->", smsArr);

  const [callsArr, setCallsArr] = useState([]);
  console.log("callsArr---->", callsArr);

  const [receivedCallsArr, setReceivedCallsArr] = useState([]);
  console.log("receivedCallsArr---->", receivedCallsArr);

  const [callsReceivedIvrArr, setCallsReceivedIvrArr] = useState([]);
  console.log("callsReceivedIvrArr---->", callsReceivedIvrArr);

  const [uniqueCallsIvrArr, setUniqueCallsIvrArr] = useState([]);
  console.log("uniqueCallsArr---->", uniqueCallsIvrArr);

  const [activeUserChatbotArr, setActiveUserChatbotArr] = useState([]);
  console.log("activeUserChatbotArr---->", activeUserChatbotArr);

  const [video, setVideo] = useState([]);
  console.log("video---->", video);

  const fetchData = () => {
    setLoading(true);
    if (!selectedMonth && !selectedWeek) {
      const body = { year: parseInt(selectedYear) };
      console.log("body---------------->", body);

      PrakashakAPI.post("getDashboardReport", body)
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
    } else if (selectedMonth && !selectedWeek) {
      const body = {
        year: parseInt(selectedYear),
        month: parseInt(selectedMonth),
      };
      console.log("body---------------->", body);

      PrakashakAPI.post("getAllDistricts", body)
        .then((res) => {
          if (res.status === 200) {
            setDistrictArr(res.data);
            // setDashboardData(res.data); // Uncomment if needed
          } else {
            console.log("status code-----", res.status);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(`The Error is-----> ${err}`);
          setLoading(false);
        });
    } else {
      const body = {
        year: parseInt(selectedYear),
        month: parseInt(selectedMonth),
        week: parseInt(selectedWeek),
      };
      console.log("body---------------->", body);

      PrakashakAPI.post("getDashboardReport", body)
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        return "Total Number of girls";
      case "boys":
        return "Total Number of Boys";

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
            district: school.district,
            block: school.block,
            cluster: school.cluster,
            school_name: school.school_name,
            udise_code: school.udise_code,
          }));
          setModalLoader(false);
          setTableHeaders([
            "District",
            "Block",
            "Cluster Name",
            "School Name",
            "UDISE Code",
          ]);
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

  const BarGraph = ({ blocks, mySmartphone }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (chartRef && chartRef.current) {
        const chartContext = chartRef.current.getContext("2d");

        // Destroy existing chart if it exists
        if (window.myBarChart instanceof Chart) {
          window.myBarChart.destroy();
        }

        // Conditional data based on smartphone status
        const smartphoneBoysData = [400, 900, 400, 600, 1000, 400, 0, 600, 0];
        const smartphoneGirlsData = [347, 830, 463, 498, 952, 492, 0, 579, 0];

        const nonSmartphoneBoysData = [250, 700, 200, 300, 500, 200, 0, 300, 0];
        const nonSmartphoneGirlsData = [146, 642, 153, 150, 419, 82, 0, 352, 0];

        // Data for total condition (without separating boys and girls)
        // const totalData = [1143, 3072, 1216, 1548, 2871, 1174, 0, 1831, 0];
        const totalBoysData = [650, 1600, 600, 900, 1500, 600, 0, 900, 0];
        const totalGirlsData = [493, 1472, 616, 648, 1371, 574, 0, 931, 0];

        // Create new stacked bar chart instance
        const chartInstance = new Chart(chartContext, {
          type: "bar",
          data: {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets:
              smartphone === "total"
                ? [
                    {
                      label: "Boys",
                      data: totalBoysData,
                      backgroundColor: "rgba(54, 162, 235, 0.6)", // Adjust color for total
                      borderColor: "rgba(54, 162, 235, 1)", // Adjust color for total
                      borderWidth: 2,
                      barThickness: 80,
                    },
                    {
                      label: "Girls",
                      data: totalGirlsData,
                      backgroundColor: "rgba(255, 99, 132, 0.6)", // Adjust color for girls
                      borderColor: "rgba(255, 99, 132, 1)", // Adjust color for girls
                      borderWidth: 2,
                      barThickness: 80,
                    },
                  ]
                : [
                    {
                      label: "Boys",
                      data:
                        smartphone === "smartphone"
                          ? smartphoneBoysData
                          : nonSmartphoneBoysData,
                      backgroundColor: "rgba(75, 192, 192, 0.6)", // Adjust color for boys
                      borderColor: "rgba(75, 192, 192, 1)", // Adjust color for boys
                      borderWidth: 2,
                      barThickness: 80,
                    },
                    {
                      label: "Girls",
                      data:
                        smartphone === "smartphone"
                          ? smartphoneGirlsData
                          : nonSmartphoneGirlsData,
                      backgroundColor: "rgba(255, 99, 132, 0.6)", // Adjust color for girls
                      borderColor: "rgba(255, 99, 132, 1)", // Adjust color for girls
                      borderWidth: 2,
                      barThickness: 80,
                    },
                  ],
          },
          options: {
            layout: {
              padding: {
                top: 20,
                bottom: 40,
                left: 20,
                right: 5,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                stacked: true, // Enable stacking for the y-axis
              },
              x: {
                stacked: true, // Enable stacking for the x-axis
              },
            },
          },
        });

        // Store chart instance in window object for Bar Graph
        window.myBarChart = chartInstance;
      }
    }, [blocks, mySmartphone]); // Add mySmartphone to the dependency array

    return <canvas ref={chartRef} />;
  };

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box>
            <CircularProgress />
          </Box>
        </div>
      ) : Object.keys(dashboardData).length > 0 && !loading ? (
        <div
          style={{
            marginTop: "2%",
            paddingBottom: "4%",
            marginLeft: "4%",
            alignContent: "flex-start",
            // height: "95vh",
          }}
        >
          <div
            style={{
              boxShadow: "2px 1px 5px grey",
              padding: "3%",
              width: "97%",
              height: "99%",
            }}
          >
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
                {" "}
                <u> Data Updated as on - 31/08/2024</u>
              </i>
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "center",
                justifyContent: "center",
                width: "97%",
                gap: "2%",
                // marginLeft: "4%",
              }}
            >
              {/* <div
                onClick={() => handleOpen("district")}
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
                </div>

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
                  <p>Number of districts</p>
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
                  <h1>{dashboardData.total_districts}</h1>
                </div>
              </div> */}

              {/* <div
                onClick={() => handleOpen("block")}
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
                </div>
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
                  <p>Number of blocks</p>
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
                  <h1>{dashboardData.total_blocks}</h1>
                </div>
              </div> */}
              <div
                onClick={() => handleOpen("clusters")}
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
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Clusters</p>
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
                  {/* <h1>{dashboardData.total_clusters}</h1> */}
                  <h1>36</h1>
                </div>
              </div>
              <div
                onClick={() => handleOpen("schools")}
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
                {/* <div
                  style={{
                    position: "absolute",
                    top: "0px", // Adjust to position the text at the top
                    right: "0px", // Adjust to position the text at the right
                    color: "#2E8B57", // Text color
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
                    color: "#2E8B57",
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Schools</p>
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
                  {/* <h1>{dashboardData.total_schools}</h1> */}
                  <h1>358</h1>
                </div>
              </div>
              <div
                onClick={() => handleOpen("students")}
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
                {/* <div
                  style={{
                    position: "absolute",
                    top: "0px", // Adjust to position the text at the top
                    right: "0px", // Adjust to position the text at the right
                    color: "	#00CED1", // Text color
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
                    color: "	#00CED1",
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Registered Students</p>
                </div>
                <div
                  style={{
                    height: "50%",
                    backgroundColor: "	#00CED1",
                    borderEndStartRadius: "10px",
                    borderEndEndRadius: "10px",
                    color: "white",
                  }}
                >
                  {/* <h1>{dashboardData.total_students}</h1> */}
                  <h1>12855</h1>
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
                {/* <div
                  style={{
                    position: "absolute",
                    top: "0px", // Adjust to position the text at the top
                    right: "0px", // Adjust to position the text at the right
                    color: "rgb(153 58 134)", // Text color
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
                    color: "rgb(153 58 134)",
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Registered Girls</p>
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
                  {/* <h1>{dashboardData.total_girl_students}</h1> */}
                  <h1>6418</h1>
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
                {/* <div
                  style={{
                    position: "absolute",
                    top: "0px", // Adjust to position the text at the top
                    right: "0px", // Adjust to position the text at the right
                    color: "rgb(214 148 16)", // Text color
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
                    color: "rgb(214 148 16)",
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Registered Boys</p>
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
                  {/* <h1>{dashboardData.total_boy_students}</h1> */}
                  <h1>6437</h1>
                </div>
              </div>
              <div
                // onClick={() => handleOpen("clusters")}
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
                  <p>Activated Students</p>
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
                  {/* <h1>{dashboardData.total_activated_students}</h1> */}
                  <h1>11631</h1>
                </div>
              </div>
              <div
                // onClick={() => handleOpen("clusters")}
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
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Total Active Students</p>
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
                  {/* <h1>{dashboardData.total_active_students}</h1> */}
                  <h1>9977</h1>
                </div>
              </div>

              {/* <div
                // onClick={() => handleOpen("smartphoneUsers")}
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
                  <p> Smartphone users</p>
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
                  <h1>{dashboardData.total_chatbot_users}</h1>
                </div>
              </div> */}
            </div>
          </div>

          {/* <div>
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
              <FormControl
                sx={{ m: 1 }}
                size="small"
                style={{ width: "120px" }}
              >
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
              <FormControl
                sx={{ m: 1 }}
                size="small"
                style={{ width: "120px" }}
              >
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
              <FormControl
                sx={{ m: 1 }}
                size="small"
                style={{ width: "120px" }}
              >
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
                  marginLeft: "9px",
                }}
                onClick={filterButtonClick}
              >
                Filter
              </Button>
            </div>

            <div
              style={{
                marginTop: "2%",
                boxShadow: "2px 1px 5px grey",
                padding: "5%",
                width: "97%",
              }}
            >
              <h1 style={{ marginTop: "-2%" }}>Number of new details</h1>
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
                      color: "#6A5ACD",
                      paddingTop: "20px",
                      fontSize: "1.2rem",
                      fontFamily: "Congenial SemiBold",
                      fontWeight: "600",
                    }}
                  >
                    Total number of new schools
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
                    <h1>{dashboardData.total_new_schools}</h1>
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
                    <p> Number of new students</p>
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
                    <h1>{dashboardData.total_new_students}</h1>
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
                      position: "absolute",
                      top: "0px", // Adjust to position the text at the top
                      right: "0px", // Adjust to position the text at the right
                      color: "rgb(153 58 134)", // Text color
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
                  </div>
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
                    <p>Number of new girls</p>
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
                    <h1>{dashboardData.total_girl_students}</h1>
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
                      position: "absolute",
                      top: "0px", // Adjust to position the text at the top
                      right: "0px", // Adjust to position the text at the right
                      color: "rgb(214 148 16)", // Text color
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
                  </div>
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
                    <p>Number of new boys</p>
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
                    <h1>{dashboardData.total_boy_students}</h1>
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
                      position: "absolute",
                      top: "0px", // Adjust to position the text at the top
                      right: "0px", // Adjust to position the text at the right
                      color: "#708090", // Text color
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
                  </div>
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
                    <p>Number of new activated student</p>
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
                    <h1>{dashboardData.total_boy_students}</h1>
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
                  </div>
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
                    <p>Number of new active student</p>
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
                    <h1>{dashboardData.total_boy_students}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div
            style={{
              marginTop: "2%",
              boxShadow: "2px 1px 5px grey",
              padding: "5%",
              width: "97%",
            }}
          >
            <h1 style={{ marginTop: "-2%" }}>Time-Spent details</h1>
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
                  No. of parents spending 0-1 mins
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
                  <h1>{dashboardData.no_of_parents_spent_0to1mins}</h1>
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
                    color: "#CD5C5C",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  No. of parents spending 2-15 mins
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
                  <h1>{dashboardData.no_of_parents_spent_2to5mins}</h1>
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
                  No. of parents spending 16-30 mins
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
                  <h1>{dashboardData.no_of_parents_spent_16to30mins}</h1>
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
                  No. of parents spending 31-45 mins
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
                  <h1>{dashboardData.no_of_parents_spent_31to45mins}</h1>
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
                  No. of parents spending 45+ mins
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
                  <h1>{dashboardData.no_of_parents_spent_gte45mins}</h1>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div
            style={{
              marginTop: "2%",
              boxShadow: "2px 1px 5px grey",
              padding: "5%",
              width: "97%",
            }}
          >
            <h1 style={{ marginTop: "-2%" }}>Remote instructions in brief</h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "center",
                justifyContent: "center",
                width: "97%",
                gap: "2%",
                // marginTop: "-1.5%",
              }}
            >
              <div
                onClick={() => handleOpen("calls")}
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
                </div>
                <div
                  style={{
                    height: "50%",
                    color: "rgb(102 52 91)",
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p>Number of calls received</p>
                </div>
                <div
                  style={{
                    height: "50%",
                    backgroundColor: "rgb(102 52 91)",
                    borderEndStartRadius: "10px",
                    borderEndEndRadius: "10px",
                    color: "white",
                  }}
                >
                  <h1>{dashboardData.total_calls_received}</h1>
                </div>
              </div>

              <div
                // onClick={() => handleOpen("receivedAutocalls")}
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
                  Avg. minutes of calls received
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
                  <h1>{dashboardData.calls_avg_mins}</h1>
                </div>
              </div>

              <div
                onClick={() => handleOpen("sms")}
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
                </div>
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
                  Numbers of SMS delivered
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
                  <h1>{dashboardData.total_sms_received}</h1>
                </div>
              </div>

              <div
                // onClick={() => handleOpen("")}
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
                  Avg. minutes spent on IVRs
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
                  <h1>{dashboardData.ivrs_avg_mins}</h1>
                </div>
              </div>

              <div
                onClick={() => handleOpen("receivedIvrs")}
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
                </div>
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
                  <p>Calls received in IVRs</p>
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
                  <h1>{dashboardData.total_ivrs_calls_received}</h1>
                </div>
              </div>

              <div
                onClick={() => handleOpen("uniqueIvrs")}
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
                </div>
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
                  Unique calls received in IVRs
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
                  <h1>{dashboardData.total_unique_ivrs_calls_received}</h1>
                </div>
              </div>

              <div
                // onClick={() => handleOpen("activeUsers")}
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
                    paddingTop: "13px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  <p> Number of active users</p>
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
                  <h1>{dashboardData.calls_active_users}</h1>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div
            style={{
              marginTop: "2%",
              boxShadow: "2px 1px 5px grey",
              padding: "5%",
              width: "97%",
            }}
          >
            <h1 style={{ marginTop: "-2%" }}>Chatbot in brief</h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "center",
                justifyContent: "center",
                width: "97%",
                gap: "2%",
                // marginTop: "-1.5%",
              }}
            >
              <div
                onClick={() => handleOpen("chatbot")}
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
                </div>
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
                  Conversations in Chatbot
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
                  <h1>{dashboardData.total_chatbot_convo}</h1>
                </div>
              </div>

              <div
                onClick={() => handleOpen("video")}
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
                </div>
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
                  Total number of videos watched
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
                  <h1>{dashboardData.total_chatbot_videos}</h1>
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
                  Number of assessments taken
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
                  <h1>{dashboardData.total_chatbot_assess_taken}</h1>
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
                  Avg. minutes spent on WhatsApp
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
                  <h1>{dashboardData.chatbot_avg_mins}</h1>
                </div>
              </div>

              <div
                onClick={() => handleOpen("chatbotActive")}
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
                </div>
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
                  Total number of active users
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
                  <h1>{dashboardData.chatbot_active_users}</h1>
                </div>
              </div>
            </div>
           </div>  */}
          {/* <DynamicModal   //? Commented for now since don't have to show
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
      ) : dashboardData &&
        Object.keys(dashboardData).length === 0 &&
        loading === false ? (
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
      ) : null}
      {loading ? null : (
        <>
          <div
            style={{
              boxShadow: "2px 1px 5px grey",
              padding: "3%",
              width: "93%",
              height: "99%",
              marginLeft: "4%",
              borderBottom: "2px solid black`",
            }}
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
              Monthly Unique Users
            </h1>

            <h2
              style={{
                display: "flex",
                justifyContent: "flex-end",
                // marginRight: "2%",
                color: "red",
                fontFamily: "Congenial SemiBold",
                marginTop: "2%",
              }}
            >
              <i>
                <u> Data Updated as on - 30/09/2024</u>
              </i>
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <FormControl
                sx={{ m: 1 }}
                style={{
                  width: "150px",
                  marginRight: "40px",
                  marginTop: "30px",
                }}
              >
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
              <FormControl
                sx={{ m: 1 }}
                style={{
                  width: "180px",
                  marginRight: "40px",
                  marginTop: "30px",
                }}
              >
                <InputLabel id="usertype-label">Usertype</InputLabel>
                <Select
                  labelId="usertype-label"
                  id="usertype-select"
                  value={smartphone}
                  onChange={handleUserChange}
                  label="Usertype"
                >
                  <MenuItem key={1} value={"total"}>
                    Overall
                  </MenuItem>
                  <MenuItem key={2} value={"smartphone"}>
                    Smartphone
                  </MenuItem>
                  <MenuItem key={3} value={"non-smartphone"}>
                    Non-Smartphone
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <BarGraph />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
