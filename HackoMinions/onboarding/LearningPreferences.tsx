import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";

const LearningPreferences = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Learning Style Preferences</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
            <Checkbox id="audio" />
            <Label htmlFor="audio" className="cursor-pointer">Audio Learning</Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
            <Checkbox id="visual" />
            <Label htmlFor="visual" className="cursor-pointer">Visual Learning</Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
            <Checkbox id="both" />
            <Label htmlFor="both" className="cursor-pointer">Both</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-semibold">Daily Time Commitment</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="more">More than 1 hour</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="hidden md:flex justify-center mt-8">
        <div className="relative w-32 h-32">
          <Calendar className="w-full h-full text-primary animate-calendar-spin" />
          <Clock className="absolute inset-0 m-auto w-1/2 h-1/2 text-secondary animate-spin-slow" />
        </div>
      </div>
    </div>
  );
};

export default LearningPreferences;