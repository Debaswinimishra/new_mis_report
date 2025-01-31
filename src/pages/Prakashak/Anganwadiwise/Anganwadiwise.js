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
  LinearProgress,
} from "@mui/material";
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Api from "../../../Environment/PrakashakAPI";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";
import Nodata from "../../../Assets/Nodata.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../../../Assets/defaultImage.png";
import defaultImage2 from "../../../Assets/default.jpg";
import Chart from "chart.js/auto";
import DynamicModal from "../../../Components/DynamicModal";
import SelectYear from "../../../ReusableComponents/SelectYear";
import NoData from "../../../Assets/Nodata.gif";
import { filterData } from "../../../downloads/jsonData";
import PrakashakAPI from "../../../Environment/PrakashakAPI";
import {
  getAllAnganwadiPerformanceReports,
  getAllAnganwadiReports,
} from "./AnganwadiwiseAPI";

const AnganwadiWise = () => {
  //*--------------------New States---------------------
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingPerformance, setLoadingPerformance] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtArr, setDistrictArr] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [blockArr, setBlockArr] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState("");
  const [clusterArr, setClusterArr] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schoolArr, setSchoolArr] = useState([]);
  const [overallData, setOverallData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
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
  const [overallDistrictBlock, setOverallDistrictBlock] = useState([]);
  const [filtered, setFiltered] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1);
  const [selectedWeek, setSelectedWeek] = useState(1);

  //*-------------------------------------------------------

  const xlData = tableData;
  const fileName = "SchoolwiseReport.csv";

  useEffect(() => {
    const fetchDataDistrict = async () => {
      try {
        const response = await Api.post(`/getDistBlocks/static`);
        if (response.status === 200) {
          setOverallDistrictBlock(response?.data.data);
          const uniqueDistrict = new Set(
            response?.data.data.map((item) => item?.district)
          );
          setDistrictArr([...uniqueDistrict]);
        } else {
          setDistrictArr([]);
          toast.warn("Sorry, No data found !");
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
        toast.error("Sorry, something went wrong! Please try again later!");
      } finally {
        setLoading(false);
        setLoadingPerformance(false);
      }
    };

    fetchDataDistrict();

    return () => {};
  }, []);

  //?----------------------Arrays for Year, Month and Week----------------
  const yearsArray = Array.from(
    { length: 3 },
    (_, index) => currentYear - index
  );
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

  const weekArr = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];
  //?-------------------------------------------------------------

  //!----------------------Dropdown Handle Functionalities------------------

  //year change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedMonth(currentMonth + 1);
    setSelectedWeek(1);
  };

  //Month Change
  const handleMonthChange = (e) => {
    if (selectedYear === currentYear && e.target.value > currentMonth + 1) {
      toast.error("You can select a month beyond the current month!");
    } else {
      setSelectedMonth(e.target.value);
      setSelectedWeek(1);
    }
  };

  //Week Change
  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  console.log("overallDistrictBlock--------->", overallDistrictBlock);

  const handleDistrictChange = (e) => {
    if (e.target.value) {
      setSelectedDistrict(e.target.value);
      setSelectedBlock("");
      setSelectedCluster("");
      setSelectedSchool("");
      setSelectedYear(currentYear);
      setSelectedMonth(currentMonth + 1);
      setSelectedWeek(1);
      const allBlocks = overallDistrictBlock
        ?.filter((item) => {
          return item.district === e.target.value;
        })
        .map((i) => i.block);

      const uniqueBlocks = new Set(allBlocks);
      console.log("object");
      setBlockArr([...uniqueBlocks]);
    }
  };

  const handleBlockChange = (e) => {
    setSelectedBlock(e.target.value);
    setSelectedCluster("");
    setSelectedSchool("");
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth + 1);
    setSelectedWeek(1);
    const allClusters = overallDistrictBlock
      ?.filter((item) => {
        return (
          item.district === selectedDistrict && item.block === e.target.value
        );
      })
      .map((i) => i.cluster);
    console.log("allClusters------------>", allClusters);
    const uniqueClusters = new Set(allClusters);
    setClusterArr([...uniqueClusters]);
  };

  const handleClusterChange = (e) => {
    setSelectedCluster(e.target.value);
    setSelectedSchool("");
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth + 1);
    setSelectedWeek(1);
    const allSchools = overallDistrictBlock?.filter((item) => {
      return (
        item.district === selectedDistrict &&
        item.block === selectedBlock &&
        item.cluster === e.target.value
      );
    });
    setSchoolArr(allSchools);
  };

  const handleSchoolName = (e) => {
    setSelectedSchool(e.target.value);
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth + 1);
    setSelectedWeek(1);
  };

  //!-----------------------------------------------------------------------

  //----------- Filter button click logic for Overall data-----------
  const fetchDataOverall = () => {
    setLoading(true);
    setLoadingPerformance(true);
    const body = {
      district: selectedDistrict,
      project: selectedBlock,
      sector: selectedCluster,
      anganwadi_name: selectedSchool,
    };

    getAllAnganwadiReports(body)
      .then((res) => {
        if (res.status === 200) {
          console.log("res.data--------->", res.data);
          setOverallData(res.data[0]);
          setLoading(false);
          setLoadingPerformance(false);
          console.log("response data----->", res.data);
          setLoading(false);
          setLoadingPerformance(false);
        } else {
          console.log("Status code----->", res.status);
          setLoading(false);
          setLoadingPerformance(false);
          toast.error("Sorry, couldn't found any data!");
        }
      })
      .catch((error) => {
        console.error("Error while filtering data---------->", error);
        setLoading(false);
        setLoadingPerformance(false);
        toast.error("Sorry, Something went wrong !");
      });
  };

  const fetchDataSchoolwisePerformance = () => {
    setLoadingPerformance(true);
    const body = {
      district: selectedDistrict,
      project: selectedBlock,
      sector: selectedCluster,
      anganwadi_name: selectedSchool,
      year: selectedYear,
      month: selectedMonth,
      week: selectedWeek,
    };
    getAllAnganwadiPerformanceReports(body)
      .then((res) => {
        if (res.status === 200) {
          setPerformanceData(res.data);
          setLoadingPerformance(false);
        } else {
          console.log("The response got-------->", res.status);
          setLoadingPerformance(false);
          toast.error("Sorry, couldn't found any data!");
        }
      })
      .catch((error) => {
        console.error("The error is---->", error);
        setLoadingPerformance(false);
        toast.error("Sorry, Something went wrong !");
      });
  };

  const filterButtonClickOverall = () => {
    setFiltered(true);
    if (!selectedDistrict) {
      alert("Please select a district to proceed.");
    } else if (
      selectedDistrict &&
      !selectedBlock &&
      !selectedCluster &&
      !selectedSchool
    ) {
      alert("Please select a block, cluster and school to proceed.");
    } else if (
      selectedDistrict &&
      selectedBlock &&
      !selectedCluster &&
      !selectedSchool
    ) {
      alert("Please select a cluster and school to proceed.");
    } else if (
      selectedDistrict &&
      selectedBlock &&
      selectedCluster &&
      !selectedSchool
    ) {
      alert("Please select a school to proceed.");
    } else {
      setLoading(true);
      fetchDataOverall();
      fetchDataSchoolwisePerformance();
    }
  };

  const filterButtonClickPerformance = () => {
    if (!selectedDistrict) {
      toast.error("Please select your district!");
    } else if (!selectedBlock) {
      toast.error("Please select your block!");
    } else if (!selectedCluster) {
      toast.error("Please select your cluster!");
    } else if (!selectedSchool) {
      toast.error("Please select your school!");
    } else if (!filtered) {
      toast.error("Please filter the overall data first!");
    } else {
      fetchDataSchoolwisePerformance();
    }
  };

  console.log("overall data---------->", overallData);
  //--------------------------------------------------------------------------------

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
            value={selectedDistrict}
            onChange={handleDistrictChange}
            label="District"
          >
            {districtArr?.map((district, index) => (
              <MenuItem key={index} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="block-label">Project</InputLabel>
          <Select
            labelId="block-label"
            id="block-select"
            value={selectedBlock}
            onChange={handleBlockChange}
            label="Block"
            disabled={loading || !selectedDistrict}
          >
            {selectedDistrict &&
              blockArr &&
              blockArr?.map((block, index) => (
                <MenuItem key={index} value={block}>
                  {block}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="cluster-label">Sector</InputLabel>
          <Select
            labelId="cluster-label"
            id="cluster-select"
            value={selectedCluster}
            onChange={handleClusterChange}
            label="Cluster"
            disabled={loading || !selectedBlock}
          >
            {selectedBlock &&
              clusterArr?.map((cluster, index) => (
                <MenuItem key={index} value={cluster}>
                  {cluster}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1 }} size="small" style={{ width: "140px" }}>
          <InputLabel id="school-label">Anganwadi</InputLabel>
          <Select
            labelId="school-label"
            id="school-select"
            value={selectedSchool}
            onChange={handleSchoolName}
            label="School"
            disabled={!selectedCluster}
          >
            {selectedCluster &&
              schoolArr?.map((school, index) => (
                <MenuItem key={index} value={school.school_name}>
                  {school.school_name}
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
          onClick={filterButtonClickOverall}
        >
          Filter
        </Button>
        {/* </Box> */}
      </div>
      {/* ---------------------------- Overall Anganwadi Data --------------------- */}
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
        >
          <Box>
            <CircularProgress />
          </Box>
        </div>
      ) : !loading && Object.keys(overallData).length > 0 ? (
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
                <u> Data Updated as on - 30/09/2024</u>
              </i>
              {/* {data ? data?.data_last_updated  //? commented for now only
               : "22/08/2024"} */}
            </h2>
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
              {!loading && Object.keys(overallData)?.length > 0 ? (
                <>
                  <div
                    // onClick={() => handleOpenModal("studentReport")}
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
                        paddingTop: "28px",
                        fontSize: "1.1rem",
                        fontFamily: "Congenial SemiBold",
                        fontWeight: "600",
                        width: "100%",
                      }}
                    >
                      <p>Total No. of students</p>
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
                      <h1>{overallData.total_students}</h1>
                    </div>
                  </div>

                  <div
                    // onClick={() => handleOpenModal("studentReport", 1)}
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
                        paddingTop: "10px",
                        fontSize: "1.2rem",
                        fontFamily: "Congenial SemiBold",
                        fontWeight: "600",
                      }}
                    >
                      <p> Number of Students in Level 1 (3-4 years)</p>
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
                      <h1>{overallData.level1_students}</h1>
                    </div>
                  </div>
                  <div
                    // onClick={() => handleOpenModal("studentReport", 2)}
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
                        paddingTop: "10px",
                        fontSize: "1.2rem",
                        fontFamily: "Congenial SemiBold",
                        fontWeight: "600",
                      }}
                    >
                      <p> Number of Students in Level 2 (4-5 years)</p>
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
                      <h1>{overallData.level2_students}</h1>
                    </div>
                  </div>

                  <div
                    // onClick={() => handleOpenModal("studentReport", 3)}
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
                        paddingTop: "10px",
                        fontSize: "1.2rem",
                        fontFamily: "Congenial SemiBold",
                        fontWeight: "600",
                      }}
                    >
                      <p> Number of Students in Level 3 (5-6 years)</p>
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
                      <h1>{overallData.level3_students}</h1>
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
                        paddingTop: "25px",
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
                      <h1>{overallData.activated_users}</h1>
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
                        paddingTop: "25px",
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
                      <h1>{overallData.active_users}</h1>
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
                        paddingTop: "25px",
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
                      <h1>{overallData.smartphone_users}</h1>
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
                        paddingTop: "25px",
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
                      <h1>{overallData.non_smartphone_users}</h1>
                    </div>
                  </div>
                </>
              ) : !loading && overallData.length === 0 ? (
                <img src={Nodata} />
              ) : null}
            </div>
          </div>
        </div>
      ) : !loading && filtered && overallData?.length === 0 ? (
        <img src={Nodata} />
      ) : (
        <img src={defaultImage} width={"48%"} />
      )}

      {/*------------------------------Anganwadi Performance------------------------ */}

      <div
        style={{
          display: "flex",
          marginTop: "4%",
          marginLeft: "53%",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            label="Year"
          >
            {yearsArray?.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="month-label">Month</InputLabel>
          <Select
            labelId="month-label"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Month"
            disabled={loading || !selectedYear}
          >
            {selectedYear &&
              monthArr?.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="week-label">Week</InputLabel>
          <Select
            labelId="week-label"
            id="week-select"
            value={selectedWeek}
            onChange={handleWeekChange}
            label="Week"
            disabled={loading || !selectedYear || !selectedMonth}
          >
            {selectedMonth &&
              weekArr?.map((item, index) => (
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
          onClick={filterButtonClickPerformance}
        >
          Filter
        </Button>
        {/* </Box> */}
      </div>

      {loadingPerformance ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
        >
          <Box sx={{ width: "100%", marginTop: "20%" }}>
            <LinearProgress />
          </Box>
        </div>
      ) : !loading && !loadingPerformance && performanceData?.length > 0 ? (
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
                      <h2>{performanceData[0].ts_0to1_users}</h2>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        fontSize: "0.7rem", // Reduced font size
                      }}
                    >
                      <h1>{performanceData[0].ts_0to1_avgTs}</h1>
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
                      <h2>{performanceData[0].ts_2to15_users}</h2>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        fontSize: "0.7rem", // Reduced font size
                      }}
                    >
                      <h1>{performanceData[0].ts_2to15_avgTs}</h1>
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
                      <h2>{performanceData[0].ts_16to30_users}</h2>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        fontSize: "0.7rem", // Reduced font size
                      }}
                    >
                      <h1>{performanceData[0].ts_16to30_avgTs}</h1>
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
                      <h2>{performanceData[0].ts_31to45_users}</h2>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        fontSize: "0.7rem", // Reduced font size
                      }}
                    >
                      <h1>{performanceData[0].ts_31to45_avgTs}</h1>
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
                      <h2>{performanceData[0].ts_45plus_users}</h2>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        fontSize: "0.7rem", // Reduced font size
                      }}
                    >
                      <h1>{performanceData[0].ts_45plus_avgTs}</h1>
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      ) : !loading &&
        !loadingPerformance &&
        filtered &&
        Object.keys(performanceData).length === 0 ? (
        <img src={Nodata} />
      ) : (
        <img src={defaultImage2} width={"33%"} />
      )}

      <div>
        <canvas ref={chartRef}></canvas>
      </div>
      {/* <DynamicModal
        open={open}
        loading={loading}
        handleClose={handleClose}
        modalTitle={modalTitle}
        tableHeaders={tableHeaders}
        tableData={tableData}
        xlData={xlData}
        fileName={fileName}
      /> */}
      <ToastContainer />
    </div>
  );
};

export default AnganwadiWise;
