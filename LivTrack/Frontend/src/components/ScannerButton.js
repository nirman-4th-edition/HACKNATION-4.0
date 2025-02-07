import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios";
import "../styles/scannerstyle.css";
const ScannerButton = ({ onUploadSuccess }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigate function

  const handleFileUpload = async (file) => {
    console.log("File content preview:", URL.createObjectURL(file));
    const testForm = new FormData();
    testForm.append("reportFile", file);
    console.log("FormData entries:", [...testForm.entries()]);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("reportFile", file);

      const response = await axios.post(
        "http://localhost:8000/api/v1/ocr/upload-report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("OCR API Response:", response.data);
      setUploadStatus("success");

      if (onUploadSuccess) onUploadSuccess(response.data);

      // ✅ Navigate to cholesterol metrics page on success
      navigate("/cholesterol-graph");
    } catch (error) {
      console.error("Response Data:", error.response?.data);
      console.error("Status Code:", error.response?.status);
      console.error("Response Headers:", error.response?.headers);
      console.error("Upload Error:", error);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
      setShowOptions(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) handleFileUpload(file);
    };
    input.click();
  };

  return (
    <div className="scanner-container">
      <button
        className="scanner-button"
        onClick={() => setShowOptions(true)}
        disabled={isUploading}
      >
        {isUploading ? (
          <span className="loading-dots">
            Uploading<span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        ) : (
          "📷"
        )}
      </button>

      {showOptions && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Upload Medical Report</h3>

            {uploadStatus === "success" && (
              <div className="success-message">
                ✅ Report processed successfully!
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="error-message">
                ❌ Failed to process report. Try again.
              </div>
            )}

            <button
              onClick={() => document.getElementById("fileInput").click()}
              disabled={isUploading}
            >
              📁 Upload from Files
            </button>

            <button onClick={handleCameraCapture} disabled={isUploading}>
              📷 Take Photo
            </button>

            <button
              onClick={() => {
                setShowOptions(false);
                setUploadStatus(null);
              }}
            >
              ❌ Close
            </button>
          </div>
        </div>
      )}

      <input
        type="file"
        id="fileInput"
        accept="image/*, application/pdf"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ScannerButton;
