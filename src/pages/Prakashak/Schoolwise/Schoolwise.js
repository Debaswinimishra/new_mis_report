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

const Schoolwise = () => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // const [year, setYear] = useState("2024");
  const [districts, setDistricts] = useState("");
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
  console.log("tableData", tableData);

  const modalTitle = "Number Of Students";
  const tableHeaders = [
    "student_name",
    "Class",
    "gender",
    "parents_name",
    "parents_phone_number",
    "school_name",
    "district",
    "block",
    "cluster",
  ];
  const xlData = tableData;
  const fileName = "SchoolwiseReport.csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("getAllDistricts");
        console.log("set=================>", response.data[0].districtsArr);
        setDistrictArr(response.data[0].districtsArr);
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
        console.log("set=================>", response.data[0].blocksArr);
        setBlockArr(response.data[0].blocks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Blocks:", error);
        setLoading(false);
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
          setLoading(true);
          const response = await Api.get(`getAllClustersByBlock/${blocks}`);
          console.log("set=================>", response.data[0].clusters);
          setClusterArr(response.data[0]?.clusters);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Clusters:", error);
        setClusterArr([]); // Reset clusterArr to an empty array if there's an error
        setLoading(false);
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
          setSchoolArr(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Blocks:", error);
        setLoading(false);
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
    const body = {
      district: districts,
      block: blocks,
      cluster: clusters,
      school: schools.school_name,
    };

    console.log("check---------->", districts, blocks, clusters, schools);

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
    Api.post(`getSchoolWiseReport`, body)
      .then((response) => {
        console.log("set=================>", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err=================>", err);
        // if (err.response.status === 406) {
        //   alert("something went wrong", err.response.status);
        // }
        setLoading(false);
      });
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

  const handleOpen = async (classNumber) => {
    setOpen(true);
    setLoading(true);

    const body = {
      // year: 2024,
      ...(classNumber && { class: classNumber }),
      ...(districts && { district: districts }),
      ...(blocks && { block: blocks }),
      ...(clusters && { cluster: clusters }),
      ...(schools && { school_name: schools?.school_name }),
    };

    try {
      const response = await Api.post("/getAllStudentsReport", body);
      console.log("getAllStudentsReport=================>", response.data);
      setTableData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching districts:", error);
      setLoading(false);
    }
  };

  const handleClose = () => setOpen(false);

  const handleDownload = () => {
    // const data = modalContentData.map((chat, index) => ({
    //   "Sl No.": index + 1,
    //   "Customer Id": chat.customer_id,
    //   "Mobile No.": chat.mobile,
    //   Class: chat.class,
    //   Board: chat.board,
    //   School: chat.school,
    //   Status: chat.status,
    //   Date: moment(chat.date).format("DD/MM/YYYY"),
    // }));
    // const worksheet = XLSX.utils.json_to_sheet(data);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // const excelBuffer = XLSX.write(workbook, {
    //   bookType: "xlsx",
    //   type: "array",
    // });
    // const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    // saveAs(blob, "table_data.xlsx");
  };

  console.log("schoolArr--------------------->", schoolArr, typeof schoolArr);
  console.log("districts--------->", districts);
  console.log("blocks--------->", blocks);
  console.log("clusters--------->", clusters);
  console.log("schools--------->", schools);

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
        {/* <SelectYear Year={year} handleYearChange={handleYearChange} /> */}
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="district-label">District</InputLabel>
          <Select
            labelId="district-label"
            id="district-select"
            value={districts}
            onChange={(e) => handleDistrictChange(e)}
            label="District"
          >
            {districtArr.map((district, index) => (
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
            <MenuItem value="">None</MenuItem>
            {blockArr &&
              blockArr.map((block, index) => (
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
            marginRight: "5.9%",
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
              {/* <div
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
                    paddingTop: "18px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Total No. of Parents PoC Identified
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
                  <h1>{data.total_poc}</h1>
                </div>
              </div> */}
              <div
                onClick={() => handleOpen(1)}
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
                  Number of Students in Class 1
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
                onClick={() => handleOpen(2)}
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
                  Number of Students in Class 2
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
                onClick={() => handleOpen(3)}
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
                onClick={() => handleOpen(4)}
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
                  Number of Students in Class 4
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
                onClick={() => handleOpen(5)}
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
                  Number of Students in Class 5
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
                  Number of Parents Spent 0-1 mins
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
                    color: "rgb(214 148 16)",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Number of Parents Spent 2-15 mins
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
                    color: "rgb(153 58 134)",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Number of Parents Spent 16-30 mins
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
                    color: "#2E8B57",
                    paddingTop: "20px",
                    fontSize: "1.2rem",
                    fontFamily: "Congenial SemiBold",
                    fontWeight: "600",
                  }}
                >
                  Number of Parents Spent 31-45 mins
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
                  Number of Parents Spent 45+ mins
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

              {/* <div
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
              </div> */}

              {/* <div
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
              </div> */}

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
          </div>
        </div>
      ) : !loading && filtered && Object.keys(data).length === 0 ? (
        <img src={Nodata} />
      ) : (
        <img src={defaultImage} width={"20%"} />
      )}

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
