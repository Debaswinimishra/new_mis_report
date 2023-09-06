import React, { useEffect, useState } from "react";
import Select1 from "../components/Select1";
import Text from "../components/Text";
import Filter from "../components/Filter";
// import { TextField } from "@mui/material";
import Logo from "../components/Logo";
import Links from "../components/Links";
import Api from "../environment/Api";
import Fields from "../components/Fields";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ReusableTextField from "../components/ReusableTextField";

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

const FilterSet = [
  {
    value: "filter",
    label: "filter",
  },
];
const Fln = () => {
  // const [mine,setMine] = useState([])
  const [data, setData] = useState([]);
  const [managerName, setManagerName] = useState("");
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
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

  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
  };

  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  const getflnassessdetails = async () => {
    if (selectedYear === "" || filter === "" || passcode === "") {
      return alert("please select value");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      year: selectedYear,
      flag: filter,
      passcode: passcode,
      managerid: managerName,
    };
    setLoaded(false);
    try {
      const res = await Api.post("getflnassessdetails", body, config);
      if (res.status === 200) {
        setData(res.data.data);
        setTotalDataLength(res.data.data.length);
        setLoaded(true);
      } // Update the user state with the data from the API response
      console.log("response---->", res.data.data); // Log the response data
    } catch (error) {
      setLoaded(true);
      console.log(error);
    }
  };

  //   const falnassesdetails = async () => {
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       };
  //       const body = {
  //         flag: "search",
  //         searchstring: "arun das",

  //       };
  //     try {
  //       const resop = await Api.post("getflnassessdetails", body, config);
  //       setMine(resop.data.data); // Update the user state with the data from the API response
  //  setTotalDataLength(res.data.data.length);
  //       console.log("responsematru---->", resop.data.data); // Log the response data
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

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
    "User Id",
    "User Name",
    "Student Id",
    "Student Name",
    "Student Status",
    "Class",
    "Baceline math Mark",
    "BaceLineEnglish Marks",
    "BaceLineOdiaMarks",
  ];

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Manager Id":
        return row.managerid;
      case "User Id":
        return row.userid;
      case "User Name":
        return row.username;
      case "Student Id":
        return row.studentid;
      case "Student Name":
        return row.studentname;
      case "Student Status":
        return row.studentstatus;
      case "Class":
        return row.class;
      case "Baceline math Mark":
        return row.baselineMathsMarks;
      case "BaceLineEnglish Marks":
        return row.baselineEnglishMarks;
      case "BaceLineOdiaMarks":
        return row.baselineOdiaMarks;

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
          gap: "20px",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
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
        <Text
          name="FIlter"
          currencies={FilterSet}
          handleChange={handleFilterChange}
        />
        <Filter
          details="Get Details"
          handleClick={getflnassessdetails}
          style={{ width: 250 }}
        />
      </div>

      {/* <div
        style={{
          marginTop: 20,
          marginLeft: 10,
          display: "flex",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search Fellow"
          variant="outlined"
          style={{ width: "1000px" }}
        />
        <Filter
          details="Search"
          // handleClick={falnassesdetails}
          style={{ background: "#8261DA" }}
        />
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

export default Fln;
