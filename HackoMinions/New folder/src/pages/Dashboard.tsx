import { Card } from "@/components/ui/card";
import {
  IndianRupee,
  TrendingUp,
  Gem,
  BookOpen,
  Video,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full">
          <Gem className="text-primary" />
          <span className="font-semibold">1,234 gems</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Total Balance",
            value: "₹4,570.00",
            icon: IndianRupee, // ✅ Corrected
            trend: "+12%",
          },
          {
            title: "Monthly Savings",
            value: "₹840.00",
            icon: TrendingUp,
            trend: "+5%",
          },
          {
            title: "Reward Points",
            value: "1,234",
            icon: Gem,
            trend: "+20",
          },
        ].map((item, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-shadow animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }} // ✅ Fixed string interpolation
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
                <p className="text-sm text-green-500 mt-1">{item.trend}</p>
              </div>
              <div className="p-4 bg-primary/10 rounded-full">
                <item.icon className="w-6 h-6 text-primary" /> {/* ✅ Works fine */}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Latest Articles
            </h3>
            <Button variant="ghost">View all</Button>
          </div>
          <div className="space-y-4">
            {[
              "Understanding Credit Scores",
              "Investing Basics 101",
              "Budgeting Tips for Beginners",
            ].map((article, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{article}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Video className="w-5 h-5" />
              Featured Videos
            </h3>
            <Button variant="ghost">View all</Button>
          </div>
          <div className="space-y-4">
            {[
              "How to Create a Budget",
              "Investment Strategies",
              "Saving Money Tips",
            ].map((video, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <Video className="w-4 h-4 text-red-500" />
                <span>{video}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
