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
import Fields from "../../../ReusableComponents/Fields";

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
  "Username",
  "Manager",
  "Passcode",
  "Completion Status",
  // "Gender",
  // "Contact Number",
  // "Status(Active/Inactive)",
  // "Yo",
];

const Feedback = () => {
  const [selectedYear, setSelectedYear] = useState(""); //? When the year is selected
  const [managerArr, setManagerArr] = useState([]); //?All managerdata are fetched here
  const [managerName, setManagerName] = useState([]); //? The particular manager is selected
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState(""); //?Selected passcode
  const [page, setPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loaded, setLoaded] = useState(false);
  const [surevey, setSurvey] = useState([]); //?Here I will store all the surveys (for filter) that I will get from API
  const [selectedSurvey, setSelectedSurvey] = useState(""); //?Individual survey name/ survey id selected
  const [allData, setAllData] = useState([]); //?After filteration, all my data will be stored here

  useEffect(() => {
    getSurveyDetails().then((res) => {
      if (res.status === 200) {
        setSurvey(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedYear) {
      getAllManagersWidPasscodes().then((res) => {
        if (res.status === 200) {
          setManagerArr(res.data.resData);
        } else {
          toast.error("Sorry, couldn't load data!");
        }
      });
    }
  }, [selectedYear]);

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

  const handlePasscodeChange = (event) => {
    setFilteredData([]);
    setTotalDataLength(0);
    setPasscode(event.target.value);
  };

  //*----------Survey change---------------------
  const onSurveyChange = (e) => {
    setSelectedSurvey(e.target.value);
    setSelectedYear("");
    setManagerName("");
    setPasscode("");
    setFilteredData([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const fetchFilteredData = () => {
    if (!selectedSurvey) {
      return toast.error("Please select a survey before proceeding.");
    }
    // else if (!selectedYear) {
    //   return toast.error("Please select a year before proceeding.");
    // } else if (!selectedSurvey) {
    //   return toast.error("Please select a survey before proceeding.");
    // } else if (!managerName) {
    //   return toast.error("Please select a manager before proceeding.");
    // } else if (!passcode) {
    //   return toast.error("Please select a passcode before proceeding.");
    // }
    else {
      setLoaded(true);
      const dataForFiltration = {
        survey: selectedSurvey,
        year: selectedYear ? selectedYear : "",
        managerid: managerName ? managerName : "",
        passcode: passcode ? passcode : "",
      };
      const apiCall = getAllFeedbackData(dataForFiltration);
      apiCall
        .then((res) => {
          setLoaded(false);
          console.log("data-------------------->::", res.data);
          if (res.status === 200) {
            setFilteredData(res.data);
            setTotalDataLength(res.data.length);
          } else {
            toast.error("Sorry, something went wrong !");
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

  //?------------------This will modify my table data when fetched----------
  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Username":
        return row.username;
      case "Manager":
        return row.managername;
      case "Passcode":
        return row.passcode;
      case "Completion Status":
        return row.contactnumber ? row.contactnumber : "NA";
      case "Yo":
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

  const mySelectedSurveyData = filteredData.map(
    (item) =>
      item.modifiedSurveyData.filter((obj) => obj.surveyId === selectedSurvey)
    // console.log("item.modifiedSUrvey---------------->", item.modifiedSurveyData)
  );

  //todo---------------------------------Console logs------------------------------------------------
  // console.log("survey------------------------->", surevey);
  // console.log("year----------------------------->", selectedYear);
  // console.log("manager----------------------------->", managerName);
  // console.log("passcode----------------------------->", passcode);
  console.log("selected survey----------------------------->", selectedSurvey);
  console.log("filtered data----------------------------->", filteredData);
  console.log(
    "mySelectedSurveyData--------------------------->",
    mySelectedSurveyData
  );

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
          <TextField
            id="outlined-select-currency"
            select
            label="Survey name"
            defaultValue="none"
            value={selectedSurvey}
            onChange={(e) => onSurveyChange(e)}
          >
            <MenuItem value="">None</MenuItem>
            {Array.isArray(surevey)
              ? surevey.map((option, index) => (
                  <MenuItem key={index + 1} value={option.surveyId}>
                    {option.surveyName}
                  </MenuItem>
                ))
              : null}
          </TextField>
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
      {/* {loaded ? (
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
      )} */}

      {selectedSurvey &&
      filteredData &&
      Object.keys(filteredData).length > 0 ? (
        <Fields
          data={filteredData}
          totalDataLength={totalDataLength}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          xlData={xlData}
          fileName={fileName}
          columns={moduleColumn}
          getCellValue={getCellValue}
        />
      ) : null}
      <ToastContainer />
    </Box>
  );
};

export default Feedback;
