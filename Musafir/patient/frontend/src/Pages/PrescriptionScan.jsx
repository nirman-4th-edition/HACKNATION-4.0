import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import { summarizeText } from "../utils/gemini";
import { Typography, Button, CircularProgress } from "@mui/material";
import ReactMarkdown from "react-markdown";

const PrescriptionScan = () => {
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleExtractText = (text) => {
    setExtractedText(text);
    setSummary("");
    setShowSummary(false);
  };

  const handleSummarize = async () => {
    setLoading(true);
    setShowSummary(false);

    const summaryResponse = await summarizeText(extractedText);
    setSummary(summaryResponse);

    setLoading(false);
    setShowSummary(true);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Prescription Summarizer
      </Typography>

      <FileUpload onExtractText={handleExtractText} />

      {extractedText && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Extracted Text:</Typography>
          <Typography
            variant="body2"
            style={{ 
              backgroundColor: "#f5f5f5", 
              padding: "10px", 
              borderRadius: "5px",
              whiteSpace: "pre-wrap" 
            }}
          >
            {extractedText}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSummarize}
            style={{ marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Summarize"}
          </Button>
        </div>
      )}

      {showSummary && (
        <div style={{ 
          marginTop: "20px", 
          backgroundColor: "#e3f2fd", 
          padding: "15px", 
          borderRadius: "5px",
          border: "1px solid #90caf9"
        }}>
          <Typography variant="h6" gutterBottom>
            AI-Generated Summary:
          </Typography>
          <ReactMarkdown components={{
            p: ({ node, ...props }) => <Typography variant="body1" {...props} />
          }}>
            {summary}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default PrescriptionScan;