import React, { useEffect, useState } from "react";
import Links from "../../../ReusableComponents/Links";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import loader from "../../../Assets/R.gif";
import Download from "../../../downloads/ExportCsv";
import Select1 from "../../../ReusableComponents/Select1";
import ReusableTextField from "../../../ReusableComponents/ReusableTextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import { getAllCommunityEducatiorFilter } from "../../AllApi/ComunityEducator";
import { getAllCommunityEducatiorFilter } from "../../Fellow/CommunityEducator/CommunityEducatorApi";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { studentProgressApi } from "./StudentProgressReportApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5e72e4",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const managerTypeArr = [
  { id: 0, value: "none", label: "none" },
  { id: 1, value: "MANAGER", label: "MANAGER" },
  { id: 2, value: "Crc", label: "CRC" },
  { id: 3, value: "Aww", label: "Supervisor" },
];
const ActivityTypeArr = [
  { id: 0, value: "none", label: "none" },
  { id: 1, value: "pge", label: "PGE" },
  { id: 2, value: "ece", label: "ECE" },
  { id: 3, value: "fln", label: "FLN" },
];

const noneValue = [{ value: "none", label: "None" }];

const StudentProgressReport = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  // console.log("managerArr===>", managerArr);
  const [topicArr, setTopicArr] = useState([]);
  // console.log("topicArr===>", topicArr);
  const [questionArr, setQuestionArr] = useState([]);
  // console.log("questionArr--->", questionArr);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [managerName, setManagerName] = useState("");
  const [activityType, setActivityType] = useState("");
  console.log("activityType", activityType);

  const [data, setData] = useState([]);
  console.log("data===========================>", data);
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = React.useState("one");
  const [selectedFilter, setSelectedFilter] = useState(false); // Default to "topic"
  console.log("selectedFilter===>", selectedFilter);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCommunityEducatiorFilter();
        console.log("response--->", response.data, response.status);
        setManagerArr(response.data.resData);
      } catch (err) {
        console.log("err--->", err.response.status);
      }
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
    setManagerType("");
    setManagerName("");
    setPasscode("");
    setActivityType("");
    setSelectedYear(selectedYear);
  };

  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
    setManagerName("");
    setPasscode("");
    setActivityType("");
  };

  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
    setPasscode("");
    setActivityType("");
  };

  const handlePasscodeChange = async (event) => {
    setPasscode(event.target.value);
    setActivityType("");
  };

  const handleActivtyChange = async (event) => {
    setActivityType(event.target.value);
  };

  const ActivityFilter = async () => {
    if (
      selectedYear === "" ||
      managerName === "" ||
      passcode === "" ||
      activityType === ""
    ) {
      return alert("Please select all filters to proceed");
    }
    try {
      setLoaded(true);
      const filterCriteria = {
        year: selectedYear,
        managerid: managerName,
        activityType: activityType,
        passcode: passcode,
      };

      const data = await studentProgressApi(filterCriteria);

      setData(data);
      setTotalDataLength(data.length);
      setLoaded(false);
    } catch (error) {
      console.error("Error--->", error);
      setLoaded(false);
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
    "Year",
    "Manager name",
    "Userid",
    "User Name",
    "Student Name",
    "program",
    "class",
    "skill Name",
    "status",
  ];

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Year":
        return row.year;
      case "Manager name":
        return row.managername;
      case "Userid":
        return row.userid;
      case "User Name":
        return row.username;
      case "Student Name":
        return row.studentname;
      case "program":
        return row.program;
      case "class":
        return row.class;
      case "skill Name":
        return row.skillName ? row.skillName : "N/A";
      case "status":
        return row.CompletionStatus ? "Complete" : "Incomplete";
      default:
        return "";
    }
  };

  const fileName = "student progress report";

  const xlData = data.map((x) => {
    const { ...exceptBoth } = x;
    return exceptBoth;
  });
  return (
    <>
      <div style={{ margin: "10px" }}></div>
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
                  value=""
                  options={passcodeArray}
                  onChange={handlePasscodeChange}
                />
              )}

              {selectedYear && managerType && managerName ? (
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select ActivityType"
                  defaultValue="none"
                  value={activityType}
                  onChange={handleActivtyChange}
                >
                  {ActivityTypeArr.map((option, index) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select Activity Type"
                  defaultValue="none"
                  value=""
                  onChange={handleActivtyChange}
                >
                  <MenuItem value="None">None</MenuItem>
                </TextField>
              )}

              {/* ... Further code ... */}

              {/* <TextField
                  id="outlined-select-currency"
                  select
                  label="Select Question"
                  defaultValue="none"
                  value={questionName}
                  onChange={handleQuestionChange}
                >
                  {questionArr?.map((option, index) => (
                    <MenuItem key={option.question} value={option.questionId}>
                      {option.question}
                    </MenuItem>
                  ))}
                </TextField> */}

              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  onClick={ActivityFilter}
                  style={{ width: 250, height: 40, marginTop: 5 }}
                >
                  Filter
                </Button>
              </Stack>
            </div>
          </div>

          {/* Display data */}
          {loaded ? (
            <img src={loader} />
          ) : (
            <>
              {data && data?.length > 0 ? (
                <TableContainer
                  component={Paper}
                  sx={{
                    marginTop: 3,
                    width: "100%",
                    borderRadius: "6px",
                    maxHeight: "800px",
                  }}
                >
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <StyledTableCell key={column}>
                            {column}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(data) &&
                        data
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => (
                            <StyledTableRow key={index}>
                              {columns.map((column, columnIndex) => (
                                <StyledTableCell key={columnIndex}>
                                  {getCellValue(row, column, index)}
                                </StyledTableCell>
                              ))}
                            </StyledTableRow>
                          ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    count={totalDataLength}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  <Download csvData={xlData} fileName={fileName} />
                </TableContainer>
              ) : (
                // <Logo />
                ""
              )}
            </>
          )}
        </>
      </Box>
      {/* )} */}
      {/* {value === "two" && ( */}
    </>
  );
};

export default StudentProgressReport;
