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
import {
  getAllManagersWidPasscodes,
  getSurveyDetails,
  getAllFeedbackData,
} from "./FeedbackApi";
// import { FellowDetailsForManager } from "./EducatorsDetailsApi";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Logo from "../../../ReusableComponents/Logo";
import Loader from "../../../ReusableComponents/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const moduleColumn = [
  "Serial No",
  "User Name",
  "User Id",
  "No of Students",
  "Gender",
  "Contact Number",
  "Status(Active/Inactive)",
  "Aadhaar Number",
];

const Feedback = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  const [managerName, setManagerName] = useState([]);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [page, setPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  console.log("filteredData", filteredData);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loaded, setLoaded] = useState(false);
  const [surevey, setSurvey] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllManagersWidPasscodes();
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
    setSelectedYear(selectedYear);
    // setManagerType("");
    setManagerName("");
    setPasscode("");
    setFilteredData([]);
    setTotalDataLength(0);
  };

  const handleManagerChange = (event) => {
    setPasscode("");
    setFilteredData([]);
    setTotalDataLength(0);
    setManagerName(event.target.value);
  };

  const handlePasscodeChange = async (event) => {
    setFilteredData([]);
    setTotalDataLength(0);
    setPasscode(event.target.value);

    //!---------------------To add the feed back response from api
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const fetchFilteredData = () => {
    if (!selectedYear && !managerName && !passcode) {
      return toast.error("Please select all the fields before proceeding.");
    } else if (!selectedYear) {
      return toast.error("Please select a year before proceeding.");
    } else if (!managerName) {
      return toast.error("Please select a manager before proceeding.");
    } else if (!passcode) {
      return toast.error("Please select a passcode before proceeding.");
    } else {
      setLoaded(true);
      const dataForFiltration = {
        year: selectedYear,
        managerid: managerName,
        passcode: passcode,
      };

      // const filterCriteriaWithoutBlockAndDistrict = {
      //   year: selectedYear,
      //   managerid: managerName,
      //   passcode: passcode,
      // };

      //*---------------------Api call for populating the table------------------------
      const apiCall =
        //   ? Here the filtration of data will be done.
        getAllFeedbackData(dataForFiltration);
      apiCall
        .then((data) => {
          setLoaded(false);
          console.log("data", data);
          if (data.length === 0) {
            setFilteredData([]);
            alert("No data found");
          } else if (data.length > 0) {
            setFilteredData(data);
            setTotalDataLength(data.length);
          }
        })
        .catch((error) => {
          setLoaded(false);
          console.error("Error:", error);
        })
        .finally(() => {
          setLoaded(false);
        });
    }
  };

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "User Name":
        return row.username;
      case "User Id":
        return row.userid;
      case "Gender":
        return row.gender;
      case "Contact Number":
        return row.contactnumber ? row.contactnumber : "NA";
      case "Aadhaar Number":
        return row.aadhaar ? row.aadhaar : "NA";
      default:
        return "";
    }
  };

  const fileName = "FellowDetails";

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
            label="Select manager"
            defaultValue="none"
            value={managerName}
            onChange={(e) => handleManagerChange(e)}
          >
            <MenuItem value="">None</MenuItem>
            {selectedYear && Array.isArray(managerArr)
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

          <TextField
            id="outlined-select-currency"
            select
            label="Survey name"
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
      ) : (
        ""
      )}
      <ToastContainer />
    </Box>
  );
};

export default Feedback;
