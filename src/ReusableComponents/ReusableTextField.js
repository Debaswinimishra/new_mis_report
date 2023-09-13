import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const ReusableTextField = ({ label, value, options, onChange }) => {
  return (
    <TextField
      id={`outlined-select-${label.replace(/\s/g, "").toLowerCase()}`}
      select
      label={label}
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <MenuItem key={index + 1} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ReusableTextField;
