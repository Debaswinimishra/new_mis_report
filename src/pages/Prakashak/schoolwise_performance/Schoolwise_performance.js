import React, { useState, useEffect, useRef } from "react";
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
  Modal,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Api from "../../../Environment/PrakashakAPI";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import Nodata from "../../../Assets/Nodata.gif";
import defaultImage from "../../../Assets/default.jpg";
import Chart from "chart.js/auto";
import DynamicModal from "../../../Components/DynamicModal";
import SelectYear from "../../../ReusableComponents/SelectYear";
import { filterData } from "../../../downloads/jsonData";

const Schoolwise_performance = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // const [year, setYear] = useState("2024");
  const [districts, setDistricts] = useState("PURI");
  const [data, setData] = useState([]);

  console.log("data--->", data);
  const [selectedMonth, setSelectedMonth] = useState(9);
  const [selectedWeek, setSelectedWeek] = useState(4);
  const [districtArr, setDistrictArr] = useState([]);
  const [blocks, setBlocks] = useState("");
  console.log("blocks---->", blocks);
  const [blockArr, setBlockArr] = useState([]);
  const [clusters, setCluseters] = useState("");
  const [clusterArr, setClusterArr] = useState([]);
  const [schools, setSchools] = useState("");
  const [schoolArr, setSchoolArr] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [tableHeaders, setTableHeaders] = useState([
    "student_name",
    "Class",
    "gender",
    "parents_name",
    "parents_phone_number",
    "school_name",
    "district",
    "block",
    "cluster",
  ]);
  const [isShow, setIsShow] = useState(false);

  console.log("tableData", tableData);
  console.log("districtArr", districtArr);

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
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const xlData = tableData;
  const fileName = "SchoolwiseReport.csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("getAllDistricts");
        if (
          response &&
          response?.data &&
          response?.data?.length > 0 &&
          response?.data
        ) {
          console.log("set=================>", response?.data);
          const districts =
            response?.data.length > 0 &&
            response?.data?.map((item) => item?.district);
          setDistrictArr(districts);
        } else {
          setDistrictArr([]);
        }
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching districts:", error);
        // setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  // const handleYearChange = (e) => {
  //   setYear(e.target.value);
  // };

  const handleDistrictChange = (e) => {
    setDistricts(e.target.value);
    setBlocks("");
    setCluseters("");
    setSchools("");
    // Other logic related to district change
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get(`getAllBlocksByDistrict/${districts}`);
        console.log("set=================>", response.data);
        if (response?.data && response?.data?.length > 0) {
          // Extracting the blocks from the response data
          const blocks =
            response?.data.length > 0 &&
            response?.data?.map((item) => item?.block);
          console.log("Blocks:", blocks);
          setBlockArr(blocks); // Setting the block array with the array of block names
        } else {
          console.log("No blocks found for the given district.");
          setBlockArr([]); // Setting an empty array if no data is found
        }
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching Blocks:", error);
        // setLoading(false);
      }
    };

    // Fetch data only if a district is selected
    if (districts) {
      fetchData();
    }

    return () => {};
  }, [districts]);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];

  const handleMonthChange = (e) => {
    if (
      e.target.value > currentMonthSelected.value &&
      selectedYear === currentYear
    ) {
      alert("You can't select a month greater than the current month !");
    } else {
      setSelectedMonth(e.target.value ? e.target.value : "");
      setSelectedWeek(1);
    }
  };

  const handleBlockChange = (e) => {
    setBlocks(e.target.value);
    setCluseters("");
    setSchools("");
    const data = filterData;
    console.log("data----->", data);

    if (e.target.value?.length > 0) {
      const res = data.filter((item) => item.block === e.target.value);

      const cluster = res?.map((item) => item.cluster);
      const uniqueData = Array.from(new Set(cluster.map(JSON.stringify))).map(
        JSON.parse
      );
      // console.log("uniqueData--->", res);
      setClusterArr(uniqueData);
    }
  };

  // useEffect(() => {
  //   const fetchClusters = async () => {
  //     try {
  //       if (blocks) {
  //         // setLoading(true);
  //         const response = await Api.get(`getAllClustersByBlock/${blocks}`);
  //         // console.log("set=================>", response.data);
  //         const clusters =
  //           response?.data?.length > 0 &&
  //           response?.data?.map((item) => item?.cluster);
  //         setClusterArr(clusters);
  //         // setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching Clusters:", error);
  //       setClusterArr([]); // Reset clusterArr to an empty array if there's an error
  //       // setLoading(false);
  //     }
  //   };

  //   // Fetch data only if a block is selected
  //   fetchClusters();
  // }, [blocks]);

  const handleClusterChange = (e) => {
    setCluseters(e.target.value);

    setSchools("");
    const data = filterData;
    const res = data.filter((item) => item.block === blocks);

    const cluster = res?.filter((item) => item.cluster === e.target.value);

    const school = cluster?.map((item) => item.school_name);
    const uniqueData = Array.from(new Set(school.map(JSON.stringify))).map(
      JSON.parse
    );
    setSchoolArr(uniqueData);
    console.log("uniqueData--->", school);
    console.log("uniqueData1--->", uniqueData);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (clusters) {
  //         const response = await Api.get(`getAllSchoolsByCluster/${clusters}`);
  //         setSchoolArr(response?.data);
  //         // setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching Blocks:", error);
  //       // setLoading(false);
  //     }
  //   };

  //   // Fetch data only if a district is selected
  //   fetchData();
  // }, [clusters]);

  const handleSchoolName = (e) => {
    setSchools(e.target.value);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleWeekChange = (e) => {
    if (!selectedMonth && e.target.value) {
      alert("Please select a month before selecting a week !");
    } else {
      setSelectedWeek(e.target.value ? parseInt(e.target.value) : "");
    }
  };

  const [zeroToOneCountSum, setZeroToOneCountSum] = useState("");

  const [twoToFiveCountSum, setTwoToFiveCountSum] = useState("");
  const [sixteenToThirtyCountSum, setSixteenToThirtyCountSum] = useState("");
  const [thirtyOneToThirtyFiveCountSum, setThirtyOneToThirtyFiveCountSum] =
    useState("");
  const [fourtyFiveCountSum, setFourtyFiveCountSum] = useState("");
  const [zeroToOneCountAvg, setZeroToOneCountAvg] = useState("");

  const [twoToFiveCountAvg, setTwoToFiveCountAvg] = useState("");
  const [sixteenToThirtyCountAvg, setSixteenToThirtyCountAvg] = useState("");
  const [thirtyOneToThirtyFiveCountAvg, setThirtyOneToThirtyFiveCountAvg] =
    useState("");
  const [fourtyFiveCountAvg, setFourtyFiveCountAvg] = useState("");

  const fetchData = () => {
    const body = {
      district: districts,
      block: blocks,
      cluster: clusters,
      school_name: schools,
      month: selectedMonth,
      week: selectedWeek,
    };
    Api.post(`/getSchoolwisePerformance/static`, body)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        } else {
          console.log("The response got-------->", res.status);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("The error is---->", error);
        setLoading(false);
      });

    const zeroToOneCount = data.reduce(
      (acc, item) => acc + item.ts_0to1_users,
      0
    );

    const twoToFiveCount = data.reduce(
      (acc, item) => acc + item.ts_2to15_users,
      0
    );
    const sixteenToThirtyCount = data.reduce(
      (acc, item) => acc + item.ts_16to30_users,

      0
    );
    const thirtyOneToFourtyFiveCount = data.reduce(
      (acc, item) => acc + item.ts_31to45_users,

      0
    );
    const FourtyFiveCount = data.reduce(
      (acc, item) => acc + item.ts_45plus_users,

      0
    );

    const zeroToOneAvg = data.reduce(
      (acc, item) => acc + item.ts_0to1_avgTs,
      0
    );

    const twoToFiveAvg = data.reduce(
      (acc, item) => acc + item.ts_2to15_avgTs,
      0
    );
    const sixteenToThirtyAvg = data.reduce(
      (acc, item) => acc + item.ts_16to30_avgTs,

      0
    );
    const thirtyOneToFourtyFiveAvg = data.reduce(
      (acc, item) => acc + item.ts_31to45_avgTs,

      0
    );
    const FourtyFiveAvg = data.reduce(
      (acc, item) => acc + item.ts_45plus_avgTs,

      0
    );

    setZeroToOneCountAvg(zeroToOneAvg);
    setTwoToFiveCountAvg(twoToFiveAvg);
    setSixteenToThirtyCountAvg(sixteenToThirtyAvg);
    setThirtyOneToThirtyFiveCountAvg(thirtyOneToFourtyFiveAvg);

    setFourtyFiveCountAvg(FourtyFiveAvg);

    setZeroToOneCountSum(zeroToOneCount);
    setFourtyFiveCountSum(FourtyFiveCount);
    setSixteenToThirtyCountSum(sixteenToThirtyCount);
    setThirtyOneToThirtyFiveCountSum(thirtyOneToFourtyFiveCount);
    setTwoToFiveCountSum(twoToFiveCount);
  };

  console.log("zeroToOneCountSum--->", zeroToOneCountSum);
  const filterButtonClick = () => {
    setFiltered(true);
    if (!districts) {
      alert("Please select a district to proceed.");
    } else if (!selectedMonth) {
      alert("Please select a Month to proceed.");
    } else if (!selectedWeek) {
      alert("Please select a week to proceed.");
    } else if (districts && blocks && !clusters) {
      alert("Please select a cluster to proceed.");
    } else if (districts && blocks && clusters && !schools) {
      alert("Please select a school to proceed.");
    } else if (!blocks && !clusters && !schools) {
      alert("Please select block, cluster and school to proceed.");
    } else {
      setLoading(true);
      setIsShow(true);
      fetchData();
    }
  };

  const handleOpenModal = async (type, param) => {
    setOpen(true);
    setLoading(true);
    setTableData([]); // Reset table data before fetching new data
    setTableHeaders([]);
    setModalTitle("");
    let body = {
      ...(districts && { district: districts }),
      ...(blocks && { block: blocks }),
      ...(clusters && { cluster: clusters }),
      ...(schools && { school_name: schools?.school_name }),
    };

    if (type === "chatbotConvo") {
      setModalTitle(param);
      try {
        const response = await Api.post("/getChatBotConvosReport", body);
        const transformedData = response.data?.map((student) => ({
          student_name: student.student_name,
          class: student.class,
          gender: student.gender,
          parents_name: student.parents_name,
          school_name: student.school_name,
          district: student.district,
          block: student.block,
          cluster: student.cluster,
          phone_number: student.phone_number || "-",
          buttonClicked: student.buttonClicked || "-",
          templateName: student.templateName || "-",
          msgType: student.msgType || "-",
          status: student.status,
          createdAt: moment(student.createdAt).format("DD-MM-YYYY hh:mm"),
        }));
        setTableData(transformedData);
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
      } catch (error) {
        console.error("Error fetching chatbot conversations:", error);
      }
    } else if (type === "studentReport") {
      const classNumber = param;
      classNumber
        ? setModalTitle(`Number Of Students in class ${classNumber}`)
        : setModalTitle("Number Of Students");
      body = {
        ...body,
        ...(classNumber && { class: classNumber }),
      };
      try {
        const response = await Api.post("/getAllStudentsReport", body);
        setTableData(response.data);
        setTableHeaders([
          "student_name",
          "Class",
          "gender",
          "parents_name",
          "parents_phone_number",
          "school_name",
          "district",
          "block",
          "cluster",
        ]);
      } catch (error) {
        console.error("Error fetching student report:", error);
      }
    }

    // setModalTitle(newModalTitle);
    setLoading(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "4%",
          marginLeft: "53%",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="district-label">District</InputLabel>
          <Select
            labelId="district-label"
            id="district-select"
            value={districts}
            onChange={(e) => handleDistrictChange(e)}
            label="District"
          >
            <MenuItem value="PURI">PURI</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="block-label">Block</InputLabel>
          <Select
            labelId="block-label"
            id="block-select"
            value={blocks}
            onChange={handleBlockChange}
            label="Block"
            disabled={loading || !districts}
          >
            {blockArr &&
              blockArr?.map((block, index) => (
                <MenuItem key={index} value={block}>
                  {block}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="cluster-label">Cluster</InputLabel>
          <Select
            labelId="cluster-label"
            id="cluster-select"
            value={clusters}
            onChange={handleClusterChange}
            label="Cluster"
            disabled={loading || !blocks}
          >
            {/* <MenuItem value="">None</MenuItem> */}
            {clusterArr?.map((cluster, index) => (
              <MenuItem key={index} value={cluster}>
                {cluster}
              </MenuItem>
            ))}
          </Select>
          {/* {loading && <CircularProgress size={24} />} */}
        </FormControl>

        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="school-label">School</InputLabel>
          <Select
            labelId="school-label"
            id="school-select"
            value={schools}
            onChange={handleSchoolName}
            label="School"
            disabled={!clusters}
          >
            {/* <MenuItem value="">None</MenuItem> */}
            {schoolArr?.map((school, index) => (
              <MenuItem key={index} value={school}>
                {school}
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
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        > */}
        <Button
          variant="contained"
          sx={{
            height: "40px",
            width: "120px",
            marginTop: "1.2%",
            // marginRight: "5.9%",
            marginLeft: "9px",
          }}
          onClick={filterButtonClick}
        >
          Filter
        </Button>
        {/* </Box> */}
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
      ) : !loading && data?.length > 0 ? (
        data.map((item, index) => (
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
              <div style={{ marginTop: "-2%" }}>
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
                  School-wise Details
                </h1>
              </div>
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
                <>
                  <div
                    style={{
                      width: "255px",
                      height: "220px", // Increased height to accommodate heading
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
                        fontSize: "1.3rem", // Heading font size
                        fontWeight: "bold",
                        // fontSize: "1rem", // Reduced font size
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
                        <h2>{item.ts_0to1_users}</h2>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          fontSize: "0.7rem", // Reduced font size
                        }}
                      >
                        <h1>{item.ts_0to1_avgTs}</h1>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "255px",
                      height: "220px", // Increased height to accommodate heading
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
                        fontSize: "1.3rem", // Heading font size
                        fontWeight: "bold",
                        // fontSize: "1rem", // Reduced font size
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
                        <h2>{item.ts_2to15_users}</h2>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          fontSize: "0.7rem", // Reduced font size
                        }}
                      >
                        <h1>{item.ts_2to15_avgTs}</h1>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "255px",
                      height: "220px", // Increased height to accommodate heading
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
                        fontSize: "1.3rem", // Heading font size
                        fontWeight: "bold",
                        // fontSize: "1rem", // Reduced font size
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
                        <h2>{item.ts_16to30_users}</h2>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          fontSize: "0.7rem", // Reduced font size
                        }}
                      >
                        <h1>{item.ts_16to30_avgTs}</h1>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "255px",
                      height: "220px", // Increased height to accommodate heading
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
                        fontSize: "1.3rem", // Heading font size
                        fontWeight: "bold",
                        // fontSize: "1rem", // Reduced font size
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
                        <h2>{item.ts_31to45_users}</h2>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          fontSize: "0.7rem", // Reduced font size
                        }}
                      >
                        <h1>{item.ts_31to45_avgTs}</h1>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "255px",
                      height: "220px", // Increased height to accommodate heading
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
                        color: "#6A5ACD",
                        fontSize: "1.3rem", // Heading font size
                        fontWeight: "bold",
                        // fontSize: "1rem", // Reduced font size
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
                        color: "#6A5ACD",
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
                          borderLeft: "1px solid #6A5ACD", // Line between elements
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
                        backgroundColor: "#6A5ACD",
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
                        <h2>{item.ts_45plus_users}</h2>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          fontSize: "0.7rem", // Reduced font size
                        }}
                      >
                        <h1>{item.ts_45plus_avgTs}</h1>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>

            {/* <div
          style={{
            marginTop: "2%",
            boxShadow: "2px 1px 5px grey",
            padding: "3%",
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
            Remote Instructions in Brief
          </h1>
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
        </div> */}

            {/* <div
          style={{
            marginTop: "2%",
            boxShadow: "2px 1px 5px grey",
            padding: "3%",
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
            Chatbot in Brief
          </h1>
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
              onClick={() => {
                handleOpenModal(
                  "chatbotConvo",
                  "Total Conversations in Chatbot"
                );
              }}
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
                  paddingTop: "26px",
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
              style={{
                width: "255px",
                height: "180px",
                marginTop: "1.5%",
                backgroundColor: "white",
     
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
                Total No. of Assessment Taken
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
                <h1>{data.total_chatbot_assess_taken}</h1>
              </div>
            </div> 

           <div
              onClick={() => handleOpen()}
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
                Average minutes spent in WhatsApp
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
                <h1>{data.chatbot_avg_mins}</h1>
              </div>
            </div> 

            <div
              // onClick={() => handleOpen()}
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
        </div> */}
          </div>
        ))
      ) : !loading && filtered && Object.keys(data).length === 0 ? (
        <img src={Nodata} />
      ) : (
        <img src={defaultImage} width={"20%"} />
      )}
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Schoolwise_performance;
