import React, { useState, useEffect } from "react";
import Text from "../components/Text";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "../components/Logo";
import Links from "../components/Links";
import Api from "../environment/Api";
import TextField from "@mui/material/TextField";
import ReusableTextField from "../components/ReusableTextField";
import MenuItem from "@mui/material/MenuItem";
import Select1 from "../components/Select1";

import Fields from "../components/Fields";

const selectManager = [
  {
    value: "None",
    label: "None",
  },
  {
    value: "Suman",
    label: "Suman",
  },
  {
    value: "guru@thinkzone.in",
    label: "guru@thinkzone.in",
  },
  {
    value: "Guru",
    label: "Guru",
  },
];

const selectManagerType = [
  {
    value: "manager",
    label: "manager",
  },
  {
    value: "worker",
    label: "worker",
  },
  {
    value: "Helper",
    label: "Helper",
  },
];
const passcodeArray = [
  {
    value: "Matru@123",
    label: "Matru@123",
  },
  {
    value: "Password",
    label: "Password",
  },
  {
    value: "rajesh@123",
    label: "rajesh@123",
  },
  {
    value: "GURUBBS0323",
    label: "GURUBBS0323",
  },
];
const monthArray = [
  {
    value: "January",
    label: "January",
  },
  {
    value: "February",
    label: "February",
  },
  {
    value: "March",
    label: "March",
  },
  {
    value: "April",
    label: "April",
  },
  {
    value: "May",
    label: "May",
  },
  {
    value: "June",
    label: "June",
  },
  {
    value: "July",
    label: "July",
  },
  {
    value: "August",
    label: "August",
  },
  {
    value: "September",
    label: "September",
  },
  {
    value: "Oct",
    label: "Oct",
  },
  {
    value: "Novemember",
    label: "Novemember",
  },
  {
    value: "December",
    label: "December",
  },
];
const year = [
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2024",
    label: "2024",
  },
  {
    value: "2025",
    label: "2025",
  },
];

const TimeSpendDetails = () => {
  const [selectedYear, setSelectedYear] = useState();
  console.log("selectedYear---->", selectedYear);
  const [managerName, setManagerName] = useState("");
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [month, setMonth] = useState("");
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [managerArr, setManagerArr] = useState([]);

  useEffect(() => {
    Api.get(`getManagerIdsWidPasscode`).then((response) => {
      setManagerArr(response.data.resData);
    });
  }, []);

  let passcodeArray = [];

  managerArr?.filter((element) => {
    // console.log("x--->", element, managerName);
    if (element.managerid === managerName) {
      console.log("x--->", managerName, element);
      passcodeArray = element.passcodes;
      console.log("passcodeArray--->", passcodeArray);
    }
  });

  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
  };

  const getTimeSpentReportManagerwise = async () => {
    if (selectedYear === "" || managerName === "" || passcode === "") {
      return alert("Plz.. select a Filter");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      year: selectedYear,
      managerid: managerName,
      passcode: passcode,
    };

    console.log("body--->", body);
    setLoaded(false);
    try {
      const res = await Api.post(`getTimeSpentReportManagerwise`, body, config);

      console.log("res------>", res);

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
    "Year",
    "Month",
    "UserName",
    "PPT",
    "Training",
    "Pgeactivity",
    "Eceactivity",
    "FLN",
    "Reading",
    "TotalTime",
  ];

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Year":
        return row.year;
      case "Month":
        return row.month;
      case "UserName":
        return row.username;
      case "PPT":
        return row.ppt;
      case "Training":
        return row.training;
      case "Pgeactivity":
        return row.pgeactivity;
      case "Eceactivity":
        return row.eceactivity;
      case "FLN":
        return row.fln;
      case "Reading":
        return row.reading;
      case "TotalTime":
        return row.totalTime;
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
      <div
        style={{
          marginTop: "20px",
          padding: "30px 20px",
          display: "grid",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        }}
      >
        <Select1 selectedYear={selectedYear} onChange={handleYearChange} />
        {/* <Text
          name="Select year"
          currencies={year}
          handleChange={handleYearChange}
        /> */}
        <Text
          name="Select managerType"
          currencies={selectManagerType}
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

        <Text
          name="Select month"
          currencies={monthArray}
          handleChange={handleMonthChange}
        />

        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={getTimeSpentReportManagerwise}
            style={{ width: 250, height: 40, marginTop: 10 }}
          >
            Filter
          </Button>
        </Stack>
      </div>
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
  );
};

export default TimeSpendDetails;
