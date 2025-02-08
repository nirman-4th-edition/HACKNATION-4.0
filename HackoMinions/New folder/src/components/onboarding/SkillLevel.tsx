// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Award, SkipForward } from "lucide-react";

// const SkillLevel = () => {
//   const [selectedLevel, setSelectedLevel] = useState("beginner");
//   const navigate = useNavigate();

//   const handleQuizStart = () => {
//     navigate(`/quiz/${selectedLevel}`);
//   };

//   const handleSkip = () => {
//     navigate("/dashboard");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <Label className="text-lg font-semibold">Select your financial knowledge level</Label>
//         <RadioGroup 
//           defaultValue="beginner" 
//           onValueChange={(value) => setSelectedLevel(value)}
//           className="space-y-3"
//         >
//           <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
//             <RadioGroupItem value="beginner" id="beginner" />
//             <Label htmlFor="beginner" className="cursor-pointer">Beginner</Label>
//           </div>
//           <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
//             <RadioGroupItem value="intermediate" id="intermediate" />
//             <Label htmlFor="intermediate" className="cursor-pointer">Intermediate</Label>
//           </div>
//           <div className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary transition-colors">
//             <RadioGroupItem value="expert" id="expert" />
//             <Label htmlFor="expert" className="cursor-pointer">Expert</Label>
//           </div>
//         </RadioGroup>
//       </div>

//       <div className="space-y-4">
//         <Button 
//           variant="outline" 
//           className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-300"
//           onClick={handleSkip}
//         >
//           <SkipForward className="mr-2 h-4 w-4" />
//           Skip & Finish
//         </Button>
//         <Button 
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300"
//           onClick={handleQuizStart}
//         >
//           <Award className="mr-2 h-4 w-4" />
//           Take Quick Quiz
//         </Button>
//       </div>

//       <div className="hidden md:block">
//         <div className="relative w-32 h-32 mx-auto">
//           <Award className="w-full h-full text-yellow-500 animate-bounce" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SkillLevel;