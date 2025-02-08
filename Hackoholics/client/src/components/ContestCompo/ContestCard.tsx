import { useNavigate } from 'react-router-dom';
import { Contest } from '../../types';

interface ContestCardProps {
  contest: Contest;
}

const ContestCard = ({ contest }: ContestCardProps) => {
  const { name, description, status } = contest;
  const isBlocked = status === "upcoming";
  const navigate = useNavigate();
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all duration-300 ${
        isBlocked ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-xl"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{name}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <button
          className={`btn px-6 py-3 ${isBlocked ? "bg-gray-400" : "bg-blue-500"} text-white rounded-full transition-colors duration-300 transform ${isBlocked ? "" : "hover:scale-105"}`}
          disabled={isBlocked}
          onClick={() => {
            if (!isBlocked) {
              navigate("/daily-contest");
            }
          }}
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
