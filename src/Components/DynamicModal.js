import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

import Download from "../../src/downloads/ExportCsv";

const DynamicModal = ({
  open,
  handleClose,
  modalTitle,
  tableHeaders,
  tableData,
  xlData,
  fileName,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflow: "scroll",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalTitle}
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell align="center" key={index}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.keys(row).map((key, cellIndex) => (
                    <TableCell align="center" key={cellIndex}>
                      {key === "date"
                        ? moment(row[key]).format("DD/MM/YYYY")
                        : row[key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Uncomment and implement TablePagination if needed */}
        {/* <TablePagination
          component="div"
          count={totalDataLength}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}

        <Download csvData={xlData} fileName={fileName} />
      </Box>
    </Modal>
  );
};

export default DynamicModal;
