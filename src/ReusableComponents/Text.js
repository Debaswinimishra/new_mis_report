import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Text = ({ name, currencies, handleChange }) => {
  return (
    <TextField
      id="outlined-select-currency"
      select
      label={name}
      onChange={(e) => handleChange(e)}
    >
      <MenuItem>None</MenuItem>

      {currencies?.map((option) => (
        <MenuItem key={option.id} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Text;
