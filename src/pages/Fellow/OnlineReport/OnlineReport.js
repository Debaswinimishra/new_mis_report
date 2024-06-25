import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { FormControl, InputLabel, Select } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import moment from "moment";

import Download from "../../../downloads/ExportCsv";
import Select1 from "../../../ReusableComponents/Select1";

import { getAllCommunityEducatiorFilter } from "../CommunityEducator/CommunityEducatorApi";
import { getOnlineRequestedReport } from "./OnlineReuestApi";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import Loader from "../../../ReusableComponents/Loader";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

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
  { value: "none", label: "none" },
  { value: "manager", label: "MANAGER" },
  { value: "Crc", label: "CRC" },
  { value: "Aww", label: "Supervisor" },
];
// username, contact number, gender, address, status(accept/reject), reason
const moduleColumn = [
  "Serial No",
  "User Name",
  "Contact Number",
  "Gender",
  "Address",
  "Status(Active/Inactive)",

  "reason",
];

const OnlineReport = () => {
  const monthArr = [
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
  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr?.filter(
    (item) => item.label === currentMonth
  )[0];
  const [selectedMonth, setSelectedMonth] = useState("");

  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  const [managerName, setManagerName] = useState([]);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");

  const [page, setPage] = useState(0);
  const [districtName, setDistrictName] = useState("");

  const [blockName, setBlockName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  console.log("filteredData", filteredData);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleMonthChange = (e) => {
    if (
      e.target.value > currentMonthSelected.value &&
      selectedYear === currentYear
    ) {
      toast.error("You can't select a month greater than the current month !", {
        style: {
          borderRadius: "100px",
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      setSelectedMonth(e.target.value ? e.target.value : "");
    }
  };
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
    setBlockName("");
    setFilteredData([]);
    setTotalDataLength(0);
    setSelectedYear(selectedYear);
    const response = await getAllCommunityEducatiorFilter(selectedYear);
    setManagerArr(response?.data?.resData);
  };

  const handleManagerChange = (event) => {
    setPasscode("");
    setDistrictName("");
    setBlockName("");
    setFilteredData([]);
    setTotalDataLength(0);
    setManagerName(event.target.value);
  };

  const handlePasscodeChange = async (event) => {
    setFilteredData([]);
    setTotalDataLength(0);
    setDistrictName("");
    setBlockName("");
    setPasscode(event.target.value);
  };

  const handleDistrictChange = async (e) => {
    setBlockName("");
    setFilteredData([]);
    setTotalDataLength(0);
    setDistrictName(e.target.value);
  };

  const handleBlockChange = (e) => {
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
      const filterCriteriaWithBlockAndDistrict = {
        year: Number(selectedYear),
        month: selectedMonth,
        // districtid: districtName,
        // blockid: blockName,
      };
      console.log(
        "====================================",
        filterCriteriaWithBlockAndDistrict
      );

      const data = await getOnlineRequestedReport(
        filterCriteriaWithBlockAndDistrict
      );

      setLoaded(false);
      // console.log("data", data);

      if (data.length === 0) {
        setFilteredData([]);
        alert("No data found");
      } else if (data.length > 0) {
        setFilteredData(data);
        setTotalDataLength(data.length);
      }
    } catch (error) {
      setLoaded(false);
      console.error("Error:", error);
      // Handle the error, e.g., show an error message to the user
      alert("An error occurred while fetching data");
    } finally {
      setLoaded(false);
    }
  };
  // username, contact number, gender, address, status(accept/reject), reason
  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "User Name":
        return row.username;
      case "Contact Number":
        return row.contactnumber ? row.contactnumber : "NA";
      case "Gender":
        return row.gender;
      case "Address":
        return row.address ? row.address : "NA";

      case "Status(Active/Inactive)":
        return row.status ? row.status : "NA";

      case "Reason":
        return row.reason ? row.reason : "NA";
      default:
        return "";
    }
  };

  const fileName = "FellowDetails";

  const xlData = filteredData.map((x) => {
    const { ...exceptBoth } = x;
    return exceptBoth;
  });

  const handleClear = () => {};

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

          <FormControl size="medium" style={{ width: "200px" }}>
            <InputLabel id="usertype-label">Month</InputLabel>
            <Select
              labelId="usertype-label"
              id="usertype-select"
              value={selectedMonth}
              onChange={handleMonthChange}
              label="Month"
              style={{ padding: "4px" }}
            >
              <MenuItem value={null}>None</MenuItem>
              {monthArr.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
                  <MenuItem key={index + 1} value={option?.blockid}>
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

export default OnlineReport;
