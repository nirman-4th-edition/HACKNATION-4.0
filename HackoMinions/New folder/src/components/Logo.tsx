import { Rocket, Coins } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ className = "", size = "default" }: { className?: string; size?: "default" | "large" }) => {
  const iconSize = size === "large" ? "h-12 w-12" : "h-6 w-6";
  const smallIconSize = size === "large" ? "h-8 w-8" : "h-4 w-4";
  const textSize = size === "large" ? "text-4xl" : "text-xl";

  return (
    <Link to="/" className={`flex items-center gap-4 ${className}`}>
      <div className="relative">
        <Rocket className={`${iconSize} text-primary animate-pulse`} />
        
      </div>
      <span className={`font-bold ${textSize} bg-clip-text text-primary animate-fade-in`}>
        PennyPilot
      </span>
    </Link>
  );
};