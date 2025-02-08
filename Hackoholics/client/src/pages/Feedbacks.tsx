import React, { useState, useEffect } from "react";
import { useFeedback } from "../contexts/feedback.context";
import { Star } from "lucide-react";
import { useUIContext } from "../contexts/ui.context";

export interface Feedback {
  companyName: string;
  type: string;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
function Feedbacks() {
  const { feedbacks } = useFeedback();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeedback, setFilteredFeedback] =
    useState<Feedback[]>(feedbacks);

  useEffect(() => {
    setFilteredFeedback(feedbacks);
  }, [feedbacks]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredFeedback(
      feedbacks.filter(
        (card) =>
          card.companyName.toLowerCase().includes(term) ||
          card.type.toLowerCase().includes(term) ||
          card.comment.toLowerCase().includes(term) ||
          new Date(card.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).toLowerCase().includes(term)
      )
    );
  };
  const { isSidebarVisible } = useUIContext();
  return (
    <div
      className={`flex-1 p-6 md:p-8 transition-all duration-300 ${
        isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
      }`}
    >
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by company, type, comment, or date"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredFeedback.map((card, index) => (
          <div
            key={index}
            className="shadow-lg rounded-xl p-6 bg-white bg-opacity-90 transition-all transform hover:scale-[1.05] hover:shadow-2xl hover:bg-opacity-100 border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-primary mb-3">
              {card.companyName}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-semibold">Type:</span> {card.type}
            </p>
            <p className="text-gray-700 text-sm mb-4">
              <span className="font-semibold">Feedback:</span> "{card.comment}"
            </p>

            <div className="text-gray-600 text-sm space-y-2">
              <p className="flex items-center font-semibold text-lg">
                Rating:{" "}
                <span className="ml-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={22}
                      className={`${
                        card.rating > i
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300"
                      } transition-all duration-300`}
                    />
                  ))}
                </span>
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(card.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedbacks;
