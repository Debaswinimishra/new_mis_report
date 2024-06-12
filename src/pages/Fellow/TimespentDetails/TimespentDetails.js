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
import moment from "moment";
import Download from "../../../downloads/ExportCsv";
import Select1 from "../../../ReusableComponents/Select1";
import ReusableTextField from "../../../ReusableComponents/ReusableTextField";
import {
  getAllCommunityEducatiorFilter,
  getAllDistricts,
  getDistrictsWiseBlocks,
} from "../CommunityEducator/CommunityEducatorApi";
import { TimespentDetailsApi } from "./TimespentDetailsApi";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Loader from "../../../ReusableComponents/Loader";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Logo from "../../../ReusableComponents/Logo";
import loader from "../../../Assets/R.gif";
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
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const column = [
  "Serial No",
  "User Name",
  "Registration Date",
  "Pedagogy",
  "21st Century",
  "Technology",
  "Commom Monthly Quiz",
  "PGE",
  "ECE",
  "FLN",
  "Community Engagement",
  "Student Assessment",
  "Books",
  "Survey",
];

const TimespentDetails = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  const [managerName, setManagerName] = useState([]);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [districts, setDistricts] = useState([]);
  const [page, setPage] = useState(0);
  const [districtName, setDistrictName] = useState("");
  const [allBlocks, setAllBlocks] = useState([]);
  const [blockName, setBlockName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  console.log("filteredData", filteredData);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loaded, setLoaded] = useState(false);
  const [month, setMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  console.log("SelectedStartDate---->", selectedStartDate);
  (0.0).toExponential;
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
  let blocksArr = [];

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
    setManagerType("");
    setManagerName("");
    setPasscode("");
    setDistrictName("");
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setBlockName("");
    setFilteredData([]);
    setMonth("");
    setTotalDataLength(0);
    setSelectedYear(selectedYear);
    const response = await getAllCommunityEducatiorFilter(selectedYear);
    console.log("manager year----->", response.data);
    setManagerArr(response.data.resData);
    // setShowFieldsData(false);
  };
  const handleMonthChange = (event) => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setManagerName("");
    setPasscode("");
    setDistrictName("");
    setBlockName("");
    setMonth(event.target.value);
  };

  const handleManagerChange = (event) => {
    setPasscode("");
    setDistrictName("");
    setBlockName("");
    setFilteredData([]);
    setTotalDataLength(0);
    setManagerName(event.target.value);
    // setShowFieldsData(false);
  };

  const handlePasscodeChange = async (event) => {
    setFilteredData([]);
    setTotalDataLength(0);
    setDistrictName("");
    setBlockName("");
    setPasscode(event.target.value);
    try {
      // setLoaded(true);
      const response2 = await getAllDistricts();
      console.log("response--->", response2.data);
      setDistricts(response2.data);
      // setLoaded(false);
    } catch (error) {
      // setLoaded(false);
      console.error("Error--->", error);
    }

    // setShowFieldsData(false);
  };

  const handleDistrictChange = async (e) => {
    setBlockName("");
    setFilteredData([]);
    setTotalDataLength(0);
    const selectedValue = e.target.value;
    setDistrictName(e.target.value);
    console.log("Selected value:", e);
    // setLoaded(true);
    const response = await getDistrictsWiseBlocks(e.target.value);
    console.log("block response---->", response.data);
    setAllBlocks(response.data);
    // setLoaded(false);
  };

  const handleBlockChange = (e) => {
    console.log("block--->", e.target.value);
    setFilteredData([]);
    setTotalDataLength(0);
    setBlockName(e.target.value);
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
        alert("Please select a year before filtering.");
        return;
      }

      setLoaded(true);
      let filterCriteria;

      if (month) {
        filterCriteria = {
          year: parseInt(selectedYear),
          month: parseInt(month),
          managerid: managerName,
          passcode: passcode,
          districtid: districtName,
          blockid: blockName,
        };
      } else if (selectedStartDate && selectedEndDate) {
        filterCriteria = {
          year: parseInt(selectedYear),
          startDt: selectedStartDate,
          endDt: selectedEndDate,
          managerid: managerName,
          passcode: passcode,
          districtid: districtName,
          blockid: blockName,
        };
      } else {
        alert("Please select either a month or a date range.");
        setLoaded(false);
        return;
      }

      const data = await TimespentDetailsApi(filterCriteria);

      setLoaded(false);
      // console.log("data", data);

      if (data.length === 0) {
        setFilteredData([]);
        alert("No data found");
      } else {
        setFilteredData(data);
        setTotalDataLength(data.length);
      }
    } catch (error) {
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
      case "Registration Date":
        return moment(row.createdon).format("DD/MM/YYYY");
      case "Pedagogy":
        return row.training3;
      case "21st Century":
        return row.training1;
      case "Technology":
        return row.training2;
      case "Commom Monthly Quiz":
        return row.tchTtlQuiz;
      case "PGE":
        return row.pgeactivity;
      case "ECE":
        return row.eceactivity;
      case "FLN":
        return row.fln;
      case "Community Engagement":
        return row.communityActivity;
      case "Student Assessment":
        return row.studentAssessment;
      case "Books":
        return row.reading;
      case "Survey":
        return row.tchSurvey;
      default:
        return "";
    }
  };

  const fileName = "TimespentDetails";

  const xlData = filteredData.map((x) => {
    const { ...exceptBoth } = x;
    return exceptBoth;
  });

  // const shouldDisableDate = (date) => {
  //   if (!selectedYear || !month) {
  //     return true; // Disable all dates if year or month is not selected
  //   }
  //   const currentYear = dayjs(date).year();
  //   const currentMonth = dayjs(date).month() + 1; // Month is 0-based in dayjs
  //   return (
  //     currentYear !== parseInt(selectedYear) || currentMonth !== parseInt(month)
  //   );
  // };

  const handleDateChange = (newValue) => {
    if (newValue) {
      const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
      setSelectedStartDate(formattedDate);
    } else {
      setSelectedStartDate(null);
    }
  };
  const handleEndDateChange = (newValue) => {
    if (newValue) {
      const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
      setSelectedEndDate(formattedDate);
    } else {
      setSelectedEndDate("");
    }
  };

  const disableDateRangeSelection = !!month;
  const disableMonthSelection = !!selectedStartDate || !!selectedEndDate;

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
            disabled={disableMonthSelection}
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={selectedStartDate}
              onChange={handleDateChange}
              // shouldDisableDate={shouldDisableDate}
              clearable
              inputFormat="DD/MM/YYYY"
              disabled={disableDateRangeSelection}
              renderInput={(params) => (
                <TextField {...params} style={{ marginBottom: "20px" }} />
              )}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              // shouldDisableDate={shouldDisableDate}
              clearable
              inputFormat="DD/MM/YYYY"
              disabled={disableDateRangeSelection}
              renderInput={(params) => (
                <TextField {...params} style={{ marginBottom: "20px" }} />
              )}
            />
          </LocalizationProvider>

          <TextField
            id="outlined-select-currency"
            select
            label="Select manager"
            defaultValue="none"
            value={managerName}
            onChange={(e) => handleManagerChange(e)}
          >
            <MenuItem value="">None</MenuItem>
            {Array.isArray(managerArr) && selectedYear
              ? managerArr.map((option, index) => (
                  <MenuItem key={index + 1} value={option.managerid}>
                    {option.managername}
                  </MenuItem>
                ))
              : ""}
          </TextField>

          <ReusableTextField
            label="Select passcode"
            value={passcode}
            options={passcodeArray}
            onChange={(e) => handlePasscodeChange(e)}
          />

          <TextField
            id="outlined-select-currency"
            select
            label="Select districts"
            defaultValue="none"
            value={districtName}
            onChange={(e) => handleDistrictChange(e)}
          >
            <MenuItem value="">None</MenuItem>
            {Array.isArray(districtArr)
              ? districtArr.map((option, index) => (
                  <MenuItem
                    key={index + 1}
                    value={option?.districtid}
                    data-name={option?.districtname}
                  >
                    {option?.districtname}
                  </MenuItem>
                ))
              : null}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            label="Select Blocks"
            defaultValue="none"
            value={blockName}
            onChange={(e) => handleBlockChange(e)}
          >
            <MenuItem value="">None</MenuItem>
            {Array.isArray(blocksArr)
              ? blocksArr?.map((option, index) => (
                  <MenuItem key={index + 1} value={option.blockid}>
                    {option?.blockname}
                  </MenuItem>
                ))
              : null}
          </TextField>

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
            onChange={(e) => setSearchQuery(e.target.value)}
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
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {column.map((column) => (
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
                        {column.map((column, columnIndex) => (
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
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default TimespentDetails;
