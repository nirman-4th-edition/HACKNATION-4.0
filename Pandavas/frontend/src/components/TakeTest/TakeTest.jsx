// frontend/src/components/Quiz/TakeTest.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function TakeTest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quiz, studentName, mode } = location.state || {};
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Redirect back if there is no quiz data.
  useEffect(() => {
    if (!quiz) {
      navigate("/quiz");
    }
  }, [quiz, navigate]);

  // Transform quiz.questions into an array
  let questionsArray = [];
  if (quiz && quiz.questions) {
    if (Array.isArray(quiz.questions)) {
      questionsArray = quiz.questions;
    } else {
      questionsArray = Object.entries(quiz.questions).map(([key, value]) => {
        if (!isNaN(key)) {
          return { question: value, answer: "" };
        } else {
          return { question: key, answer: value };
        }
      });
    }
  }

  const handleResponseChange = (question, value) => {
    setResponses((prev) => ({ ...prev, [question]: value }));
  };

  // Submit answers for grading
  const submitQuiz = async () => {
    if (!studentName.trim()) {
      alert("Please enter your name before submitting.");
      return;
    }

    try {
      if (mode === "choice" && quiz.questions && Array.isArray(quiz.questions)) {
        // Prepare correct answers mapping for choice mode.
        let correctAnswers = quiz.questions.reduce((acc, q) => {
          acc[q.question] = q.answer;
          return acc;
        }, {});
        const { data } = await axios.post("http://127.0.0.1:5001/grade", {
          mode,
          responses,
          student_name: studentName,
          correct_answers: correctAnswers,
        });
        setResult(data);
      } else if (mode === "paragraph") {
        const { data } = await axios.post("http://127.0.0.1:5001/grade", {
          mode,
          responses,
          student_name: studentName,
        });
        setResult(data);
      }
    } catch (err) {
      console.error("Quiz submission failed:", err);
      setError("Failed to submit quiz. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Take the Test</h1>
      
      {/* Quiz content container with a max height and auto scrolling */}
      <div className="quiz-content">
        {questionsArray.map((q, i) => (
          <div key={i} className="question-block" style={{ marginBottom: "1rem" }}>
            <p>{q.question || `Question ${i + 1}`}</p>
            {mode === "choice" ? (
              <div>
                {q.options &&
                  q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      className={`option-button ${responses[q.question] === opt ? "selected" : ""}`}
                      onClick={() => handleResponseChange(q.question, opt)}
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        width: "100%",
                        textAlign: "left",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
              </div>
            ) : (
              <textarea
                value={responses[q.question] || ""}
                onChange={(e) => handleResponseChange(q.question, e.target.value)}
                rows={3}
                cols={50}
              />
            )}
          </div>
        ))}
      </div>

      <button onClick={submitQuiz}>Submit Quiz</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="result-container">
          <h2>Results</h2>
          {mode === "choice" ? (
            <p>
              Your Score: {result.score} / {result.total}
            </p>
          ) : (
            <div>
              {result.graded_responses &&
                Object.entries(result.graded_responses).map(([question, gradeData], idx) => (
                  <div key={idx} className="result-item">
                    <p>
                      <strong>{question}</strong>
                    </p>
                    <p>Grade: {gradeData.grade} / 10</p>
                    <p>Feedback: {gradeData.improvements}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TakeTest;
