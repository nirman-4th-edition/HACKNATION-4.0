import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Briefcase, GraduationCap, School, User } from "lucide-react";

const ProfessionSelection = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="space-y-6">
        <Label className="text-lg font-semibold">Select your current status</Label>
        <RadioGroup defaultValue="school" className="space-y-4">
          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
            <RadioGroupItem value="school" id="school" />
            <Label htmlFor="school" className="flex items-center space-x-2 cursor-pointer">
              <School className="w-5 h-5 text-primary animate-bounce" />
              <span>School</span>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
            <RadioGroupItem value="college" id="college" />
            <Label htmlFor="college" className="flex items-center space-x-2 cursor-pointer">
              <GraduationCap className="w-5 h-5 text-primary animate-float" />
              <span>College</span>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
            <RadioGroupItem value="early-career" id="early-career" />
            <Label htmlFor="early-career" className="flex items-center space-x-2 cursor-pointer">
              <User className="w-5 h-5 text-primary animate-pulse" />
              <span>Early Career</span>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
            <RadioGroupItem value="professional" id="professional" />
            <Label htmlFor="professional" className="flex items-center space-x-2 cursor-pointer">
              <Briefcase className="w-5 h-5 text-primary animate-bounce" />
              <span>Professional</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ProfessionSelection;