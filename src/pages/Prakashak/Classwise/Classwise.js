import React, { useState } from "react";
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
import Card from "../../../ReusableComponents/Card";
import PeopleIcon from "@mui/icons-material/People";

const classArr = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];
const Classwise = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };
  const handleFilter = () => {
    // console.log("school--->", e.target.value);
    alert("clicked");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          // marginTop: "10%",
          // marginLeft: "40%",
          marginRight: "20%",
          // flexWrap: "wrap",
        }}
      >
        <FormControl
          sx={{ m: 0.5 }}
          size="small"
          style={{ width: "130px", marginTop: "4.5%" }}
        >
          <InputLabel id="usertype-label">Class</InputLabel>
          <Select
            labelId="usertype-label"
            id="usertype-select"
            value={selectedClass}
            onChange={handleClassChange}
            label="class"
            style={{ width: "90px" }}
          >
            {classArr.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <button
        style={{
          border: "2px solid rgb(65, 105, 225)",
          padding: "1%",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "rgb(65, 105, 225)",
          width: "10rem",
          height: "3rem",
          marginTop: "-3.5%",
          marginRight: "5%",
        }}
        // value={item.id}
        onClick={() => handleFilter()}
      >
        <h3 style={{ color: "white", marginTop: "-1.9%" }}>Filter</h3>
      </button>
      {/* ---------------------------- content --------------------- */}
      <div
        style={{
          // display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          width: "96%",
          marginLeft: "3%",
          marginBottom: "2%",
        }}
      >
        <Card
          name="Number of students"
          number={255}
          Icon={PeopleIcon}
          style={{
            width: "208px",
            height: "170px",
            marginTop: "1.5%",
            backgroundColor: "#F5F5F5",
          }}
        />
        <h1>Remote Instructions in Brief</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            // justifyContent: "space-evenly",
            width: "100%",
            gap: "2%",
          }}
        >
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />{" "}
          <Card
            name="Number of students"
            number={255}
            Icon={PeopleIcon}
            style={{
              width: "208px",
              height: "170px",
              marginTop: "1.5%",
              backgroundColor: "#F5F5F5",
            }}
          />
        </div>
        <h1>Chatbot in Brief</h1>
        <Card
          name="Number of students"
          number={255}
          Icon={PeopleIcon}
          style={{
            width: "208px",
            height: "170px",
            marginTop: "1.5%",
            backgroundColor: "#F5F5F5",
          }}
        />{" "}
      </div>
    </div>
  );
};

export default Classwise;
