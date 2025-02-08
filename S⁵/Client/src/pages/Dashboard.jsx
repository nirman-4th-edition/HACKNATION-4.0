import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet, useLocation } from "react-router-dom";
import SpendingOverview from "../components/SpendingOverview";
import AIInsights from "../components/AIInsights";
import { FiMenu } from "react-icons/fi";
import Expenses from "../pages/Expenses";
import Insights from "../pages/Insights";
import Budget from "../pages/Budget";
import Tax from "../pages/Tax";
import Settings from "../pages/Settings";
import Sidebar from "../components/Sidebar";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();
//   const links = [
//     { name: "Dashboard", path: "/dashboard"},
//     { name: "Expenses", path: "/expenses"},
//     { name: "Insights", path: "/insights"},
//     { name: "Budget", path: "/budget"},
//     { name: "Tax", path: "/tax"},
//     { name: "Settings", path: "/settings"}
//   ];

//   return (
//     <aside className={`bg-gray-800 p-5 h-screen fixed md:relative top-0 left-0 w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform md:translate-x-0 md:w-1/5`}>
//       <button className="md:hidden text-white mb-4" onClick={toggleSidebar}>✖</button>
//       <h1 className="text-xl font-bold mb-5">AI-rath</h1>
//       <nav>
//         <ul>
//           {links.map((link) => (
//             <li key={link.path} className="mb-4">
//               <Link
//                 to={link.path}
//                 className={
//                   location.pathname === link.path
//                     ? "text-purple-400 font-bold"
//                     : "text-white"
//                 }
//                 onClick={toggleSidebar}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex min-h-[100vh] bg-gray-900 text-white">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className="w-full md:w-4/5 p-6">
        <button className="md:hidden text-white mb-4" onClick={toggleSidebar}><FiMenu size={24} /></button>
        <Outlet />
      </main>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Monthly Income</h3>
          <p className="text-2xl">₹85,000</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Total Expenses</h3>
          <p className="text-2xl">₹45,000</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">Total Savings</h3>
          <p className="text-2xl">₹40,000</p>
        </div>
      </div>

      {/* Responsive Spending Overview and AI Insights Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="h-[32vw] bg-gray-800 p-6 rounded-lg shadow-md md:col-span-2 flex flex-col justify-between">
          <SpendingOverview />
        </div>
        <div className="h-[32vw] bg-gray-800 p-6 rounded-lg shadow-md md:col-span-1 flex flex-col justify-between">
          <AIInsights />
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="insights" element={<Insights />} />
          <Route path="budget" element={<Budget />} />
          <Route path="tax" element={<Tax />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;