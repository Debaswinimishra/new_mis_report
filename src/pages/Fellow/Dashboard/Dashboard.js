import React, { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import Card from "../../../ReusableComponents/Card";
import Api from "../../../Environment/Api";
import Loader from "../../../ReusableComponents/Loader";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Download from "../../../downloads/ExportCsv";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Nodata from "../../../Assets/Nodata.gif";
import moment from "moment";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5e72e4",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Dashboard = () => {
  const [year, setYear] = useState("2023");
  const [selectYear, setSelectYear] = useState("2023");
  const [totalUsersCount, setTotalUsersCount] = useState({});
  const [femaleCount, setFemaleCount] = useState({});
  const [fellowsCount, setFellowsCount] = useState({});
  const [fellowshipCompleted, setFellowshipCompleted] = useState({});
  const [dropout, setDropout] = useState({});
  const [avrage, setAvrage] = useState({});
  const [endlineUser, setEndlineUser] = useState({});
  const [nsdcCertified, setNsdcCertified] = useState({});
  const [avgGradUser, setAvgGradUser] = useState({});
  const [avgEndline, setAvgEndline] = useState({});
  const [totalTime, SettotalTime] = useState({});
  const [loaded, setLoaded] = useState(false);

  const currentYear = new Date().getFullYear();
  const todayDate = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(todayDate);
  const [includesPvtSchools, setIncludePvtSchools] = useState("excluded");
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState([]);
  console.log("filteredData---------->", filteredData);

  //---------start date onChange---------------
  const startDateOnChange = (e) => {
    new Date(setStartDate(e.target.value)).toString();
    setEndDate("");
    setIncludePvtSchools("");
  };

  //---------end date onChange-----------------
  const endDateOnChange = (e) => {
    setEndDate(e.target.value);
    setIncludePvtSchools("");
  };

  //----------includesPvtSchool onChange--------
  const includesPvtSchoolsOnChange = (e) => {
    setIncludePvtSchools(e.target.value);
  };

  //-----------filter button click--------------
  const filterButtonOnClick = () => {
    const formatToISO = (dateString) => {
      const date = new Date(dateString);
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).toISOString();
    };

    const formattedBody = {
      start: formatToISO(startDate),
      end: formatToISO(endDate),
      pvtschls: includesPvtSchools,
    };

    const { start, end, pvtschls } = formattedBody;

    Api.get(`completedModulesByManager/${start}/${end}/${pvtschls}`)
      .then((res) => {
        if (res.status === 200) {
          setFilteredData([res.data]);
        } else {
          console.log("res.status----------->", res.status);
          setFilteredData();
        }
      })
      .catch((error) => {
        console.error(
          "The error while getting module completion--------->",
          error
        );
        setFilteredData();
      });
  };

  useEffect(() => {
    if (startDate && endDate && includesPvtSchools) {
      filterButtonOnClick();
    }
  }, []);

  //-----------Download Functionalities----------
  const fileName = "Dashboard";

  console.log(
    `start date-${startDate}---- end date-${endDate}-----pvt schls-${includesPvtSchools}`
  );

  const xlData =
    filteredData.length > 0 &&
    filteredData.map((x) => {
      const { ...exceptBoth } = x;
      return exceptBoth;
    });

  const handleCallAPI = async () => {
    try {
      const response = await Api.post(`getDashboardCounts`);
      if (response.data.status === 200) {
        setTotalUsersCount(response.data.resData);
        setFemaleCount(response.data.resData);
        setFellowsCount(response.data.resData);
        setFellowshipCompleted(response.data.resData);
        setDropout(response.data.resData);
        setAvrage(response.data.resData);
        setEndlineUser(response.data.resData);
        // setNsdcCertified(response.data.resData);
        setAvgGradUser(response.data.resData);
        setAvgEndline(response.data.resData);
        SettotalTime(response.data.resData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApi = () => {
    setLoaded(true);
    Api.post(`getDashboardCounts`).then((res) => {
      setUser(res.data);
      setLoaded(false);
      // Output the user data to the console
    });
  };
  useEffect(() => {
    handleApi();
  }, []);

  const handleSelectChange = (year) => {
    setYear(year);
  };
  const handleSelectYearChange = (selectYear) => {
    setSelectYear(selectYear);
  };

  useEffect(() => {
    handleCallAPI();
  }, [year]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {loaded ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              justifyContent: "center",
              maxWidth: "100%",
              padding: "30px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              borderRadius: "12px",
              marginTop: "10px",
            }}
          >
            <Card
              name="Total Educators Trained till date"
              number={user[0]?.totalUsersCount || "NA"}
              Icon={PeopleIcon}
            />
            <a
              style={{ textDecoration: "none" }}
              // href={Femalefellows}
              target="femailfellowship"
            >
              <Card
                name="Total Educators Trained till date(Female)"
                number={user[0]?.femaleUsersCount || "NA"}
                Icon={PeopleIcon}
              />
            </a>

            <a
              style={{ textDecoration: "none" }}
              // href={Femalefellows}
              target="female"
            >
              <Card
                name="Total Active Educators"
                number={user[0]?.activeUsersCount || "NA"}
                Icon={PeopleIcon}
              />
            </a>
            <a
              style={{ textDecoration: "none" }}
              // href={Femalefellows}
              target="Active fellows"
            >
              <Card
                name="Average Monthly Time Spent on App"
                number={user[0]?.averageTimeSpent || "NA"}
                Icon={PeopleIcon}
              />
            </a>
            <a
              style={{ textDecoration: "none" }}
              // href={Femalefellows}
              target="fellowdropout"
            >
              <Card
                name="Total Students Impacted till date"
                number={user[0]?.totalStudentsCount || "NA"}
                Icon={PeopleIcon}
              />
            </a>
            <Card
              name="Total Students Impacted till date - Female"
              number={user[0]?.femaleStudentsCount || "NA"}
              Icon={PeopleIcon}
            />
            <Card
              name="Total Students - 1 to 5"
              number={user[0]?.pgeStudentsCount || "NA"}
              Icon={PeopleIcon}
            />
            <Card
              name="Total Students - Pre-primary"
              number={user[0]?.eceStudentsCount || "NA"}
              Icon={PeopleIcon}
            />
          </div>
          <div style={{ width: "97.5%" }}>
            <Box>
              <div
                style={{
                  boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    marginTop: "50px",
                    padding: "20px",
                    display: "flex",
                    gap: "60px",
                    flexWrap: "wrap",
                    alignItems: "center",
                    paddingBottom: "100px",
                  }}
                >
                  <FormControl>
                    <label
                      htmlFor="startDate"
                      style={{ fontFamily: "monospace", fontWeight: "600" }}
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={startDate}
                      min={`${currentYear - 4}-01-01`} // Restrict start date to 2024 or current year
                      max={todayDate} // Restrict start date to today
                      onChange={startDateOnChange}
                      style={{
                        height: "56px",
                        borderRadius: "5px",
                        minWidth: "230px",
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <label
                      htmlFor="endDate"
                      style={{ fontFamily: "monospace", fontWeight: "600" }}
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={endDate}
                      min={startDate || `${currentYear}-01-01`} // Restrict end date to be after start date
                      max={todayDate} // Restrict end date to today
                      onChange={endDateOnChange}
                      style={{
                        height: "56px",
                        borderRadius: "5px",
                        minWidth: "230px",
                      }}
                    />
                  </FormControl>

                  <FormControl component="fieldset">
                    <label
                      htmlFor="privateschools"
                      style={{
                        fontFamily: "monospace",
                        fontWeight: "600",
                        marginTop: "15px",
                      }}
                    >
                      Private Schools
                    </label>
                    <div>
                      <RadioGroup
                        row
                        value={includesPvtSchools}
                        onChange={includesPvtSchoolsOnChange}
                        aria-label="private-schools"
                        name="private-schools"
                      >
                        <FormControlLabel
                          value="excluded"
                          control={<Radio />}
                          label="Exclude"
                        />
                        <FormControlLabel
                          value="included"
                          control={<Radio />}
                          label="Include"
                        />
                      </RadioGroup>
                    </div>
                  </FormControl>

                  <Button
                    variant="contained"
                    onClick={filterButtonOnClick}
                    style={{ minWidth: "150px", maxHeight: "50px" }}
                  >
                    Filter
                  </Button>
                </div>
                {loaded ? (
                  <Box sx={{ width: "100%", marginTop: "20%" }}>
                    <LinearProgress />
                  </Box>
                ) : !loaded && filteredData && Array.isArray(filteredData) ? (
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "20px",
                        justifyContent: "center",
                        padding: "20px",
                        fontFamily: "fantasy",
                        marginLeft: "33%",
                        height: "40vh",
                        fontSize: "19px",
                      }}
                    >
                      <a
                        style={{ textDecoration: "none" }}
                        target="fellowdropout"
                      >
                        <Card
                          name="Total training modules completed by teachers"
                          number={filteredData[0]?.count}
                          Icon={PeopleIcon}
                        />
                      </a>
                    </div>
                  </>
                ) : (
                  <div>
                    <img src={Nodata} alt="No Data" style={{}} />
                  </div>
                )}
              </div>
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
