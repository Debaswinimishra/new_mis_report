import React, { useEffect, useState } from "react";
// import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import "./Dashboard.css";
import loader from "../../../Assets/R.gif";
import Text from "../../../ReusableComponents/Text";
import Select1 from "../../../ReusableComponents/Select1";
import Fields from "../../../ReusableComponents/Fields";
import Logo from "../../../ReusableComponents/Logo";
import Links from "../../../ReusableComponents/Links";
import Number from "../../../ReusableComponents/Number";
import Card from "../../../ReusableComponents/Card";
// import Links from "../components/Links";
// import Api from "../environment/Api";
// import Api from "../../..Environment/Api";
import Api from "../../../Environment/Api";
// import Select1 from "../components/Select1";
const Femalefellows = "http://localhost:3000/home/fellows";
const Dashboard = () => {
  const [year, setYear] = useState("2023");
  const [selectYear, setSelectYear] = useState("2023");
  const [totalUsersCount, setTotalUsersCount] = useState({});
  const [femaleCount, setFemaleCount] = useState({});
  // console.log("femaleCount---->", femaleCount);
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

  const [user, setUser] = useState([]);
  console.log("user--->", user);

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
    <>
      <div className="content"></div>
      {loaded ? (
        <img src={loader} />
      ) : (
        <div className="container">
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
              style={{ backgroundColor: "orange" }}
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
              style={{ backgroundColor: "teal" }}
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
              style={{ backgroundColor: "green" }}
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
              style={{ backgroundColor: "blue" }}
            />
          </a>
          <Card
            name="Total Students Impacted till date - Female"
            number={user[0]?.femaleStudentsCount || "NA"}
            Icon={PeopleIcon}
            style={{ backgroundColor: "red" }}
          />
          <Card
            name="Total Students - 1 to 5"
            number={user[0]?.pgeStudentsCount || "NA"}
            Icon={PeopleIcon}
            style={{ backgroundColor: "red" }}
          />
          <Card
            name="Total Students - Pre-primary"
            number={user[0]?.eceStudentsCount || "NA"}
            Icon={PeopleIcon}
            style={{ backgroundColor: "red" }}
          />
        </div>
      )}
      {/* <Box position="fixed" bottom={0} left={0}>
        <Links />
      </Box> */}
    </>
  );
};

export default Dashboard;
