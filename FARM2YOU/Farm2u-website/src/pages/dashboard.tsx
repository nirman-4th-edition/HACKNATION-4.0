import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { motion } from "framer-motion";
import NavMenuBar from "@/components/NavMenuBar";
import { useState } from "react";

const transactionsData = [
  { name: "Jan", total: 400, success: 380 },
  { name: "Feb", total: 500, success: 460 },
  { name: "Mar", total: 600, success: 550 },
  { name: "Apr", total: 700, success: 670 },
  { name: "May", total: 456, success: 587 },
  { name: "Jun", total: 750, success: 720 },
  { name: "Jul", total: 800, success: 780 },
];

const topProducts = [
  { name: "Potato", revenue: "₹26,680.90", sales: "1,072", reviews: "1,727", views: "2,680" },
  { name: "Tomato", revenue: "₹16,729.19", sales: "1,016", reviews: "720", views: "2,186" },
  { name: "Wheat", revenue: "₹12,872.24", sales: "987", reviews: "964", views: "1,872" },
];

const recentOrders = [
  { id: "#1024", product: "Tomato", amount: "₹560", status: "Completed" },
  { id: "#1025", product: "Potato", amount: "₹1,220", status: "Pending" },
  { id: "#1026", product: "Wheat", amount: "₹980", status: "Completed" },
];

export default function Dashboard() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      <NavMenuBar />
      <div className={`p-6 ${theme === "light" ? "bg-gray-50" : "bg-gray-900 text-white"} min-h-screen font-sans animate-fade-in`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button onClick={toggleTheme} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Toggle Theme</button>
        </div>

        <motion.div className="grid grid-cols-3 gap-4 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card className="shadow-md bg-white dark:bg-gray-800 p-4 transition-all hover:shadow-xl hover:scale-105 font-mono">
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">Gross Revenue</p>
              <h2 className="text-2xl font-bold text-green-600">$2,480.32</h2>
            </CardContent>
          </Card>
          <Card className="shadow-md bg-white dark:bg-gray-800 p-4 transition-all hover:shadow-xl hover:scale-105 font-mono">
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">Avg. Order Value</p>
              <h2 className="text-2xl font-bold text-red-600">$56.12</h2>
            </CardContent>
          </Card>
          <Card className="shadow-md bg-white dark:bg-gray-800 p-4 transition-all hover:shadow-xl hover:scale-105 font-mono">
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">Total Orders</p>
              <h2 className="text-2xl font-bold text-blue-600">230</h2>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="shadow-lg rounded-lg p-4 bg-white dark:bg-gray-800 font-sans">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Transaction Activity</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={transactionsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="success" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-lg p-4 bg-white dark:bg-gray-800 font-sans">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Top Products</h3>
              <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="p-2">Product</th>
                    <th className="p-2">Revenue</th>
                    <th className="p-2">Sales</th>
                    <th className="p-2">Reviews</th>
                    <th className="p-2">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index} className="border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                      <td className="p-2 font-serif">{product.name}</td>
                      <td className="p-2 font-mono">{product.revenue}</td>
                      <td className="p-2 font-mono">{product.sales}</td>
                      <td className="p-2 font-mono">{product.reviews}</td>
                      <td className="p-2 font-mono">{product.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
          <ul className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            {recentOrders.map((order, index) => (
              <li key={index} className="flex justify-between border-b py-2 last:border-none">
                <span>{order.id} - {order.product}</span>
                <span className="font-mono">{order.amount}</span>
                <span className={`px-2 py-1 rounded ${order.status === "Completed" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>{order.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
