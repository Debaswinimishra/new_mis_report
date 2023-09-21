// import React from "react";

// const Module4 = () => {
//   return (
//     <>
//       <div>This Module is Under Development!</div>
//     </>
//   );
// };

// export default Module4;

import React, { useEffect, useState } from "react";
// import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PeopleIcon from "@mui/icons-material/People";
import "./Dashboard.css";
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

  const [user, setUser] = useState({});

  const handleCallAPI = async () => {
    try {
      const response = await Api.get(`getDashboardCounts/${year}`);
      if (response.data.status === "success") {
        setTotalUsersCount(response.data.resData);
        setFemaleCount(response.data.resData);
        setFellowsCount(response.data.resData);
        setFellowshipCompleted(response.data.resData);
        setDropout(response.data.resData);
        setAvrage(response.data.resData);
        setEndlineUser(response.data.resData);
        setNsdcCertified(response.data.resData);
        setAvgGradUser(response.data.resData);
        setAvgEndline(response.data.resData);
        SettotalTime(response.data.resData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApi = () => {
    Api.get(`getstudentdetails/${selectYear}`).then((res) => {
      setUser(res.data);
      // Output the user data to the console
    });
  };
  useEffect(() => {
    handleApi();
  }, [selectYear]);

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
      <div className="content">
        {/* <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            fontFamily: "'Nuosu SIL', serif",
          }}
        >
          <h2>Fellow Performance</h2>
        </div> */}

        {/* <div style={{ width: 220, marginTop: 15 }}>
          <Select1 selectedYear={year} onChange={handleSelectChange} />
        </div> */}
      </div>
      <div className="container">
        <Card
          name="Active Users"
          number={totalUsersCount.activeUsersCount || 0}
          Icon={PeopleIcon}
        />
        <a
          style={{ textDecoration: "none" }}
          href={Femalefellows}
          target="femailfellowship"
        >
          <Card
            name="Female fellows"
            number={femaleCount.femaleUsersCount || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "orange" }}
          />
        </a>

        <a
          style={{ textDecoration: "none" }}
          href={Femalefellows}
          target="female"
        >
          <Card
            name="Total Users"
            number={fellowshipCompleted.totalUsersCount || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "teal" }}
          />
        </a>
        <a
          style={{ textDecoration: "none" }}
          href={Femalefellows}
          target="Active fellows"
        >
          <Card
            name="Inactive fellows"
            number={fellowsCount.inactiveUsersCount || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "green" }}
          />
        </a>
        <a
          style={{ textDecoration: "none" }}
          href={Femalefellows}
          target="fellowdropout"
        >
          <Card
            name="Dropout Users"
            number={dropout.dropoutUsersCount || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "blue" }}
          />
        </a>
        {/* <Card
          name="Avrage score"
          number={avrage.avgBaselineMarks || 0}
          Icon={PeopleIcon}
          style={{ backgroundColor: "teal" }}
        /> */}
        {/* <Card
          name="Endline user"
          number={endlineUser.endlineUsersCount || 0}
          Icon={PeopleIcon}
          style={{ backgroundColor: "red" }}
        />
        <Card
          name="Endline score"
          number={avgEndline.avgEndlineMarks || 0}
          Icon={PeopleIcon}
        /> */}
        {/* <Card
          name="NSDC certified"
          number={nsdcCertified.nsdcCertifiedUsersCount || 0}
          Icon={PeopleIcon}
          style={{ backgroundColor: "yellow" }}
        /> */}
        <Card
          name="Timespent"
          number={avgGradUser.totalTimeSpent || 0}
          Icon={PeopleIcon}
          style={{ backgroundColor: "red" }}
        />
      </div>
      {/* <div className="content">
        <div>
          <h2>Student Performance</h2>
        </div>
        <div style={{ width: 220 }}>
          <Select1
            selectedYear={selectYear}
            onChange={handleSelectYearChange}
          />
        </div>
      </div> */}
      {/* <>
        <div className="container">
          <Card
            name="Total Students"
            number={user.allpgestudents}
            Icon={PeopleIcon}
            style={{ backgroundColor: "teal" }}
          />
          <Card
            name="Total Girls Students"
            number={user.totalfemalestudents || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "purple" }}
          />
          <Card
            name="Total Primary Students"
            number={user.totalactivestudents || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "orange" }}
          />
          <Card
            name="Pre-Primary Students"
            number={user.totaldropoutstudents || 0}
            Icon={PeopleIcon}
          />
          <Card
            name="Appeared Baceline"
            number={user.totalnoofstudents || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "red" }}
          />
          <Card
            name="Appeared Endline"
            number={user.totalecestudents || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "blue" }}
          />
          <Card
            name="Schools"
            number={user.totalgraduatedstudents || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "red" }}
          />
          <Card
            name="Schools"
            number={user.studentsCompletedFlnBaseline || 0}
            Icon={PeopleIcon}
            style={{ backgroundColor: "yellow" }}
          />
        </div>
      </> */}
      <Links />
    </>
  );
};

export default Dashboard;
