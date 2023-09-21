import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Download from "../downloads/ExportCsv";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5e72e4",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Fields = ({
  data,
  totalDataLength,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  xlData,
  fileName,
  columns,
  getCellValue,
}) => {
  return (
    <div style={{ padding: "30px 20px", width: "100%" }}>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 3,
          width: "100%",
          borderRadius: "6px",
          maxHeight: "800px",
        }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column}>{column}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && // Check if data is an array
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    {columns.map((column, columnIndex) => (
                      <StyledTableCell key={columnIndex}>
                        {getCellValue(row, column, index)}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalDataLength}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Download csvData={xlData} fileName={fileName} />
      </TableContainer>
    </div>
  );
};

export default Fields;
