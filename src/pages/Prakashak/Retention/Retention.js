import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PrakashakAPI from "../../../Environment/PrakashakAPI";

export default function Retention() {
  const fetchType = "static";
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, index) => currentYear - index);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalRetention, setTotalRetention] = useState([]);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const fetchData = async () => {
    setLoading(true);

    const body = {
      year: parseInt(selectedYear),
    };

    PrakashakAPI.post(`getRetentionMetrics/${fetchType}`, body)
      .then((res) => {
        const result = res.data;
        const activatedUsersArray = Array(12).fill(0);

        result.forEach((item) => {
          const monthIndex = item.month - 1;
          activatedUsersArray[monthIndex] = item.activated_users || 0;
        });
        setData(result);
        setTotalRetention(activatedUsersArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error fetching data: ${err}`);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  console.log("data---------------->", data);

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
              <th>Jan</th>
              <th>Feb</th>
              <th>Mar</th>
              <th>Apr</th>
              <th>May</th>
              <th>Jun</th>
              <th>Jul</th>
              <th>Aug</th>
              <th>Sept</th>
              <th>Oct</th>
              <th>Nov</th>
              <th>Dec</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((row, index) => (
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
                    {row.activeUsers !== null ? row.activeUsers : ""}
                  </td>

                  {/* Render retention values based on month order */}
                  {[
                    "jan",
                    "feb",
                    "mar",
                    "apr",
                    "may",
                    "jun",
                    "jul",
                    "aug",
                    "sep",
                    "oct",
                    "nov",
                    "dec",
                  ].map((month, monthIndex) => {
                    return (
                      <td
                        key={monthIndex}
                        style={{
                          padding: "8px 12px",
                          textAlign: "center",
                          border: "1px solid #ddd",
                        }}
                      >
                        {row.retention && row.retention[month] !== undefined
                          ? row.retention[month]
                          : "-"}
                      </td>
                    );
                  })}
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
