import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Retention() {
  const data = [
    {
      month: "Jan",
      activatedUsers: 665,
      retention: [665, 461, 485, 511, 503, 501, 506, 472, 483],
    },
    {
      month: "Feb",
      activatedUsers: 2148,
      retention: [, 2148, 1847, 1812, 1794, 1715, 1695, 1578, 1629],
    },
    {
      month: "Mar",
      activatedUsers: 2192,
      retention: [, , 2192, 2175, 1992, 1726, 1693, 1644, 1718],
    },
    {
      month: "Apr",
      activatedUsers: 649,
      retention: [, , , 649, 641, 627, 638, 532, 431],
    },
    {
      month: "May",
      activatedUsers: 3094,
      retention: [, , , , 3094, 3083, 3091, 2951, 2824],
    },
    {
      month: "Jun",
      activatedUsers: 1346,
      retention: [, , , , , 1346, 1339, 1263, 1278],
    },
    { month: "Jul", activatedUsers: 0, retention: [, , , , , , 0, 0, 0] },
    {
      month: "Aug",
      activatedUsers: 1537,
      retention: [, , , , , , , 1537, 1475],
    },
    {
      month: "Sep",
      activatedUsers: 0,
      retention: [, , , , , , , , 0],
    },
    { month: "Oct", retention: [, , , , , , , , , , , ,] },
    { month: "Nov", retention: [, , , , , , , , , , , ,] },
    { month: "Dec", retention: [, , , , , , , , , , , ,] },
  ];

  const totalRetention = [
    665, 2609, 4524, 5147, 8024, 8998, 8962, 9977, 9838, 0, 0, 0,
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 1 }, (_, index) => currentYear - index);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          marginLeft: "89%",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
          <InputLabel id="usertype-label">Year</InputLabel>
          <Select
            labelId="usertype-label"
            id="usertype-select"
            value={selectedYear}
            onChange={handleYearChange}
            label="Year"
          >
            {years.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <h2
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "2%",
          color: "red",
          fontFamily: "Congenial SemiBold",
        }}
      >
        <i>
          <u> Data Updated as on - 30/09/2024</u>
        </i>
      </h2>
      <div
        style={{
          overflowX: "auto",
          margin: "20px 0",
          position: "relative",
          maxWidth: "100%",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Month
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Activated Users
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Jan
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Feb
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Mar
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Apr
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                May
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Jun
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Jul
              </th>
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Aug
              </th>{" "}
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Sept
              </th>{" "}
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Oct
              </th>{" "}
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Nov
              </th>{" "}
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f3f3f3",
                  zIndex: 1,
                  border: "1px solid #ddd",
                  padding: "8px 12px",
                  textAlign: "center", // Center align header text
                }}
              >
                Dec
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td
                  style={{
                    padding: "8px 12px",
                    textAlign: "center", // Center align body text
                    border: "1px solid #ddd",
                  }}
                >
                  {row.month}
                </td>
                <td
                  style={{
                    padding: "8px 12px",
                    textAlign: "center", // Center align body text
                    border: "1px solid #ddd",
                  }}
                >
                  {row.activatedUsers !== null ? row.activatedUsers : ""}
                </td>
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "8px 12px",
                        textAlign: "center", // Center align body text
                        border: "1px solid #ddd",
                      }}
                    >
                      {row.retention[i] !== undefined ? row.retention[i] : ""}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
          <tfoot style={{ backgroundColor: "#7FFFD4" }}>
            <tr>
              <td
                colSpan="2"
                style={{
                  padding: "8px 30px",
                  fontWeight: "bold",
                  textAlign: "center", // Center align footer text
                  border: "1px solid #ddd",
                }}
              >
                TOTAL ACTIVE USERS (Level 1 and above) - 4th week data of every
                month
              </td>
              {totalRetention.map((value, index) => (
                <td
                  key={index}
                  style={{
                    padding: "8px 30px",
                    fontWeight: "bold",
                    textAlign: "center", // Center align footer text
                    border: "1px solid #ddd",
                  }}
                >
                  {value}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
