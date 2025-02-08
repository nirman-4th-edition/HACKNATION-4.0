import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, IndianRupee, Coins } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Gem, PiggyBank, BookOpen, Trophy } from "lucide-react";


const Landing = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      toast({
        title: "Success!",
        description: "You've successfully signed in.",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    }
  };

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Age-Smart Learning",
      description: "Personalized financial education tailored to your age and experience level",
    },
    {
      icon: <PiggyBank className="w-6 h-6" />,
      title: "Expense Tracking",
      description: "Keep track of your spending with our intuitive expense tracker",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Daily Quizzes",
      description: "Test your knowledge and earn rewards through daily financial quizzes",
    },
    {
      icon: <Gem className="w-6 h-6" />,
      title: "Reward System",
      description: "Earn gems for completing courses and maintaining learning streaks",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full flex justify-center py-[15px] bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-3">
          <Rocket size={48} className="animate-bounce text-primary z-10" />
          <h1 className="text-3xl lg:text-6xl font-bold font-poppins text-primary">
            PennyPilot
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 h-screen flex items-center justify-center -mt-14">
        <div className="text-center max-w-2xl">
          {/* Tagline */}
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary mb-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Smart Money, Smart Future
          </span>
          {/* Main Heading */}
          <h1 className="text-3xl lg:text-4xl font-bold font-poppins animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Your Journey to{" "}
            <span className="bg-clip-text text-primary to-accent">
              Financial Freedom
            </span>
          </h1>
          {/* Description */}
          <p className="text-sm lg:text-base text-gray-600 opacity-90 animate-fade-up mt-4" style={{ animationDelay: "0.4s" }}>
          Join thousands of users who are taking control of their financial future with PennyPilot's next-gen learning platform.
          </p>
          {/* Buttons */}
          <div className="flex gap-4 pt-8 justify-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
            {/* Start Your Journey Button */}
            <Link to="/signup" className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center gap-2 transform transition-all hover:translate-y-[-2px]">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            {/* Sign In Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="py-[23px]">Sign In</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px] bg-white">
                <DialogHeader>
                  <DialogTitle>Sign In</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PennyPilot?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform combines education with engagement to make financial literacy accessible and enjoyable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Footer Section */}
      <footer className="bg-primary/10 py-8 text-center border-t border-primary/20">
        <p className="text-gray-600 text-sm">
          &copy; 2025 PennyPilot. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;