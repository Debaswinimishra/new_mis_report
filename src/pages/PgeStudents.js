import React, { useEffect, useState } from "react";
import Select1 from "../components/Select1";
// import TrainingDetails from './TrainingDetails'
// import NsdcStatus from './NsdcStatus'
import Text from "../components/Text";
import Filter from "../components/Filter";
import { TextField } from "@mui/material";
import Logo from "../components/Logo";
import Links from "../components/Links";
import { json } from "react-router-dom";
import Api from "../environment/Api";
const managerTypeSet = [
  {
    value: "manager",
    label: "manager",
  },
  {
    value: "worker",
    label: "worker",
  },
  {
    value: "employee",
    label: "employee",
  },
];

const managerSet = [
  {
    value: "guru",
    label: "guru",
  },
  {
    value: "Manager",
    label: "Manager",
  },
  {
    value: "Tapas",
    label: "Tapas",
  },
  {
    value: "suman",
    label: "suman",
  },
];
const passcodeSet = [
  {
    value: "Matru@123",
    label: "Matru@123",
  },
  {
    value: "GURUBBS0323",
    label: "GURUBBS0323",
  },
  {
    value: "rajesh@123",
    label: "rajesh@123",
  },
  {
    value: "smruti@123",
    label: "smruti@123",
  },
];
const yearSet = [
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2022",
    label: "2022",
  },

  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2024",
    label: "2024",
  },
];
const PgeStudents = () => {
  const [year, SetYear] = useState("");
  const [managerType, setManagerType] = useState("");
  const [manager, setManager] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleYearChange = (event) => {
    SetYear(event.target.value);
  };
  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
  };

  const handleManagerChange = (event) => {
    setManager(event.target.value);
  };
  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };
  const PgeStudent = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      blockid: "",
      clas: "1",
      districtid: "",
      flag: "filter",
      fromdate: null,
      gender: "male",
      pageno: null,
      passcode: passcode,
      program: "ece",
      searchstring: null,
      todate: null,
      userid: "",
      year: year,
    };
    try {
      const res = await Api.post(`getstudentreport`, body, config);
      if (res.status === success) {
      }
    } catch (error) {}
  };

  // useEffect(() => {
  //   PgeStudent();
  // })

  return (
    <>
      <div>
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
          <Text
            name="Select year"
            currencies={yearSet}
            handleChange={handleYearChange}
          />
          <Text
            name="Select manager-type"
            currencies={managerTypeSet}
            handleChange={handleManagerTypeChange}
          />
          <Text
            name="Select manager"
            currencies={managerSet}
            handleChange={handleManagerChange}
          />
          <Text
            name="Select passcode"
            currencies={passcodeSet}
            handleChange={handlePasscodeChange}
          />
          <Filter
            details="Filter"
            handleClick={PgeStudent}
            style={{ width: 250 }}
          />
        </div>

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
          <div style={{ marginTop: 10, marginLeft: 10, display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="Search Fellow"
              variant="outlined"
            />
            <Filter details="Search" style={{ background: "#8261DA" }} />
          </div>
        </div>
      </div>
      {/* <Logo /> */}
      <Links />
    </>
  );
};

export default PgeStudents;
