import React, { useEffect, useState } from "react";
import Select1 from "../components/Select1";
import Text from "../components/Text";
import Filter from "../components/Filter";
import { TextField } from "@mui/material";
import Logo from "../components/Logo";
import Links from "../components/Links";
import Api from "../environment/Api";
import ReusableTextField from "../components/ReusableTextField";
import MenuItem from "@mui/material/MenuItem";
import Fields from "../components/Fields";

const managerTypeSet = [
  {
    value: "Select",
    label: "Select",
  },
  {
    value: "Manager",
    label: "Manager",
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

const NsdcStatus = () => {
  const [managerArr, setManagerArr] = useState([]);
  const [managerName, setManagerName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    Api.get(`getManagerIdsWidPasscode`).then((response) => {
      setManagerArr(response.data.resData);
    });
  }, []);

  let passcodeArray = [];

  managerArr?.filter((element) => {
    if (element.managerid === managerName) {
      console.log("x--->", managerName, element);
      passcodeArray = element.passcodes;
      console.log("passcodeArray--->", passcodeArray);
    }
  });

  const handleCallAPI = async () => {
    setLoaded(false);
    try {
      const response = await Api.get(
        `https://thinkzone.co/thinkzone/getmanagerwisefellowsnsdcdata/${selectedYear}/${managerName}/${passcode}/0/0/0/1`
      );
      if (response.data.status === "success") {
        console.log("data------------->", response);
        setData(response.data.data);
        setLoaded(true);
        setTotalDataLength(response.data.data.length);
      }
    } catch (error) {
      setLoaded(true);
    }
  };

  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
  };

  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
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
    "Manager Id",
    "manager name",
    "Passcode",
    "nsdc date",
    "nsdc marks",
    "nsdc Status",
    "userId",
    "UserName",
  ];
  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Manager Id":
        return row.managerid;
      case "manager name":
        return row.managername;
      case "Passcode":
        return row.passcode;
      case "nsdc date":
        return row.nsdc_date;
      case "nsdc marks":
        return row.nsdc_mark;
      case "nsdc Status":
        return row.nsdc_status;
      case "userId":
        return row.userid;
      case "UserName":
        return row.username;

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
        <Filter
          details="Get Details"
          handleClick={handleCallAPI}
          style={{ width: 250 }}
        />
      </div>

      {/* <div style={{ marginTop: 20, marginLeft: 10, display: "flex" }}>
        <TextField
          id="outlined-basic"
          label="Search Fellow"
          variant="outlined"
          style={{ width: "1100px" }}
        />
        <Filter details="Search" style={{ background: "#8261DA" }} />
      </div> */}

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

export default NsdcStatus;
