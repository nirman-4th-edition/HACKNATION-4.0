import { useState } from "react";
import "./PDFSummarizer.css";
import ReactMarkdown from "react-markdown";

function PDFSummarizer() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setPdfFiles([...e.target.files]);
    setUploadSuccess(false);
    setSummary("");
    setError(null);
  };

  // Upload PDFs and merge them on the backend.
  const uploadPdfs = async () => {
    if (pdfFiles.length === 0) {
      alert("Please select at least one PDF file.");
      return;
    }

    const formData = new FormData();
    // Use key "pdfs" as expected by /upload_pdf endpoint.
    pdfFiles.forEach((file) => formData.append("pdfs", file));

    try {
      const response = await fetch("http://127.0.0.1:5001/upload_pdf", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.message) {
        alert(data.message);
        setUploadSuccess(true);
      } else {
        setError(data.error || "Upload failed.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload PDFs. Please try again.");
    }
  };

  // Stream the summary from the backend.
  const handleSummarize = async () => {
    setSummary("");
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5001/summarize_pdf", {
        method: "GET",
      });

      if (!response.body) {
        console.error("No response body");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setSummary((prev) => prev + chunk);
      }
    } catch (err) {
      console.error("Summarization error:", err);
      setError("Failed to summarize PDFs. Please try again.");
    }
  };

  return (
    <div className="summarizer-container">
      <h1>PDF Summarizer</h1>
      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
      <button onClick={uploadPdfs}>Upload PDFs</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {uploadSuccess && (
        <div>
          <button onClick={handleSummarize}>Summarize PDFs</button>
          {summary && (
            <div className="summary-container">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PDFSummarizer;
