import React, { useState } from "react";
import {
  Users,
  Trophy,
  MessageSquare,
  TrendingUp, 
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useUIContext } from "../contexts/ui.context";

interface StatData {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
}

interface Contest {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  participants: number;
  status: "upcoming" | "active" | "completed";
}

interface Feedback {
  id: string;
  studentName: string;
  companyName: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}

const AdminDashboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("group");
   const { isSidebarVisible } = useUIContext();

  const stats: StatData[] = [
    {
      title: "Total Users",
      value: "2,543",
      icon: Users,
      trend: { value: 12, positive: true },
    },
    {
      title: "Active Contests",
      value: "8",
      icon: Trophy,
      trend: { value: 5, positive: true },
    },
    {
      title: "Feedback Count",
      value: "1,233",
      icon: MessageSquare,
      trend: { value: 3, positive: false },
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      icon: TrendingUp,
      trend: { value: 8, positive: true },
    },
  ];

  const contests: Contest[] = [
    {
      id: "1",
      title: "Web Development Challenge",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      participants: 156,
      status: "active",
    },
    {
      id: "2",
      title: "UI/UX Design Sprint",
      startDate: "2024-03-20",
      endDate: "2024-04-05",
      participants: 89,
      status: "upcoming",
    },
  ];

  const feedback: Feedback[] = [
    {
      id: "1",
      studentName: "Alice Johnson",
      companyName: "TechCorp",
      role: "UI/UX Designer",
      content:
        "The students demonstrated exceptional creativity and attention to detail in their design projects.",
      rating: 5,
      date: "2024-03-12",
    },
    {
      id: "2",
      studentName: "Bob Smith",
      companyName: "DataTech",
      role: "Full Stack Developer",
      content: "Great problem-solving skills and clean code implementation.",
      rating: 4,
      date: "2024-03-11",
    },
  ];

  const renderStatCard = ({ title, value, icon: Icon, trend }: StatData) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-1">{value}</h3>
          {trend && (
            <p
              className={`text-sm mt-1 ${
                trend.positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`flex-1 bg-gray-50 transition-all duration-300 ${
        isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
      }`}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Dashboard Overview
          </h2>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => renderStatCard(stat))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contests Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Active Contests
                </h2>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Contests</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="space-y-4">
                {contests.map((contest) => (
                  <div
                    key={contest.id}
                    className="p-4 border border-gray-100 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">
                        {contest.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          contest.status === "active"
                            ? "bg-green-100 text-green-800"
                            : contest.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {contest.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Participants: {contest.participants}</p>
                      <p>
                        Duration: {contest.startDate} - {contest.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Feedback
                </h2>
                <div className="flex gap-2">
                  <button
                    className={`px-4 py-2 text-sm rounded-md ${
                      selectedTab === "group"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setSelectedTab("group")}
                  >
                    Group
                  </button>
                  <button
                    className={`px-4 py-2 text-sm rounded-md ${
                      selectedTab === "individual"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setSelectedTab("individual")}
                  >
                    Individual
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-gray-100 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {item.companyName}
                        </h3>
                        <p className="text-sm text-gray-600">{item.role}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.content}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>By {item.studentName}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
