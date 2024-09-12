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
import { AmazonVouchersRedeemedThunk } from "./AmazonVouchersRedeemed.thunk";

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
      } else {
        setLoaded(true);
        const dataForFilter = {
          year: parseInt(selectedYear),
          month: parseInt(month),
        };

        const data = await AmazonVouchersRedeemedThunk(dataForFilter);

        setLoaded(false);
        if (data.data.length === 0) {
          setFilteredData([]);
          alert("No data found");
        } else if (data.data.length > 0) {
          setFilteredData(data.data);
        }
      }
    } catch (error) {
      setLoaded(false);
      console.error("Error:", error);
      alert("An error occurred while fetching data");
    } finally {
      setLoaded(false);
    }
  };

  const moduleColumn = [
    "Serial No",
    "User Name",
    "Manager Name",
    "Passcode",
    "Coupon code",
    "Redeem Date",
    "Coins used",
    "Coins amount",
  ];

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
      case "Coupon code":
        return row.couponCode;
      case "Redeem Date":
        return moment(row.redeemedOn).format("DD/MM/YYYY");
      case "Coins used":
        return row.coinsUsed;
      case "Coins amount":
        return "Rs. " + row.amount;
      default:
        return "";
    }
  };

  const fileName = "amazon_vouchers_redeemed";

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
      ) : selectedYear && month && filteredData.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            sx={{
              marginLeft: 2,
              marginTop: 3,
              borderRadius: "6px",
              maxHeight: "100%",
            }}
          >
            <Table>
              {filteredData.length > 0 ? (
                <>
                  <TableHead>
                    <TableRow>
                      {moduleColumn.map((column) => (
                        <StyledTableCell key={column}>{column}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((row, index) => (
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
              ) : (
                <h1>Sorry, No student found</h1>
              )}
            </Table>
            <Download csvData={xlData} fileName={fileName} />
          </TableContainer>
        </>
      ) : null}
    </Box>
  );
};

export default AmazonVouchersRedeemed;
