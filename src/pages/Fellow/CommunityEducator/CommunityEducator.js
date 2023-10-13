import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import loader from "../../../Assets/R.gif";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Text from "../../../ReusableComponents/Text";
import Select1 from "../../../ReusableComponents/Select1";
import PeopleIcon from "@mui/icons-material/People";
import Fields from "../../../ReusableComponents/Fields";
import Logo from "../../../ReusableComponents/Logo";
import Links from "../../../ReusableComponents/Links";
import Number from "../../../ReusableComponents/Number";
import Card from "../../../ReusableComponents/Card";
import moment from "moment/moment";
import Api from "../../../Environment/Api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import ReusableTextField from "../../../ReusableComponents/ReusableTextField";
import {
  getAllCommunityEducatiorFilter,
  getAllDistricts,
  getDistrictsWiseBlocks,
  getCommunityEducator1,
  getCommunityEducator2,
} from "./CommunityEducatorApi";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const managerTypeSet = [
  { value: "none", label: "none" },
  { value: "manager", label: "MANAGER" },
  { value: "Crc", label: "CRC" },
  { value: "Aww", label: "Supervisor" },
  // {id:1, value:"manager"},
  // {id:2, value:"supervisor"},
  // {id:2, value:"supervisor"},
];

const ComunityEducator = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedYearTab2, setSelectedYearTab2] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  const [managerType, setManagerType] = useState("");
  console.log("managerType--->", managerType);
  const [managerTypeTab2, setManagerTypeTab2] = useState("");
  console.log("managerTypeTab2--->", managerTypeTab2);
  const [passcode, setPasscode] = useState("");
  const [passcodeTab2, setPasscodeTab2] = useState("");
  const [managerName, setManagerName] = useState("");
  // console.log("managerName--->", managerName);
  const [managerNameTab2, setManagerNameTab2] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtName, setDistrictName] = useState(11);
  const [allBlocks, setAllBlocks] = useState([]);
  const [blockName, setBlockName] = useState(25);
  console.log("====================================blockName", blockName);
  console.log();
  console.log("====================================districtName", districtName);
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  console.log("selectedTabIndex--->", selectedTabIndex);
  const [tab1FilterData, setTab1FilterData] = useState([]);
  console.log("tab1FilterData--->", tab1FilterData);
  const [tab2FilterData, setTab2FilterData] = useState([]);
  console.log("tab2FilterData--->", tab2FilterData);

  const [isFilterButtonClicked, setIsFilterButtonClicked] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  const fetchDataForTab = async (selectedTabIndex) => {
    // Your data fetching logic here based on the tab index
    if (selectedTabIndex === 0) {
      setManagerNameTab2("");
      setPasscodeTab2("");
      setBlockName("");
      setDistrictName("");
      setSelectedYearTab2([]);
      setTab2FilterData([]);
      setManagerTypeTab2("");
      try {
        const response = await getAllCommunityEducatiorFilter();
        setManagerArr(response.data.resData);
      } catch (err) {
        console.log("err--->", err.response.status);
      }
    } else if (selectedTabIndex === 1) {
      setManagerName("");
      setSelectedYear("");
      setPasscode("");
      setTab1FilterData([]);
      setManagerType("");
      try {
        const response1 = await getAllCommunityEducatiorFilter();
        setManagerArr(response1.data.resData);
        const response2 = await getAllDistricts();
        console.log("response--->", response1.data);
        setDistricts(response2.data);
      } catch (err) {
        console.log("err--->", err.response.status);
      }
    }
  };

  useEffect(() => {
    fetchDataForTab(selectedTabIndex);
  }, [selectedTabIndex]);

  // useEffect(() => {
  //   // Api.get(getManagerIdsWidPasscode).then((response) => {
  //   //   setManagerArr(response.data.resData);
  //   // });

  //   const fetchData = async () => {
  //     try {
  //       const response = await getAllCommunityEducatiorFilter();
  //       // console.log("response--->", response.data, response.status);
  //       setManagerArr(response.data.resData);

  //       const response2 = await getAllDistricts();
  //       console.log("response--->", response2.data);
  //       setDistricts(response2.data);
  //     } catch (err) {
  //       console.log("err--->", err.response.status);
  //     }
  //   };

  //   fetchData();
  // }, []);

  let passcodeArray = [];

  managerArr?.filter((element) => {
    if (
      element.managerid === managerName ||
      element.managerid === managerNameTab2
    ) {
      // console.log("x--->", managerName, element);
      passcodeArray = element.passcodes;
    }
  });
  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
    setManagerName("");
    setManagerType("");
    setPasscode("");
    setTab1FilterData([]);
    setIsFilterButtonClicked(false);
    setIsDataAvailable(false);
    setLoaded(false);
  };
  const handleYearChangeTab2 = (selectedYearTab2) => {
    setSelectedYearTab2(selectedYearTab2);
    setManagerNameTab2("");
    setManagerTypeTab2("");
    setPasscodeTab2("");
    setTab2FilterData([]);
    setIsFilterButtonClicked(false);
    setIsDataAvailable(false);
  };
  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
    // console.log("managername---------->", managerName);
  };
  const handleManagerChangeTab2 = (event) => {
    setManagerNameTab2(event.target.value);
    // console.log("managername---------->", managerName);
  };
  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
  };
  const handleManagerTypeChangeTab2 = (event) => {
    setManagerTypeTab2(event.target.value);
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };

  const handlePasscodeChangeTab2 = (event) => {
    setPasscodeTab2(event.target.value);
  };

  const handleDistrictChange = async (e) => {
    const selectedValue = e.target.value;
    // const selectedDistrictName = e.currentTarget.getAttribute("data-name");
    setDistrictName(e.target.value);
    console.log("Selected value:", e);
    // console.log("Selected district name:", selectedDistrictName);
    const response = await getDistrictsWiseBlocks(e.target.value);
    console.log("block response---->", response.data);
    setAllBlocks(response.data);
  };

  const handleBlockChange = (e) => {
    console.log("block--->", e.target.value);
    setBlockName(e.target.value);
  };

  const handleCommunityEducatorTab1 = async () => {
    setLoaded(true);
    if (selectedYear === "" || managerName === "" || passcode === "") {
      // return
      alert("Please select some filters to preceed");
      setLoaded(false);
    } else {
      const body = {
        year: selectedYear,
        managerName: managerName,
        passcode: passcode,
      };
      const response = await getCommunityEducator1(body);
      console.log("community--->", response.data, response.status);
      if (response.status === 200) {
        setLoaded(false);
        setTab1FilterData(response.data);
        setIsFilterButtonClicked(true);
        setIsDataAvailable(response.data.length > 0);
      }
    }
  };

  const handleCommunityEducatorTab2 = async () => {
    setLoaded(true);
    if (
      selectedYearTab2 === "" ||
      managerNameTab2 === "" ||
      passcodeTab2 === ""
    ) {
      // return
      alert("Please select some filters to preceed");
      setLoaded(false);
    } else {
      const body = {
        year: selectedYearTab2,
        managerName: managerNameTab2,
        passcode: passcodeTab2,
        districtName: districtName,
        blockName: blockName,
      };
      const response = await getCommunityEducator2(body);
      console.log("community2--->", response.data);
      if (response.status === 200) {
        setLoaded(false);
        setTab2FilterData(response.data);
        setIsFilterButtonClicked(true);
        setIsDataAvailable(response.data.length > 0);
      }
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const columns = [
    "Serial No",
    "Total Educators Trained",
    "Total Students Impacted",
    "Total Primary-grade Students Impacted",
    "Total Pre-Primary-grade Students Impacted",
  ];

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Total Educators Trained":
        return row.totalUsersCount;
      case "Total Students Impacted":
        return row.totalStudentsCount;
      case "Total Primary-grade Students Impacted":
        return row.pgeStudentsCount;
      case "Total Pre-Primary-grade Students Impacted":
        return row.eceStudentsCount;
      default:
        return "";
    }
  };

  const columns1 = ["Serial No", "Total Active Educator"];

  const getCellValue1 = (row, column, index) => {
    console.log("2---->", row);
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Total Active Educator":
        return row.activeUsersCount;

      default:
        return "";
    }
  };

  const fileName = "community Educator";

  const xlData =
    tab1FilterData.length > 0
      ? tab1FilterData?.map((x) => {
          const {
            averageTimeSpent,
            femaleStudentsCount,
            femaleUsersCount,
            activeUsersCount,

            ...exceptBoth
          } = x;
          return exceptBoth;
        })
      : null;
  const xlDatas =
    tab2FilterData.length > 0
      ? tab2FilterData?.map((x) => {
          const {
            eceStudentsCount,
            averageTimeSpent,
            femaleStudentsCount,
            femaleUsersCount,
            pgeStudentsCount,
            totalStudentsCount,
            totalUsersCount,

            ...exceptBoth
          } = x;
          return exceptBoth;
        })
      : null;

  return (
    <>
      <div style={{ margin: "10px" }}>
        <Tabs
          value={selectedTabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Overall - Community Educators" wrapped />
          <Tab label="Community Educators - Active" />
        </Tabs>

        {selectedTabIndex === 0 && (
          <>
            <div
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
              }}
            >
              <div
                style={{
                  marginTop: "20px",
                  padding: "30px 20px",
                  display: "grid",
                  gap: "20px",

                  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                }}
              >
                <Select1
                  selectedYear={selectedYear}
                  onChange={handleYearChange}
                />

                {/* <Text
                  name="Select manager-type"
                  currencies={managerTypeSet}
                  handleChange={handleManagerTypeChange}
                /> */}

                {/* <ReusableTextField
                  label="Select Manager Type"
                  value={managerType}
                  options={managerTypeSet}
                  onChange={handleManagerTypeChange}
                /> */}

                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select manager Type"
                  defaultValue="none"
                  value={managerType}
                  onChange={(e) => handleManagerTypeChange(e)}
                >
                  {managerTypeSet.map((option, index) => (
                    <MenuItem key={index + 1} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select manager"
                  defaultValue="none"
                  value={managerName}
                  onChange={(e) => handleManagerChange(e)}
                >
                  {managerType === "manager"
                    ? managerArr.map((option, index) => (
                        <MenuItem key={index + 1} value={option.managerid}>
                          {option.managername}
                        </MenuItem>
                      ))
                    : null}

                  {/* 
                  {managerArr.map((option, index) => (
                    <MenuItem key={index + 1} value={option.managerid}>
                      {managerType === "manager" ? option.managername : null}
                    </MenuItem>
                  ))} */}
                </TextField>

                <ReusableTextField
                  label="Select passcode"
                  value={passcode}
                  options={passcodeArray}
                  onChange={handlePasscodeChange}
                />

                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    onClick={handleCommunityEducatorTab1}
                    style={{ width: 250, height: 40, marginTop: 5 }}
                  >
                    Filter
                  </Button>
                </Stack>
              </div>
            </div>
            {/* {loaded && ( */}

            {loaded ? (
              <img src={loader} />
            ) : !isFilterButtonClicked ? null : !isDataAvailable ? (
              <Logo />
            ) : (
              <div
                style={{
                  padding: "30px 20px",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <Fields
                  data={tab1FilterData}
                  totalDataLength={totalDataLength}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  xlData={xlData}
                  fileName={fileName}
                  columns={columns}
                  getCellValue={getCellValue}
                />
              </div>
            )}

            {}
            {/* // )} */}
            <Links />
          </>
        )}

        {selectedTabIndex === 1 && (
          <>
            <div
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
              }}
            >
              <div
                style={{
                  marginTop: "20px",
                  padding: "30px 20px",
                  display: "grid",
                  gap: "20px",

                  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                }}
              >
                <Select1
                  selectedYear={selectedYearTab2}
                  onChange={handleYearChangeTab2}
                />
                {/* <Text
                  name="Select manager-type"
                  currencies={managerTypeSet}
                  handleChange={handleManagerTypeChangeTab2}
                /> */}

                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select manager Type"
                  defaultValue="none"
                  value={managerTypeTab2}
                  onChange={(e) => handleManagerTypeChangeTab2(e)}
                >
                  {managerTypeSet.map((option, index) => (
                    <MenuItem key={index + 1} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select manager"
                  defaultValue="none"
                  value={managerNameTab2}
                  onChange={(e) => handleManagerChangeTab2(e)}
                >
                  {managerTypeTab2 === "manager"
                    ? managerArr.map((option, index) => (
                        <MenuItem key={index + 1} value={option.managerid}>
                          {option.managername}
                        </MenuItem>
                      ))
                    : null}
                </TextField>

                <ReusableTextField
                  label="Select passcode"
                  value={passcodeTab2}
                  options={passcodeArray}
                  onChange={handlePasscodeChangeTab2}
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select districts"
                  defaultValue="none"
                  value={districtName}
                  onChange={(e) => handleDistrictChange(e)}
                >
                  {districts?.map((option, index) => (
                    <MenuItem
                      key={index + 1}
                      value={option._id}
                      data-name={option.districtname}
                    >
                      {option.districtname}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select Blocks"
                  defaultValue="none"
                  value={blockName}
                  onChange={(e) => handleBlockChange(e)}
                >
                  {allBlocks.map((option, index) => (
                    <MenuItem key={index + 1} value={option._id}>
                      {option.blockname}
                    </MenuItem>
                  ))}
                </TextField>

                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    onClick={handleCommunityEducatorTab2}
                    style={{ width: 250, height: 40, marginTop: 5 }}
                  >
                    Filter
                  </Button>
                </Stack>
              </div>
            </div>

            {loaded ? (
              <img src={loader} />
            ) : (
              <>
                {isFilterButtonClicked && tab2FilterData.length > 0 ? (
                  <div style={{ padding: "30px 20px", width: "100%" }}>
                    <div>
                      <Fields
                        data={tab2FilterData}
                        totalDataLength={totalDataLength}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        fileName={fileName}
                        xlData={xlDatas}
                        columns={columns1}
                        getCellValue={getCellValue1}
                      />
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ComunityEducator;
