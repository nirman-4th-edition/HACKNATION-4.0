import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Sparkles, Coins, ChartLine, Shield, BookOpen } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <div className="container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <Coins size={48} className="animate-coin-spin text-primary" />
                <Shield size={32} className="absolute -bottom-2 -right-2 text-secondary animate-pulse" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold">
                PennyPilot
              </h1>
            </div>
            <p className="text-xl lg:text-2xl opacity-90 flex items-center gap-2">
              Your Personal Finance Co-Pilot <Sparkles className="animate-pulse" />
            </p>
            <p className="text-lg opacity-80">
              Master financial literacy with AI-powered learning, personalized budgeting,
              and smart investment guidance - all in one place.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm">
                <ChartLine className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold">Smart Tracking</h3>
                <p className="text-sm opacity-75">Real-time expense monitoring</p>
              </div>
              <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm">
                <BookOpen className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold">Learn & Earn</h3>
                <p className="text-sm opacity-75">Gamified financial education</p>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/signup">
                  Start Your Journey
                  <ArrowRight className="ml-2 animate-pulse" size={20} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/login" className="text-black">Already have an account?</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <img
                src="/animations/finance-dashboard.gif"
                alt="Finance Dashboard Preview"
                className="w-full h-auto rounded-lg shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;