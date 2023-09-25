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
import loader from "../../../Assets/R.gif";
import Text from "../../../ReusableComponents/Text";
import Select1 from "../../../ReusableComponents/Select1";
import Fields from "../../../ReusableComponents/Fields";
import Logo from "../../../ReusableComponents/Logo";
import Links from "../../../ReusableComponents/Links";
import Number from "../../../ReusableComponents/Number";
import Card from "../../../ReusableComponents/Card";
import loader from "../../../Assets/R.gif";
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

  const [user, setUser] = useState({});
  console.log("user--->", user);

  const handleCallAPI = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`getDashboardCounts`);

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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleApi = () => {
    setLoaded(true);
    Api.get(`getDashboardCounts`).then((res) => {
      setUser(res.data);
      setLoaded(false);
      // Output the user data to the console
      setLoading(false);
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
            name="Total Educatorss"
            number={user.totalUsersCount || "NA"}
            Icon={PeopleIcon}
          />
          <a
            style={{ textDecoration: "none" }}
            href={Femalefellows}
            target="femailfellowship"
          >
            <Card
              name="Total Educatorss"
              number={user.totalUsersCount || "NA"}
              Icon={PeopleIcon}
            />
            <a
              style={{ textDecoration: "none" }}
              href={Femalefellows}
              target="femailfellowship"
            >
              <Card
                name="Female Educators"
                number={user.femaleUsersCount || "NA"}
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
                name="Active Educators"
                number={user.activeUsersCount || "NA"}
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
                name="Monthly Timespent"
                number={user.averageTimeSpent || "NA"}
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
                name="Total Student"
                number={user.totalStudentsCount || "NA"}
                Icon={PeopleIcon}
                style={{ backgroundColor: "blue" }}
              />
            </a>
            <Card
              name="Total Female Student"
              number={user.femaleStudentsCount || "NA"}
              Icon={PeopleIcon}
              style={{ backgroundColor: "red" }}
            />
            <Card
              name="Total PGE Student"
              number={user.pgeStudentsCount || "NA"}
              Icon={PeopleIcon}
              style={{ backgroundColor: "red" }}
            />
            <Card
              name="Total ECE Student"
              number={user.eceStudentsCount || "NA"}
              Icon={PeopleIcon}
              style={{ backgroundColor: "red" }}
            />
          </a>
          <Card
            name="Total Female Student"
            number={user.femaleStudentsCount || "NA"}
            Icon={PeopleIcon}
            style={{ backgroundColor: "red" }}
          />
          <Card
            name="Total PGE Student"
            number={user.pgeStudentsCount || "NA"}
            Icon={PeopleIcon}
            style={{ backgroundColor: "red" }}
          />
          <Card
            name="Total ECE Student"
            number={user.eceStudentsCount || "NA"}
            Icon={PeopleIcon}
            style={{ backgroundColor: "red" }}
          />
        </div>
      )}
      <Links />
    </>
  );
};

export default Dashboard;
