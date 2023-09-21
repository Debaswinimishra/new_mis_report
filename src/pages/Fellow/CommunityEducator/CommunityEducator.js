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
  const [passcode, setPasscode] = useState("");
  const [passcodeTab2, setPasscodeTab2] = useState("");
  const [managerName, setManagerName] = useState("");
  // console.log("managerName--->", managerName);
  const [managerNameTab2, setManagerNameTab2] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [allBlocks, setAllBlocks] = useState([]);
  const [blockName, setBlockName] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  console.log("selectedTabIndex--->", selectedTabIndex);
  const [tab1FilterData, setTab1FilterData] = useState({});
  console.log("tab1FilterData--->", tab1FilterData);
  const [tab2FilterData, setTab2FilterData] = useState({});

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
      setTab2FilterData({});
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
      setTab1FilterData({});
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
  //   // Api.get(`getManagerIdsWidPasscode`).then((response) => {
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
  };
  const handleYearChangeTab2 = (selectedYearTab2) => {
    setSelectedYearTab2(selectedYearTab2);
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
      return alert("Please select some filters to preceed");
    } else {
      const response = await getCommunityEducator1(
        selectedYear,
        managerName,
        passcode
      );
      console.log("community--->", response.data, response.status);
      if (response.status === 200) {
        setLoaded(false);
        setTab1FilterData(response.data);
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
      return alert("Please select some filters to preceed");
    } else {
      const response = await getCommunityEducator1(
        selectedYearTab2,
        managerNameTab2,
        passcodeTab2,
        districtName,
        blockName
      );
      console.log("community2--->", response.data);
      if (response.status === 200) {
        setLoaded(false);
        setTab2FilterData(response.data);
      }
    }
  };

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
                <Text
                  name="Select manager-type"
                  currencies={managerTypeSet}
                  handleChange={handleManagerTypeChange}
                />

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
            ) : (
              <>
                {tab1FilterData && Object.keys(tab1FilterData).length > 0 ? (
                  <div
                    style={{
                      padding: "30px 20px",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <div className="container">
                      <Card
                        name="Total Users"
                        number={tab1FilterData.totalStudentsCount || 0}
                        Icon={PeopleIcon}
                      />

                      <Card
                        name="Active Users"
                        number={tab1FilterData.activeUsersCount || 0}
                        Icon={PeopleIcon}
                        style={{ backgroundColor: "red" }}
                      />

                      <Card
                        name="Average Timespent"
                        number={tab1FilterData.averageTimeSpent || 0}
                        Icon={PeopleIcon}
                        style={{ backgroundColor: "red" }}
                      />
                      <Card
                        name="ECE Students"
                        number={tab1FilterData.eceStudentsCount || 0}
                        Icon={PeopleIcon}
                      />

                      <Card
                        name="Female Students"
                        number={tab1FilterData.femaleStudentsCount || 0}
                        Icon={PeopleIcon}
                        style={{ backgroundColor: "red" }}
                      />

                      <Card
                        name="Female Users"
                        number={tab1FilterData.femaleUsersCount || 0}
                        Icon={PeopleIcon}
                        style={{ backgroundColor: "red" }}
                      />
                      <Card
                        name="PGE Students"
                        number={tab1FilterData.pgeStudentsCount || 0}
                        Icon={PeopleIcon}
                        style={{ backgroundColor: "red" }}
                      />

                      <Card
                        name="Total Student"
                        number={tab1FilterData.totalStudentsCount || 0}
                        Icon={PeopleIcon}
                        style={{ backgroundColor: "red" }}
                      />
                    </div>
                  </div>
                ) : (
                  <Logo />
                )}
              </>
            )}

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
                <Text
                  name="Select manager-type"
                  currencies={managerTypeSet}
                  handleChange={handleManagerTypeChangeTab2}
                />

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
                {tab2FilterData && Object.keys(tab2FilterData).length > 0 ? (
                  <div style={{ padding: "30px 20px", width: "100%" }}>
                    <div>
                      {/* <Card
                      name="Total Users"
                      number={tab2FilterData.totalStudentsCount || 0}
                      Icon={PeopleIcon}
                    /> */}

                      <Card
                        name="Active Users"
                        number={tab2FilterData.activeUsersCount || 0}
                        Icon={PeopleIcon}
                        style={{ backgroundColor: "red" }}
                      />
                      {/* 
                    <Card
                      name="Average Timespent"
                      number={tab2FilterData.averageTimeSpent || 0}
                      Icon={PeopleIcon}
                      style={{ backgroundColor: "red" }}
                    />
                    <Card
                      name="ECE Students"
                      number={tab2FilterData.eceStudentsCount || 0}
                      Icon={PeopleIcon}
                    />

                    <Card
                      name="Female Students"
                      number={tab2FilterData.femaleStudentsCount || 0}
                      Icon={PeopleIcon}
                      style={{ backgroundColor: "red" }}
                    />

                    <Card
                      name="Female Users"
                      number={tab2FilterData.femaleUsersCount || 0}
                      Icon={PeopleIcon}
                      style={{ backgroundColor: "red" }}
                    />
                    <Card
                      name="PGE Students"
                      number={tab2FilterData.pgeStudentsCount || 0}
                      Icon={PeopleIcon}
                      style={{ backgroundColor: "red" }}
                    />

                    <Card
                      name="Total Student"
                      number={tab2FilterData.totalStudentsCount || 0}
                      Icon={PeopleIcon}
                      style={{ backgroundColor: "red" }}
                    /> */}
                    </div>
                  </div>
                ) : (
                  <Logo />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ComunityEducator;
