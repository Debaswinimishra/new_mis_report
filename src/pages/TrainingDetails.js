import React, { useState, useEffect } from "react";
import Text from "../components/Text";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "../components/Logo";
import Links from "../components/Links";
import Api from "../environment/Api";
import Fields from "../components/Fields";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ReusableTextField from "../components/ReusableTextField";
import Select1 from "../components/Select1";

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

const TrainingDetails = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerName, setManagerName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [managerType, setManagerType] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
  };

  const getfellowsallstatusdata = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      yearSelect: selectedYear,
      managername: managerName,
      passcode: passcode,
    };
    setLoaded(false);
    try {
      const res = await Api.post(`getfellowsallstatusdata`, body, config);
      // console.log("response---->", res.status);
      if (res.status === 200) {
        setData(res.data);
        setTotalDataLength(res.data.length);
        setLoaded(true);
        console.log("res------>", res);
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
    "User Id",
    "User Name",
    "BacelineCount",
    "EndlineCount",
    "ppt_master_topics_count",
    "ppt_trans_topics_count",
    "ppt_mark",
    "ppt_status",
    "training_master_topics_count",
    "training_trans_topics_count",
    "training_mark",
    "training_status",
  ];

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "User Id":
        return row.userid;
      case "User Name":
        return row.username;
      case "BacelineCount":
        return row.baseline_count;
      case "EndlineCount":
        return row.endline_count;
      case "ppt_master_topics_count":
        return row.ppt_master_topics_count;
      case "ppt_trans_topics_count":
        return row.ppt_trans_topics_count;
      case "ppt_mark":
        return row.ppt_mark;
      case "ppt_status":
        return row.ppt_status;

      case "training_master_topics_count":
        return row.training_master_topics_count;
      case "training_trans_topics_count":
        return row.training_trans_topics_count;
      case "training_mark":
        return row.training_mark;
      case "training_status":
        return row.training_status;

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
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={getfellowsallstatusdata}
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

export default TrainingDetails;
