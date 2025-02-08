import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const Creation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = () => {
    toast.info("Google Sign In will be implemented in the next iteration");
  };

  const handleEmailSignup = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Account created successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="space-y-6">
        <Button
          variant="outline"
          className="w-full hover:bg-secondary/80 transition-all duration-300"
          onClick={handleGoogleSignIn}
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="transition-all duration-300 focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button
            className="w-full mt-4 transition-all duration-300"
            onClick={handleEmailSignup}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}; ``
export default Creation;