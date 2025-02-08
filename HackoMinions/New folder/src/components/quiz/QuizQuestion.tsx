import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizQuestion = ({ question, options, correctAnswer, onAnswer }: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    setShowResult(true);
    const isCorrect = option === correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedOption(null);
      setShowResult(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-semibold">{question}</h3>
        </div>
        <div className="grid gap-3">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={
                showResult
                  ? option === correctAnswer
                    ? "default"
                    : option === selectedOption
                    ? "destructive"
                    : "outline"
                  : "outline"
              }
              className={`w-full justify-start p-4 text-left ${
                showResult && option === correctAnswer ? "bg-green-500" : ""
              }`}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;