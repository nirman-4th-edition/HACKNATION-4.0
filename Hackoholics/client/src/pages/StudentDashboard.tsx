import React from "react";
import { Users, Plus, Calendar as CalendarIcon } from "lucide-react";
import { DashboardMetric, ScheduleItem } from "../types";
import { useUIContext } from "../contexts/ui.context";
import Calendar from '../components/Calendar';
import { useNavigate } from "react-router-dom";

const scheduleItems: ScheduleItem[] = [
  { id: "1", title: "Resume review", time: "10:00 - 10:30", type: "review" },
  {
    id: "2",
    title: "Mock Interview",
    time: "11:00 - 12:00",
    type: "interview",
  },
  {
    id: "3",
    title: "Practice session",
    time: "13:30 - 14:45",
    type: "practice",
  },
  {
    id: "4",
    title: "Analytics Review",
    time: "15:00 - 15:30",
    type: "analytics",
  },
];

const metrics: DashboardMetric[] = [
  { id: "1", label: "Number of daily challenges attended", value: 8 },
  { id: "2", label: "Number of contests attended", value: 16 },
];

export const StudentDashboard: React.FC = () => {
  const { isSidebarVisible } = useUIContext();
  const navigate = useNavigate();

  return (
    <div
      className={`flex-1 p-6 md:p-8 bg-gray-50 transition-all duration-300 ${
        isSidebarVisible ? "md:ml-64 ml-0" : "md:ml-20 ml-0"
      }`}
    >
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          {(() => {
            const hours = new Date().getHours();
            if (hours < 12) return "Good Morning, Student!";
            if (hours < 18) return "Good Afternoon, Student!";
            return "Good Evening, Student!";
          })()}
        </h2>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Schedule Section */}
        <section className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Your schedule today:</h3>
          <div className="space-y-4">
            {scheduleItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-500">{item.time}</p>
                </div>
                <div className="space-x-2">
                  <button className="cursor-pointer px-4 py-1 text-sm bg-blue-500 text-white rounded-full">
                    Reschedule
                  </button>
                  <button className="cursor-pointer px-4 py-1 text-sm border border-gray-300 rounded-full">
                    Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="space-y-6">
          <div className="cursor-pointer bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Daily Challenges</h3>
              <Users size={24} />
            </div>
          </div>

          <div className="cursor-pointer bg-white p-6 rounded-xl shadow-sm" onClick={() => {navigate('/contest-main')}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Join a Contest</h3>
              <Plus size={24} />
            </div>
          </div>

          <div className="cursor-pointer bg-white p-6 rounded-xl shadow-sm" onClick={() => {navigate('/resume')}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Create Your Resume</h3>
              <CalendarIcon size={24} />
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Challenges Calendar */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Challenges Calendar</h3>
          <Calendar />
        </div>

        {/* Registered Contests */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Registered Contest</h3>
          <div className="space-y-4">
            {["Code Challenge", "Coffee Chat", "Team Stand-up"].map((title) => (
              <div key={title} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <span>{title}</span>
                </div>
                <button className="cursor-pointer px-4 py-1 text-sm bg-blue-500 text-white rounded-full">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Performance</h3>
          <div className="space-y-4">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="flex justify-between items-center"
              >
                <p className="text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard