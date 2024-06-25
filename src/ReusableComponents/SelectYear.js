import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectYear = ({ Year, handleYearChange }) => {
  const currentYear = new Date().getFullYear();
  const yearArr = Array.from({ length: 2 }, (_, i) => currentYear - i);

  return (
    <FormControl sx={{ m: 1 }} size="small" style={{ width: "120px" }}>
      <InputLabel id="Year-label">Year</InputLabel>
      <Select
        labelId="Year-label"
        id="Year-select"
        value={Year}
        onChange={(e) => handleYearChange(e)}
        label="Year"
      >
        {yearArr.map((year, index) => (
          <MenuItem key={index} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectYear;
