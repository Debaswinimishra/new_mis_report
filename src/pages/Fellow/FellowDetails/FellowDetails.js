import { useEffect, useState } from "react";
import * as React from "react";
import Text from "../../../ReusableComponents/Text";
import Select1 from "../../../ReusableComponents/Select1";
import Fields from "../../../ReusableComponents/Fields";
import Logo from "../../../ReusableComponents/Logo";
import Links from "../../../ReusableComponents/Links";
import Number from "../../../ReusableComponents/Number";
import moment from "moment/moment";
// import Api from "../../environment/Api";
import Api from "../../../Environment/Api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ReusableTextField from "../../../ReusableComponents/ReusableTextField";
import { getAllCommunityEducatiorFilter } from "../CommunityEducator/CommunityEducatorApi";
import { getAllTeacherTrainingDetails } from "../NewTraining/NewTrainingApi";
// import { getAllCommunityEducatiorFilter } from "../../Fellow/CommunityEducator/CommunityEducatorApi";
// import { getAllCommunityEducatiorFilter } from "../../AllApi/ComunityEducator";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const managerTypeArr = [
  { value: "none", label: "none" },
  { value: "manager", label: "MANAGER" },
  { value: "Crc", label: "CRC" },
  { value: "Aww", label: "Supervisor" },
];

const moduleColumn = [
  "Serial No",
  "User Name",
  "User Id",
  "No of Students",
  "Gender",
  "Contact Number",
  "Status(Active/Inactive)",
  "Aadhaar Number",
];

const FellowDetails = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  const [managerName, setManagerName] = useState([]);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [allBlocks, setAllBlocks] = useState([]);
  const [blockName, setBlockName] = useState("");

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = React.useState("one");
  const [showFieldsData, setShowFieldsData] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Set reportType based on the selected tab
    switch (newValue) {
      case "one":
        setReportType("modulewise");
        break;
      case "two":
        setReportType("submodleWise"); // Update with the correct spelling
        break;
      case "three":
        setReportType("topicWise");
        break;
      default:
        setReportType("topicWise"); // Default value, change as needed
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCommunityEducatiorFilter();
        // console.log("response--->", response.data, response.status);
        setManagerArr(response.data.resData);
      } catch (err) {
        // console.log("err--->", err.response.status);
      }
    };
    fetchData();
  }, []);

  let passcodeArray = [];

  managerArr?.filter((element) => {
    if (element.managerid === managerName) {
      // console.log("x--->", managerName, element);
      passcodeArray = element.passcodes;
    }
  });
  const handleYearChange = (selectedYear) => {
    setManagerType("");
    setSelectedYear(selectedYear);
    setShowFieldsData(false);
  };
  const handleManagerTypeChange = (event) => {
    setManagerName("");
    setPasscode("");
    setManagerType(event.target.value);
    setShowFieldsData(false);
  };
  const handleManagerChange = (event) => {
    setPasscode("");
    setManagerName(event.target.value);
    setShowFieldsData(false);
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
    setShowFieldsData(false);
  };
  //   const handleDistrictChange = async (e) => {
  //     const selectedValue = e.target.value;
  //     // const selectedDistrictName = e.currentTarget.getAttribute("data-name");
  //     setDistrictName(e.target.value);
  //     console.log("Selected value:", e);
  //     // console.log("Selected district name:", selectedDistrictName);
  //     const response = await getDistrictsWiseBlocks(e.target.value);
  //     console.log("block response---->", response.data);
  //     setAllBlocks(response.data);
  //   };

  const handleBlockChange = (e) => {
    console.log("block--->", e.target.value);
    setBlockName(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const getCellValueModule = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "User Name":
        return row.username;
      case "User Id":
        return row.userid;
      case "No of Students":
        return row.noOfStudent;
      case "Gender":
        return row.gender;
      case "Contact Number":
        return row.ContactNumber;
      case "Status(Active/Inactive)":
        return row.Status;
      case "Aadhaar Number":
        return row.AadhaarNumber;
      default:
        return "";
    }
  };

  //   const fileName = "fellow";

  //   // Conditionally map moduleData, subModuleData, and topicData
  //   const xlModuleData = Array.isArray(moduleData)
  //     ? moduleData.map((x) => {
  //         if (x) {
  //           const { ...exceptBoth } = x;
  //           return exceptBoth;
  //         }
  //         // Handle cases where moduleData doesn't exist (e.g., return an empty object)
  //         return {};
  //       })
  //     : [];

  const resetFilters = () => {
    setSelectedYear("");
    setManagerName("");
    setManagerType("");
    setPasscode("");
    // setTrainingType("");
  };

  return (
    <>
      <Box>
        {/* Filter section */}
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
              <TextField
                id="outlined-select-currency"
                select
                label="Select manager-type"
                value={managerType}
                onChange={(e) => handleManagerTypeChange(e)}
              >
                {selectedYear && selectedYear != ""
                  ? managerTypeArr?.map((option) => (
                      <MenuItem key={option.id} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))
                  : null}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="Select manager"
                defaultValue="none"
                value={managerName}
                onChange={(e) => handleManagerChange(e)}
              >
                {selectedYear && selectedYear != ""
                  ? managerArr.map((option, index) => (
                      <MenuItem key={index + 1} value={option.managerid}>
                        {option.managername}
                      </MenuItem>
                    ))
                  : null}
              </TextField>

              <ReusableTextField
                label="Select passcode"
                value={passcode}
                options={passcodeArray}
                onChange={handlePasscodeChange}
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
                  // onClick={onfilter}
                  style={{ width: "100%", height: "auto", marginTop: "10px" }}
                >
                  Filter
                </Button>
              </Stack>
            </div>
          </div>
          {/* {topicData.length > 0 ? (
            <>
              {showFieldsData && (
                <>
                  {loaded && (
                    <>
                      <Fields
                        data={moduleData}
                        totalDataLength={totalDataLength}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        xlData={xlModuleData}
                        fileName={fileName}
                        columns={moduleColumn}
                        getCellValue={getCellValueModule}
                      />
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <Logo />
          )} */}
          <Links />
        </>
      </Box>
    </>
  );
};

export default FellowDetails;
