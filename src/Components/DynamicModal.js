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
import TextField from "@mui/material/TextField";
import Nodata from "../../src/Assets/Nodata.gif";
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
  const [searchname, setSearchname] = useState("");
  const rowsPerPage = 15;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCloseAndReset = () => {
    setPage(0);
    handleClose();
  };

  const handleModalClose = () => {
    setSearchname(""); // Reset the search input
    handleClose(); // Call the original handleClose function
  };

  // Conditionally filter data based on modalTitle
  const filteredTableData =
    modalTitle === "Number of Students"
      ? tableData.filter(
          (row) =>
            row.student_name &&
            row.student_name.toLowerCase().includes(searchname.toLowerCase())
        )
      : tableData;

  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "80%",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          overflowX: "scroll",
          "&::-webkit-scrollbar": {
            width: 0,
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
            gap: 3,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseAndReset}
              sx={{ width: "40%" }}
            >
              Close
            </Button>
          </div>
        </Box>

        {modalTitle === "Number of Students" && (
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Search Students' name..."
            variant="outlined"
            size="small"
            value={searchname}
            onChange={(e) => setSearchname(e.target.value)}
          />
        )}

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
        ) : filteredTableData.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((header, index) => (
                      <TableCell
                        align="center"
                        key={index}
                        style={{ fontSize: "17px" }}
                      >
                        <b>{header}</b>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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

            {tableData.length >= 15 ? (
              <TablePagination
                component="div"
                count={tableData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[]}
                labelDisplayedRows={({ from, to }) => `${from}-${to}`}
              />
            ) : null}

            {tableData && tableData.length > 0 && (
              <Download csvData={xlData} fileName={fileName} />
            )}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "90vh",
            }}
          >
            <img
              src={Nodata}
              alt="No Data"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                marginBottom: "20px",
              }}
            />
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default DynamicModal;
