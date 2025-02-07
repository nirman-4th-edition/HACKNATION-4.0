import React, { useState } from 'react';
import { Play, CheckCircle } from 'lucide-react';

interface LessonQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  description: string;
  quiz: LessonQuiz;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Understanding Basic Banking",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Learn the fundamentals of banking and how to manage your accounts effectively.",
    quiz: {
      question: "What is the primary purpose of a savings account?",
      options: [
        "To store money and earn interest",
        "To write checks",
        "To invest in stocks",
        "To get loans"
      ],
      correctAnswer: 0
    }
  },
  {
    id: 2,
    title: "Budgeting Basics",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Master the art of budgeting and learn how to track your expenses.",
    quiz: {
      question: "What is the 50/30/20 rule in budgeting?",
      options: [
        "50% savings, 30% needs, 20% wants",
        "50% needs, 30% wants, 20% savings",
        "50% wants, 30% savings, 20% needs",
        "50% needs, 30% savings, 20% wants"
      ],
      correctAnswer: 1
    }
  }
];

export default function Learn() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(lessons[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSubmit = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsCorrect(answerIndex === selectedLesson.quiz.correctAnswer);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lesson List */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-xl font-bold mb-4">Financial Lessons</h2>
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => {
                setSelectedLesson(lesson);
                setShowQuiz(false);
                setSelectedAnswer(null);
                setIsCorrect(null);
              }}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedLesson.id === lesson.id
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          {!showQuiz ? (
            <>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={selectedLesson.videoUrl}
                  title={selectedLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[400px] rounded-lg"
                ></iframe>
              </div>
              <button
                onClick={() => setShowQuiz(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Play size={20} />
                <span>Take Quiz</span>
              </button>
            </>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Quiz Time!</h3>
              <p className="text-lg mb-6">{selectedLesson.quiz.question}</p>
              <div className="space-y-4">
                {selectedLesson.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSubmit(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 text-left rounded-lg transition-colors ${
                      selectedAnswer === index
                        ? isCorrect
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {option}
                    {selectedAnswer === index && isCorrect && (
                      <CheckCircle className="inline ml-2 text-green-500" size={20} />
                    )}
                  </button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setShowQuiz(false);
                      setSelectedAnswer(null);
                      setIsCorrect(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Back to Video
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}