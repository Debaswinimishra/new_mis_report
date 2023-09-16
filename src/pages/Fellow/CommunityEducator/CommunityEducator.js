import { useEffect, useState } from "react";
import * as React from "react";
import Text from "../../../ReusableComponents/Text";
import Select1 from "../../../ReusableComponents/Select1";
import Fields from "../../../ReusableComponents/Fields";
import Logo from "../../../ReusableComponents/Logo";
import Links from "../../../ReusableComponents/Links";
import Number from "../../../ReusableComponents/Number";
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
} from "./CommunityEducatorApi";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const managerTypeSet = [
  { value: "none", label: "none" },
  { value: "MANAGER", label: "MANAGER" },
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

  const tabContents = [
    <div key={0}>First Tab</div>,
    <div key={1}>Second Tab</div>,
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  // const fetchDataForTab = async (tabIndex) => {
  //   // Your data fetching logic here based on the tab index
  //   if (tabIndex === 0) {
  //     try {
  //       const response = await getAllCommunityEducatiorFilter();
  //       setManagerArr(response.data.resData);
  //     } catch (err) {
  //       console.log("err--->", err.response.status);
  //     }
  //   } else if (tabIndex === 1) {
  //     try {
  //       const response2 = await getAllDistricts();
  //       console.log("response--->", response2.data);
  //       setDistricts(response2.data);
  //     } catch (err) {
  //       console.log("err--->", err.response.status);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchDataForTab(tabValue);
  // }, [tabValue]);

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
    if (element.managerid === managerName) {
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
    setManagerType(event.target.value);
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };

  const handlePasscodeChangeTab2 = (event) => {
    setPasscodeTab2(event.target.value);
  };

  const sortteacher = async () => {
    if (selectedYear === "" || managerName === "" || passcode === "") {
      return alert("Please select some filters to preceed");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      year: selectedYear,
      passcode: passcode,
      managerid: managerName,
      managerType: managerType,
    };
    setLoaded(false);
    try {
      const res = await Api.post(`sortteacher`, body, config);
      if (res.status === 200) {
        setData(res.data);
        setTotalDataLength(res.data.length);
        setLoaded(true);
      }
    } catch (error) {
      setLoaded(true);
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
    "Reg-Date",
    "Status",
    "Contact Number",
    "GuardianNAme",
    "D.O.B",
    "AADHAR NUMBER",
    "FELLOW QUALIFICATION",
    "GENDER",
    "NO oF STUDENT",
    "TEACHER BASELINE STATUS	",
    "TEACHER BASELINE MARK	",
    "TEACHER ENDLINE STATUS	",
    "TEACHER ENDLINE MARK",
  ];

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Total Educators Trained":
        return row.managername;
      case "Total Students Impacted":
        return row.username;
      case "Total Primary-grade Students Impacted":
        return row.userid;
      case "Total Pre-Primary-grade Students Impacted":
        return row.usertype;
      case "Reg-Date":
        return moment(row.createdon).format(" DD MM YYYY");
      case "Status":
        return row.status;
      case "Contact Number":
        return row.contactnumber;
      case "GuardianNAme":
        return row.usertype;
      case "D.O.B":
        return row.usertype;
      case "AADHAR NUMBER":
        return row.usertype;
      case "FELLOW QUALIFICATION":
        return row.usertype;
      case "GENDER":
        return row.gender;
      case "NO oF STUDENT":
        return row.students;
      case "TEACHER BASELINE STATUS":
        return row.userid;
      case "TEACHER BASELINE MARK":
        return row.userid;
      case "TEACHER ENDLINE STATUS":
        return row.userid;
      case "TEACHER ENDLINE MARK":
        return row.userid;
      default:
        return "";
    }
  };

  const fileName = "fellow";

  const xlData = data.map((x) => {
    const { userid, username, ...exceptBoth } = x;
    return exceptBoth;
  });

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

  return (
    <>
      <div style={{ margin: "10px" }}>
        <Tabs
          value={selectedTabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Tab 1" />
          <Tab label="Tab 2" />
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
                  {managerArr.map((option, index) => (
                    <MenuItem key={index + 1} value={option.managerid}>
                      {option.managername}
                    </MenuItem>
                  ))}
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
                    onClick={sortteacher}
                    style={{ width: 250, height: 40, marginTop: 5 }}
                  >
                    Filter
                  </Button>
                </Stack>
              </div>
            </div>

            {loaded && (
              <>
                {data && data.length > 0 ? (
                  <Fields
                    data={data}
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
                ) : (
                  <Logo />
                )}
              </>
            )}

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
                  value={managerName}
                  onChange={(e) => handleManagerChangeTab2(e)}
                >
                  {managerArr.map((option, index) => (
                    <MenuItem key={index + 1} value={option.managerid}>
                      {option.managername}
                    </MenuItem>
                  ))}
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
                    onClick={sortteacher}
                    style={{ width: 250, height: 40, marginTop: 5 }}
                  >
                    Filter
                  </Button>
                </Stack>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ComunityEducator;
