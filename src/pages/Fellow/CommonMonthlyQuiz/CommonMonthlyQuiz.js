import { useEffect, useState } from "react";
import * as React from "react";
// import Text from "../../components/Text";
import Text from "../../../ReusableComponents/Text";
import Select1 from "../../../ReusableComponents/Select1";
import Fields from "../../../ReusableComponents/Fields";
import Logo from "../../../ReusableComponents/Logo";
import Links from "../../../ReusableComponents/Links";
import Number from "../../../ReusableComponents/Number";
import moment from "moment/moment";
// import Api from "../../environment/Api";
// import Api from "../../../Environment/Api";
import Api from "../../../Environment/Api";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ReusableTextField from "../../../ReusableComponents/ReusableTextField";
// import { getAllCommunityEducatiorFilter } from "../../AllApi/ComunityEducator";
import { getAllCommunityEducatiorFilter } from "../../Fellow/CommunityEducator/CommunityEducatorApi";
// import {
//   getAllTopic,
//   getAllTopicDetails,
//   getTtlQuizReportUserWise,
// } from "./CommonMonthlyQuizApi";
import {
  getAllTopic,
  getTtlQuizQuestions,
  getAllTopicDetails,
  getTtlQuizReportUserWise,
} from "../../Fellow/CommonMonthlyQuiz/CommonMonthlyQuizApi";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const managerTypeSet = [
  // { value: "none", label: "none" },
  { value: "MANAGER", label: "Manager" },
  { value: "Crc", label: "CRC" },
  { value: "Aww", label: "Supervisor" },
];

const noneValue = [{ value: "none", label: "None" }];

const ComunityEducator = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [managerArr, setManagerArr] = useState([]);
  // console.log("managerArr===>", managerArr);
  const [topicArr, setTopicArr] = useState([]);
  // console.log("topicArr===>", topicArr);
  const [questionArr, setQuestionArr] = useState([]);
  // console.log("questionArr--->", questionArr);
  const [managerType, setManagerType] = useState("");
  const [passcode, setPasscode] = useState("");
  const [managerName, setManagerName] = useState("");
  const [topicName, setTopicName] = useState("");
  // console.log("topicname", topicName);
  const [questionName, setQuestionName] = useState("");
  // console.log("questionName==", questionName);
  const [topicId, setTopicId] = useState("");
  // console.log("topicId--->", topicId);
  const [questionId, setQuestionId] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = React.useState("one");
  const [selectedFilter, setSelectedFilter] = useState(false); // Default to "topic"

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "one") {
      setSelectedYear("");
      setManagerType("");
      setManagerName("");
      setPasscode("");
      setTopicName("");
      setQuestionName("");
      setTopicArr([]);
      setQuestionArr([]);
      // Reset other states for "Topicwise Answer" tab...
    } else if (newValue === "two") {
      setSelectedYear("");
      setManagerType("");
      setManagerName("");
      setPasscode("");
      setTopicName("");
      setQuestionName("");
      setQuestionArr([]);
      // Reset other states for "Questionwise Answer" tab...
    }
    // Reset filterClicked when changing tabs
    else setFilterClicked(false);
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
    setManagerName("");
    setPasscode("");
    setTopicName("");
    setQuestionName("");

    // setManagerArr([]);
    // setManagerName("");
  };

  const handleManagerTypeChange = (event) => {
    setManagerType(event.target.value);
    setManagerName("");
    setPasscode("");
    setTopicName("");
    setQuestionName("");
  };

  const handleManagerChange = (event) => {
    setManagerName(event.target.value);
    setPasscode("");
    setTopicName("");
    setQuestionName("");
  };

  const handlePasscodeChange = async (event) => {
    setPasscode(event.target.value);
    setTopicName("");
    setQuestionName("");

    try {
      const response = await getAllTopic();
      // console.log("response--->", response.data, response.status);
      setTopicArr(response.data);
    } catch (err) {
      console.log("err--->", err.response);
    }
  };

  // const handleTopicChange = (event) => {
  //   const selectedTopicName = event.target.value;
  //   setTopicName(selectedTopicName);
  //   if (selectedTopicName) {
  //     Api.get(`getTtlQuizQuestions/${selectedTopicName}`)
  //       .then((response) => {
  //         console.log(response, "response===>");
  //         setQuestionArr(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching quiz questions:", error);
  //       });
  //   }
  // };

  const handleTopicChange = async (event) => {
    const selectedTopicName = event.target.value;
    setTopicName(selectedTopicName);

    if (selectedTopicName) {
      try {
        const response = await getTtlQuizQuestions({
          topicid: selectedTopicName,
        });
        console.log(response, "response===>");
        setQuestionArr(response.data);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    }
  };

  const handleQuestionChange = (event) => {
    setQuestionName(event.target.value);
    console.log("setQuestionName", setQuestionName);
  };

  const topicFilter = async () => {
    if (selectedYear === "" || managerName === "" || passcode === "") {
      return alert("Please select some filters to proceed");
    }

    if (topicName) {
      // User has selected a topic, call the question API
      try {
        const topicResponse = await getAllTopicDetails({
          year: selectedYear,
          managerid: managerName,
          passcode: passcode,
          topicid: topicName,
        });
        if (topicResponse.status === 200) {
          setData(topicResponse.data);
          setTotalDataLength(topicResponse.data.length);
          setLoaded(true);
          setSelectedFilter(true);
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    } else {
      alert("Please select some filters to proceed");
    }
  };

  const questionFilter = async () => {
    console.log("questionFilter==", questionName);
    if (selectedYear === "" || managerName === "" || passcode === "") {
      return alert("Please select some filters to proceed");
    }

    if (questionName) {
      // User has selected a topic, call the question API
      try {
        const questionResponse = await getTtlQuizReportUserWise({
          year: selectedYear,
          managerid: managerName,
          passcode: passcode,
          topicid: topicName,
          questionId: questionName,
        });
        if (questionResponse.status === 200) {
          setData(questionResponse.data);
          setTotalDataLength(questionResponse.data.length);
          setLoaded(true);
          setSelectedFilter(true);
        }
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    } else {
      alert("Please select some filters to proceed");
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
    "Manager Id",
    "Passcode",
    "Userid",
    "Username",
    "Topic name",
    "Secured Mark",
    "Total Mark",
  ];

  const getCellValue = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Year":
        return row.year;
      case "Manager Id":
        return row.managerid;
      case "Passcode":
        return row.passcode;
      case "Userid":
        return row.userid;
      case "Username":
        return row.username;
      case "Topic name":
        return row.topicName;
      case "Secured Mark":
        return row.securedMarks;
      case "Total Mark":
        return row.totalMarks;
      default:
        return "";
    }
  };

  const columns1 = [
    "Serial No",
    "Year",
    "Manager Id",
    "Passcode",
    "Userid",
    "Username",
    "Topic name",
    "Question",
    "Answer",
  ];

  const getCellValue1 = (row, column, index) => {
    switch (column) {
      case "Serial No":
        return index + 1;
      case "Year":
        return row.year;
      case "Manager Id":
        return row.managerid;
      case "Passcode":
        return row.passcode;
      case "Userid":
        return row.userid;
      case "Username":
        return row.username;
      case "Topic name":
        return row.topicName;
      case "Question":
        return row.question;
      case "Answer":
        // return row.answer ? row.answer: row.correct
        return row.correct === true
          ? "True"
          : // : row.correct === false?"False":
          row.answer
          ? row.answer
          : "check condition";
      default:
        return "";
    }
  };

  const fileName = "common monthly quiz";

  const xlData = data.map((x) => {
    const { ...exceptBoth } = x;
    return exceptBoth;
  });
  return (
    <>
      <div style={{ margin: "10px" }}></div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value="one" label="Topicwise Answer" />
        <Tab value="two" label="Questionwise Answer" />
      </Tabs>
      {value === "one" && (
        <Box>
          {/* Filter section */}
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
                {selectedYear ? (
                  <Text
                    name="Select manager-type"
                    currencies={managerTypeSet}
                    handleChange={handleManagerTypeChange}
                  />
                ) : (
                  <Text
                    name="Select manager-type"
                    currencies={noneValue}
                    handleChange={handleManagerTypeChange}
                  />
                )}

                {selectedYear ? (
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
                ) : (
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select manager"
                    defaultValue="none"
                    value=""
                    onChange={(e) => handleManagerChange(e)}
                  >
                    <MenuItem value="None">None</MenuItem>
                  </TextField>
                )}

                {selectedYear && managerType ? (
                  <ReusableTextField
                    label="Select passcode"
                    value={passcode}
                    options={passcodeArray}
                    onChange={handlePasscodeChange}
                  />
                ) : (
                  <ReusableTextField
                    label="Select passcode"
                    defaultValue="none"
                    value=""
                    options={passcodeArray}
                    onChange={handlePasscodeChange}
                  />
                )}

                {selectedYear && managerType && managerName ? (
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Topic"
                    defaultValue="none"
                    value={topicName}
                    onChange={handleTopicChange}
                  >
                    {topicArr.map((option, index) => (
                      <MenuItem key={option.topicId} value={option.topicId}>
                        {option.topicName}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Topic"
                    defaultValue="none"
                    value=""
                    onChange={handleTopicChange}
                  >
                    <MenuItem value="None">None</MenuItem>
                  </TextField>
                )}

                {/* ... Further code ... */}

                {/* <TextField
                  id="outlined-select-currency"
                  select
                  label="Select Question"
                  defaultValue="none"
                  value={questionName}
                  onChange={handleQuestionChange}
                >
                  {questionArr?.map((option, index) => (
                    <MenuItem key={option.question} value={option.questionId}>
                      {option.question}
                    </MenuItem>
                  ))}
                </TextField> */}

                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    onClick={topicFilter}
                    style={{ width: 250, height: 40, marginTop: 5 }}
                  >
                    Filter
                  </Button>
                </Stack>
              </div>
            </div>

            {/* Display data */}
            {selectedFilter && loaded && value === "one" && (
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
        </Box>
      )}
      {value === "two" && (
        <Box>
          {/* Filter section */}
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
                {selectedYear ? (
                  <Text
                    name="Select manager-type"
                    currencies={managerTypeSet}
                    handleChange={handleManagerTypeChange}
                  />
                ) : (
                  <Text
                    name="Select manager-type"
                    currencies={noneValue}
                    handleChange={handleManagerTypeChange}
                  />
                )}

                {selectedYear ? (
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
                ) : (
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select manager"
                    defaultValue="none"
                    value=""
                    onChange={(e) => handleManagerChange(e)}
                  >
                    <MenuItem value="None">None</MenuItem>
                  </TextField>
                )}

                {selectedYear && managerType ? (
                  <ReusableTextField
                    label="Select passcode"
                    value={passcode}
                    options={passcodeArray}
                    onChange={handlePasscodeChange}
                  />
                ) : (
                  <ReusableTextField
                    label="Select passcode"
                    defaultValue="none"
                    value=""
                    options={passcodeArray}
                    onChange={handlePasscodeChange}
                  />
                )}

                {selectedYear && managerType && managerName ? (
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Topic"
                    defaultValue="none"
                    value={topicName}
                    onChange={handleTopicChange}
                  >
                    {topicArr.map((option, index) => (
                      <MenuItem key={option.topicId} value={option.topicId}>
                        {option.topicName}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select Topic"
                    defaultValue="none"
                    value=""
                    onChange={handleTopicChange}
                  >
                    <MenuItem value="None">None</MenuItem>
                  </TextField>
                )}

                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select Question"
                  defaultValue="none"
                  value={questionName}
                  onChange={handleQuestionChange}
                >
                  {questionArr?.map((option, index) => (
                    <MenuItem key={option.question} value={option.questionId}>
                      {option.question}
                    </MenuItem>
                  ))}
                </TextField>

                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    onClick={questionFilter}
                    style={{ width: 250, height: 40, marginTop: 5 }}
                  >
                    Filter
                  </Button>
                </Stack>
              </div>
            </div>

            {/* Display data */}
            {selectedFilter && loaded && value === "two" && (
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
                    columns={columns1}
                    getCellValue={getCellValue1}
                  />
                ) : (
                  <Logo />
                )}
              </>
            )}
            <Links />
          </>
        </Box>
      )}
    </>
  );
};

export default ComunityEducator;
