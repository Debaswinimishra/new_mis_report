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
import PrakashakFilters from "../../../ReusableComponents/PrakashakFilters";

const Dashboard = () => {
  return (
    <>
      <PrakashakFilters />
      <div style={{ marginTop: "2%" }}>
        <div
          className="overall"
          style={{ display: "flex", fontWeight: "revert" }}
        >
          <p>Districts</p>
          <p>Blocks</p>
          <p>Clusters</p>
          <p>Schools</p>
          <p>New Schools</p>
        </div>
        <div className="timespent">
          <h4>Time-Spent Details</h4>
        </div>
        <div className="remoteInstructions">
          <h4>Remote Instructions in Brief</h4>
        </div>
        <div className="chatbot">
          <h4>Chatbot in brief</h4>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
