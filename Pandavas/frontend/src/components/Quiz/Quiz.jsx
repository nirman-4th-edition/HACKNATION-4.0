// frontend/src/components/Quiz/Quiz.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const [files, setFiles] = useState([]);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("paragraph");
  const [numQuestions, setNumQuestions] = useState(5);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle file input change
  const handleFileChange = (e) => setFiles([...e.target.files]);

  // Upload PDFs for quiz generation
  const uploadPdfs = async () => {
    if (files.length === 0) {
      alert("Please select at least one PDF file.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("pdfs", file));

    try {
      const response = await axios.post("http://127.0.0.1:5001/upload", formData);
      alert(response.data.message);
      setPdfUploaded(true);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload PDFs. Please try again.");
    }
  };

  // Request quiz generation and redirect to test page
  const generateQuiz = async () => {
    if (!studentName.trim()) {
      alert("Please enter your name before generating the quiz.");
      return;
    }
    try {
      const { data } = await axios.post("http://127.0.0.1:5001/quiz", {
        difficulty,
        mode,
        num_questions: numQuestions,
      });
      // Redirect to /take_test and pass quiz data, student name, and mode
      navigate("/take_test", { state: { quiz: data.quiz, studentName, mode } });
    } catch (err) {
      console.error("Quiz generation failed:", err);
      setError("Failed to generate quiz. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>PDF-Based Quiz Generator</h1>

      {/* PDF Upload Section */}
      {!pdfUploaded && (
        <div>
          <input type="file" multiple onChange={handleFileChange} />
          <button onClick={uploadPdfs}>Upload PDFs</button>
        </div>
      )}

      {/* Quiz Options (displayed after PDF upload) */}
      {pdfUploaded && (
        <>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label>Difficulty:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label>Mode:</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="paragraph">Paragraph</option>
              <option value="choice">Choice</option>
            </select>
          </div>

          <div>
            <label>Number of Questions:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
            />
          </div>

          <button onClick={generateQuiz}>Generate Quiz</button>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Quiz;
