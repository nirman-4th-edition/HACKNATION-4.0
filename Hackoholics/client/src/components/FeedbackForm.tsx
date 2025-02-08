import React, { useState } from "react";
import { StarRating } from "./StarRating";
import { useAuth } from "../contexts/auth.context";
import { useFeedback } from "../contexts/feedback.context";
import { ObjectId } from "mongoose";

interface Student{
  _id: string;
  name: string;
  section: string;
  branch: string;
  admissionYear: number;
  feedback: ObjectId[];
  companies: ObjectId[];
  placedAt: ObjectId[];
  email: string;
  status: "Pending" | "Selected" | "Completed" | string;
}
interface FeedbackFormProps {
student: Student;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({student}) => {
  const {user} = useAuth();
  const { addFeedback } = useFeedback();
  const [formData, setFormData] = useState<{
      companyName: string;
      comment: string;
      studentIds: string[];
      type: string;
      rating: number;
    }>({
      companyName: user && 'companyName' in user ? user.companyName : "",
      comment: "",
      studentIds: [],
      type: "",
      rating: 0
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "studentIds") {
      setFormData(prev => ({ ...prev, studentIds: value.split(",").map(id => id.trim()) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    

    addFeedback(formData);
    setFormData({
      companyName: user && 'companyName' in user ? user.companyName : "",
      comment: "",
      studentIds: student && [student._id] || [],
      type: "",
      rating: 0
    });
    alert ("Feedback added successfully");
  };

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 bg-gradient-to-br from-gray-50 to-white p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Feedback</h1>
          <p className="text-gray-600">Share your experience and help us improve</p>
        </div>
        
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-lg rounded-2xl space-y-6 border border-gray-100"
        >
          <div className="grid grid-cols md:grid-cols gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
                placeholder="Enter company name"
                disabled
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Feedback</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors h-32"
              placeholder="Share your experience..."
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Student
            </label>
            <input
              type="text"
              name="studentIds"
              value={student && student._id? student._id : ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
              placeholder="Enter student names, separated by commas"
              disabled
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div>
              <label className="block text-gray-700 font-medium mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
                required
              >
                <option value="" disabled>Select type</option>
                <option value="pi">PI</option>
                <option value="gd">GD</option>
                <option value="training">Training</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Rating</label>
              <StarRating 
                rating={formData.rating} 
                onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};