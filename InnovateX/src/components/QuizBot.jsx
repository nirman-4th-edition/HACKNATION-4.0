import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QuizBot.css";

const QuizBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizOver, setQuizOver] = useState(false);

  // Fetch quiz questions from backend
  useEffect(() => {
    axios.get("http://localhost:5000/questions")
      .then(res => setQuestions(res.data))
      .catch(err => console.error("Error fetching questions:", err));
  }, []);

  // Handle answer selection
  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  // Submit answer and move to next question
  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizOver(true);
    }
  };

  return (
    <div className="quizbot-container">
      <button className="quiz-toggle" onClick={() => setIsOpen(!isOpen)}>
        🧠
      </button>

      {isOpen && (
        <div className="quiz-window">
          <div className="quiz-header">
            <h4>Odisha Quiz</h4>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {quizOver ? (
            <div className="quiz-body">
              <h3>Quiz Over!</h3>
              <p>Your Score: {score} / {questions.length}</p>
            </div>
          ) : (
            <div className="quiz-body">
              {questions.length > 0 && (
                <>
                  <h4>{questions[currentQuestion].question}</h4>
                  <div className="options">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        className={`option-btn ${selectedAnswer === option ? "selected" : ""}`}
                        onClick={() => handleAnswer(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button className="next-btn" onClick={handleNext} disabled={!selectedAnswer}>
                    Next
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizBot;
