import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Coins, PiggyBank, Calendar, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5; // Updated total steps
  const [age, setAge] = useState(25);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [incomeSource, setIncomeSource] = useState<string>("");
  const [otherIncomeSource, setOtherIncomeSource] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<string>("");

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const generateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
    setAvatarUrl(url);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Create Your Account</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create a password" />
                </div>
                <Button className="w-full" onClick={nextStep}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Continue with Google
                </Button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Coins className="h-32 w-32 text-primary animate-bounce" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Profile Setup</h2>
              <div className="space-y-1">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt="Profile" />
                    ) : (
                      <AvatarFallback>
                        <Camera className="h-12 w-12" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => document.getElementById('avatar-upload')?.click()}>
                      Upload Photo
                    </Button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button variant="outline" onClick={generateAvatar}>
                      Generate Avatar
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Choose a username" />
                </div>
                <div className="space-y-4">
                  <Label>Age</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="number" 
                      min={13} 
                      max={65} 
                      value={age} 
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value >= 13 && value <= 65) {
                          setAge(value);
                        }
                      }}
                      className="w-24"
                    />
                    <Slider 
                      value={[age]} 
                      onValueChange={(value) => setAge(value[0])} 
                      max={65} 
                      min={13} 
                      step={1}
                      className="flex-1"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Age must be between 13 and 65
                  </span>
                </div>
                <Button className="w-full" onClick={nextStep}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <PiggyBank className="h-32 w-32 text-primary animate-bounce" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Profession Selection</h2>
              <RadioGroup defaultValue="school">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="school" id="school" />
                    <Label htmlFor="school">School</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="college" id="college" />
                    <Label htmlFor="college">College</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="early-career" id="early-career" />
                    <Label htmlFor="early-career">Early Career</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional">Professional</Label>
                  </div>
                </div>
              </RadioGroup>
              <Button className="w-full" onClick={nextStep}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Coins className="h-32 w-32 text-primary animate-bounce" />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Income Setup</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>What type of income source do you have?</Label>
                  <Select value={incomeSource} onValueChange={setIncomeSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select income source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pocket-money">Pocket money</SelectItem>
                      <SelectItem value="part-time">Part-time job</SelectItem>
                      <SelectItem value="full-time">Full-time job</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {incomeSource === "other" && (
                    <Input
                      placeholder="Please specify"
                      value={otherIncomeSource}
                      onChange={(e) => setOtherIncomeSource(e.target.value)}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>How much do you receive monthly?</Label>
                  <Input
                    type="text"
                    placeholder="Enter amount in ₹"
                    value={monthlyIncome}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setMonthlyIncome(value);
                    }}
                  />
                </div>
                <div className="flex gap-4">
                  <Button onClick={prevStep} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    onClick={nextStep}
                    disabled={!incomeSource || !monthlyIncome || (incomeSource === "other" && !otherIncomeSource)}
                    className="flex-1"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Coins className="h-32 w-32 text-primary animate-bounce" />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Learning Preferences</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Learning Style</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="audio" />
                      <Label htmlFor="audio">Audio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="visual" />
                      <Label htmlFor="visual">Visual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="both" />
                      <Label htmlFor="both">Both</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeCommitment">Time Commitment</Label>
                  <select
                    id="timeCommitment"
                    className="w-full p-2 border rounded-md bg-white"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                  </select>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    toast({
                      title: "Welcome to PennyPilot!",
                      description: "Your account has been created. Let's start your financial journey!",
                    });
                    navigate('/dashboard');
                  }}
                >
                  Finish <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Calendar className="h-32 w-32 text-primary animate-bounce" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center">Welcome to PennyPilot</h1>
          <Progress value={(step / totalSteps) * 100} className="w-full" />
          <p className="text-center text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default SignUp;
