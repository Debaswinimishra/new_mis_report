import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Box,
  TablePagination,
  Paper,
  TableContainer,
} from "@mui/material";
import PrakashakAPI from "../../../Environment/PrakashakAPI";
import moment from "moment";
import Nodata from "../../../Assets/Nodata.gif";

const ActiveParent = () => {
  // Month array
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2 }, (_, index) => currentYear - index);

  const currentMonth = moment().format("MMMM");
  const currentMonthSelected = monthArr.filter(
    (item) => item.label === currentMonth
  )[0];

  // Filter states
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonthSelected.value
  ); // Set a default value
  const [loading, setLoading] = useState(false);
  const [parentsData, setParentsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedMonth(""); // Reset the month on year change
  };

  const handleMonthChange = (e) => {
    if (
      e.target.value > currentMonthSelected.value &&
      selectedYear === currentYear
    ) {
      alert("You can't select a month greater than the current month !");
    } else {
      setSelectedMonth(e.target.value);
    }
  };

  const clearState = () => {
    setParentsData([]);
    setPage(0);
  };

  const filterButtonClick = () => {
    if (!selectedYear || !selectedMonth) {
      alert("Please select both year and month before filtering.");
      return;
    }

    setLoading(true);
    PrakashakAPI.get(`/getTopsParentsReport/${selectedYear}/${selectedMonth}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setParentsData(res.data); // Ensure data exists
        } else {
          setParentsData([]); // Clear data if no result
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error fetching data: ", err);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "4%",
          marginLeft: "60%",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel>Year</InputLabel>
          <Select value={selectedYear} onChange={handleYearChange}>
            {years.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel>Month</InputLabel>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            <MenuItem value={null}>None</MenuItem>
            {monthArr.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ height: "40px", width: "120px", marginTop: "1.2%" }}
          onClick={filterButtonClick}
        >
          Filter
        </Button>
      </div>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : parentsData.length > 0 ? (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Sl.No
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Parent Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Phone Number
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    School Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Anganwadi Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Cluster
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Block
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    District
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {parentsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((parent, index) => (
                    <TableRow key={parent._id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>{" "}
                      {/* Sl.No */}
                      <TableCell>{parent.parents_name || "N/A"}</TableCell>
                      <TableCell>{parent.phone_number || "N/A"}</TableCell>
                      <TableCell>{parent.school_name || "N/A"}</TableCell>
                      <TableCell>{parent.anganwadi_name || "N/A"}</TableCell>
                      <TableCell>{parent.cluster || "N/A"}</TableCell>
                      <TableCell>{parent.block || "N/A"}</TableCell>
                      <TableCell>{parent.district || "N/A"}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            component="div"
            count={parentsData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh",
          }}
        >
          <img
            src={Nodata}
            alt="No Data"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              marginBottom: "20px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ActiveParent;
