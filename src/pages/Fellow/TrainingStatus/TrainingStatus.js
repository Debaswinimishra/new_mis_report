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
import Download from "../../../downloads/ExportCsv";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Loader from "../../../ReusableComponents/Loader";
import moment from "moment";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

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

const TrainingStatus = () => {
  //!-----------------All States are defined here---------------------------
  const [username, setUsername] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [includesPvtSchools, setIncludePvtSchools] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, isLoading] = useState(false);

  //!-----------------------------------------------------------------------

  //^-------------------All Functionalities-----------------------------------

  //-------username onChange------------------
  const usernameOnChange = (e) => {
    setUsername(e.target.value);
    setStartDate("");
    setEndDate("");
    setIncludePvtSchools("");
  };

  //---------start date onChange---------------
  const startDateOnChange = (e) => {
    setStartDate(e.target.value);
    setEndDate("");
    setIncludePvtSchools("");
  };

  //---------end date onChange-----------------
  const endDateOnChange = (e) => {
    setEndDate(e.target.value);
    setIncludePvtSchools("");
  };

  //----------includesPvtSchool onChange--------
  const includesPvtSchoolsOnChange = (e) => {
    setIncludePvtSchools(e.target.value);
  };

  //-----------filter button click--------------
  const filterButtonOnClick = (e) => {};

  //-----------Download Functionalities----------
  const fileName = "Training_Report_for_completion";

  const xlData =
    filteredData.length > 0 &&
    filteredData.map((x) => {
      const { ...exceptBoth } = x;
      return exceptBoth;
    });

  console.log("startDate----------->", startDate);
  console.log("endDate----------->", endDate);
  console.log("IncludePvtSchools----------->", includesPvtSchools);

  //^-------------------------------------------------------------------------

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
            padding: "20px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-select-currency"
            select
            label="Select User"
            defaultValue="none"
            value={username}
            onChange={usernameOnChange}
            style={{ minWidth: "230px" }}
          >
            <MenuItem value="">None</MenuItem>
            {Array.isArray(userArray) &&
              userArray.map((option, index) => (
                <MenuItem key={index + 1} value={option.userid}>
                  {option.userName}
                </MenuItem>
              ))}
          </TextField>

          <FormControl>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={startDateOnChange}
              style={{ height: "56px", borderRadius: "5px", minWidth: "230px" }}
            />
          </FormControl>

          <FormControl>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={endDate}
              onChange={endDateOnChange}
              style={{ height: "56px", borderRadius: "5px", minWidth: "230px" }}
            />
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Private Schools</FormLabel>
            <RadioGroup
              row
              value={includesPvtSchools}
              onChange={includesPvtSchoolsOnChange}
              aria-label="private-schools"
              name="private-schools"
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            onClick={filterButtonOnClick}
            style={{ minWidth: "150px", maxHeight: "50px" }}
          >
            Filter
          </Button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : filteredData && filteredData.length > 0 ? (
        <>
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
                  {tableHeaders.map((column) => (
                    <StyledTableCell key={column}>{column}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
            {/* <TablePagination
              component="div"
              count={totalDataLength}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
            <Download csvData={xlData} fileName={fileName} />
          </TableContainer>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default TrainingStatus;

const tableHeaders = [
  "Sl No.",
  "Username",
  "Date",
  "No. of Modules completed",
  "No. of Sub modules Completed",
];
