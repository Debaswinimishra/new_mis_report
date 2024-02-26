import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
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
import Api from "../Environment/Api";
const Schoolwise = () => {
  let districtArr = [];
  let blocksArr = [];
  let clusterArr = [];
  let schoolArr = [];

  const [districtName, setDistrictName] = useState();

  const [blockName, setBlockName] = useState();
  const [cluster, setCluster] = useState();
  const [school, setSchool] = useState();
  const handleDistrictChange = async (e) => {
    // const selectedValue = e.target.value;
    // const selectedDistrictName = e.currentTarget.getAttribute("data-name");
    setBlockName("");
    setDistrictName(e.target.value);
    // console.log("Selected value:", e);
    // console.log("Selected district name:", selectedDistrictName);
    // const response = await getDistrictsWiseBlocks(e.target.value);
    // console.log("block response---->", response.data);
    // setAllBlocks(response.data);
  };

  const handleBlockChange = (e) => {
    console.log("block--->", e.target.value);
    setBlockName(e.target.value);
  };
  const handleClusterChange = (e) => {
    console.log("cluster--->", e.target.value);
    setCluster(e.target.value);
  };
  const handleSchoolChange = (e) => {
    console.log("school--->", e.target.value);
    setSchool(e.target.value);
  };
  const handleFilter = () => {
    // console.log("school--->", e.target.value);
    alert("clicked");
  };
  const [data, setData] = useState({});
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   // const body = {
  //   //   district: selectedYear,
  //   //   month: selectedMonth,
  //   //   week: selectedWeek,
  //   //   class: selectedClass,
  //   // };

  //   // console.log(
  //   //   "check---------->",
  //   //   selectedYear,
  //   //   selectedMonth,
  //   //   selectedWeek,
  //   //   selectedClass
  //   // );

  //   if (selectedYear && selectedMonth && selectedWeek && selectedClass) {
  //     Api.post(`getSchoolWiseReport`, body)
  //       .then((response) => {
  //         console.log("set=================>", response.data);
  //         setData(response.data);
  //       })
  //       .catch((err) => {
  //         console.log("err=================>", err);
  //       });
  //   } else {
  //     Api.post(`getClassWiseReport`)
  //       .then((response) => {
  //         console.log("set=================>", response.data);
  //         setData(response.data);
  //       })
  //       .catch((err) => {
  //         console.log("err=================>", err);
  //       });
  //   }
  // };

  // const filterButtonClick = () => {
  //   // alert("filter button clicked");
  //   fetchData();
  // };
  return (
    <div>
      <div style={{ margin: "2%", marginLeft: "50%", display: "flex" }}>
        <TextField
          id="outlined-select-currency"
          select
          sx={{ m: 0.5 }}
          size="small"
          style={{ width: "120px" }}
          label="Select districts"
          defaultValue="none"
          value={districtName}
          onChange={(e) => handleDistrictChange(e)}
        >
          <MenuItem value="">None</MenuItem>
          {districtArr?.map((option, index) => (
            <MenuItem
              key={index + 1}
              value={option.districtid}
              data-name={option.districtname}
            >
              {option.districtname}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          sx={{ m: 0.5 }}
          size="small"
          style={{ width: "120px" }}
          label="Select Blocks"
          defaultValue="none"
          value={blockName}
          onChange={(e) => handleBlockChange(e)}
        >
          <MenuItem value="">None</MenuItem>
          {blocksArr.map((option, index) => (
            <MenuItem key={index + 1} value={option.blockid}>
              {option.blockname}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          sx={{ m: 0.5 }}
          size="small"
          style={{ width: "120px" }}
          label="Select Cluster"
          defaultValue="none"
          value={cluster}
          onChange={(e) => handleClusterChange(e)}
        >
          <MenuItem value="">None</MenuItem>
          {clusterArr.map((option, index) => (
            <MenuItem key={index + 1} value={option.blockid}>
              {option.cluster}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          sx={{ m: 0.5 }}
          size="small"
          style={{ width: "120px" }}
          label="Select School"
          defaultValue="none"
          value={school}
          onChange={(e) => handleSchoolChange(e)}
        >
          <MenuItem value="">None</MenuItem>
          {schoolArr.map((option, index) => (
            <MenuItem key={index + 1} value={option.blockid}>
              {option.school}
            </MenuItem>
          ))}
        </TextField>
        <button
          style={{
            border: "2px solid rgb(65, 105, 225)",
            padding: "1%",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "rgb(65, 105, 225)",
            width: "35%",
            height: "3rem",
          }}
          // value={item.id}
          onClick={() => handleFilter()}
        >
          <h3 style={{ color: "white", marginTop: "2%" }}>Filter</h3>
        </button>
      </div>

      <div
        style={{
          // display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#f3f2ff",
            width: "250px",
            height: "120px",
            borderRadius: "10px",
            border: "1px solid #000",
            margin: "5px",
          }}
        >
          <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
          <h3>Total No. of Students </h3>
        </div>
        <h1>Remote Instructions in Brief</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            // justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "250px",
              height: "120px", // Increased the height to accommodate all child divs
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              margin: "5px", // Added margin for better spacing
            }}
          >
            <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
            <h3>Total No. of Students </h3>
          </div>
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "250px",
              height: "120px", // Increased the height to accommodate all child divs
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              margin: "5px", // Added margin for better spacing
            }}
          >
            <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
            <h3>Total No. of Students </h3>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "250px",
              height: "120px", // Increased the height to accommodate all child divs
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              margin: "5px", // Added margin for better spacing
            }}
          >
            <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
            <h3>Total No. of Students </h3>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "250px",
              height: "120px", // Increased the height to accommodate all child divs
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              margin: "5px", // Added margin for better spacing
            }}
          >
            <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
            <h3>Total No. of Students </h3>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "250px",
              height: "120px", // Increased the height to accommodate all child divs
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              margin: "5px", // Added margin for better spacing
            }}
          >
            <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
            <h3>Total No. of Students </h3>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "250px",
              height: "120px", // Increased the height to accommodate all child divs
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              margin: "5px", // Added margin for better spacing
            }}
          >
            <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
            <h3>Total No. of Students </h3>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "250px",
              height: "120px", // Increased the height to accommodate all child divs
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              margin: "5px", // Added margin for better spacing
            }}
          >
            <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
            <h3>Total No. of Students </h3>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "250px",
              height: "120px", // Increased the height to accommodate all child divs
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              margin: "5px", // Added margin for better spacing
            }}
          >
            <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
            <h3>Total No. of Students </h3>
          </div>
        </div>
        <h1>Chatbot in Brief</h1>
        <div
          style={{
            backgroundColor: "#f3f2ff",
            width: "250px",
            height: "120px", // Increased the height to accommodate all child divs
            borderRadius: "10px",
            border: "1px solid #000", // Added a border for better visualization
            margin: "5px", // Added margin for better spacing
          }}
        >
          <h1 style={{ color: "rgb(65, 105, 225)" }}>255</h1>
          <h3>Total No. of Students </h3>
        </div>
      </div>
    </div>
  );
};

export default Schoolwise;
