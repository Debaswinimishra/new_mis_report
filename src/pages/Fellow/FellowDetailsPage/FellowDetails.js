import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Text from "../../../components/Text";
import Api from "../../../environment/Api";
import Logo from "../../../components/Logo";
import Select1 from "../../../components/Select1";
import ReusableTextField from "../../../components/ReusableTextField";
import { Link } from "react-router-dom";

const managerTypeSet = [
  {
    value: "manager",
    label: "manager",
  },
  {
    value: "fellow",
    label: "fellow",
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

const FellowDetails = () => {
  const [managerArr, setManagerArr] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [loaded, setLoaded] = useState(false);

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

  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
  };
  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
  };

  const handlePasscodeChange = (event) => {
    setPasscode(event.target.value);
  };

  const promotedS = async () => {
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
      managerid: managerName,
      passcode: passcode,
    };
    setLoaded(false);
    try {
      const res = await Api.post(`getPromotedStudentsReport`, body, config);
      if (res.status === 200) {
        setLoaded(true);
      }
    } catch (error) {
      setLoaded(true);
    }
  };
  return (
    <>
      <div className="container">
        <div className="left-div">
          <div>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div>
            <Link to="/fellowdetails">Fellow Details</Link>
          </div>
          <div>
            <Link to="/trainingmodule">Training Module</Link>
          </div>
        </div>
        <div className="right-div">
          <div>
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
                  onClick={promotedS}
                  style={{ width: 250, height: 40, marginTop: 5 }}
                >
                  Filter
                </Button>
              </Stack>
            </div>
          </div>
          {/* {DataTransfer.length > 0 ? null : <Logo/>} */}

          {loaded && <Logo />}
        </div>
      </div>
    </>
  );
};

export default FellowDetails;
