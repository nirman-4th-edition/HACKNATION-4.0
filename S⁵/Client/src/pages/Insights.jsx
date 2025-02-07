// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { TrendingDown } from 'lucide-react';
// import React, { useState } from 'react';
// import { Area, BarChart, CartesianGrid, Legend, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// const InsightsDashboard = ({ insights }) => {
//   const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  
//   const renderSpendingTrends = () => (
//     <Card className="w-full p-4 mb-4">
//       <CardHeader>
//         <CardTitle>Spending Trends</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={insights.monthly_trends}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             {Object.keys(insights.category_distribution).map((category, idx) => (
//               <Line 
//                 key={category} 
//                 type="monotone" 
//                 dataKey={category} 
//                 stroke={`hsl(${idx * 45}, 70%, 50%)`} 
//               />
//             ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );

//   const renderAnomalyAlerts = () => (
//     <div className="grid gap-4 mb-4">
//       {insights.anomalies.map((anomaly, idx) => (
//         <Alert key={idx} variant="destructive">
//           <AlertTriangle className="h-4 w-4" />
//           <AlertDescription>{anomaly.message}</AlertDescription>
//         </Alert>
//       ))}
//     </div>
//   );

//   const renderSavingsSuggestions = () => (
//     <Card className="w-full p-4 mb-4">
//       <CardHeader>
//         <CardTitle>Savings Opportunities</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {insights.savings_recommendations.map((recommendation, idx) => (
//             <div key={idx} className="flex items-start space-x-2">
//               <div className="p-2 bg-green-100 rounded-full">
//                 <TrendingDown className="h-4 w-4 text-green-600" />
//               </div>
//               <div>
//                 <p className="font-medium">{recommendation.message}</p>
//                 <p className="text-sm text-gray-500">
//                   Potential savings: ₹{recommendation.potential_savings.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const renderForecast = () => (
//     <Card className="w-full p-4">
//       <CardHeader>
//         <CardTitle>Expense Forecast</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={insights.prophet_forecast.predictions}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="ds" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Area 
//               dataKey="yhat" 
//               fill="rgba(75, 192, 192, 0.2)" 
//               stroke="rgb(75, 192, 192)" 
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {renderSpendingTrends()}
//         {renderForecast()}
//       </div>
//       {renderAnomalyAlerts()}
//       {renderSavingsSuggestions()}
//     </div>
//   );
// };

// export default InsightsDashboard;