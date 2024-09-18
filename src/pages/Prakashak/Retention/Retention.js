import React from "react";

export default function Retention() {
  const data = [
    {
      month: "Jan",
      activatedUsers: 665,
      retention: [665, 461, 485, 511, 503, 501, 506, 472],
    },
    {
      month: "Feb",
      activatedUsers: 2148,
      retention: [, 2148, 1847, 1812, 1794, 1715, 1695, 1578],
    },
    {
      month: "Mar",
      activatedUsers: 2192,
      retention: [, , 2192, 2175, 1992, 1726, 1693, 1644],
    },
    {
      month: "Apr",
      activatedUsers: 649,
      retention: [, , , 649, 641, 627, 638, 532],
    },
    {
      month: "May",
      activatedUsers: 3094,
      retention: [, , , , 3094, 3083, 3091, 2951],
    },
    {
      month: "Jun",
      activatedUsers: 1346,
      retention: [, , , , , 1346, 1339, 1263],
    },
    { month: "Jul", activatedUsers: 0, retention: [, , , , , , 0, 0] },
    {
      month: "Aug",
      activatedUsers: 1537,
      retention: [, , , , , , , 1537],
    },
    { month: "Sep", retention: [, , , , , , , , , , , ,] },
    { month: "Oct", retention: [, , , , , , , , , , , ,] },
    { month: "Nov", retention: [, , , , , , , , , , , ,] },
    { month: "Dec", retention: [, , , , , , , , , , , ,] },
  ];

  const totalRetention = [
    665, 2609, 4524, 5147, 8024, 8998, 8962, 9977, 0, 0, 0, 0,
  ];

  return (
    <>
      <h2
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "2%",
          color: "red",
          fontFamily: "Congenial SemiBold",
        }}
      >
        <u> Data Updated as on - 31/08/2024</u>
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
                TOTAL ACTIVE USERS (Level 1 and above)
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
