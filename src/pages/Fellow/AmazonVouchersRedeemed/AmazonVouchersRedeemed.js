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
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Logo from "../../../ReusableComponents/Logo";
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

const AmazonVouchersRedeemed = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [month, setMonth] = useState("");

  const currentYear = new Date().getFullYear();

  const currentMonth = new Date().getMonth();

  //~------------On changing the year---------------
  const handleYearChange = async (selectedYear) => {
    setSelectedYear(selectedYear);
    setMonth("");
  };

  //~-----------On changing the month---------------
  const handleMonthChange = (event) => {
    if (
      parseInt(selectedYear) === currentYear &&
      event.target.value > currentMonth + 1
    ) {
      alert("You can't select a month beyond the current month");
    } else {
      setMonth(event.target.value);
    }
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
      };

      //* Here the API will be called ---
      //   const data = await getAllTimespentData(
      //     filterCriteriaWithBlockAndDistrict
      //   );

      setLoaded(false);
      if (data.data.length === 0) {
        setFilteredData([]);
        alert("No data found");
      } else if (data.data.length > 0) {
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
            padding: "20px 15px",
            display: "grid",
            gap: "10px",
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
            {selectedYear && selectedYear !== ""
              ? monthArr?.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              : null}
          </TextField>

          <Button
            variant="contained"
            onClick={fetchFilteredData}
            style={{ width: "70%", height: "auto" }}
          >
            Filter
          </Button>
        </div>
        <style>
          {`
      @media (max-width: 92%) {
        div[style*="display: grid"] {
          grid-template-columns: 1fr;
        }
      }
    `}
        </style>
      </div>

      {loaded ? (
        <Loader />
      ) : selectedYear && filteredData && filteredData.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            sx={{
              marginLeft: 2,
              marginTop: 3,
              // width: "82%",
              borderRadius: "6px",
              maxHeight: "100%",
            }}
          >
            <Table>
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

export default AmazonVouchersRedeemed;