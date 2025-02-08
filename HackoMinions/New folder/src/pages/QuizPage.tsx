import { useParams } from "react-router-dom";
import Quiz from "@/components/quiz/Quiz";

const QuizPage = () => {
  const { level } = useParams<{ level: string }>();

  // Ensure level is properly formatted
  const formattedLevel = level
    ? level.charAt(0).toUpperCase() + level.slice(1)
    : "Unknown"; // Fallback if level is undefined

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Financial Knowledge Quiz - {formattedLevel}
      </h1>
      <Quiz level={(level as "beginner" | "intermediate" | "expert") || "beginner"} />
    </div>
  );
};

export default QuizPage;
