import React from "react";

export default function Retention() {
  const data = [
    {
      month: "Jan",
      activatedUsers: 665,
      retention: [665, 461, 485, 511, 503, 501, 506],
    },
    {
      month: "Feb",
      activatedUsers: 2148,
      retention: [, 2148, 1847, 1812, 1794, 1715, 1695],
    },
    {
      month: "Mar",
      activatedUsers: 2192,
      retention: [, , 2192, 2175, 1992, 1726, 1693],
    },
    {
      month: "Apr",
      activatedUsers: 649,
      retention: [, , , 649, 641, 627, 638],
    },
    {
      month: "May",
      activatedUsers: 3094,
      retention: [, , , , 3094, 3083, 3091],
    },
    {
      month: "Jun",
      activatedUsers: 1346,
      retention: [, , , , , 1346, 1339],
    },
    { month: "Jul", activatedUsers: 0, retention: [, , , , , , 0] },
  ];

  const totalRetention = [665, 2609, 4524, 5147, 8024, 8998, 8962];

  return (
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
              {Array(7)
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
        <tfoot>
          <tr>
            <td
              colSpan="2"
              style={{
                padding: "8px 12px",
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
                  padding: "8px 12px",
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
  );
}
