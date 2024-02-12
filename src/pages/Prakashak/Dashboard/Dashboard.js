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

      <div style={{ marginTop: "2%", paddingBottom: "4%", marginLeft: "4%" }}>
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
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>No. of districts </h4>
          </div>
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>Number of blocks</h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>Number of clusters </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>No. of schools </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>No. of new schools </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>No. of students </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>No. of new students </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>Smartphone users</h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>No. of girls </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>Total number of boys </h4>
          </div>
        </div>
        <h3 style={{ marginTop: "1.5%" }}>
          <u>Time-Spent details</u>
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            width: "100%",
            gap: "2%",
            marginTop: "-2%",
          }}
        >
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>Parents spending 2-15 mins </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>Parents spending 16-30 mins </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>Parents spending 31-45 mins </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7%" }}>Parents spending 45+ mins </h4>
          </div>{" "}
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
            marginTop: "-1.5%",
          }}
        >
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>No.of calls received </h4>
          </div>
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>
              Avg. minutes of calls received
            </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>Total no. of SMS delivered </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>Avg. minutes spent in IVRs</h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>
              No. of calls received in IVRs{" "}
            </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>
              No. of unique calls received in IVRs
            </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>No. of active users</h4>
          </div>
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
            marginTop: "-1.5%",
          }}
        >
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>
              No. of conversations in Chatbot{" "}
            </h4>
          </div>
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>No. of videos watched</h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>No. of assessments taken</h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>
              Avg. minutes spent in WhatsApp
            </h4>
          </div>{" "}
          <div
            style={{
              backgroundColor: "#f3f2ff",
              width: "190px",
              height: "100px",
              borderRadius: "10px",
              border: "1px solid #000", // Added a border for better visualization
              marginTop: "2%",
            }}
          >
            <h2 style={{ color: "rgb(65, 105, 225)" }}>255</h2>
            <h4 style={{ marginTop: "-7.7%" }}>No. of active users</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
