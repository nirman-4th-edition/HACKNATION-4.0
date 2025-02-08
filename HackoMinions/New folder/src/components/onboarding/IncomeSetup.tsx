import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const IncomeSetup = () => {
  const [incomeType, setIncomeType] = useState<string>("pocket-money");
  const [amount, setAmount] = useState<string>("");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Income Type Selection */}
      <div className="space-y-4">
        <Label>What type of income do you have?</Label>
        <Select
          value={incomeType}
          onValueChange={(value) => setIncomeType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select income type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pocket-money">Pocket Money</SelectItem>
            <SelectItem value="part-time">Part-time Job</SelectItem>
            <SelectItem value="full-time">Full-time Job</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Monthly Income Input */}
      <div className="space-y-4">
        <Label>How much do you receive monthly?</Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
          <Input
            type="number"
            placeholder="0.00"
            className="pl-8 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="space-y-4">
        <Button className="w-full bg-primary hover:bg-primary/90">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default IncomeSetup;