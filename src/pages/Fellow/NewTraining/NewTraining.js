import { useEffect, useState } from "react";
import * as React from "react";
import Text from "../../../ReusableComponents/Text";
import Select1 from "../../../ReusableComponents/Select1";
import Fields from "../../../ReusableComponents/Fields";
import Logo from "../../../ReusableComponents/Logo";
import Links from "../../../ReusableComponents/Links";
import Number from "../../../ReusableComponents/Number";
import moment from "moment/moment";
import Api from "../../../environment/Api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ReusableTextField from "../../../ReusableComponents/ReusableTextField";
import { getAllCommunityEducatiorFilter } from "../../Fellow/CommunityEducator/CommunityEducatorApi";
import { getAllTeacherTrainingDetails } from "./NewTrainingApi"; //
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const managerTypeArr = [
  { id: 1, value: "MANAGER", label: "Manager" },
  { id: 2, value: "Crc", label: "CRC" },
  { id: 3, value: "Aww", label: "Supervisor" },
];
const trainingTypeArray = [
  { id: 1, value: "training1", label: "21st" },
  { id: 2, value: "training2", label: "Tech" },
  { id: 3, value: "training3", label: "Pedagogy" },
];
const reportTypeArr = [
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

const noneValue = [{ value: "none", label: "None" }];

const NewTraining = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [managerName, setManagerName] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [reportType, setReportType] = useState("topicWise");

  const [moduleData, setModuleData] = useState([]);
  const [subModuleData, setSubModuleData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = React.useState("three");

  const handleChange = (newValue) => {
    setValue(newValue);

    switch (newValue) {
      case "one":
        setReportType("modulewise");
        break;
      case "two":
        setReportType("submodleWise");
        break;
      case "three":
        setReportType("topicWise");
        break;
      default:
        setReportType("topicWise");
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCommunityEducatiorFilter();
        setManagerArr(response.data.resData);
      } catch (err) {}
    };
    fetchData();
  }, []);

  let passcodeArray = [];

  managerArr?.filter((element) => {
    if (element.managerid === managerName) {
      passcodeArray = element.passcodes;
    }
  });

  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
    setManagerName("");
    setManagerType("");
    setPasscode("");
    setTrainingType("");
  };
  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
    setManagerName("");
    setPasscode("");
    setTrainingType("");
  };

  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
    setManagerType("");
    setPasscode("");
    setTrainingType("");
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
    setTrainingType("");
  };
  const handleTrainingTypeChange = (event) => {
    if (event.target.value) {
      setTrainingType(event.target.value);
    }
  };
  const handleReportTypeChange = (event) => {};

  const onfilter = async () => {
    if (
      selectedYear === "" ||
      managerName === "" ||
      passcode === "" ||
      trainingType === ""
    ) {
      return alert("Please select all the filters to proceed");
    }

    const body = {
      year: selectedYear,
      managerid: managerName,
      passcode: passcode,
      trainingType: trainingType,
      reportType: reportType,
    };
    setLoaded(false);
    try {
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
      default:
        return "";
    }
  };

  const fileName = "fellow";

  const xlModuleData = Array.isArray(moduleData)
    ? moduleData.map((x) => {
        if (x) {
          const { ...exceptBoth } = x;
          return exceptBoth;
        }

        return {};
      })
    : [];

  const xlSubModuleData = Array.isArray(subModuleData)
    ? subModuleData.map((x) => {
        if (x) {
          const { ...exceptBoth } = x;
          return exceptBoth;
        }
        return {};
      })
    : [];

  const xlTopicData = Array.isArray(topicData)
    ? topicData.map((x) => {
        ////console.log("xlTopicData", x);
        if (x) {
          const { ...exceptBoth } = x;
          return exceptBoth;
        }
        return {};
      })
    : [];

  //console.log("value-------------->", value);
  //console.log("selectedYear-------------->", selectedYear);
  //console.log("managerType-------------->", managerType);
  //console.log("managerName-------------->", managerName);
  //console.log("passcode-------------->", passcode);
  //console.log("trainingType-------------->", trainingType);
  //console.log("topicData------------------>", topicData);
  //console.log("trainingType--------------->", trainingType);

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
                width: "100%",
                marginTop: "20px",
                padding: "30px 20px",
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                overflow: "hidden",
              }}
            >
              <Select1
                selectedYear={selectedYear}
                onChange={handleYearChange}
              />
              {selectedYear ? (
                <Text
                  name="Select manager-type"
                  currencies={managerTypeArr}
                  handleChange={handleManagerTypeChange}
                />
              ) : (
                <Text name="Select manager-type" currencies={[]} />
              )}

              {selectedYear ? (
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
              ) : (
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select manager"
                  defaultValue="none"
                  value=""
                  onChange={(e) => handleManagerChange(e)}
                >
                  <MenuItem value="None">None</MenuItem>
                </TextField>
              )}

              {selectedYear && managerType ? (
                <ReusableTextField
                  label="Select passcode"
                  value={passcode}
                  options={passcodeArray}
                  onChange={handlePasscodeChange}
                />
              ) : (
                <ReusableTextField
                  label="Select passcode"
                  defaultValue="none"
                  value={passcode}
                  options={passcodeArray}
                  onChange={handlePasscodeChange}
                />
              )}

              {passcode && selectedYear && managerName ? (
                <Text
                  name="Select Training type"
                  currencies={trainingTypeArray}
                  handleChange={handleTrainingTypeChange}
                />
              ) : (
                <Text
                  name="Select Training type"
                  currencies={[]}
                  handleChange={handleTrainingTypeChange}
                />
              )}

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

          <Links />
        </>
      </Box>
    </>
  );
};

export default NewTraining;
