import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import * as pdfjs from "pdfjs-dist";

const FileUpload = ({ onExtractText }) => {
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    // Use a valid version from the CDN (e.g., 3.4.120)
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      await extractTextFromPDF(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const extractTextFromPDF = async (file) => {
    try {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result);
        console.log("PDF Loaded Successfully");

        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
        console.log(`PDF has ${pdf.numPages} pages`);

        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          extractedText += pageText + " ";

          console.log(`Extracted Text from Page ${i}:`, pageText);
        }

        onExtractText(extractedText.trim());
        console.log("Final Extracted Text:", extractedText.trim());
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        id="upload-pdf"
      />
      <label htmlFor="upload-pdf">
        <Button variant="contained" component="span">
          Upload PDF
        </Button>
      </label>
      {fileName && <Typography variant="body1">Uploaded: {fileName}</Typography>}
    </div>
  );
};

export default FileUpload;