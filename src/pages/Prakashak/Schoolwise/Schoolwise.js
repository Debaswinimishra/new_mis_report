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
import logo from "../../../Assets/OE60SH0.jpg";

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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <img
        src={logo}
        alt="Under development"
        style={{ maxWidth: "100%", maxHeight: "80vh", marginBottom: "20px" }}
      />
      {/* <h4>This module is under development</h4> */}
    </div>
  );
};

export default Schoolwise;
