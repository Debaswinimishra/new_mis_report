import React, { useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import moment from "moment";

import Download from "../../src/downloads/ExportCsv";

const DynamicModal = ({
  loading,
  open,
  handleClose,
  modalTitle,
  tableHeaders,
  tableData,
  xlData,
  fileName,
}) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 100;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
          width: 1200,
          height: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            width: 0, // Remove the scrollbar
            height: 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ mt: -2 }}
          >
            Close
          </Button>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
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
                  {Array.isArray(tableData) &&
                    tableData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, rowIndex) => (
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
            <TablePagination
              component="div"
              count={tableData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
            />
            {tableData && tableData.length > 0 && (
              <Download csvData={xlData} fileName={fileName} />
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default DynamicModal;
