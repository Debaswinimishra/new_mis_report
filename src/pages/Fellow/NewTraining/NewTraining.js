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
// import Modal from "@mui/material/Modal";
import { FormControl, Modal, Grid, Image } from "@mui/material";

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
  const [value, setValue] = React.useState("one");
  const [showFieldsData, setShowFieldsData] = useState(false);

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
        // console.log("response--->", response.data, response.status);
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
    resetFilters();
    setManagerType("");
    setTrainingType("");
    setSelectedYear(selectedYear);
    setShowFieldsData(false);
  };
  const handleManagerChange = (event) => {
    setPasscode("");
    setTrainingType("");
    setManagerName(event.target.value);
    setShowFieldsData(false);
  };
  const handleManagerTypeChange = (event) => {
    setManagerName("");
    setPasscode("");
    setTrainingType("");
    setManagerType(event.target.value);
    setShowFieldsData(false);
  };

  const handlePasscodeChange = (event) => {
    setTrainingType("");
    setPasscode(event.target.value);
    setShowFieldsData(false);
  };
  const handleTrainingTypeChange = (event) => {
    setTrainingType(event.target.value);
  };

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

      setShowFieldsData(true);
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

  const [openModal, setOpenModal] = useState(false);

  const openCertificate = () => {
    setOpenModal(true);
  };

  const closeCertificate = () => {
    setOpenModal(false);
  };

  const handleDownload = () => {
    // Code to trigger PDF download
    // Replace "your-pdf-file.pdf" with your PDF file URL or path
    const pdfUrl = "your-pdf-file.pdf";
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "downloaded-pdf.pdf";
    a.click();
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
      case "Module Completion Status":
        return row.moduleIsComplete ? "Complete" : "Incomplete";
      case "Module Secured Marks":
        return row.moduleSecuredMarks;
      case "Module Total Marks":
        return row.moduleTotalMarks;
      case "Module Certificate":
        return row.moduleCertificate ? (
          <Button onClick={openCertificate}>Certificate</Button>
        ) : (
          "Not generated"
        );
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
      case "Submodule Completion Status":
        return row.submoduleIsComplete ? "Complete" : "Incomplete";
      case "Submodule Secured Marks":
        return row.submoduleSecuredMarks;
      case "Submodule Total Marks":
        return row.submoduleTotalMarks;
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

  const moduleExcel = "moduleWiseTraining";
  const submoduleExcel = "subModuleWiseTraining";
  const topicExcel = "TopicWiseTraining";

  const xlModuleData = Array.isArray(moduleData)
    ? moduleData.map((x) => {
        if (x) {
          const { moduleIsComplete, ...rest } = x;
          // Map moduleIsComplete to "Complete" or "Incomplete"
          const moduleCompletionStatus = moduleIsComplete
            ? "Complete"
            : "Incomplete";

          return {
            ...rest,
            moduleCompletionStatus, // Replace moduleIsComplete with its mapped value
          };
        }

        return {};
      })
    : [];

  const xlSubModuleData = Array.isArray(subModuleData)
    ? subModuleData.map((x) => {
        if (x) {
          const { submoduleIsComplete, ...rest } = x;
          // Map submoduleIsComplete to "Complete" or "Incomplete"
          const submoduleCompletionStatus = submoduleIsComplete
            ? "Complete"
            : "Incomplete";

          return {
            ...rest,
            submoduleCompletionStatus, // Replace submoduleIsComplete with its mapped value
          };
        }
        return {};
      })
    : [];

  const xlTopicData = Array.isArray(topicData)
    ? topicData.map((x) => {
        // console.log("xlTopicData", x);
        if (x) {
          const { topicIsComplete, ...rest } = x;
          // Map topicIsComplete to "Complete" or "Incomplete"
          const topicCompletionStatus = topicIsComplete
            ? "Complete"
            : "Incomplete";

          return {
            ...rest,
            topicCompletionStatus,
          };
        }
        return {};
      })
    : [];

  const resetFilters = () => {
    setSelectedYear("");
    setManagerName("");
    setManagerType("");
    setPasscode("");
    setTrainingType("");
  };

  console.log("moduledata-------------->", moduleData);
  console.log("openModal-------------->", openModal);

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
            <Modal
              open={openModal}
              onClose={closeCertificate}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <br />
                <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3} style={{ marginTop: 12 }}>
                      <img
                        src="https://shared002.s3.us-east-2.amazonaws.com/Certificate-1695719783777.jpg"
                        alt="image"
                        style={{ height: "200px", width: "200px" }}
                      />
                    </Grid>
                  </Box>
                </FormControl>
                <Button
                  variant="outlined"
                  style={{ marginLeft: 12 }}
                  onClick={closeCertificate}
                >
                  Close
                </Button>
                <Button variant="contained" onClick={handleDownload}>
                  Download
                </Button>
              </Box>
            </Modal>
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
                label="Select Training-type"
                value={trainingType}
                onChange={(e) => handleTrainingTypeChange(e)}
              >
                {selectedYear && selectedYear != ""
                  ? trainingTypeArray?.map((option) => (
                      <MenuItem key={option.id} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))
                  : null}
              </TextField>

              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  onClick={onfilter}
                  style={{ width: "100%", height: "auto", marginTop: "10px" }}
                >
                  Filter
                </Button>
              </Stack>
            </div>
          </div>
          {moduleData?.length > 0 ||
          subModuleData?.length > 0 ||
          topicData?.length > 0 ? (
            <>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
              >
                <Tab value="one" label="Module" wrapped />
                <Tab value="two" label="Submodule" wrapped />
                <Tab value="three" label="Topic" wrapped />
              </Tabs>
              {/* Display data */}

              {/* Display data based on the selected tab */}
              {showFieldsData && (
                <>
                  {loaded && (
                    <>
                      {value === "one" && moduleData.length > 0 ? (
                        <Fields
                          data={moduleData} //
                          totalDataLength={totalDataLength}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}
                          xlData={xlModuleData}
                          fileName={moduleExcel}
                          columns={moduleColumn}
                          getCellValue={getCellValueModule}
                        />
                      ) : (
                        <Logo />
                      )}

                      {value === "two" && subModuleData.length > 0 ? (
                        <Fields
                          data={subModuleData}
                          totalDataLength={totalDataLength}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}
                          xlData={xlSubModuleData}
                          fileName={submoduleExcel}
                          columns={subModuleColumn}
                          getCellValue={getCellValueSubModule}
                        />
                      ) : (
                        <Logo />
                      )}

                      {value === "three" && topicData.length > 0 ? (
                        <Fields
                          data={Array.isArray(topicData) ? topicData : []} //
                          totalDataLength={totalDataLength}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}
                          xlData={xlTopicData}
                          fileName={topicExcel}
                          columns={TopicColumn}
                          getCellValue={getCellValueTopic}
                        />
                      ) : (
                        <Logo />
                      )}
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            // <Logo />
            ""
          )}
          <Links />
        </>
      </Box>
    </>
  );
};

export default NewTraining;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
