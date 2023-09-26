import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@mui/material";

// Enable PDF.js worker from an external source
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFGenerator() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleDownload = () => {
    // Code to trigger PDF download
    // Replace "your-pdf-file.pdf" with your PDF file URL or path
    const pdfUrl = "your-pdf-file.pdf";
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "downloaded-pdf.pdf";
    a.click();
  };

  return (
    <div>
      <Document
        file="your-pdf-file.pdf" // Replace with your PDF file URL or path
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <Button onClick={prevPage} disabled={pageNumber <= 1}>
          Previous
        </Button>
        <Button onClick={nextPage} disabled={pageNumber >= numPages}>
          Next
        </Button>
        <Button onClick={handleDownload}>Download PDF</Button>
      </div>
    </div>
  );
}

export default PDFGenerator;
