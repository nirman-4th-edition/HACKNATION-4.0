// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider"; // ✅ Importing shadcn slider
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState } from "react";
// import { Plus, IndianRupee } from "lucide-react";
// import { toast } from "sonner";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// interface Expense {
//   id: string;
//   category: string;
//   amount: number;
//   date: string;
//   description: string;
//   importance: number;
// }

// // Categories and their default budget percentages
// const categories = [
//   { name: "Housing", min: 35, max: 35 },
//   { name: "Transportation", min: 15, max: 20 },
//   { name: "Food", min: 10, max: 20 },
//   { name: "Debt Payments", min: 5, max: 15 },
//   { name: "Personal & Discretionary", min: 5, max: 10 },
//   { name: "Savings", min: 5, max: 10 },
//   { name: "Utilities", min: 5, max: 5 },
//   { name: "Clothing", min: 3, max: 5 },
//   { name: "Medical", min: 3, max: 3 },
// ];

// const defaultIncome = 60000; // Default total income

// const ExpenseTracker = () => {
//   const [category, setCategory] = useState("");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [importance, setImportance] = useState(50); // Default importance level at 50%
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [totalIncome, setTotalIncome] = useState(defaultIncome);

//   // Calculate total expenses
//   const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

//   // Remaining budget
//   const remainingBudget = totalIncome - totalExpenses;

//   // Aggregate importance for each category
//   const getAggregateImportance = (categoryName: string): number => {
//     const categoryExpenses = expenses.filter(
//       (exp) => exp.category === categoryName
//     );
//     if (categoryExpenses.length === 0) return 0;
//     const totalImportance = categoryExpenses.reduce(
//       (acc, curr) => acc + curr.importance,
//       0
//     );
//     return totalImportance / categoryExpenses.length;
//   };

//   // Default budget allocation based on percentages
//   const defaultBudgetAllocation = categories.map(({ name, min, max }) => ({
//     name,
//     budget: (totalIncome * ((min + max) / 2)) / 100, // Average of min and max percentages
//   }));

//   // Calculate chart data for pie chart
//   const chartData = categories.map(({ name }) => ({
//     name,
//     amount: expenses
//       .filter((exp) => exp.category === name)
//       .reduce((acc, curr) => acc + curr.amount, 0),
//   }));

//   // Function to check overspending and trigger alerts
//   const checkOverspending = () => {
//     defaultBudgetAllocation.forEach(({ name, budget }) => {
//       const categoryExpenses = expenses
//         .filter((exp) => exp.category === name)
//         .reduce((acc, curr) => acc + curr.amount, 0);
//       if (categoryExpenses > budget) {
//         toast.error(
//           `Overspending in ${name}: ₹${categoryExpenses.toFixed(
//             2
//           )} spent against ₹${budget.toFixed(2)} budget`
//         );
//       }
//     });
//   };

//   // Budget reallocation model
//   const reallocateBudget = () => {
//     const remainingIncome = totalIncome - totalExpenses;
//     const reallocatedBudget = categories.map(({ name, min, max }) => {
//       const categoryExpenses = expenses
//         .filter((exp) => exp.category === name)
//         .reduce((acc, curr) => acc + curr.amount, 0);
//       const budget = (totalIncome * ((min + max) / 2)) / 100;
//       const adjustment = remainingIncome / categories.length;
//       return {
//         name,
//         budget: Math.max(budget + adjustment, 0), // Ensure no negative budgets
//       };
//     });
//     return reallocatedBudget;
//   };

//   const handleAddExpense = () => {
//     if (!category || !amount || !description) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     const newExpenseAmount = parseFloat(amount);
//     if (newExpenseAmount > remainingBudget) {
//       toast.error(
//         "Expense exceeds available budget. Please reduce the amount."
//       );
//       return;
//     }

//     const newExpense: Expense = {
//       id: Date.now().toString(),
//       category,
//       amount: newExpenseAmount,
//       date: new Date().toISOString(),
//       description,
//       importance,
//     };
//     setExpenses([...expenses, newExpense]);
//     setCategory("");
//     setAmount("");
//     setDescription("");
//     setImportance(50); // Reset slider after adding an expense
//     toast.success("Expense added successfully!");
//     checkOverspending(); // Check for overspending after adding an expense
//   };

//   const getCategoryColor = (categoryName: string) => {
//     const categoryColors: { [key: string]: string } = {
//       Housing: "#FF5733",
//       Transportation: "#33C3FF",
//       Food: "#FFC300",
//       "Debt Payments": "#8D33FF",
//       "Personal & Discretionary": "#33FF57",
//       Savings: "#FF33A6",
//       Utilities: "#3366FF",
//       Clothing: "#FF6F33",
//       Medical: "#33FF99",
//     };
//     return categoryColors[categoryName] || "#000000";
//   };

//   return (
//     <div className="space-y-8 p-6 animate-fade-in">
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-bold">Expense Tracker</h2>
//         <Card className="p-4 bg-primary/10">
//           <div className="flex items-center space-x-2">
//             <IndianRupee className="text-primary" />
//             <span className="font-semibold">Total: {totalExpenses.toFixed(2)}</span>
//           </div>
//         </Card>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Expense Tracker Section */}
//         <Card className="p-6 col-span-1">
//           <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
//           <div className="space-y-4">
//             <div>
//               <Label>Category</Label>
//               <Select value={category} onValueChange={setCategory}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map(({ name }) => (
//                     <SelectItem key={name} value={name}>
//                       {name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Amount</Label>
//               <div className="relative">
//                 <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
//                 <Input
//                   type="number"
//                   placeholder="0.00"
//                   className="pl-8"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input
//                 placeholder="Enter description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//             <div>
//               <Label>Importance: {importance}%</Label>
//               <Slider
//                 value={[importance]}
//                 onValueChange={(value) => setImportance(value[0])}
//                 max={100}
//                 step={1}
//                 className="w-full"
//               />
//             </div>
//             <Button onClick={handleAddExpense} className="w-full">
//               <Plus className="mr-2 h-4 w-4" /> Add Expense
//             </Button>
//           </div>
//         </Card>

//         {/* Spending Overview Section */}
//         <Card className="p-6 col-span-2">
//           <h3 className="text-xl font-semibold mb-4">Spending Overview</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={chartData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="amount"
//                 label={({ name, percent }) =>
//                   `${name}: ${(percent * 100).toFixed(0)}%`
//                 }
//               >
//                 {chartData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={getCategoryColor(entry.name)}
//                   />
//                 ))}
//               </Pie>
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </Card>
//       </div>

//       {/* Budget Analysis Section */}
//       <Card className="p-6">
//         <h3 className="text-xl font-semibold mb-4">Optimal Budget Allocation</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={reallocateBudget()}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="budget"
//               label={({ name, percent }) =>
//                 `${name}: ${(percent * 100).toFixed(0)}%`
//               }
//             >
//               {reallocateBudget().map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={getCategoryColor(entry.name)}
//                 />
//               ))}
//             </Pie>
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </Card>

//       {/* Category-wise Expense and Remaining Budget */}
//       <Card className="p-6">
//         <h3 className="text-xl font-semibold mb-4">
//           Category-wise Expense and Remaining Budget
//         </h3>
//         <div className="space-y-4">
//           {defaultBudgetAllocation.map(({ name, budget }, index) => {
//             const categoryExpenses = expenses
//               .filter((exp) => exp.category === name)
//               .reduce((acc, curr) => acc + curr.amount, 0);
//             const remaining = budget - categoryExpenses;
//             const isOverspending = remaining < 0;
//             return (
//               <div
//                 key={index}
//                 className={`flex items-center justify-between p-4 rounded-lg ${
//                   isOverspending ? "border-red-500 border-2" : ""
//                 }`}
//               >
//                 <div className="space-y-1">
//                   <p className="font-semibold">{name}</p>
//                   <p className="text-sm">
//                     Budget: ₹{budget.toFixed(2)}, Spent: ₹
//                     {categoryExpenses.toFixed(2)}
//                   </p>
//                   <p
//                     className={`text-xs ${
//                       isOverspending ? "text-red-500" : "text-green-500"
//                     }`}
//                   >
//                     Remaining: ₹{remaining.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </Card>

//       {/* Recent Expenses Section */}
//       <Card className="p-6">
//         <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
//         <div className="space-y-4">
//           {expenses.map((expense) => {
//             const borderColor = `rgb(${Math.round(
//               255 - expense.importance * 2.55
//             )}, ${Math.round(expense.importance * 2.55)}, 0)`;
//             const categoryColor = getCategoryColor(expense.category);
//             return (
//               <div
//                 key={expense.id}
//                 className="flex items-center justify-between p-4 rounded-lg"
//                 style={{ borderLeft: `4px solid ${borderColor}` }}
//               >
//                 <div className="space-y-1">
//                   <p className="font-semibold" style={{ color: categoryColor }}>
//                     {expense.category}
//                   </p>
//                   <p className="text-sm">{expense.description}</p>
//                   <p className="text-xs">Importance: {expense.importance}%</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold" style={{ color: borderColor }}>
//                     ₹{expense.amount.toFixed(2)}
//                   </p>
//                   <p className="text-sm">
//                     {new Date(expense.date).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default ExpenseTracker;

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider"; // ✅ Importing shadcn slider
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Plus, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  importance: number;
}

// Categories and their default budget percentages
const categories = [
  { name: "Housing", min: 35, max: 35 },
  { name: "Transportation", min: 15, max: 20 },
  { name: "Food", min: 10, max: 20 },
  { name: "Debt Payments", min: 5, max: 15 },
  { name: "Personal & Discretionary", min: 5, max: 10 },
  { name: "Savings", min: 5, max: 10 },
  { name: "Utilities", min: 5, max: 5 },
  { name: "Clothing", min: 3, max: 5 },
  { name: "Medical", min: 3, max: 3 },
];

const defaultIncome = 60000; // Default total income

const ExpenseTracker = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState(50); // Default importance level at 50%
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalIncome, setTotalIncome] = useState(defaultIncome);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Remaining budget
  const remainingBudget = totalIncome - totalExpenses;

  // Aggregate importance for each category
  const getAggregateImportance = (categoryName: string): number => {
    const categoryExpenses = expenses.filter(
      (exp) => exp.category === categoryName
    );
    if (categoryExpenses.length === 0) return 0;
    const totalImportance = categoryExpenses.reduce(
      (acc, curr) => acc + curr.importance,
      0
    );
    return totalImportance / categoryExpenses.length;
  };

  // Default budget allocation based on percentages
  const defaultBudgetAllocation = categories.map(({ name, min, max }) => ({
    name,
    budget: (totalIncome * ((min + max) / 2)) / 100, // Average of min and max percentages
  }));

  // Calculate chart data for pie chart
  const chartData = categories.map(({ name }) => ({
    name,
    amount: expenses
      .filter((exp) => exp.category === name)
      .reduce((acc, curr) => acc + curr.amount, 0),
  }));

  // Function to check overspending and trigger alerts
  const checkOverspending = () => {
    defaultBudgetAllocation.forEach(({ name, budget }) => {
      const categoryExpenses = expenses
        .filter((exp) => exp.category === name)
        .reduce((acc, curr) => acc + curr.amount, 0);
      if (categoryExpenses > budget) {
        toast.error(
          `Overspending in ${name}: ₹${categoryExpenses.toFixed(
            2
          )} spent against ₹${budget.toFixed(2)} budget`
        );
      }
    });
  };

  // Budget reallocation model
  const reallocateBudget = () => {
    const remainingIncome = totalIncome - totalExpenses;
    const reallocatedBudget = categories.map(({ name, min, max }) => {
      const categoryExpenses = expenses
        .filter((exp) => exp.category === name)
        .reduce((acc, curr) => acc + curr.amount, 0);
      const budget = (totalIncome * ((min + max) / 2)) / 100;
      const adjustment = remainingIncome / categories.length;
      return {
        name,
        budget: Math.max(budget + adjustment, 0), // Ensure no negative budgets
      };
    });
    return reallocatedBudget;
  };

  const handleAddExpense = () => {
    if (!category || !amount || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    const newExpenseAmount = parseFloat(amount);
    if (newExpenseAmount > remainingBudget) {
      toast.error(
        "Expense exceeds available budget. Please reduce the amount."
      );
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      category,
      amount: newExpenseAmount,
      date: new Date().toISOString(),
      description,
      importance,
    };
    setExpenses([...expenses, newExpense]);
    setCategory("");
    setAmount("");
    setDescription("");
    setImportance(50); // Reset slider after adding an expense
    toast.success("Expense added successfully!");
    checkOverspending(); // Check for overspending after adding an expense
  };

  const getCategoryColor = (categoryName: string) => {
    const categoryColors: { [key: string]: string } = {
      Housing: "#FF5733",
      Transportation: "#33C3FF",
      Food: "#FFC300",
      "Debt Payments": "#8D33FF",
      "Personal & Discretionary": "#33FF57",
      Savings: "#FF33A6",
      Utilities: "#3366FF",
      Clothing: "#FF6F33",
      Medical: "#33FF99",
    };
    return categoryColors[categoryName] || "#000000";
  };

  return (
    <div className="space-y-8 p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Expense Tracker</h2>
        <div className="flex space-x-4">
          <Card className="p-4 bg-primary/10">
            <div className="flex items-center space-x-2">
              <IndianRupee className="text-primary" />
              <span className="font-semibold">
                Income: ₹{totalIncome.toFixed(2)}
              </span>
            </div>
          </Card>
          <Card className="p-4 bg-primary/10">
            <div className="flex items-center space-x-2">
              <IndianRupee className="text-primary" />
              <span className="font-semibold">
                Expense: ₹{totalExpenses.toFixed(2)}
              </span>
            </div>
          </Card>
          <Card className="p-4 bg-primary/10">
            <div className="flex items-center space-x-2">
              <IndianRupee className="text-primary" />
              <span className="font-semibold">
                Remaining: ₹{remainingBudget.toFixed(2)}
              </span>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Expense Tracker Section */}
        <Card className="p-6 col-span-1">
          <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
          <div className="space-y-4">
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(({ name }) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label>Importance: {importance}%</Label>
              <Slider
                value={[importance]}
                onValueChange={(value) => setImportance(value[0])}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <Button onClick={handleAddExpense} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Expense
            </Button>
          </div>
        </Card>

        {/* Spending Overview Section */}
        <Card className="p-6 col-span-2">
          <h3 className="text-xl font-semibold mb-4">Spending Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getCategoryColor(entry.name)}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Budget Analysis Section */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Optimal Budget Allocation</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={reallocateBudget()}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="budget"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {reallocateBudget().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getCategoryColor(entry.name)}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Category-wise Expense and Remaining Budget */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">
          Category-wise Expense and Remaining Budget
        </h3>
        <div className="space-y-4">
          {defaultBudgetAllocation.map(({ name, budget }, index) => {
            const categoryExpenses = expenses
              .filter((exp) => exp.category === name)
              .reduce((acc, curr) => acc + curr.amount, 0);
            const remaining = budget - categoryExpenses;
            const isOverspending = remaining < 0;
            return (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  isOverspending ? "border-red-500 border-2" : ""
                }`}
              >
                <div className="space-y-1">
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm">
                    Budget: ₹{budget.toFixed(2)}, Spent: ₹
                    {categoryExpenses.toFixed(2)}
                  </p>
                  <p
                    className={`text-xs ${
                      isOverspending ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    Remaining: ₹{remaining.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Expenses Section */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
        <div className="space-y-4">
          {expenses.map((expense) => {
            const borderColor = `rgb(${Math.round(
              255 - expense.importance * 2.55
            )}, ${Math.round(expense.importance * 2.55)}, 0)`;
            const categoryColor = getCategoryColor(expense.category);
            return (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ borderLeft: `4px solid ${borderColor}` }}
              >
                <div className="space-y-1">
                  <p className="font-semibold" style={{ color: categoryColor }}>
                    {expense.category}
                  </p>
                  <p className="text-sm">{expense.description}</p>
                  <p className="text-xs">Importance: {expense.importance}%</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold" style={{ color: borderColor }}>
                    ₹{expense.amount.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ExpenseTracker;