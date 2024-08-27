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
import NoData from "../../../Assets/Nodata.gif";

const Schoolwise = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // const [year, setYear] = useState("2024");
  const [districts, setDistricts] = useState("PURI");
  const [data, setData] = useState({});
  const [districtArr, setDistrictArr] = useState([]);
  const [blocks, setBlocks] = useState("");
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
  console.log("tableData", tableData);
  console.log("districtArr", districtArr);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // const tableHeaders =
  //   modalTitle === "Total Conversations in Chatbot"
  //     ? [
  //         "Student Name",
  //         "Class",
  //         "Gender",
  //         "Parents Name",
  //         "School Name",
  //         "District",
  //         "Block",
  //         "Cluster",
  //         "Phone Number",
  //         "Button Clicked",
  //         "Template Name",
  //         "Msg Type",
  //         "Status",
  //         "Created on",
  //       ]
  //     : [
  //         "student_name",
  //         "Class",
  //         "gender",
  //         "parents_name",
  //         "parents_phone_number",
  //         "school_name",
  //         "district",
  //         "block",
  //         "cluster",
  //       ];
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching districts:", error);
        setLoading(false);
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

  const handleBlockChange = (e) => {
    setBlocks(e.target.value);
    setCluseters("");
    setSchools("");
  };
  useEffect(() => {
    const fetchClusters = async () => {
      try {
        if (blocks) {
          // setLoading(true);
          const response = await Api.get(`getAllClustersByBlock/${blocks}`);
          // console.log("set=================>", response.data);
          const clusters =
            response?.data?.length > 0 &&
            response?.data?.map((item) => item?.cluster);
          setClusterArr(clusters);
          // setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Clusters:", error);
        setClusterArr([]); // Reset clusterArr to an empty array if there's an error
        // setLoading(false);
      }
    };

    // Fetch data only if a block is selected
    fetchClusters();
  }, [blocks]);

  const handleClusterChange = (e) => {
    setCluseters(e.target.value);
    setSchools("");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (clusters) {
          const response = await Api.get(`getAllSchoolsByCluster/${clusters}`);
          // console.log(
          //   "setsCHIOOOKKKKKsssssssssssssssssssssssssssssssssssssss=================>",
          //   response.data[0].school_name
          // );
          setSchoolArr(response?.data);
          // setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Blocks:", error);
        // setLoading(false);
      }
    };

    // Fetch data only if a district is selected
    fetchData();
  }, [clusters]);

  const handleSchoolName = (e) => {
    setSchools(e.target.value);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    
    const filteredData = dataJson.filter((item) => {
      return (
        item.district === districts &&
        (!blocks || item.block === blocks) &&
        (!clusters || item.cluster === clusters) &&
        (!schools?.school_name || item.school_name === schools.school_name)
      );
    });

    if (filteredData?.length > 0) {
      setData(filteredData);
      setLoading(false);
    } else {
      setData([]);
      setLoading(false);
    }

    const body = {
      district: districts,
      block: blocks,
      cluster: clusters,
      school_name: schools.school_name,
      // month: month,
    };

    console.log(
      "check---------->",
      districts,
      blocks,
      clusters,
      schools
      // month
    );

    // if ("") {
    //   Api.post(`getSchoolWiseReport`, body)
    //     .then((response) => {
    //       console.log("set=================>", response.data);
    //       setData(response.data);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log("err=================>", err);
    //       setLoading(false);
    //     });
    // } else {
    //   Api.post(`getSchoolWiseReport`)
    //     .then((response) => {
    //       console.log("set=================>", response.data);
    //       setData(response.data);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log("err=================>", err);
    //       setLoading(false);
    //     });
    // }
    //?the below codes are commented for now-
    // if (districts) {
    //   Api.post(`getSchoolWiseReport`, body)
    //     .then((response) => {
    //       console.log("set=================>", response.data);
    //       setData(response.data);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log("err=================>", err);
    //       // if (err.response.status === 406) {
    //       //   alert("something went wrong", err.response.status);
    //       // }
    //       setLoading(false);
    //     });
    // }
  };

  const filterButtonClick = () => {
    setFiltered(true);
    if (!districts) {
      alert("Please select a district to proceed.");
    } else {
      setLoading(true);
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

  console.log("data---------->", data);
  console.log("loading---------->", loading);

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
            <MenuItem value="Select District" disabled>
              Select District
            </MenuItem>
            {districtArr?.map((district, index) => (
              <MenuItem key={index} value={district}>
                {district}
              </MenuItem>
            ))}
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
            <MenuItem value="Select Block" disabled>
              Select Block
            </MenuItem>
            <MenuItem value="">None</MenuItem>
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
            <MenuItem value="Select Cluster" disabled>
              Select Cluster
            </MenuItem>
            <MenuItem value="">None</MenuItem>
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
            <MenuItem value="Select School" disabled>
              Select School
            </MenuItem>
            <MenuItem value="">None</MenuItem>
            {schoolArr?.map((school, index) => (
              <MenuItem key={index} value={school}>
                {school.school_name}
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
            <h1
              style={{
                marginTop: "-2%",
                color: "#333", // Dark grey color for the text
                fontFamily: "Congenial SemiBold", // Font family for a clean look
                fontWeight: "700", // Bolder font weight for emphasis
                fontSize: "1.2rem", // Smaller font size for prominence
                textAlign: "right", // Align the text to the right
                padding: "10px 0", // Add some padding for spacing
                borderBottom: "2px solid #000000", // Add a bottom border for separation
                letterSpacing: "0.5px", // Slight letter spacing for readability
                textTransform: "capitalize", // Capitalize each word
              }}
            >
              Data Updated as on -{" "}
              {/* {data ? data?.data_last_updated  //? commented for now only
               : "22/08/2024"} */}
              31/07/2024
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
              {!loading && data.length > 0 ? (
                data?.map((data) => {
                  return (
                    <>
                      <div
                        onClick={() => handleOpenModal("studentReport")}
                        style={{
                          width: "255px",
                          height: "200px",
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
                            height: "48%",
                            color: "#CD5C5C",
                            paddingTop: "10px",
                            fontSize: "1.1rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                            width: "100%",
                          }}
                        >
                          <p>
                            Number of students (including promoted students)
                          </p>
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
                        onClick={() => handleOpenModal("studentReport", 1)}
                        style={{
                          width: "255px",
                          height: "200px",
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
                            paddingTop: "28px",
                            fontSize: "1.2rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                          }}
                        >
                          <p> Number of Students in Class 1</p>
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
                          <h1>{data.class_one_students}</h1>
                        </div>
                      </div>
                      <div
                        onClick={() => handleOpenModal("studentReport", 2)}
                        style={{
                          width: "255px",
                          height: "200px",
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
                            color: "#2E8B57",
                            paddingTop: "28px",
                            fontSize: "1.2rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                          }}
                        >
                          <p> Number of Students in Class 2</p>
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
                          <h1>{data.class_two_students}</h1>
                        </div>
                      </div>

                      <div
                        onClick={() => handleOpenModal("studentReport", 3)}
                        style={{
                          width: "255px",
                          height: "200px",
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
                            paddingTop: "25px",
                            fontSize: "1.2rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                          }}
                        >
                          <p> Number of Students in Class 3</p>
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
                          <h1>{data.class_three_students}</h1>
                        </div>
                      </div>
                      <div
                        onClick={() => handleOpenModal("studentReport", 4)}
                        style={{
                          width: "255px",
                          height: "200px",
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
                            color: "#6A5ACD",
                            paddingTop: "28px",
                            fontSize: "1.2rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                          }}
                        >
                          <p> Number of Students in Class 4</p>
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
                          <h1>{data.class_four_students}</h1>
                        </div>
                      </div>
                      <div
                        onClick={() => handleOpenModal("studentReport", 5)}
                        style={{
                          width: "255px",
                          height: "200px",
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
                            color: "#2E8B57",
                            paddingTop: "28px",
                            fontSize: "1.2rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                          }}
                        >
                          <p>Number of Students in Class 5</p>
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
                          <h1>{data.class_five_students}</h1>
                        </div>
                      </div>

                      <div
                        style={{
                          width: "255px",
                          height: "200px",
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
                          <p>Total Activated students</p>
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
                          <h1>{data.total_activated_students}</h1>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "255px",
                          height: "200px",
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
                          <p> Total active students</p>
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
                          <h1>{data.total_active_students}</h1>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "255px",
                          height: "200px",
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
                          <p> Total smartphone users</p>
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
                          <h1>{data.remote_instructions_users}</h1>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "255px",
                          height: "200px",
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
                            paddingTop: "14px",
                            fontSize: "1.2rem",
                            fontFamily: "Congenial SemiBold",
                            fontWeight: "600",
                          }}
                        >
                          <p>Total non-smartphone users</p>
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
                          <h1>{data.chatbot_users}</h1>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : !loading && data.length === 0 ? (
                <img src={Nodata} />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div>
        <canvas ref={chartRef}></canvas>
      </div>
      <DynamicModal
        open={open}
        loading={loading}
        handleClose={handleClose}
        modalTitle={modalTitle}
        tableHeaders={tableHeaders}
        tableData={tableData}
        xlData={xlData}
        fileName={fileName}
      />
    </div>
  );
};

export default Schoolwise;

const dataJson = [
  {
    block: "NIMAPADA",
    cluster: "AMARANG UGUPS",
    district: "PURI",
    school_name: "BAMADEIPUR PROJECT PS",
    total_students: 230,
    class_one_students: 230,
    class_two_students: 1230,
    class_three_students: 120,
    class_four_students: 1230,
    class_five_students: 440,
    total_activated_students: 320,
    total_active_students: 1230,
    remote_instructions_users: 230,
    chatbot_users: 1230,
  },
  {
    block: "NIMAPADA",
    cluster: "AMARANG UGUPS",
    district: "PURI",
    school_name: "DEULIATHENGA PS",
    total_students: 23,
    class_one_students: 23,
    class_two_students: 123,
    class_three_students: 12,
    class_four_students: 123,
    class_five_students: 44,
    total_activated_students: 32,
    total_active_students: 123,
    remote_instructions_users: 23,
    chatbot_users: 123,
  },
];
