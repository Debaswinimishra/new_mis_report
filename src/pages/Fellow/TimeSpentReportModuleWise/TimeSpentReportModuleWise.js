import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
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
import moment from "moment";
import { getAllCommunityEducatiorFilter } from "../CommunityEducator/CommunityEducatorApi";
import { getAllTimespentData } from "./TimeSpentReportModuleWise.Api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Logo from "../../../ReusableComponents/Logo";
import Loader from "../../../ReusableComponents/Loader";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
// import Links from "../../../ReusableComponents/Links";

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

const monthArr = [
  //   { value: "none", label: "none" },
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

const moduleColumn = [
  "Serial No",
  "User Name",
  "Manager Name",
  "Passcode",
  "Pedagogy",
  "21st century",
  "Technology",
  "ECE acitivity",
  "PGE activity",
  "FLN",
  "Community Engagement",
  "Student Assessment",
  "Survey",
  "Book",
];

const TimeSpentReportModuleWise = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  const [managerName, setManagerName] = useState([]);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [districts, setDistricts] = useState([]);
  const [page, setPage] = useState(0);
  const [districtName, setDistrictName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loaded, setLoaded] = useState(false);
  const [month, setMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStudents, setSearchedStudents] = useState([]);

  const currentYear = new Date().getFullYear();

  const currentMonth = new Date().getMonth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCommunityEducatiorFilter(selectedYear);
        setManagerArr(response.data.resData);
      } catch (err) {
        console.log("err--->", err.response.status);
      }
    };
    fetchData();
  }, []);

  let passcodeArray = [];
  let districtArr = [];

  managerArr?.filter((element) => {
    if (element?.managerid === managerName) {
      passcodeArray = element?.passcodes;
      districtArr = element?.distBlocks;
      districtArr?.filter((element) => {
        if (element?.districtid === districtName) {
          blocksArr = element?.blocks;
        }
      });
    }
  });

  const handleYearChange = async (selectedYear) => {
    setMonth("");
    setManagerType("");
    setManagerName("");
    setPasscode("");
    setTotalDataLength(0);
    setSelectedYear(selectedYear);
    const response = await getAllCommunityEducatiorFilter(selectedYear);
    setManagerArr(response.data.resData);
  };

  const handleMonthChange = (event) => {
    if (
      parseInt(selectedYear) === currentYear &&
      event.target.value > currentMonth + 1
    ) {
      alert("You can't select a month beyond the current month");
    } else {
      setMonth(event.target.value);
      setManagerName("");
      setPasscode("");
    }
  };

  const handleManagerChange = (event) => {
    setPasscode("");
    // setFilteredData([]);
    setTotalDataLength(0);
    setManagerName(event.target.value);
    // setShowFieldsData(false);
  };

  const handlePasscodeChange = async (event) => {
    // setFilteredData([]);
    setTotalDataLength(0);
    setPasscode(event.target.value);

    // setShowFieldsData(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const fetchFilteredData = async () => {
    try {
      if (!selectedYear) {
        alert("Please select year before filtering.");
        return;
      } else if (!month) {
        alert("Please select a month before filtering");
        return;
      }

      setLoaded(true);
      const filterCriteriaWithBlockAndDistrict = {
        year: parseInt(selectedYear),
        month: parseInt(month),
        managerid: managerName,
        passcode: passcode,
      };

      const data = await getAllTimespentData(
        filterCriteriaWithBlockAndDistrict
      );

      setLoaded(false);
      console.log("data----->", data.data);

      if (data.data.length === 0) {
        setFilteredData([]);
        alert("No data found");
      } else if (data.data.length > 0) {
        console.log("data got from api------>", data);
        setFilteredData(data.data);
        setTotalDataLength(data.length);
      }
    } catch (error) {
      setLoaded(false);
      console.error("Error:", error);
      alert("An error occurred while fetching data");
    } finally {
      setLoaded(false);
    }
  };

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "User Name":
        return row.username;
      case "Manager Name":
        return row.managername;
      case "Passcode":
        return row.passcode;
      case "Pedagogy":
        return row.training3;
      case "21st century":
        return row.training1;
      case "Technology":
        return row.training2;
      case "ECE acitivity":
        return row.eceactivity;
      case "PGE activity":
        return row.pgeactivity;
      case "FLN":
        return row.fln;
      case "Community Engagement":
        return row.communityActivity;
      case "Student Assessment":
        return row.studentAssessment;
      case "Survey":
        return row.tchSurvey;
      case "Book":
        return row.reading;
      default:
        return "";
    }
  };

  const searchStudentFromFilteredData = (e) => {
    if (e.target.value) {
      const mySearchedStudents = filteredData.filter((item) => {
        return item.username.includes(e.target.value.toLowerCase());
      });
      setSearchedStudents(mySearchedStudents);
      setSearchQuery(e.target.value);
      console.log("searched students--------->", searchedStudents);
    } else {
      setSearchedStudents([]);
      setSearchQuery("");
    }
  };

  const fileName = "OverallTimespent";

  const xlData = filteredData.map((x) => {
    const { ...exceptBoth } = x;
    return exceptBoth;
  });

  return (
    <Box>
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
          <Select1 selectedYear={selectedYear} onChange={handleYearChange} />

          <TextField
            id="outlined-select-currency"
            select
            label="Select month"
            value={month}
            onChange={(e) => handleMonthChange(e)}
          >
            <MenuItem value="">None</MenuItem>
            {selectedYear && selectedYear != ""
              ? monthArr?.map((option) => (
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
            <MenuItem value="">None</MenuItem>
            {Array.isArray(managerArr)
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
            onChange={(e) => handlePasscodeChange(e)}
          />

          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={fetchFilteredData}
              style={{ width: "100%", height: "auto", marginTop: "10px" }}
            >
              Filter
            </Button>
          </Stack>
        </div>
      </div>
      {loaded ? (
        <Loader />
      ) : selectedYear && filteredData && filteredData.length > 0 ? (
        <>
          <TextField
            fullWidth
            id="fullWidth"
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={searchStudentFromFilteredData}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setSearchQuery("")}
                  edge="end"
                  aria-label="clear search input"
                >
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
          <TableContainer
            component={Paper}
            sx={{
              marginTop: 3,
              width: "100%",
              borderRadius: "6px",
              maxHeight: "800px",
            }}
          >
            {/* <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {moduleColumn.map((column) => (
                    <StyledTableCell key={column}>{column}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(filteredData) &&
                  filteredData
                    .filter(
                      (row) =>
                        row["username"] &&
                        row["username"]
                          .toString()
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <StyledTableRow key={index}>
                        {moduleColumn.map((column, columnIndex) => (
                          <StyledTableCell key={columnIndex}>
                            {getCellValue(row, column, index)}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table> */}
            <Table aria-label="customized table">
              {filteredData.length > 0 &&
              searchQuery.length === 0 &&
              searchedStudents.length === 0 ? (
                <>
                  <TableHead>
                    <TableRow>
                      {moduleColumn.map((column) => (
                        <StyledTableCell key={column}>{column}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(filteredData) &&
                      filteredData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <StyledTableRow key={index}>
                            {moduleColumn.map((column, columnIndex) => (
                              <StyledTableCell key={columnIndex}>
                                {getCellValue(row, column, index)}
                              </StyledTableCell>
                            ))}
                          </StyledTableRow>
                        ))}
                  </TableBody>
                </>
              ) : filteredData.length > 0 &&
                searchQuery &&
                searchedStudents.length > 0 ? (
                <>
                  <TableHead>
                    <TableRow>
                      {moduleColumn.map((column) => (
                        <StyledTableCell key={column}>{column}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(searchedStudents) &&
                      searchedStudents
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                          <StyledTableRow key={index}>
                            {moduleColumn.map((column, columnIndex) => (
                              <StyledTableCell key={columnIndex}>
                                {getCellValue(row, column, index)}
                              </StyledTableCell>
                            ))}
                          </StyledTableRow>
                        ))}
                  </TableBody>
                </>
              ) : filteredData.length > 0 &&
                searchQuery &&
                searchedStudents.length === 0 ? (
                <h2>Sorry, coudn't find an user with the search value</h2>
              ) : null}
            </Table>
            {filteredData && !searchQuery && searchedStudents.length === 0 ? (
              <>
                <TablePagination
                  component="div"
                  count={
                    searchQuery ? searchedStudents.length : filteredData.length
                  }
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Download csvData={xlData} fileName={fileName} />
              </>
            ) : filteredData && searchQuery && searchedStudents.length > 0 ? (
              <>
                <TablePagination
                  component="div"
                  count={
                    searchQuery ? searchedStudents.length : filteredData.length
                  }
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Download csvData={xlData} fileName={fileName} />
              </>
            ) : null}
          </TableContainer>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default TimeSpentReportModuleWise;
