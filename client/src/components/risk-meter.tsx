import { cn } from "@/lib/utils";

interface RiskScoreMeterProps {
  score: number; // 0 to 100
  size?: "sm" | "md" | "lg";
}

export function RiskScoreMeter({ score, size = "md" }: RiskScoreMeterProps) {
  // Calculate color based on score
  // High score = Safe (Green), Low score = Risky (Red)
  let color = "text-emerald-500";
  let label = "Safe";
  let bgColor = "bg-emerald-500";
  
  if (score < 50) {
    color = "text-red-500";
    label = "High Risk";
    bgColor = "bg-red-500";
  } else if (score < 75) {
    color = "text-amber-500";
    label = "Medium Risk";
    bgColor = "bg-amber-500";
  }

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48"
  };

  const textSizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl"
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            className="text-muted/20"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            className={cn("transition-all duration-1000 ease-out", color)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold font-sans", textSizes[size], color)}>
            {score}
          </span>
        </div>
      </div>
      <div className={cn("mt-2 text-sm font-medium px-2 py-1 rounded-full bg-opacity-10", color, bgColor.replace('bg-', 'bg-opacity-10 bg-'))}>
        {label}
      </div>
    </div>
  );
}
