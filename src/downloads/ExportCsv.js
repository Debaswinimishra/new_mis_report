

import React from "react";

import * as FileSaver from "file-saver";

import * as XLSX from "xlsx";

//Material UI Import
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";

export const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";

  const handleExportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Tooltip title="Download data in excel" arrow>
      <Button
        onClick={handleExportToCSV}
        style={{
          backgroundColor: "#5e72e4",
          borderColor: "#5e72e4",
          color: "#fff",
          margin: "10px",
          display: "flex",     
        }}
      >
        Download Report
      </Button>
    </Tooltip>
  );
};

export default ExportCSV;
