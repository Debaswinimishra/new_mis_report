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
    { month: "Jul", activatedUsers: 0, retention: [] },
    { month: "Aug", activatedUsers: null, retention: [] },
    { month: "Sep", activatedUsers: null, retention: [] },
    { month: "Oct", activatedUsers: null, retention: [] },
    { month: "Nov", activatedUsers: null, retention: [] },
    { month: "Dec", activatedUsers: null, retention: [] },
  ];

  const totalRetention = [
    665, 2609, 4524, 5147, 8024, 8998, 8962, 0, 0, 0, 0, 0,
  ];

  return (
    <div>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Month</th>
            <th>Activated Users</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Apr</th>
            <th>May</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Aug</th>
            <th>Sep</th>
            <th>Oct</th>
            <th>Nov</th>
            <th>Dec</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.month}</td>
              <td>{row.activatedUsers !== null ? row.activatedUsers : ""}</td>
              {Array(12)
                .fill(0)
                .map((_, i) => (
                  <td key={i}>
                    {row.retention[i] !== undefined ? row.retention[i] : ""}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              TOTAL ACTIVE USERS (Level 1 and above) - 4th week data of every
              month
            </td>
            {totalRetention.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
