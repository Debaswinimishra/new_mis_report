import { useEffect, useState } from "react";
import * as React from "react";
import Text from "../components/Text";
import Select1 from "../components/Select1";
import Fields from "../components/Fields";
import Logo from "../components/Logo";
import Links from "../components/Links";
import Number from "../components/Number";
import moment from "moment/moment";
import Api from "../environment/Api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ReusableTextField from "../components/ReusableTextField";
import { getAllCommunityEducatiorFilter } from "../AllApi/ComunityEducator";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const managerTypeSet = [
  { value: "none", label: "none" },
  { value: "MANAGER", label: "MANAGER" },
  { value: "Crc", label: "CRC" },
  { value: "Aww", label: "Supervisor" },
  // {id:1, value:"manager"},
  // {id:2, value:"supervisor"},
  // {id:2, value:"supervisor"},
];
const ComunityEducator = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [managerName, setManagerName] = useState("");
  // console.log("managerName--->", managerName);
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    // Api.get(`getManagerIdsWidPasscode`).then((response) => {
    //   setManagerArr(response.data.resData);
    // });

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
      // console.log("x--->", managerName, element);
      passcodeArray = element.passcodes;
    }
  });
  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
  };
  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
    // console.log("managername---------->", managerName);
  };
  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };

  const sortteacher = async () => {
    if (selectedYear === "" || managerName === "" || passcode === "") {
      return alert("Please select some filters to preceed");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      year: selectedYear,
      passcode: passcode,
      managerid: managerName,
      managerType: managerType,
    };
    setLoaded(false);
    try {
      const res = await Api.post(`sortteacher`, body, config);
      if (res.status === 200) {
        setData(res.data);
        setTotalDataLength(res.data.length);
        setLoaded(true);
      }
    } catch (error) {
      setLoaded(true);
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
    "Total Educators Trained",
    "Total Students Impacted",
    "Total Primary-grade Students Impacted",
    "Total Pre-Primary-grade Students Impacted",
    "Reg-Date",
    "Status",
    "Contact Number",
    "GuardianNAme",
    "D.O.B",
    "AADHAR NUMBER",
    "FELLOW QUALIFICATION",
    "GENDER",
    "NO oF STUDENT",
    "TEACHER BASELINE STATUS	",
    "TEACHER BASELINE MARK	",
    "TEACHER ENDLINE STATUS	",
    "TEACHER ENDLINE MARK",
  ];

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Total Educators Trained":
        return row.managername;
      case "Total Students Impacted":
        return row.username;
      case "Total Primary-grade Students Impacted":
        return row.userid;
      case "Total Pre-Primary-grade Students Impacted":
        return row.usertype;
      case "Reg-Date":
        return moment(row.createdon).format(" DD MM YYYY");
      case "Status":
        return row.status;
      case "Contact Number":
        return row.contactnumber;
      case "GuardianNAme":
        return row.usertype;
      case "D.O.B":
        return row.usertype;
      case "AADHAR NUMBER":
        return row.usertype;
      case "FELLOW QUALIFICATION":
        return row.usertype;
      case "GENDER":
        return row.gender;
      case "NO oF STUDENT":
        return row.students;
      case "TEACHER BASELINE STATUS":
        return row.userid;
      case "TEACHER BASELINE MARK":
        return row.userid;
      case "TEACHER ENDLINE STATUS":
        return row.userid;
      case "TEACHER ENDLINE MARK":
        return row.userid;
      default:
        return "";
    }
  };

  const fileName = "fellow";

  const xlData = data.map((x) => {
    const { userid, username, ...exceptBoth } = x;
    return exceptBoth;
  });
  return (
    <>
      <div style={{ margin: "10px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Overall - Community Educators" wrapped />
          <Tab value="two" label="Community Educators - Active" />
        </Tabs>
      </div>
      <Box>
        {/* Filter section */}
        {value === "one" ? (
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
                <Text
                  name="Select manager-type"
                  currencies={managerTypeSet}
                  handleChange={handleManagerTypeChange}
                />

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

                <ReusableTextField
                  label="Select passcode"
                  value={passcode}
                  options={passcodeArray}
                  onChange={handlePasscodeChange}
                />

                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    onClick={sortteacher}
                    style={{ width: 250, height: 40, marginTop: 5 }}
                  >
                    Filter
                  </Button>
                </Stack>
              </div>
            </div>

            {/* Display data */}
            {loaded && (
              <>
                {data && data.length > 0 ? (
                  <Fields
                    data={data}
                    totalDataLength={totalDataLength}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    xlData={xlData}
                    fileName={fileName}
                    columns={columns}
                    getCellValue={getCellValue}
                  />
                ) : (
                  <Logo />
                )}
              </>
            )}

            <Links />
          </>
        ) : (
          <h1>hiii</h1>
        )}
      </Box>
    </>
  );
};

export default ComunityEducator;
