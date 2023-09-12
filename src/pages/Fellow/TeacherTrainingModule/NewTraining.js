import { useEffect, useState } from "react";
import * as React from "react";
import Text from "../../../components/Text";
import Select1 from "../../../components/Select1";
import Fields from "../../../components/Fields";
import Logo from "../../../components/Logo";
import Links from "../../../components/Links";
import Number from "../../../components/Number";
import moment from "moment/moment";
import Api from "../../../environment/Api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ReusableTextField from "../../../components/ReusableTextField";
import { getAllCommunityEducatiorFilter } from "../../../AllApi/mangerPasscodeApi";
import { getAllTeacherTrainingDetails } from "./NewTrainingApi";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const managerTypeArr = [
  { id: 0, value: "none", label: "none" },
  { id: 1, value: "MANAGER", label: "MANAGER" },
  { id: 2, value: "Crc", label: "CRC" },
  { id: 3, value: "Aww", label: "Supervisor" },
];
const trainingTypeArray = [
  { id: 0, value: "none", label: "none" },
  { id: 1, value: "training1", label: "21st" },
  { id: 2, value: "training2", label: "Tech" },
  { id: 3, value: "training3", label: "Pedagogy" },
];
const reportTypeArr = [
  { id: 0, value: "none", label: "none" },
  { id: 1, value: "module", label: "Module" },
  { id: 2, value: "subModle", label: "Submodule" },
  { id: 3, value: "topic", label: "Topic" },
];

const moduleColumn = [
  "Serial No",
  "Manager Name",
  "Passcode",
  "User Id",
  "User Name",
  "Contact No",
  "Module Name",
  "Module Completion Status",
  "Module Secured Marks",
  "Module Total Marks",
  "Module Certificate",
];
const subModuleColumn = [
  "Serial No",
  "Manager Name",
  "Passcode",
  "User Id",
  "User Name",
  "Contact No",
  "Submodule Name",
  "Submodule Completion Status",
  "Submodule Secured Marks",
  "Submodule Total Marks",
];
const TopicColumn = [
  "Serial No",
  "Manager Name",
  "Passcode",
  "User Id",
  "User Name",
  "Contact No",
  "Topic Name",
  "Quiz 1 Status",
  "Quiz 1 Secured Mark",
  "Quiz 1 Total Mark",
  "Content Status",
  "Assignment Status",
  "Quiz 2 status",
  "Quiz 2 Secured Mark",
  "Quiz 2 Total Mark",
  "Topic Status",
  "Topic Percentage",
  "Topic Secured Mark",
  "Topic Total Mark",
  "Time spent Status",
];

const NewTraining = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [managerName, setManagerName] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [reportType, setReportType] = useState("topicWise");

  // console.log("managerName--->", managerName);
  const [moduleData, setModuleData] = useState([]);
  const [subModuleData, setSubModuleData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = React.useState("one");

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
        console.log("response--->", response.data, response.status);
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
    setSelectedYear(selectedYear);
  };
  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
    // console.log("managername---------->", managerName);
  };
  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };
  const handleTrainingTypeChange = (event) => {
    setTrainingType(event.target.value);
  };
  const handleReportTypeChange = (event) => {
    // setReportType(topic);
  };

  const onfilter = async () => {
    if (
      selectedYear === "" ||
      managerName === "" ||
      passcode === "" ||
      trainingType === ""
    ) {
      return alert("Please select some filters to proceed");
    }

    const body = {
      year: selectedYear,
      managerid: managerName,
      passcode: passcode,
      trainingType: trainingType,
      reportType: reportType, // Use the current reportType state variable
    };
    setLoaded(false);
    try {
      // Fetch data for Module, Submodule, and Topic
      const moduleResponse = await getAllTeacherTrainingDetails({
        ...body,
        reportType: "moduleWise",
      });
      const subModuleResponse = await getAllTeacherTrainingDetails({
        ...body,
        reportType: "submoduleWise",
      });
      const topicResponse = await getAllTeacherTrainingDetails({
        ...body,
        reportType: "topicWise",
      });

      // Update state variables with the fetched data
      setModuleData(moduleResponse.data);
      setSubModuleData(subModuleResponse.data);
      setTopicData(topicResponse.data);

      setLoaded(true);
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

  const getCellValueModule = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Manager Name":
        return row.managername;
      case "Passcode":
        return row.passcode;
      case "User Id":
        return row.userid;
      case "User Name":
        return row.username;
      case "Contact No":
        return row.contactnumber;
      case "Module Name":
        return row.moduleName;
      //   case "Module Completion Status":
      // return row.contactnumber;
      //   case "Module Secured Marks":
      // return row.usertype;
      //   case "Module Total Marks":
      // return row.usertype;
      //   case "Module Certificate":
      // return row.usertype;
      default:
        return "";
    }
  };
  const getCellValueSubModule = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Manager Name":
        return row.managername;
      case "Passcode":
        return row.passcode;
      case "User Id":
        return row.userid;
      case "User Name":
        return row.username;
      case "Contact No":
        return row.contactnumber;
      case "Submodule Name":
        return row.submoduleName;
      //   case "Submodule Completion Status":
      // return row.contactnumber;
      //   case "Submodule Secured Marks":
      // return row.usertype;
      //   case "Submodule Total Marks":
      // return row.usertype;
      default:
        return "";
    }
  };
  const getCellValueTopic = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Manager Name":
        return row.managername;
      case "Passcode":
        return row.passcode;
      case "User Id":
        return row.userid;
      case "User Name":
        return row.username;
      case "Contact No":
        return row.contactnumber;
      case "Topic Name":
        return row.topicName;
      case "Quiz 1 Status":
        return row.quiz1Status;
      case "Quiz 1 Secured Mark":
        return row.quiz1SecuredMarks;
      case "Quiz 1 Total Mark":
        return row.quiz1TotalMarks;
      case "Content Status":
        return row.contentStatus;
      case "Assignment Status":
        return row.assignmentStatus;
      case "Quiz 2 status":
        return row.quiz2Status;
      case "Quiz 2 Secured Mark":
        return row.quiz2SecuredMarks;
      case "Quiz 2 Total Mark":
        return row.quiz2TotalMarks;
      case "Topic Status":
        return row.topicIsComplete ? "Complete" : "Incomplete";
      case "Topic Percentage":
        return row.topicPercentage;
      case "Topic Secured Mark":
        return row.topicSecuredMarks;
      case "Topic Total Mark":
        return row.topicTotalMarks;
      // case "Time spent Status":
      // return row.usertype;
      default:
        return "";
    }
  };

  const fileName = "fellow";

  // Conditionally map moduleData, subModuleData, and topicData
  const xlModuleData = Array.isArray(moduleData)
    ? moduleData.map((x) => {
        if (x) {
          const { ...exceptBoth } = x;
          return exceptBoth;
        }
        // Handle cases where moduleData doesn't exist (e.g., return an empty object)
        return {};
      })
    : [];

  const xlSubModuleData = Array.isArray(subModuleData)
    ? subModuleData.map((x) => {
        if (x) {
          const { ...exceptBoth } = x;
          return exceptBoth;
        }
        // Handle cases where subModuleData doesn't exist (e.g., return an empty object)
        return {};
      })
    : [];

  const xlTopicData = Array.isArray(topicData)
    ? topicData.map((x) => {
        console.log("xlTopicData", x);
        if (x) {
          const { ...exceptBoth } = x;
          return exceptBoth;
        }
        // Handle cases where topicData doesn't exist (e.g., return an empty object)
        return {};
      })
    : [];
  return (
    <>
      <div className="container">
        <div className="left-div">
          <div>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div>
            <Link to="/fellowdetails">Fellow Details</Link>
          </div>
          <div>
            <Link to="/trainingmodule">Training Module</Link>
          </div>
        </div>
        <div className="right-div">
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
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(230px, 1fr))",
                  }}
                >
                  <Select1
                    selectedYear={selectedYear}
                    onChange={handleYearChange}
                  />
                  <Text
                    name="Select manager-type"
                    currencies={managerTypeArr}
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
                  <Text
                    name="Select Training-type"
                    currencies={trainingTypeArray}
                    handleChange={handleTrainingTypeChange}
                  />

                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      onClick={onfilter}
                      style={{ width: 250, height: 40, marginTop: 5 }}
                    >
                      Filter
                    </Button>
                  </Stack>
                </div>
              </div>
              {
                // moduleData.length > 0 &&
                // subModuleData.length > 0 &&
                topicData.length > 0 ? (
                  <>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="wrapped label tabs example"
                    >
                      {/* <Tab value="one" label="Module" wrapped />
                  <Tab value="two" label="Submodule" wrapped /> */}
                      <Tab value="one" label="Topic" wrapped />
                    </Tabs>
                    {/* Display data */}
                    <>
                      {/* Display data based on the selected tab */}
                      {loaded && (
                        <>
                          {/* {value === "one" ? (
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
                      ) : null} */}

                          {value === "two" ? (
                            <Fields
                              data={subModuleData}
                              totalDataLength={totalDataLength}
                              page={page}
                              rowsPerPage={rowsPerPage}
                              handleChangePage={handleChangePage}
                              handleChangeRowsPerPage={handleChangeRowsPerPage}
                              xlData={xlSubModuleData}
                              fileName={fileName}
                              columns={subModuleColumn}
                              getCellValue={getCellValueSubModule}
                            />
                          ) : null}

                          {value === "one" ? (
                            <Fields
                              data={Array.isArray(topicData) ? topicData : []}
                              totalDataLength={totalDataLength}
                              page={page}
                              rowsPerPage={rowsPerPage}
                              handleChangePage={handleChangePage}
                              handleChangeRowsPerPage={handleChangeRowsPerPage}
                              xlData={xlTopicData}
                              fileName={fileName}
                              columns={TopicColumn}
                              getCellValue={getCellValueTopic}
                            />
                          ) : null}
                        </>
                      )}
                    </>
                  </>
                ) : (
                  ""
                )
              }
              <Links />
            </>
          </Box>
        </div>
      </div>
    </>
  );
};

export default NewTraining;
