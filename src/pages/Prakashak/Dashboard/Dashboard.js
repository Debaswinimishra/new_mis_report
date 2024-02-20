import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import PrakashakFilters from "../../../ReusableComponents/PrakashakFilters";
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <PrakashakFilters />
      <div
        style={{
          marginTop: "2%",
          paddingBottom: "4%",
          marginLeft: "4%",
          alignContent: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            // justifyContent: "center",
            width: "100%",
            gap: "2%",
            // marginLeft: "4%",
          }}
        >
          <Card
            name="Number of districts"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Number of blocks"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Number of clusters"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Number of schools"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Number of new schools"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Number of new students"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Smartphone users"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Total number of girls"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Number of boys"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
        </div>
        <h3 style={{ marginTop: "1.5%" }}>
          <u>Time-Spent details</u>
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            // justifyContent: "center",
            width: "100%",
            gap: "2%",
            // marginTop: "-2%",
          }}
        >
          <Card
            name="Parents spending 2-15 mins"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Parents spending 16-30 mins"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Parents spending 31-45 mins"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Parents spending 45+ mins"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
        </div>

        <h3 style={{ marginTop: "1.5%" }}>
          <u>Remote instructions in brief</u>
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            // justifyContent: "center",
            width: "100%",
            gap: "2%",
            // marginTop: "-1.5%",
          }}
        >
          <Card
            name="Number of calls received"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Avg. minutes of calls received"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Numbers of SMS delivered"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Avg. minutes spent on IVRs"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Calls received in IVRs"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Unique calls received in IVRs"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Number of active users"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
        </div>

        <h3 style={{ marginTop: "1.5%" }}>
          <u>Chatbot in brief</u>
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            // justifyContent: "center",
            width: "100%",
            gap: "2%",
            // marginTop: "-1.5%",
          }}
        >
          <Card
            name="No. of conversations in Chatbot"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Total number of videos watched"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Number of assessments taken"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Avg. minutes spent on WhatsApp"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
          <Card
            name="Total number of active users"
            number={255}
            Icon={PeopleIcon}
            style={{ width: "200px", height: "170px", marginTop: "1%" }}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
