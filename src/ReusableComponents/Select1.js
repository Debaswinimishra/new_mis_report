import React from "react";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem"; // Correct import path

const Select1 = ({ selectedYear, onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);
  const handleYearChange = (event) => {
    // const selectedYear = parseInt(event.target.value);
    const selectedYear = event.target.value.toString();
    onChange(selectedYear);
  };
  return (
    <div>
      <TextField
        id="year"
        select
        value={selectedYear}
        label="Select year"
        onChange={(e) => handleYearChange(e)}
        style={{ width: "100%" }}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};
export default Select1;
